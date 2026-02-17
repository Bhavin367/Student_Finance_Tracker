import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import { COLORS } from "../constants/colors.js"
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from "expo-router" 

const AddButton = () =>{
  const router = useRouter() ; 
  return (
    <TouchableOpacity style = {styles.container} 
    onPress = {() => router.push('/create')}>
      <Text style = {styles.text}>Add</Text>
      <Ionicons name="add-circle-outline" size={26} color= {COLORS.white} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor : COLORS.border,
    borderWidth : 1,
    backgroundColor : COLORS.primary,
    borderRadius : 15
  },
  text : {
    fontFamily : "ui-monospace",
    color : COLORS.white,
    fontSize : 15,
    padding : 10,
    fontWeight : 400
  }
});


export default AddButton;
