import { sql } from "../config/db.js" ;


export async function createCategory(req,res) {
  try {
    const { userId } = req.params ; // dont use in prod unsafe 
    const { type , category_name } = req.body;

    const category = await sql `
    INSERT INTO categories ( user_id , type , category_name )
    VALUES ( ${userId}, ${type}, ${category_name} ) 
    RETURNING * 
`;

    console.log(category[0]) ;
    return res.status(201).json(category[0]);
    

  } catch (err) {
    console.log("Error creating category : " , err);
    return res.status(500).json({message : "Internal server error "}) ; 
  }
} ;

export async function getCategoriesByUserId(req,res) {
  try {
      const { userId } = req.params ;
      const { catType }   = req.body ; 
      const category = await sql`
      SELECT
        category_id AS id ,
        category_name AS Name 
      FROM categories 
      WHERE 
        user_id = ${userId}
      AND 
        type = ${catType}
  `;
    const test = sql`
SELECT * from categories 
`;

    console.log("testdata")    
    console.log(test) ; 
       
      console.log(category) ;  
      return res.status(200).json(category); 


  } catch (error) {
      console.log("Error getting categories : ",error ) ; 
      return res.status(500).json({ message : "Internal server error"}) ; 
  }
}

export async function deleteCategory(req,res) {
  try {
    const { userId , categoryId } = req.body ;

    categoryId = Number(categoryId) ; 

    if (!userId || isNaN(categoryId)){
      return res.status(400).json({message : "Incomplete or wrong data "}) ; 
    } 


    const deleteTransaction = await sql `
    DELETE FROM transactions
    WHERE category_id = ${categoryId} 
    RETURNING * 
`;

    const deletion = await sql `
    DELETE FROM categories  
    WHERE 
      category_id = ${categoryId} AND 
      user_id = ${userId}
    RETURNING *  
`;
    console.log(deletion) ;
    console.log(deleteTransaction) ;

    return res.status(200).json(deletion[0]) ; 

  } catch (error) {
    console.log("Error deleting category : " , error)  ; 
    return res.status(500).json({message : "Internal server error "}) ; 
  }
}
