import 'dotenv/config' ;
import { neon } from "@neondatabase/serverless" ; 

export const sql = neon(process.env.DATABASE_URL) ; 

export async function initDB() {
  try {
    await sql`
    CREATE TABLE IF NOT EXISTS categories(
      category_id SERIAL PRIMARY KEY ,
      user_id VARCHAR(255) NOT NULL ,
      type VARCHAR(15) NOT NULL CHECK(type IN (
      'income','savings','expense'
      )) DEFAULT 'income' ,
      category_name VARCHAR(255) NOT NULL DEFAULT 'Other',
      UNIQUE(category_name,user_id,type)
    )
`;

    await sql`
    CREATE TABLE IF NOT EXISTS transactions(
      id SERIAL PRIMARY KEY , 
      user_id VARCHAR(255) NOT NULL, 
      title VARCHAR(255) ,
      category_id INT REFERENCES categories(category_id) ON DELETE SET NULL , 
      type VARCHAR(15) NOT NULL CHECK (type in (
      'income','savings','expense'
      )) ,
      amount DECIMAL(10,2) NOT NULL  CHECK (amount >= 0),
      created_at TIMESTAMP NOT NULL DEFAULT NOW()
    )
`;
  } catch (error) {
      console.error('Error initializing DB:', error);

  }
} 
