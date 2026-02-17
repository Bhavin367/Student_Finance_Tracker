import express from "express"  ; 
import {
  createCategory,
  getCategoriesByUserId,
  deleteCategory
} from "../controllers/categoryControllers.js" ;

const router = express.Router();

// api/categories 

router.post("/:userId",createCategory) ;

router.post("/list/:userId",getCategoriesByUserId) ; 

// user id and category id comes from body in this case 
router.delete("/",deleteCategory) ;

export default router ;
