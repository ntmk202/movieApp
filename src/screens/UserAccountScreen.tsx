import * as React from 'react';
import { Text, View, StyleSheet, StatusBar, Image, ScrollView, TouchableOpacity } from 'react-native';
import { COLORS, FONTSIZE, SPACING } from '../theme/theme';
import AppHeader from '../components/AppHeader';
import SettingComponent from '../components/SettingComponent';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { setToken } from '../redux/reducer/users/userSlice'; // Import the setToken action
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { CommonActions } from '@react-navigation/native'; // Import CommonActions
import { logOutUser } from '../redux/reducer/users/userAsync';
import { useAppDispatch } from '../redux/store';

// import close from '~/assets/icons/close.png'

const UserAccountScreen = ({ navigation }: any) => {

  const dispatch = useAppDispatch()

  const logOut = async () => {
    dispatch(logOutUser())
    navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [
              { name: 'Tab' }, 
            ],
          })
        );
  };

  

  return (
    <LinearGradient style={{ flex: 1 }} colors={[COLORS.Black, COLORS.DarkGrey, COLORS.DarkGrey]}>
      <View style={styles.container}>
        <StatusBar hidden />
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name={require('~/assets/icons/close.png')}
            header={'My Profile'}
            action={() => navigation.goBack()}
          />
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.profileContainer}>
            <Image
              source={require('~/assets/image/avatar.png')}
              style={styles.avatarImage}
            />
            <Text style={styles.avatarText}>John Doe</Text>
          </View>

          <View style={styles.profileContainer}>
            <SettingComponent
              icon={require('~/assets/icons/user.png')}
              heading="Account"
              subheading="Edit Profile"
              subtitle="Change Password"
              onPress={() => navigation.navigate('UserProfile')}
            />
            <SettingComponent
              icon={require('~/assets/icons/setting.png')}
              heading="Settings"
              subheading="Theme"
              subtitle="Permissions"
            />
            <SettingComponent
              icon={require('~/assets/icons/dollar.png')}
              heading="Offers & Refferrals"
              subheading="Offer"
              subtitle="Refferrals"
            />
            <SettingComponent
              icon={require('~/assets/icons/info.png')}
              heading="About"
              subheading="About Movies"
              subtitle="more"
            />
          </View>
          <TouchableOpacity style={styles.btn} onPress={logOut}>
            <Text style={{ color: COLORS.White, fontSize: FONTSIZE.size_18, fontWeight: '600' }}>Log out</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    // backgroundColor: COLORS.Black,
  },
  appHeaderContainer: {
    marginHorizontal: SPACING.space_36,
    marginTop: SPACING.space_20 * 2,
  },
  profileContainer: {
    alignItems: 'center',
    padding: SPACING.space_36,
  },
  avatarImage: {
    height: 80,
    width: 80,
    borderRadius: 80,
  },
  avatarText: {
    // fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.size_16,
    marginTop: SPACING.space_16,
    color: COLORS.White,
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
    marginVertical: 20,
  }
});

export default UserAccountScreen;
