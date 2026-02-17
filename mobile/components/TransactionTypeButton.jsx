import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { COLORS } from "../constants/colors.js"

const TransactionTypeButton = ({buttonType , onSelect , color }) => {
  const checkActive = () => {
    if (color === COLORS.primary) return true ; 
    return false ; 
  }

  return (
    <TouchableOpacity 
    onPress = {onSelect}
    style = {[styles.button,{backgroundColor : color}]}>
      <Text style = {[styles.text,{color : checkActive() ? COLORS.white : COLORS.text}]}>
        {buttonType}
      </Text>
    </TouchableOpacity>
  )
}

export default TransactionTypeButton ;

const styles = StyleSheet.create({
  button: {
    borderColor : COLORS.border ,
    borderWidth : 1,
    padding : 12,
    borderRadius : 11,
    width : "30%",
    alignItems: 'center',
    shadowOffset: {width : 0 , height : 0 },
    shadowColor: COLORS.border,
    shadowRadius: 1,
    shadowOpacity: 1,
  },
  text : {
    fontFamily : "ui-monospace",
    fontSize : 18,
    fontWeight : 300
  }
});

