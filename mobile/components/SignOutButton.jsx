import { useClerk } from '@clerk/clerk-expo'
import * as Linking from 'expo-linking'
import { Text, TouchableOpacity } from 'react-native'
import { COLORS } from "../constants/colors.js"
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const SignOutButton = () => {
  // Use `useClerk()` to access the `signOut()` function
  const { signOut } = useClerk()
  const handleSignOut = async () => {
    try {
      await signOut()
      // Redirect to your desired page
      Linking.openURL(Linking.createURL('/'))
    } catch (err) {
      // See Clerk docs: custom flows error handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }
  return (
    <TouchableOpacity onPress={handleSignOut} style = {{
      backgroundColor : COLORS.background,
      padding : 7,
      borderRadius : 100,
      borderWidth : 1 , 
      borderColor : COLORS.border,
    }}>
     <MaterialIcons name="logout" size={24} color={COLORS.primary} />
    </TouchableOpacity>
  )
}
