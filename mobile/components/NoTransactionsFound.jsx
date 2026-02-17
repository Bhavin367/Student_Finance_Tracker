import { StyleSheet, Text, View, TouchableOpacity} from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { COLORS } from "../constants/colors.js"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router"

const NoTransactionsFound = () => {
  const router = useRouter() ;  
  return (
    <View style = {styles.container}>
      <Text style = {styles.infoMessage}>No Transactions Found </Text>
      <Ionicons name="receipt-outline" size={120} color={COLORS.textLight} />
      <TouchableOpacity style = {styles.addContainer}
      onPress = {() => router.push('/create')}>
        <Text style = {styles.addText}>Start adding transactions today </Text>
        <MaterialIcons name="add-circle-outline" size={28} color={COLORS.white} />
      </TouchableOpacity>
    </View>
  )
}

export default NoTransactionsFound; 

const styles = StyleSheet.create({
  container : {
    alignItems: 'center',
    borderColor : COLORS.border,
    borderWidth : 1,
    borderRadius : 15,
    backgroundColor : COLORS.white,
    padding : 10,
    gap : 5
  },
  infoMessage : {
    fontFamily : "ui-monospace",
    fontSize : 20,
    color : COLORS.primary,
    fontWeight : 600
  },
  addContainer : {
    flexDirection : "row",
    alignItems : "center",
    marginVertical : 20,
    backgroundColor : COLORS.primary,
    padding : 10 ,
    borderRadius : 10
  },
  addText : {
    fontFamily  : "ui-monospace",
    color : COLORS.white,
    fontSize : 13 
  }
});

