import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TextHeader from '../components/TextHeader'
import { COLORS } from '../theme/theme'
import RegisterFrom from '../components/RegisterFrom'

const RegisterScreen = ({navigation} : any) => {

  const gotoLogin = () => {
    navigation.navigate('Login');
  }

  return (
    <SafeAreaView style={styles.background}>
      <TextHeader header="Create new account" />
      <RegisterFrom rejectLogin={gotoLogin}/>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background:{
    backgroundColor: COLORS.DarkGrey,
    flex: 1
  }
})

export default RegisterScreen