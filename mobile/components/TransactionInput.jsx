import { View, TextInput, Text , StyleSheet} from 'react-native'
import { COLORS } from '../constants/colors.js' 


export default function TransactionInput() {
  return (
  <View style = {styles.container}>
      <View>
        <Text>Transaction Title </Text>
      </View>
  </View>
  );

}


const styles = StyleSheet.create({
  container : {
    borderWidth : 2 ,
    borderColor : "black" ,
    marginTop : 20,
    padding : 5 
  }
})
