import { Account, ID, Permission, Query, Role, Storage } from "appwrite";
import type { Song, Sheet } from "./data";
import { client } from "./appwrite";

export type SyncState = "local" | "locked" | "ready";
type Config = { endpoint: string; projectId: string; bucketId: string };
type LibraryFile = { $id: string; $updatedAt: string; name: string; folder?: string };

let config: Config | null | undefined;
let account: Account | null = null;
let storage: Storage | null = null;
let currentUserId = "";

async function getConfig() {
  if (config !== undefined) return config;
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}appwrite-config.json`, { cache: "no-store" });
    const value = await response.json() as Partial<Config>;
    config = value.endpoint && value.projectId && value.bucketId ? {
      endpoint: value.endpoint.replace(/\/$/, ""), projectId: value.projectId, bucketId: value.bucketId,
    } : null;
  } catch { config = null; }
  if (config) {
    account = new Account(client);
    storage = new Storage(client);
  }
  return config;
}

async function services() {
  const value = await getConfig();
  if (!value || !account || !storage) throw new Error("A sincronização ainda não foi configurada.");
  return { ...value, account, storage };
}

export async function status(): Promise<SyncState> {
  if (!await getConfig()) return "local";
  try {
    const user = await account!.get();
    currentUserId = user.$id;
    return "ready";
  } catch { return "locked"; }
}

export async function signup(email: string, password: string) {
  const { account } = await services();
  await account.create({ userId: ID.unique(), email, password });
  await account.createEmailPasswordSession({ email, password });
  currentUserId = (await account.get()).$id;
}

export async function login(email: string, password: string) {
  const { account } = await services();
  await account.createEmailPasswordSession({ email, password });
  currentUserId = (await account.get()).$id;
}

export async function logout() {
  const { account } = await services();
  await account.deleteSession({ sessionId: "current" });
  currentUserId = "";
}

const dataUrlToFile = async (data: string, name: string, type: string) => {
  const blob = await (await fetch(data)).blob();
  return new File([blob], name, { type });
};
const permissions = () => [
  Permission.read(Role.user(currentUserId)),
  Permission.update(Role.user(currentUserId)),
  Permission.delete(Role.user(currentUserId)),
];

async function libraryFiles() {
  const { storage, bucketId } = await services();
  const result = await storage.listFiles({ bucketId, queries: [Query.equal("folder", ["state/"])] });
  return (result.files as LibraryFile[]).filter(file => file.name === "library.json")
    .sort((a, b) => b.$updatedAt.localeCompare(a.$updatedAt));
}

async function readLibrary(): Promise<{ songs: Song[]; file?: LibraryFile }> {
  const { storage, bucketId } = await services();
  const [file] = await libraryFiles();
  if (!file) return { songs: [] };
  const response = await fetch(String(storage.getFileDownload({ bucketId, fileId: file.$id })));
  if (!response.ok) throw new Error("Não foi possível abrir a biblioteca sincronizada.");
  const data = await response.json() as { version?: number; songs?: Song[] };
  return { songs: Array.isArray(data.songs) ? data.songs : [], file };
}

async function writeLibrary(songs: Song[], previous?: LibraryFile) {
  const { storage, bucketId } = await services();
  const body = new Blob([JSON.stringify({ version: 1, songs })], { type: "application/json" });
  const created = await storage.createFile({
    bucketId,
    fileId: ID.unique(),
    file: new File([body], "library.json", { type: "application/json" }),
    permissions: permissions(),
    folder: "state",
  });
  if (previous) await storage.deleteFile({ bucketId, fileId: previous.$id });
  return created;
}

export async function listRemote(): Promise<Song[]> { return (await readLibrary()).songs; }

export async function saveRemote(song: Song) {
  const { storage, bucketId } = await services();
  const { songs, file } = await readLibrary();
  const sheets: Sheet[] = [];
  for (const sheet of song.sheets) {
    if (sheet.id || !sheet.data) { sheets.push(sheet); continue; }
    const uploaded = await storage.createFile({
      bucketId,
      fileId: ID.unique(),
      file: await dataUrlToFile(sheet.data, sheet.name, sheet.type),
      permissions: permissions(),
      folder: "sheets",
    });
    sheets.push({ id: uploaded.$id, name: sheet.name, type: sheet.type });
  }
  const updated = { ...song, sheets };
  await writeLibrary([...songs.filter(item => item.id !== song.id), updated], file);
}

export async function deleteRemoteSong(id: string) {
  const { storage, bucketId } = await services();
  const { songs, file } = await readLibrary();
  const song = songs.find(item => item.id === id);
  if (song) await Promise.all(song.sheets.filter(sheet => sheet.id).map(sheet => storage.deleteFile({ bucketId, fileId: sheet.id! }).catch(() => undefined)));
  await writeLibrary(songs.filter(item => item.id !== id), file);
}

export async function deleteRemoteSheet(id: string) {
  const { storage, bucketId } = await services();
  await storage.deleteFile({ bucketId, fileId: id });
}

export async function hydrateSheet(sheet: Sheet): Promise<Sheet> {
  if (sheet.data || !sheet.id) return sheet;
  const { storage, bucketId } = await services();
  const response = await fetch(String(storage.getFileDownload({ bucketId, fileId: sheet.id })));
  if (!response.ok) throw new Error("Não foi possível abrir a partitura.");
  const blob = await response.blob();
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve({ ...sheet, data: String(reader.result) });
    reader.onerror = () => reject(new Error("Não foi possível ler a partitura."));
    reader.readAsDataURL(blob);
  });
}
