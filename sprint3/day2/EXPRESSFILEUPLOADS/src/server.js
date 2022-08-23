const connect = require("./configs/db");

const app = require("./index");

app.listen(6000, async(req, res)=>{

    await connect();

    console.log("listening on Port 6000");

})