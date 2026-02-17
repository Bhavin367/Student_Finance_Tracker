import { useSignIn } from '@clerk/clerk-expo'
import { Redirect, Link, useRouter } from 'expo-router'
import { Alert, Text, TextInput, TouchableOpacity, View, StyleSheet} from 'react-native'
import React from 'react'
import { COLORS } from "../../constants/colors.js"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import getAuthErrorMessage from "../../utils/getAuthErrorMessage.js"
import styles from "../../assets/styles/authStyles.jsx" 

export default function Page() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')





  // Handle the submission of the sign-in form
  const onSignInPress = async () => {
    if (!isLoaded) return <Redirect href = {"/loader"}/>

    // Start the sign-in process using the email and password provided
    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      // If sign-in process is complete, set the created session as active
      // and redirect the user
      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status isn't complete, check why. User might need to
        // complete further steps.
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (error) {
      // See Clerk docs: custom flows error handling
      // for more info on error handling
      Alert.alert(
        'Warning',
        getAuthErrorMessage(error),[
          {text : 'Ok'}
        ],
        {cancelable:false},
      ); 
      console.log(error) ;
      console.log(error.code);
      console.log(error.message) ;
    }
  }

  return (
    <KeyboardAwareScrollView 
      contentContainerStyle = {{flexGrow : 1 , backgroundColor : COLORS.background}}
      enableOnAndroid = {true}
      enableAutomaticScroll = {true} 
    >
      <View style = {styles.container}>
        <View style = {{gap : 10}}>
        <Text style = {styles.headText}>Welcome back!</Text>
        <Text style = {styles.subText}> Manage your finances like a pro ! </Text>
        </View>
        <View style = {styles.textAndInput}>
        <Text style = {styles.normalText}>Email</Text>
        <TextInput
          style = {styles.inputPart}
          value={emailAddress}
          placeholder="example@email.com"
          placeholderTextColor =  {COLORS.textLight}
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        </View>
        
        <View  style = {styles.textAndInput}>
        <Text style = {styles.normalText}>Password</Text>
        <TextInput
          style = {styles.inputPart} 
          value={password}
          placeholder="1234455"
          placeholderTextColor =  {COLORS.textLight}
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        </View>
        <TouchableOpacity  style = {styles.loginButton} onPress={onSignInPress}>
          <Text style = {styles.loginText}>Log into Your Account</Text>
        </TouchableOpacity>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
          <Text style = {styles.subText}>Not registered yet? </Text>
          <Link href="/sign-up" >
            <Text >Sign up</Text>
          </Link>
        </View>
      </View>

    </KeyboardAwareScrollView>
  )
}

