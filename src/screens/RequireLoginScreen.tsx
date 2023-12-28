import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextHeader from '../components/TextHeader'
import { COLORS } from '../theme/theme'
import RegisterFrom from '../components/RegisterFrom'
import LoginForm from '../components/LoginForm'

const RequireLoginScreen = ({navigation} : any) => {

  const gotoSignUp = () => {
    navigation.navigate('Register');
  }

  return (
    <SafeAreaView style={styles.background}>
      <TextHeader header="Login Required" />
      <LoginForm rejectRegister={gotoSignUp}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background:{
    backgroundColor: COLORS.DarkGrey,
    flex: 1
  }
})

export default RequireLoginScreen