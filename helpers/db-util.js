import { MongoClient } from 'mongodb';

export const connectDatabase = async () => {
  const client = await MongoClient.connect('mongodb+srv://asaeri3:Asaeri33@cluster0.muwol.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0');
  // Below would connect to another server named "comments" if I would like.
  // const client = await MongoClient.connect('mongodb+srv://asaeri3:Asaeri33@cluster0.muwol.mongodb.net/comments?retryWrites=true&w=majority&appName=Cluster0');
  return client;
}

export const insertDocument = async (client, collection, document) => {
  const db = client.db();
  const response = await db.collection(collection).insertOne(document);
  return response;
}

export const getAllDocuments = async (client, collection, sort, filter = {}) => {
  const db = client.db();
  const documents = await db.collection(collection).find(filter).sort(sort).toArray();
  return documents;
}
