import { Client } from "appwrite";

export const client = new Client()
  .setEndpoint("https://fra.cloud.appwrite.io/v1")
  .setProject("6ad28de2003979135b87");

// Confirma na abertura que este build consegue alcançar o projeto Appwrite.
export const pingAppwrite = () => client.ping().catch(() => undefined);
