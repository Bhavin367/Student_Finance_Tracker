import { StyleSheet } from "react-native" ; 
import { COLORS } from "../../constants/colors.js" ; 

const authStyles = StyleSheet.create({
  container: {
    flex : 1 , 
    backgroundColor : COLORS.background,
    padding : 30,
    margin : 30,
    justifyContent : "center" ,
    alignItems: 'center',
    gap : 30
  },
  headText : {
    fontFamily : "ui-monospace",
    fontSize : 35,
    fontColor : COLORS.primary,
    fontWeight : "bold" 
  },
  subText : {
    fontFamily : "ui-monospace" ,
    fontColor : COLORS.text,
    fontWeight : "100"
  },
  normalText : {
    fontFamily : "ui-monospace",
    textAlign : "left",
    fontSize : 15
  },
  inputPart : {
    borderWidth : 2 ,
    borderColor : COLORS.primary,
    padding : 15,
  },
  textAndInput : {
    gap : 10 ,
    width : "100%"
  },
  loginButton : {
    borderWidth : 2 ,
    borderColor : COLORS.border,
    padding : 15, 
    backgroundColor : COLORS.primary,
    width : "100%",
    marginTop : 20,
    borderRadius : 10 
  },
  loginText : {
    color : COLORS.white,
    fontFamily : "ui-monospace",
    fontSize : 15 ,
    fontWeight : "bold",
    textAlign : "center"
  }, 

});


export default authStyles ; 
