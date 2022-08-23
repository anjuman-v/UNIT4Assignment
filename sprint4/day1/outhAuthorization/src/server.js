const app = require("./index");

const connect = require("./configs/db");


app.listen(6000, async ()=>{

    await connect();

    console.log("listening on port 6000");

})