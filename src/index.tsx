import React, { useState, useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './navigators/TabNavigator';
import MovieDetailsScreen from './screens/MovieDetailsScreen';
import SeatBookingScreen from './screens/SeatBookingScreen';
import Splash from './components/Splash';
import { fontAssets } from './theme/fonts';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import { COLORS } from './theme/theme';
import UserProfileScreen from './screens/UserProfileScreen';
import TicketDetailScreen from './screens/TicketDetailScreen';
import PaymentScreen from './screens/PaymentScreen';
import RequireLoginScreen from './screens/RequireLoginScreen';

SplashScreen.preventAutoHideAsync();

const Stack = createNativeStackNavigator();

const Index = () => {
  const [appIsReady, setAppIsReady] = useState(false);

  const handleLoadAssets = async () => {
    try {
      // await Promise.all([...imageAssets, ...fontAssets])
      await Promise.all([...fontAssets]);
    } catch (e) {
      console.warn(e);
    } finally {
      setAppIsReady(true);
      await SplashScreen.hideAsync();
    }
  };

  useEffect(() => {
    handleLoadAssets();
  }, []);

  if (!appIsReady) return <Splash />;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false, contentStyle: { backgroundColor: COLORS.DarkGrey } }}>
        <Stack.Screen
          name="Tab"
          component={TabNavigator}
          options={{ animation: 'default' }}
        />
        <Stack.Screen
          name="MovieDetails"
          component={MovieDetailsScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="TicketDetails"
          component={TicketDetailScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="SeatBooking"
          component={SeatBookingScreen}
          options={{ animation: 'slide_from_bottom' }}
        />
        <Stack.Screen
          name="PaymentDetail"
          component={PaymentScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="UserProfile"
          component={UserProfileScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ animation: 'slide_from_right' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ animation: 'slide_from_left' }}
        />
        <Stack.Screen
          name="LoginRequired"
          component={RequireLoginScreen}
          options={{ animation: 'slide_from_left' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Index;

