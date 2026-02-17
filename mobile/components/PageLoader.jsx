import { StyleSheet, View , ActivityIndicator } from "react-native" ; 
import { COLORS } from "../constants/colors.js" ;  

export default function PageLoader() {
  return (
  <View style = {styles.loadingContainer}>
      <ActivityIndicator size = "large" color = {COLORS.primary}/>
  </View>
  ) 
}


const styles = StyleSheet.create({
  loadingContainer: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  }
});

