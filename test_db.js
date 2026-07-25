const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://Kabilesh:Kabi12122005@cluster0.q1tamfs.mongodb.net/?appName=Cluster0";

async function run() {
  console.log("Creating client...");
  const client = new MongoClient(uri, {
    serverSelectionTimeoutMS: 2000,
    connectTimeoutMS: 2000,
    socketTimeoutMS: 2000,
  });

  try {
    console.log("Connecting...");
    await client.connect();
    console.log("Connected successfully!");
    const db = client.db('portfolio');
    console.log("Listing collections...");
    const collections = await db.listCollections().toArray();
    console.log("Collections:", collections);
  } catch (err) {
    console.error("Connection failed:", err);
  } finally {
    console.log("Closing connection...");
    await client.close();
    console.log("Done.");
  }
}

run();
