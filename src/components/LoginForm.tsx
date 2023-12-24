import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';

const LoginForm = (props: any) => {

  const LoginAction = () => {
    // navigation.navigate('Register');
    console.log(3)
  }

  return (
    <View style={styles.container}>
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Email"
        placeholderTextColor={COLORS.WhiteRGBA32}
        // value='Email' 
        autoCapitalize='none' 
        autoComplete='email' 
        textContentType='emailAddress' 
        keyboardType='email-address' 
      />
      <TextInput 
        style = {styles.textInput}
        returnKeyType="done" 
        placeholder="Password"
        placeholderTextColor={COLORS.WhiteRGBA32}
        // value='Email' 
        autoCapitalize='none' 
        secureTextEntry
      />
      <TouchableOpacity style={styles.btn} onPress={props.LoginAction} >
        <Text style={{color: COLORS.White, fontSize: FONTSIZE.size_18, fontWeight: '600' }}>Sign In</Text>
      </TouchableOpacity>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Text style={{color: COLORS.WhiteRGBA50, marginEnd: 5}}>Don't have Account?</Text>
        <TouchableOpacity onPress={props.rejectRegister}> 
          <Text style={{color: COLORS.Orange}}>Sign up here</Text> 
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: .8,
    paddingTop: SPACING.space_20 * 2
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

export default LoginForm