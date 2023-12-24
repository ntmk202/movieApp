import { View, Text, StyleSheet } from 'react-native'
import {COLORS, SPACING} from '../theme/theme';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import TextHeader from '../components/TextHeader';
import LoginForm from '../components/LoginForm';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GuestLoginForm from '../components/GuestLoginForm';
import AppHeader from '../components/AppHeader';

const TopTab = createMaterialTopTabNavigator();

const MemberLogin = ({navigation}: any) => {
  const gotoRegisttration = () => {
    navigation.navigate('Register');
  }
  return(
  <View style={[styles.background,{paddingTop: 30}]}>
    <LoginForm rejectRegister={gotoRegisttration}/>
  </View>
)}

const GuestLogin = ({navigation}:any) => {
  const gotoSeatBooking = () => {
    navigation.navigate('SeatBooking');
  }
  return(
  <View style={[styles.background,{paddingTop: 30}]}>
    <GuestLoginForm action={gotoSeatBooking}/>
  </View>
)}

const LoginScreen  = ({navigation}:any) => {
  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.appHeaderContainer}>
        <AppHeader
          name={require('~/assets/icons/close.png')}
          header={'Sign In'}
          action={() => navigation.goBack()}
        />
      </View>
      <TopTab.Navigator screenOptions={{
        tabBarStyle:{backgroundColor: COLORS.DarkGrey},
        tabBarLabelStyle:{color: COLORS.White},
        tabBarIndicatorStyle: {backgroundColor: COLORS.Orange}
      }}>
        <TopTab.Screen name="Menber" component={MemberLogin} />
        <TopTab.Screen name="Guest" component={GuestLogin} />
      </TopTab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background:{
    backgroundColor: COLORS.DarkGrey,
    flex: 1,
    paddingHorizontal: 10
  },
  appHeaderContainer: {
    flex: .2,
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
})

export default LoginScreen