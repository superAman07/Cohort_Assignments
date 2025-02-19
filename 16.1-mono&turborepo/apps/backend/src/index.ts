import express from "express"
import {BACKEND_URL} from "@repo/common/config"

console.log(BACKEND_URL);
const app = express();
const port = 3005;
app.get('/',(req,res)=>{
    res.json({
        message:"response from backend"
    })
})

app.listen(port,()=>{
    return console.log(`running at port ${port}`)
});