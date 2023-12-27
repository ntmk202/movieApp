import { View, Text, StyleSheet, ToastAndroid } from 'react-native'
import { COLORS, SPACING } from '../theme/theme';
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import TextHeader from '../components/TextHeader';
import LoginForm from '../components/LoginForm';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import GuestLoginForm from '../components/GuestLoginForm';
import AppHeader from '../components/AppHeader';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';

const TopTab = createMaterialTopTabNavigator();

const MemberLogin = ({ navigation }: any) => {
  const gotoRegisttration = () => {
    navigation.navigate('Register');
  }
  return (
    <View style={[styles.background, { paddingTop: 30 }]}>
      <LoginForm rejectRegister={gotoRegisttration} />
    </View>
  )
}

const GuestLogin = ({ navigation, route }: any) => {
  const { getIdMovie, loading, isSuccess, error } = useSelector(
    (state: RootState) => state.movies
  )
  const [guestEmail, setGuestEmail] = React.useState('');
  const [guestFullname, setGuestFullname] = React.useState('');
  const [guestNumber, setGuestNumber] = React.useState('');

  const gotoSeatBooking = () => {
    if(
      guestEmail.length !== 0 &&
      guestFullname.length !== 0 &&
      guestNumber.length !== 0
    ){
      navigation.push('SeatBooking', {
        guestName: guestFullname,
        email: guestEmail,
        phoneNumber: guestNumber,
        imageTicket: getIdMovie?.posterImage,
        idMovie: getIdMovie?.id
      });
    } else {
      ToastAndroid.showWithGravity(
        'Please fill Information of Fullname, Email and Number',
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM,
      );
    }
  }
  return (
    <View style={[styles.background, { paddingTop: 30 }]}>
      <GuestLoginForm
        onChangeTextEmail={(guestEmail: string) => setGuestEmail(guestEmail)}
        onChangeTextFullname={(guestFullname: string) => setGuestFullname(guestFullname)}
        onChangeTextNumber={(guestNumber: string) => setGuestNumber(guestNumber)}
        onPress={gotoSeatBooking} />
    </View>
  )
}

const LoginScreen = ({ navigation, route }: any) => {
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
        tabBarStyle: { backgroundColor: COLORS.DarkGrey },
        tabBarLabelStyle: { color: COLORS.White },
        tabBarIndicatorStyle: { backgroundColor: COLORS.Orange }
      }}>
        <TopTab.Screen name="Menber" component={MemberLogin} />
        <TopTab.Screen name="Guest" component={GuestLogin} />
      </TopTab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
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