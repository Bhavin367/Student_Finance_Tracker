import { useState , useCallback} from "react" ; 
import { Alert } from "react-native" ; 
import API_URL  from "../constants/urls.js"

// NOTE : useCallback() , doesnt reload the function every single time app refreshes 
// only when neceesary , watch a yt vid if you are confused again 

const useTransactions = (userId) => {
  const [transactions,setTransactions] = useState([]) ;
  const [summary,setSummary] = useState({
    balance : 0 , 
    income : 0 , 
    expense : 0 
  }) ; 

  const [isLoading,setIsLoading] = useState(false) ; 

  
  const fetchTransactions = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/api/transactions/${userId}`);
      const data = await response.json() ;
      console.log(data) ; 
      setTransactions(data) ; 
    } catch (error) {
      console.log("Error while fetching transactions : " , error ) ; 
    }
  },[userId]); // calls function only when userId is updated 


  const getSummary  = useCallback( async () => {
    try {
      const response = await fetch(`${API_URL}/api/transactions/summary/${userId}`) ; 
      const data = await response.json() ; 
      setSummary(data) ; 

    } catch (error) {
      console.log("An error occured while getting summary : ", error) ;  
    }
  },[userId]) ; 

  const loadData = useCallback(async () => {
  try {
      await Promise.all([fetchTransactions(),getSummary()]) ; 
  } catch (error) {
      console.log("An error loading data : " , error ) ; 
  }
  },[fetchTransactions,getSummary]) ; // only run if transactions , summary functions changes  

  
  const deleteTransaction = async (id) => {
    try {
      const response = await fetch(`${API_URL}/api/transactions/${id}`,{method : "DELETE"}) ; 
      const text = await response.json() ; 
      console.log(text) ; 

      if (!response.ok){
      Alert.alert("Deletion Error",
        "Something went wrong",
      [{
          text : "Ok",
        }])
      } else {
        await loadData() ;
        Alert.alert(
          "Deletion Successfull", 
          `Successfully deleted transaction(s) of ID : ${id}`,
          [{text : "Done"}]
        )
      }

    } catch (error) {
      console.log("An error occured while deletion (frontend error) : ", error) ; 
      Alert.alert("Deletion Error",
        "Something went wrong",
      [{
          text : "Ok",
          onPress : () => console.log(error.code)
        }])
    }
  } 

  return { transactions , summary , isLoading , loadData , deleteTransaction } ; 
} 

export default useTransactions  ;  
