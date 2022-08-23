const app = require(".index");
const req = require("express/lib/request");

const connect = require("./configs/db");

app.listen(5000, async(req, res) =>{
    await connect();

    console.log("listening on port 5000")
})