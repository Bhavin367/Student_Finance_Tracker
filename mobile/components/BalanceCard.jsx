import { View, Text, StyleSheet } from 'react-native'
import { COLORS } from '../constants/colors.js'

const BalanceCard = (props) => {
  const summary = props.summary ;

  function format (value) {
    return isNaN(value) ? (0).toFixed(2) : Number.parseFloat(value).toFixed(2);
  }

  const {income , savings , expense } = {
    income : format(summary.income),
    savings : format(summary.savings) ,
    expense : format(summary.expense)
  }

  let balance = income - savings  - expense   ; 
  balance = balance.toFixed(2);
  

  return (
    <View style = {{
      width : "100%",
      height : "25%",
      marginTop : 25,
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/*container to align position of card */}
      <View style = {styles.card}>
        {/* this would be main card */}
        <View style = {styles.mainContainer}>
          <Text style = {styles.cardMainText}>Remaining Allowance</Text>
          <Text style = {styles.cardMainAmount}>£ {balance}</Text>
        </View>

        <View style = {{
          marginTop : 20,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          {/*This would hold the income savings and expense data */}
        <View style = {styles.sideContainer}>
          <Text style = {styles.sideText}>Total Savings</Text>
          <Text style = {styles.sideAmount}>£ {savings}</Text>
        </View>

        <View style = {styles.sideContainer}>
          <Text style = {styles.sideText}>Total Expense</Text>
          <Text style = {styles.sideAmount}>£ {expense}</Text>
        </View>

        </View>

      </View>
    </View>
  )
}


const styles = StyleSheet.create({
  card : {
    backgroundColor : COLORS.primary,
    width : "95%",
    height : "100%",
    margin : 25,
    borderRadius : 15,
    borderWidth : 1 ,
    borderColor : COLORS.background,
    padding : 20,
    shadowColor: COLORS.primary ,
    shadowOffset: {width : 0 , height : 0 },
    shadowRadius: 4,
    shadowOpacity:  1,
  },
  cardMainText : {
    fontFamily : "ui-monospace",
    color : COLORS.white,
    fontWeight : 600,
    fontSize : 18
  },
  cardMainAmount : {
    fontFamily : "ui-monospace" , 
    color : COLORS.white ,
    fontWeight : 400 ,
    fontSize : 45,
    textShadowColor : COLORS.border ,
    textShadowOffset  : {width : 0 , height : 0 },
    textShadowRadius :3
  },
  mainContainer : {
    gap : 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideContainer : {
    alignItems: 'center',
    justifyContent: 'center',
    gap : 10 
  },
  sideText : {
    fontFamily : "ui-monospace",
    color : COLORS.white,
    fontSize : 15,
    fontWeight : 200
  },
  sideAmount : {
    fontFamily : "ui-monospace",
    color : COLORS.white,
    fontSize : 17,
    fontWeight : 600
  }
});


export default BalanceCard ; 


