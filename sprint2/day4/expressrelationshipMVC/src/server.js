
const connect = require("./configs/db");

const app = require("./index");


app.listen(5000, async()=>{


    try {
        
        await connect();

        console.log("Listening on port 5000");

    } catch (e) {
        console.log(e.message);
    }


})