import 'dotenv/config'; // Load environment variables from .env file
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { MongoClient, ServerApiVersion } from 'mongodb';

const app = express();
const PORT = process.env.PORT || 3000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const uri = process.env.MONGO_URI;  //Make ENV
console.log("ENV works", uri);

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        await client.db("admin").command({ ping: 1 });
        console.log("Connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}
run().catch(console.dir);

app.use(express.urlencoded  ({ extended: true })); // Parse form data
app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the "public" directory
app.use(express.json()); // Parse JSON bodies


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'miniapp.html'));
});










app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});