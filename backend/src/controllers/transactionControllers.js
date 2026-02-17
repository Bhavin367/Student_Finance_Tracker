import { sql } from "../config/db.js" ;


export async function getTransactionsByUserId(req,res) {
  try {
    const { userId } = req.params ;  // params is added to url by frontend
//
//     const transactions = await sql`
//     SELECT * FROM transactions 
//     WHERE user_id = ${userId}
//     ORDER BY created_at DESC ; 
// `
    // new query to get category_name as well 
    const transactions = await sql`
    SELECT 
      t.id,
      t.title,
      t.category_id,
      t.type,
      t.amount, 
      t.created_at,
      c.category_name 
    FROM
      transactions t 
    JOIN 
      categories c 
    ON    
      t.category_id = c.category_id 
    WHERE  
      t.user_id = ${userId} 
    ORDER BY 
      t.created_at DESC
`;
    console.log(transactions) ; 
    return res.status(200).json(transactions) ; 

  } catch (error) {
    console.log("Error getting transactions : " , error) ; 
    res.status(500).json({message: "Internal server error"})  ;
  }
} ;


export async function createTransaction(req,res) {
  try {

    let {userId,title,category_id,type,amount} = req.body ; 

    amount = Number(amount) ; 
    category_id = Number(category_id) ; 



    if (!userId || !title || !Number.isInteger(category_id) || !type || !Number.isFinite(amount)){
      return res.status(400).json({message : "All fields required"}) ; 
    }

    const transactions = await sql `
    INSERT INTO transactions 
    (user_id , title, category_id , type , amount)
    VALUES(${userId},${title}, ${category_id},${type},${amount}) 
    RETURNING * 
`;

    console.log(transactions) ; 
    return res.status(201).json(transactions[0]) ;

  } catch (error) {
    console.log("Error creating transactions ",error) ; 
    res.status(500).json({message : "Internal server error"}) ; 
  }
}

export async function deleteTransactions(req,res) {
  try {
    const { id } = req.params ;

    const deletion = await sql `
    DELETE FROM transactions 
    WHERE id = ${id}
    RETURNING * ;  
`;
    console.log(deletion); 
    res.status(200).json(deletion[0]) ;

  } catch (error) {
    console.log("Error while deleting transactions : " , error) ; 
    res.status(500).json({message : "Internal server error "}) ; 
  }
} ;

export async function getSummary(req, res) {
try {
    const { userId } = req.params ;
    const summary = await sql `
    SELECT 
      COALESCE(SUM(CASE WHEN type = 'income' THEN amount::numeric ELSE 0 END),0) AS income,
      COALESCE(SUM(CASE WHEN type = 'expense' THEN amount::numeric ELSE 0 END),0) AS expense, 
      COALESCE(SUM(CASE WHEN type = 'savings' THEN amount::numeric ELSE 0 END),0) AS savings 
    FROM transactions 
      WHERE user_id = ${userId}
    `;

    console.log(summary[0]) ; 
    return res.status(200).json(summary[0]) ; 

  } catch (error) {
    console.log("Error while getting summary : " , error) ; 
    res.status(500).json({message : "Internal server error"}) ; 
  }
}
