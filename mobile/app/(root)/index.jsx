import { Image, View ,Text, StyleSheet,FlatList, Alert } from 'react-native'
import { SignOutButton } from "../../components/SignOutButton.jsx"
import { COLORS } from "../../constants/colors.js"
import useTransactions from "../../hooks/useTransactions.js"
import greetings from "../../utils/getWelcomeText.js" 
import { useUser } from "@clerk/clerk-expo"
import PageLoader from "../../components/PageLoader.jsx"
import { useEffect } from "react"
import BalanceCard from "../../components/BalanceCard.jsx"
import TransactionItem from "../../components/TransactionItem.jsx"
import { useRouter } from 'expo-router'
import AddButton from "../../components/AddButton.jsx" 
import NoTransactionsFound from "../../components/NoTransactionsFound.jsx"

export default function Index(){
  const { user } = useUser() ; 
  const { transactions , summary , isLoading , loadData , deleteTransaction } = useTransactions(user.id) ; 
  const router = useRouter() ; 

  // if theres is a change in loadData , recall the function 
  useEffect(() => {
    loadData() ; 
  }, [loadData]) ; 

  const handleDelete = (id) =>{
    Alert.alert('Delete Transaction','Are you sure you want to delete it ?',[
      {text : "Cancel",style : "cancel"},
      {text : "Confirm",style : "delete", onPress : () => deleteTransaction(id)}
    ]); 
  }

  if (isLoading) return <PageLoader/>;

  return(
  <View style = {styles.main}> 
  {/* this would be the main body */} 
    <View style = {styles.header}>
    {/* header part */} 
      <View style = {styles.headerLeft}>
       {/* left part of header with logo and maybe welcome Text */} 
        <Image style = {styles.logo} source = {require("../../assets/images/logo.png")}
        resizeMode ="contain"/>
        <Text style = {styles.headerText}>{greetings()}</Text>
      </View>
      <View style = {styles.buttonContainer}>
        {/* container for buttons  */}
        <AddButton/> 
        <SignOutButton/>
      </View>
    </View>
    <BalanceCard summary = {summary}/>
  
    <View style = {styles.transactionHeader}>
        <Text style = {styles.transactionHeaderText}>Recent Transactions </Text>
    </View>
    <FlatList data = {transactions}
      renderItem = {({item}) => <TransactionItem item = {item} onDelete = {()=> handleDelete(item.id)} />} 
      ListEmptyComponent = {<NoTransactionsFound/>}/>
  </View>

  );
}; 


const styles = StyleSheet.create({
  main: {
    backgroundColor : COLORS.background,
    flex : 1 ,
    padding : 10,
  },
  logo : {
    width : 55, 
    height : 55,
    borderRadius : 100,
    borderColor : COLORS.border,
    borderWidth : 2,
  },
  headerLeft : {
    flexDirection: 'row',
    alignItems: 'center',
    gap : 10 
  },

  headerText : {
    fontFamily : "ui-monospace",
    fontSize: 17,
    fontWeight: 'bold',
    color : COLORS.primary
    
  },
  header : {
    flexDirection : "row" ,
    alignItems: 'center',
    padding : 5 , 
    marginHorizontal : 5,
    gap : "12%"
  },
  transactionHeader : {
    margin : 20 ,
    marginTop : 30 
  },
  transactionHeaderText : {
    fontFamily : "ui-monospace" ,
    fontSize : 20 ,
    color : COLORS.primary ,
    fontWeight : 600,
  },
  buttonContainer : {
    padding : 5 ,
    flexDirection : "row",
    width : 100,
    alignItems: 'center',
    gap : "10%" 
  }
});

