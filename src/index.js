const app = require("express")();
const {Client} = require("pg");
const HashRing = require("hashring");
const crypto = require("crypto");
const rank = new HashRing();

rank.add("5432");
rank.add("5433");
rank.add("5434");
rank.add("5435");
rank.add("5436");

const pginstances ={
    "5432": new Client({
        "host":"suyashpc",
        "port":"5432",
        "user":"postgres",
        "database":"postgres",
        "password":"postgres"}),
    "5433": new Client({
        "host":"suyashpc",
        "port":"5433",
        "user":"postgres",
        "database":"postgres",
        "password":"postgres"}),
    "5434": new Client({
        "host":"suyashpc",
        "port":"5434",
        "user":"postgres",
        "database":"postgres",
        "password":"postgres"}),
    "5435": new Client({
        "host":"suyashpc",
        "port":"5435",
        "user":"postgres",
        "database":"postgres",
        "password":"postgres"}),
    "5436": new Client({
        "host":"suyashpc",
        "port":"5436",
        "user":"postgres",
        "database":"postgres",
        "password":"postgres"})
};

connect();

async function connect(){
    await pginstances["5432"].connect();
    await pginstances["5433"].connect();
    await pginstances["5434"].connect();
    await pginstances["5435"].connect();
    await pginstances["5436"].connect();
}

app.get("/:id", async (req,res) =>{
    const id = req.params.id;
    const db_server = rank.get(id);
    const result = await pginstances[db_server].query("SELECT * FROM URL_FACT WHERE URL = $1",[id]);
    if(result.rowCount>0){
        res.send({
            "urlID":id,
            "URL":result.rows[0],
            "server":rserver
        })
    }
    else{
        res.sendStatus(404);
    }

})

app.post("/", async (req, res) =>{
    const url = req.query.url;
    //use consitent hasing here
    const my_hash =  crypto.createHash("sha256").update(url).digest("base64")
    const urlid = my_hash.substr(0,5);
    rserver = rank.get(urlid);
    await pginstances[server].query("INSERT INTO URL_FACT(URL, URL_ID) VALUES ($1,$2)",[url, urlid]);
    res.send({
        "urlID":urlid,
        "URL":url,
        "server":rserver
    })
})

app.listen(8081,() =>console.log("I am listening on port 8081"))