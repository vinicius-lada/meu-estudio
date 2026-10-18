export const statuses = ['Quero aprender','Aprendendo','Já sei tocar'] as const;
export type Song = {id:string; title:string; artist:string; instrument:string; status:typeof statuses[number]; notes:string; links:string; url:string; cover:string; sheets:Sheet[]; updated:number};
export type Sheet = {id?:string; name:string; type:string; data?:string};
export const blank = ():Song => ({id:crypto.randomUUID(),title:'',artist:'',instrument:'Piano',status:'Quero aprender',notes:'',links:'',url:'',cover:'',sheets:[],updated:Date.now()});
export const safeURL = (s:string) => {try {const u=new URL(s);return ['https:','http:'].includes(u.protocol)?u.href:'';}catch{return '';}};
export function validate(s:unknown):s is Song {
 if(!s || typeof s!=='object') return false;
 const x=s as Song;
 return ['id','title','artist','instrument','notes','links','url','cover'].every(k=>typeof (x as unknown as Record<string,unknown>)[k]==='string') && !!x.title.trim() && statuses.includes(x.status) && Number.isFinite(x.updated) && Array.isArray(x.sheets) && x.sheets.every(f=>typeof f.name==='string' && ['image/png','image/jpeg','image/webp','application/pdf'].includes(f.type) && typeof f.data==='string' && f.data.startsWith('data:'+f.type+';base64,') && f.data.length<28_000_000);
}
const database = new Promise<IDBDatabase>((resolve,reject)=>{const r=indexedDB.open('meu-estudio',1);r.onupgradeneeded=()=>r.result.createObjectStore('songs',{keyPath:'id'});r.onsuccess=()=>resolve(r.result);r.onerror=()=>reject(r.error)});
export async function list():Promise<Song[]> {const db=await database;return new Promise((res,rej)=>{const r=db.transaction('songs').objectStore('songs').getAll();r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
export async function write(songs:Song[],remove?:string){const db=await database;return new Promise<void>((res,rej)=>{const tx=db.transaction('songs','readwrite');const store=tx.objectStore('songs');songs.forEach(s=>store.put(s));if(remove)store.delete(remove);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error);tx.onabort=()=>rej(tx.error)})}
export function readFile(file:File):Promise<Sheet>{return new Promise((res,rej)=>{if(!['image/png','image/jpeg','image/webp','application/pdf'].includes(file.type)||file.size>20*1024*1024){rej(new Error('Use PNG, JPG, WebP ou PDF de até 20 MB.'));return;}const r=new FileReader();r.onload=()=>res({name:file.name,type:file.type,data:String(r.result)});r.onerror=()=>rej(new Error('Não foi possível ler o arquivo.'));r.readAsDataURL(file);})}
export type Track={trackId:number;trackName:string;artistName:string;trackViewUrl:string};
export function search(term:string):Promise<Track[]>{return new Promise((res,rej)=>{
 const key='itunes_'+crypto.randomUUID().replaceAll('-','');const script=document.createElement('script');
 const scope=window as unknown as Record<string,unknown>;
 const clean=()=>{clearTimeout(timer);script.remove();delete scope[key]};
 const timer=setTimeout(()=>{clean();rej(new Error('A busca demorou demais. Tente novamente ou adicione manualmente.'))},15000);
 scope[key]=(data:{results:Track[]})=>{clean();res(data.results.filter(x=>x.trackName && x.artistName))};
 script.onerror=()=>{clean();rej(new Error('Busca indisponível. Você pode adicionar manualmente.'))};
 script.src='https://itunes.apple.com/search?'+new URLSearchParams({term,entity:'song',country:'BR',limit:'12',callback:key});document.head.append(script);
})}
