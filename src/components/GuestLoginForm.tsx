import { View, Text, StyleSheet, TextInput, Button, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';

const GuestLoginForm = (props: any) => {

  return (
    <View style={styles.container}>
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Fullname"
        placeholderTextColor={COLORS.WhiteRGBA32}
        onChangeText={props.onChangeTextFullname}
        // value = {props.fullname}
        autoComplete='name-given' 
        textContentType='givenName' 
        keyboardType='default' 
      />
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Email"
        placeholderTextColor={COLORS.WhiteRGBA32}
        onChangeText={props.onChangeTextEmail}
        // value={props.email}
        autoCapitalize='none' 
        autoComplete='email' 
        textContentType='emailAddress' 
        keyboardType='email-address' 
      />
      <TextInput 
        style = {styles.textInput}
        returnKeyType="done" 
        placeholder="Number"
        placeholderTextColor={COLORS.WhiteRGBA32}
        onChangeText={props.onChangeTextNumber}
        // value={props.number}
        autoCapitalize='none' 
        autoComplete='cc-number' 
        textContentType='telephoneNumber' 
        keyboardType='number-pad' 
      />
      {/* <Button title='Login now' color={COLORS.Orange} onPress={LoginAction}/> */}
      <TouchableOpacity style={styles.btn} onPress={props.onPress} >
        <Text style={{color: COLORS.White, fontSize: FONTSIZE.size_18, fontWeight: '600' }}>Continue</Text>
      </TouchableOpacity>
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

export default GuestLoginForm