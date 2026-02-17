import { useSafeAreaInsets } from 'react-native-safe-area-context' ; 
import { COLORS } from "../constants/colors.js" ;  
import { View } from "react-native" ; 

export default function SafeScreen({children}) {
  const insets = useSafeAreaInsets() ; 
  return(
  <View style ={{
      paddingTop : insets.top ,
      paddingBottom : insets.bottom ,
      flex : 1 ,
      backgroundColor : COLORS.background 
    }}>
      {children}
  </View>
  ) ; 
}
