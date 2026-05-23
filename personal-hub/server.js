import app from "./src/app.js"
import obj from  "./src/config/env.js"
let PORT = obj.PORT

app.listen(PORT,()=>console.log("Server in Running..."));