import { useState,useEffect, useCallback } from "react" 
import API_URL from "../constants/urls.js"

// api/categories 
// router.post("/:userId",createCategory) ;
// router.get("/:userId/type/:typeName",getCategoriesByUserId);
// router.delete("/",deleteCategory) ;


const useCategories = (userId,typeName) =>{
  const [categories,setCategories] = useState([]) ; 
  const [isLoading,setIsLoading] = useState(false) ; 

  const loadCategories = useCallback(async () => {
    if (!userId || !typeName) {
        console.log("Id or type not found ") ; 
        return ; 
      }

    setIsLoading(true) ; 
    try {
      const response = await fetch(`${API_URL}/api/categories/${userId}/type/${typeName}`);

      if (!response.ok) {
        console.log("Response error ") ; 
        return  ; 
      }

      const data = await response.json() ; 
      console.log(data) ; 
      setCategories(data) ; 
     
    } catch (error) {
      console.log("Error loading categories ; Hook error " , error ) ; 
    }
      finally {
      setIsLoading(false) ; 
    }
  },[userId,typeName]) ; 

  useEffect(()=>{
    loadCategories() ; 
  },[loadCategories])



  return { categories , isLoading } ; 
}
