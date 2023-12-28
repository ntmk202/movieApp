import React, { useEffect } from 'react';
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import TicketScreen from '../screens/TicketScreen';
import UserAccountScreen from '../screens/UserAccountScreen';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
// import CustomIcon from '../components/CustomIcon';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CustomIcon from '../components/CustomIcon';
import ChatbotScreen from '../screens/ChatbotScreen';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import RequireLoginScreen from '../screens/RequireLoginScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setToken } from '../redux/reducer/users/userSlice';

const Tab = createBottomTabNavigator();

const CustomTabBtn = ({ children, onPress }: any) => (
  <TouchableOpacity style={styles.customTab} onPress={onPress}>
    <View style={{ width: 60, height: 60, borderRadius: 35, backgroundColor: COLORS.Orange }}>
      {children}
    </View>
  </TouchableOpacity>
)

const TabNavigator = () => {

  const dispatch = useDispatch()
  const { auth } = useSelector(
    (state: RootState) => state.user
  )

  const ProfileTabComponent = auth ? UserAccountScreen : RequireLoginScreen;
  const ChatBotTabComponent = auth ? ChatbotScreen : RequireLoginScreen;

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.Black,
          borderTopWidth: 0,
          borderTopEndRadius: 50,
          borderTopStartRadius: 50,
          height: SPACING.space_10 * 8,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: COLORS.Orange } : {},
                ]}>
                <CustomIcon name={require('~/assets/icons/home.png')} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: COLORS.Orange } : {},
                ]}>
                <CustomIcon name={require('~/assets/icons/search.png')} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen name='Chatbot' component={ChatBotTabComponent}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <Image source={require('~/assets/icons/movie-reel.png')} style={[focused ? { tintColor: COLORS.Yellow } : {}]} />
            );
          },
          tabBarButton: (props) => (
            <CustomTabBtn {...props} />
          )
        }}
      />
      <Tab.Screen
        name="Ticket"
        component={TicketScreen}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: COLORS.Orange } : {},
                ]}>
                <CustomIcon name={require('~/assets/icons/ticket.png')} />
              </View>
            );
          },
        }}
      />
      <Tab.Screen
        name="User"
        component={ProfileTabComponent}
        options={{
          tabBarShowLabel: false,
          tabBarIcon: ({ focused }) => {
            return (
              <View
                style={[
                  styles.activeTabBackground,
                  focused ? { backgroundColor: COLORS.Orange } : {},
                ]}>
                <CustomIcon name={require('~/assets/icons/user.png')} />
              </View>
            );
          },
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  activeTabBackground: {
    backgroundColor: COLORS.Black,
    padding: SPACING.space_15,
    borderRadius: SPACING.space_18 * 10,
  },
  customTab: {
    top: -20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowOffset: { width: 5, height: 5 },
    shadowOpacity: 0.26,
    shadowRadius: 7,
    elevation: 5,
  }
});

export default TabNavigator;
