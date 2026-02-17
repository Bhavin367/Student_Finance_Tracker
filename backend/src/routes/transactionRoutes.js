import express from "express" ;
import {
  getTransactionsByUserId,
  createTransaction,
  deleteTransactions,
  getSummary
} from "../controllers/transactionControllers.js" 


const router = express.Router();

// api/transactions/

router.get("/:userId",getTransactionsByUserId);

router.post("/",createTransaction) ; 

router.delete("/:id",deleteTransactions) ; 

router.get("/summary/:userId",getSummary);

export default router ; 
