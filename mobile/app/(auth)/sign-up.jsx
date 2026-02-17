import * as React from 'react'
import { Alert , Text, TextInput, TouchableOpacity, View } from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter , Redirect } from 'expo-router'
import Loader from "./loader.jsx"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import getAuthErrorMessage from "../../utils/getAuthErrorMessage.js"
import styles from "../../assets/styles/authStyles.jsx" 
import { COLORS } from "../../constants/colors.js"

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  // Handle submission of sign-up form
  const onSignUpPress = async () => {
    if (!isLoaded) return <Redirect href = {"/loader"}/>;

    // Start sign-up process using email and password provided
    try {
      await signUp.create({
        emailAddress,
        password,
      })

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      // Set 'pendingVerification' to true to display second form
      // and capture OTP code
      setPendingVerification(true)
    } catch (error) {
      // See Clerk docs: custom flows error handling
      // for more info on error handling
      console.log(error);
      Alert.alert(
        'Warning',
        getAuthErrorMessage(error),[
          {text : 'Ok'}
        ],
        {cancelable:false},
      ); 
    }
  }

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!isLoaded) return 

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      })

      // If verification was completed, set the session to active
      // and redirect the user
      if (signUpAttempt.status === 'complete') {
        await setActive({ session: signUpAttempt.createdSessionId })
        router.replace('/')
      } else {
        // If the status is not complete, check why. User may need to
        // complete further steps.
        console.error(JSON.stringify(signUpAttempt, null, 2))
      }
    } catch (err) {
      // See Clerk docs: custom flows error handling
      // for more info on error handling
      console.log(err)
    }
  }

  if (pendingVerification) {
    return (
     <KeyboardAwareScrollView 
      contentContainerStyle = {{flexGrow : 1 , backgroundColor : COLORS.background}}>   
        <View style = {styles.container}>
        <Text  style = {styles.headText}>Verify your email</Text>
        
        <View style = {styles.textAndInput}>
        <Text style = {styles.normalText}>Verification code</Text>
        <TextInput
          value={code}
          style = {styles.inputPart} 
          placeholder="93844"
          placeholderTextColor = {COLORS.textLight}
          onChangeText={(code) => setCode(code)}
        />
        </View>
        <TouchableOpacity style = {styles.loginButton} onPress={onVerifyPress}>
          <Text style = {styles.loginText}>Verify</Text>
        </TouchableOpacity>
        </View>  
    </KeyboardAwareScrollView> 
    )
  }

  return (
    <KeyboardAwareScrollView
      contentContainerStyle = {{flexGrow : 1 , backgroundColor : COLORS.background}}
      enableOnAndroid = {true}
      enableAutomaticScroll = {true} 
    >
    <View style = {styles.container}>
        <View>
        <Text style = {styles.headText}>Lets Get Started ...</Text>
        <Text style = {styles.subText}>Manage your finances like a pro</Text> 
        </View>
        <View style = {styles.textAndInput}>
        <Text style = {styles.normalText}>Email</Text>
        <TextInput
          style = {styles.inputPart} 
          autoCapitalize="none"
          value={emailAddress}
          placeholder="example@email.com"
          placeholderTextColor = {COLORS.textLight}
          onChangeText={(email) => setEmailAddress(email)}
        />
        </View> 
        <View style = {styles.textAndInput}>
        <Text style = {styles.normalText}>Password</Text> 
        <TextInput
          style = {styles.inputPart} 
          value={password}
          placeholder="12338493"
          placeholderTextColor = {COLORS.textLight}          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        </View> 
        <TouchableOpacity style = {styles.loginButton} onPress={onSignUpPress}>
          <Text style = {styles.loginText}>Continue</Text>
        </TouchableOpacity>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 3 }}>
          <Text style = {styles.subText}>Already have an account?</Text>
          <Link href="/sign-in">
            <Text>Sign in</Text>
          </Link>
        </View>
    </View>
    </KeyboardAwareScrollView>
  )
}
