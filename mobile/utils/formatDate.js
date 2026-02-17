export default function formatDate (dateString) {
  const date = new Date(dateString) ; 
  console.log(dateString) ; 
  return date.toLocaleString("en-GB",{
    year : "numeric" ,
    month : "long" , 
    day : "numeric",
  });
  
}
