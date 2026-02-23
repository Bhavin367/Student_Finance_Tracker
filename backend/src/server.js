import express from "express" ; 
import 'dotenv/config' ; 
import { initDB } from "./config/db.js" ; 
import transactionRoute from "./routes/transactionRoutes.js" ; 
import categoryRoute from "./routes/categoryRoutes.js" ; 
import cors from "cors" ; 

console.log(process.cwd())
const app = express() ;
const PORT = process.env.PORT


// sometimes browser might deny access 
// cors basically gives that permission slip 
app.use(cors());

// middleware
app.use(express.json());

app.get('/', (req,res) =>{
  res.send("YO someone there ") ; 
})


app.use("/api/transactions",transactionRoute) ; 
app.use("/api/categories",categoryRoute) ; 

initDB().then(()=>{
app.listen(PORT,()=>{
  console.log("server up and running")
})
})

