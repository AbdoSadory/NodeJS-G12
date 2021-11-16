const app = require("./src/app")


app.listen(process.env.port,()=>{
    console.log("Success")
    // to turn it off => sudo kill -9 `sudo lsof -t -i:3000`
})