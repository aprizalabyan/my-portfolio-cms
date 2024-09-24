import { MongoClient, ServerApiVersion } from "mongodb";

const username = process.env.ATLAS_USRNME
const password = process.env.ATLAS_PASSWD
const cluster = process.env.ATLAS_CLSTR

const URI = `mongodb+srv://${username}:${password}${cluster}`;
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}
const client = new MongoClient(URI, options);
const dbName = "my-portfolio"

async function connect() {
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) { 
    console.error(err);
    await client.close();
  }
}

connect();
const db = client.db(dbName);

export { db };