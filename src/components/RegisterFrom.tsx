import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE } from '../theme/theme'

const RegisterFrom = (props : any) => {

  const RegisterAction = () => {
    // navigation.navigate('Register');
    console.log(3)
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Username *"
        placeholderTextColor={COLORS.WhiteRGBA32}
        // value='Email' 
        autoCapitalize='none' 
        autoComplete='username' 
        textContentType='username' 
      />
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Email *"
        placeholderTextColor={COLORS.WhiteRGBA32}
        // value='Email' 
        autoCapitalize='none' 
        autoComplete='email' 
        textContentType='emailAddress' 
        keyboardType='email-address' 
      />
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Number *"
        placeholderTextColor={COLORS.WhiteRGBA32}
        // value='Email' 
        autoCapitalize='none' 
        autoComplete='cc-number' 
        textContentType='telephoneNumber' 
        keyboardType='number-pad' 
      />
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Password *"
        placeholderTextColor={COLORS.WhiteRGBA32}
        // value='Email' 
        autoCapitalize='none' 
        secureTextEntry
      />
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Date of birth (YYYY-MM-DD) *"
        placeholderTextColor={COLORS.WhiteRGBA32}
        // value='Email' 
        autoComplete='birthdate-full' 
      />
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Address *"
        placeholderTextColor={COLORS.WhiteRGBA32}
        // value='Email' 
        autoComplete='street-address' 
        textContentType='fullStreetAddress' 
      />
      {/* <Button title='Login now' color={COLORS.Orange} onPress={LoginAction}/> */}
      <TouchableOpacity style={styles.btn} onPress={RegisterAction} >
        <Text style={{color: COLORS.White, fontSize: FONTSIZE.size_18, fontWeight: '600' }}>Sign Up</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Text style={{color: COLORS.WhiteRGBA50, marginEnd: 5}}>Already have account?</Text>
        <TouchableOpacity onPress={props.rejectLogin}> 
          <Text style={{color: COLORS.Orange}}>Login now</Text> 
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: .8
  },
  textInput: {
    width: '80%',
    fontSize: FONTSIZE.size_16,
    color: COLORS.White,
    padding: 10,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: COLORS.Orange,
    borderWidth: 1
  },
  btn:{
    backgroundColor: COLORS.Orange,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: {width: -2, height: 2},
    shadowOpacity: 0.9,
    elevation: 10,
    shadowRadius: 10,
    shadowColor: "#000",
    marginVertical: 10
  }
});

export default RegisterFrom