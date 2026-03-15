import { View, Text ,TextInput,StyleSheet, TouchableOpacity} from 'react-native'
import { COLORS } from "../../constants/colors.js"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from "expo-router" ; 
import TransactionInput from '../../components/TransactionInput.jsx'

const Create = () => {
  const router = useRouter() ; 
  return (
    <View style = {styles.container}>

      {/* the header section  */}
      <View style = {styles.headerContainer}>
        <TouchableOpacity style = {styles.backButton} onPress = {() => router.back()}>
          <MaterialIcons name="keyboard-backspace" size={28} color= {COLORS.primary} />
        </TouchableOpacity> 
        
        <Text style = {styles.headText}>Add Transactions</Text>
        
        <TouchableOpacity style = {styles.saveButton}>
          <MaterialIcons name="check" size={26} color= {COLORS.primary}/>
        </TouchableOpacity> 
      </View>

      {/* input point for title and amount  */}
      <TransactionInput/>
    
    </View>
  )
}

export default Create ;


const styles = StyleSheet.create({
  container: {
    backgroundColor : COLORS.background ,
    flex : 1 ,
    padding : 10 
  },
  headerContainer : {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  backButton : {
    borderRadius : 10, 
    width : "15%",
    alignItems : "center",
  },
  headText : {
    fontFamily : "ui-monospace",
    color : COLORS.text,
    fontSize : 22
  },
  saveButton : {
    borderColor : COLORS.primary,
    borderWidth : 2,
    backgroundColor : COLORS.white,
    padding : 3,
    width : "15%",
    alignItems: 'center',
    borderRadius : 10
  },
  inputContainer : {
    borderColor : "black" ,
    borderWidth : 2,
    marginTop : 20
  }
});

