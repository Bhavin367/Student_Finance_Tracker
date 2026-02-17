import { View , Text , TouchableOpacity, StyleSheet } from "react-native" 
import { COLORS }  from "../constants/colors.js" 
import { Ionicons } from "@expo/vector-icons"  
import formatDate from "../utils/formatDate.js"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const CATEGORY_ICONS = {
  "Food & Drinks": "fast-food",
  Shopping: "cart",
  Grocery : "cart",
  Transportation: "car",
  Entertainment: "film",
  Bills: "receipt",
  Income: "cash",
  Allowance : "cash",
  Freelance : "cash", 
  Other: "ellipsis-horizontal",
};

export default function TransactionItem({item, onDelete}) {
  const isIncome = item.type === "income" ;
  const iconName = CATEGORY_ICONS[item.category_name] || "pricetag-outline" ; 
  const dateString = item.created_at ?  formatDate(item.created_at)  : "None"; 
  const typeColor  = isIncome ? COLORS.income : COLORS.expense ; 
  const amountSign = isIncome ? '+' : '-' ;   

  return(
  <View style = {styles.container}>
      <TouchableOpacity style = {styles.content}>
        <View style = {styles.iconContainer}>
          {/* This would contain icons title and category_name   */}
          <Ionicons name = {iconName} size = {25} color = {typeColor}/>
        </View>
        <View style = {styles.transactionsLeft}>
          <Text style = {styles.transactionsTitle}>{item.title ? item.title : "Unknown"}</Text>
          <Text style = {styles.transactionsCategory}>{item.category_name ? item.category_name : "Unknown"}</Text>
        </View>
        
        <View style = {styles.transactionsRight}>
          <Text style = {[styles.transactionsAmount,{color : typeColor}]}>{amountSign}£{item.amount ? item.amount : (0).toFixed(2)}</Text> 
          <Text style = {styles.transactionsDate}>{dateString}</Text>
        </View>
      </TouchableOpacity>
      
      <View style = {{ alignItems: 'center',justifyContent: 'center',}}>
      <TouchableOpacity style = {styles.deleteContainer} onPress = {() => onDelete(item.id)}>
          <MaterialIcons name="delete-outline" size={27} color={COLORS.white} />
      </TouchableOpacity>
      </View>

  </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection : "row" ,
    backgroundColor : COLORS.white,
    padding : 10 ,
    marginHorizontal : 10,
    borderRadius : 7,
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: {width : 0 , height : 0 }, 
    shadowRadius:  0 ,
    shadowOpacity: 1,
    borderWidth : 1 ,
    borderColor : COLORS.background
  },
  iconContainer : {
    width : 40 , 
    height : 40,
    borderRadius : 20 ,
    backgroundColor : COLORS.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content : {
    flex : 1,
    flexDirection: 'row',
    alignItems : "center"
  },
  transactionsLeft : {
    marginHorizontal : 5,
    padding : 3,
    gap : 5,
    width : "47%" 
  },
  transactionsTitle : {
    fontFamily : "ui-monospace",
    fontSize : 17,
    color : COLORS.primary ,
    fontWeight : 700
  },
  transactionsCategory : {
    fontFamily : "ui-monospace",
    fontSize : 12,
    fontWeight : 300,
    color : COLORS.textLight
  },
  transactionsRight : {
    alignItems: 'center',
    margin : 5,
    gap : 5,
  },
  transactionsAmount : {
    fontFamily : "ui-monospace",
    fontWeight : 600,
    fontSize : 20,
    textShadowColor : COLORS.background ,
    textShadowOffset : {width : 0 , height : 0 },
    textShadowRadius : 5 , 

  },
  transactionsDate : {
    fontFamily : "ui-rounded" ,
    fontWeight : 300 , 
    color : COLORS.textLight,
    fontSize : 12
  },
  deleteContainer : {
    alignItems : "center", 
    justifyContent: 'center',
    backgroundColor : COLORS.expense,
    borderRadius : 7,
    width : 35,
    height : 40,
    marginLeft : 5 
  }
});

