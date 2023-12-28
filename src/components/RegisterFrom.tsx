import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { COLORS, FONTSIZE } from '../theme/theme'
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../redux/reducer/users/userAsync';
import { RootState, useAppDispatch } from '../redux/store';
import { useNavigation } from '@react-navigation/native';
import { validateAddress, validateDateOfBirth, validateEmail, validatePassword, validatePhoneNumber, validateUsername } from '../utils/validates/validates';

const RegisterFrom = (props : any) => {

  const [fullname, setFullname] = useState('');
  const [email, setEmail] = useState('');
  const [number, setNumber] = useState('');
  const [password, setPassword] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [address, setAddress] = useState('');
  const [profile_pic, setProfile] = useState(null);

  // set state validate error
  const [fullnameError, setFullnameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [numberError, setNumberError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [dateBirthError, setDateBirthError] = useState('');
  const [addressError, setAddressError] = useState('');

  const { data, loading, error } = useSelector(
    (state: RootState) => state.user
  )
  console.log(data)

  const dispatch = useAppDispatch()
  const navigation = useNavigation<any>()

  const RegisterAction = () => {

    // check text input is valid
    const isFullNameValid = validateUsername(fullname);
    const isEmailValid = validateEmail(email);
    const isNumberValid = validatePhoneNumber(number);
    const isPasswordValid = validatePassword(password);
    const isDateOfBirthValid = validateDateOfBirth(dateBirth);
    const isAdressValid = validateAddress(address);

    setFullnameError(isFullNameValid ? '' : 'User name is required !')
    setEmailError(isEmailValid ? '' : 'Invalid email format or empty !');
    setNumberError(isNumberValid ? '' : 'Phone number must have 10 digits !');
    setPasswordError(isPasswordValid ? '' : 'Password must be at least 6 characters !');
    setDateBirthError(isDateOfBirthValid ? '' : 'Date of birth must be in format YYYY-MM-DD !');
    setAddressError(isAdressValid ? '' : 'Adress is required!');
    
    if (!isFullNameValid || !isEmailValid || !isNumberValid || !isPasswordValid || !isDateOfBirthValid || !isAdressValid) {
      return;
    }
    dispatch(registerUser({fullname, email, number, password,dateBirth, address, profile_pic}));
    navigation.goBack()
  }


  return (
    <View style={styles.container}>
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Username *"
        placeholderTextColor={COLORS.WhiteRGBA32}
        value={fullname} 
        onChangeText={(text) => setFullname(text)}
        autoCapitalize='none' 
        autoComplete='username' 
        textContentType='username' 
      />
      {fullnameError ? <Text style={styles.errorText}>{fullnameError}</Text> : null}
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Email *"
        placeholderTextColor={COLORS.WhiteRGBA32}
        value={email} 
        onChangeText={(text) => setEmail(text)}
        autoCapitalize='none' 
        autoComplete='email' 
        textContentType='emailAddress' 
        keyboardType='email-address' 
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Number *"
        placeholderTextColor={COLORS.WhiteRGBA32}
        value={number} 
        onChangeText={(text) => setNumber(text)}
        autoCapitalize='none' 
        autoComplete='cc-number' 
        textContentType='telephoneNumber' 
        keyboardType='number-pad' 
      />
      {numberError ? <Text style={styles.errorText}>{numberError}</Text> : null}
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Password *"
        placeholderTextColor={COLORS.WhiteRGBA32}
        value={password} 
        onChangeText={(text) => setPassword(text)} 
        autoCapitalize='none' 
        secureTextEntry
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Date of birth (YYYY-MM-DD) *"
        placeholderTextColor={COLORS.WhiteRGBA32}
        value={dateBirth} 
        onChangeText={(text) => setDateBirth(text)} 
        autoComplete='birthdate-full' 
      />
      {dateBirthError ? <Text style={styles.errorText}>{dateBirthError}</Text> : null}
      <TextInput 
        style = {styles.textInput}
        returnKeyType="next" 
        placeholder="Address *"
        placeholderTextColor={COLORS.WhiteRGBA32}
        value={address} 
        onChangeText={(text) => setAddress(text)}
        autoComplete='street-address' 
        textContentType='fullStreetAddress' 
      />
      {addressError ? <Text style={styles.errorText}>{addressError}</Text> : null}
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
  },
  errorText: {
    color: COLORS.Orange
  },
});

export default RegisterFrom