import { Redirect } from "expo-router" ; 
import { ActivityIndicator }  from "react-native" ; 
import { useAuth } from '@clerk/clerk-expo' ; 
import { COLORS } from "../../constants/colors.js";

export default function Loader() {
  const { isLoaded, isSignedIn } = useAuth() ;

  if (!isLoaded) {
    return <ActivityIndicator size = "large" color = {COLORS.primary} />
  } ; 

  if (isSignedIn) return <Redirect href = {"/"}/> 

  return <Redirect href = {"/sign-in"}/>
}
