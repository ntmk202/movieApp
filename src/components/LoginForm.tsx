import { View, Text, StyleSheet, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, { useState } from 'react'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import { RootState, useAppDispatch } from '../redux/store';
import { loginUser } from '../redux/reducer/users/userAsync';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { validateEmail, validatePassword } from '../utils/validates/validates';

const LoginForm = (props: any) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const { auth, token } = useSelector((state: RootState) => state.user)

  const dispatch = useAppDispatch()
  const navigation = useNavigation<any>()

  const LoginAction = async () => {

    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);

    setEmailError(isEmailValid ? '' : 'Invalid email format or empty !');
    setPasswordError(isPasswordValid ? '' : 'Password must be at least 6 characters !');
    if (!isEmailValid || !isPasswordValid) {
      return;
    }
    setTimeout(() => {
      dispatch(loginUser({ email, password }));
      ToastAndroid.showWithGravity(
        'Login Success',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
      navigation.goBack()
    }, 5000);
  }

  return (

    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        returnKeyType="next"
        placeholder="Email"
        placeholderTextColor={COLORS.WhiteRGBA32}
        value={email}
        onChangeText={(text) => setEmail(text)}
        autoCapitalize='none'
        autoComplete='email'
        textContentType='emailAddress'
        keyboardType='email-address'
        onBlur={() => validateEmail(email)}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.textInput}
        returnKeyType="done"
        placeholder="Password"
        placeholderTextColor={COLORS.WhiteRGBA32}
        value={password}
        onChangeText={(text) => setPassword(text)}
        autoCapitalize='none'
        secureTextEntry
        onBlur={() => validatePassword(password)}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <TouchableOpacity style={styles.btn} onPress={LoginAction} >
        <Text style={{ color: COLORS.White, fontSize: FONTSIZE.size_18, fontWeight: '600' }}>Sign In</Text>
      </TouchableOpacity>
      <View style={{ flexDirection: 'row', marginTop: 10 }}>
        <Text style={{ color: COLORS.WhiteRGBA50, marginEnd: 5 }}>Don't have Account?</Text>
        <TouchableOpacity onPress={props.rejectRegister}>
          <Text style={{ color: COLORS.Orange }}>Sign up here</Text>
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
  btn: {
    backgroundColor: COLORS.Orange,
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    shadowOffset: { width: -2, height: 2 },
    shadowOpacity: 0.9,
    elevation: 10,
    shadowRadius: 10,
    shadowColor: "#000",
    marginVertical: 10
  },
  errorText: {
    color: COLORS.Orange,
    marginTop: 2,
    marginBottom: 2
  },
});

export default LoginForm