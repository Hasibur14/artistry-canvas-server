const express = require('express');  //req package
const cors = require('cors');
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

const { MongoClient, ServerApiVersion } = require('mongodb');


//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.lfxjcnl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const artCraftCollection = client.db('artistryCanvas').collection('artCraft');


        //add art and craft data
        app.post("/addArtCraft", async (req, res) => {
            console.log(req.body);
            const result = await artCraftCollection.insertOne(req.body);
            console.log(result);
            res.send(result)
        })





        // await client.connect();
        // await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {

    }
}

run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('Art and Craft is running')
})

app.listen(port, () => {
    console.log(`running is running on port: ${port}`)
})
