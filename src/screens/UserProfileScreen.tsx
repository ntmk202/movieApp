import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import AppHeader from '../components/AppHeader'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme'
import { useSelector } from 'react-redux'
import { RootState, useAppDispatch } from '../redux/store'
import { updateInforUser } from '../redux/reducer/users/userAsync'
import { CommonActions } from '@react-navigation/native'

const UserProfileScreen = ({ navigation }: any) => {

    const dispatch = useAppDispatch()

    const { dataUser, dataUserUpdate } = useSelector(
        (state: RootState) => state.user
    )
    const currentUser = Array.isArray(dataUser) ? dataUser[0] : dataUser;

    const [fullname, setFullname] = useState(currentUser?.fullname || '');
    const [email, setEmail] = useState(currentUser?.email || '');
    const [number, setNumber] = useState(currentUser?.number || '');
    const [password, setPassword] = useState(currentUser?.password || '');
    const [dateBirth, setDateBirth] = useState(currentUser?.dateBirth || '');
    const [address, setAddress] = useState(currentUser?.address || '');
    const [profile_pic, setProfilePic] = useState(null);

    const handleInputChange = (key: string, value: string) => {
        switch (key) {
          case 'fullname':
            setFullname(value);
            break;
          case 'email':
            setEmail(value);
            break;
          case 'number':
            setNumber(value);
            break;
          case 'password':
            setPassword(value);
            break;
          case 'dateBirth':
            setDateBirth(value);
            break;
          case 'address':
            setAddress(value);
            break;
          default:
            break;
        }
      };

      const updateInforUserAction = async () => {
        try {
            const updateUserData = { fullname, email, number, password, dateBirth, address, profile_pic };
            await dispatch(updateInforUser(updateUserData));
            console.log("Update successfully!")
          } catch (error) {
            console.error(error);
          }     
          navigation.goBack()
      }



    return (
        <View style={styles.container}>
            <StatusBar hidden />
            <View style={styles.appHeaderContainer}>
                <AppHeader
                    name={require('~/assets/icons/left-arrow.png')}
                    header={'Edit Profile'}
                    action={() => navigation.goBack()}
                />
            </View>

            <View style={styles.profileContainer}>
                <Image
                    source={require('~/assets/image/account.png')}
                    style={styles.avatarImage}
                />
                <Text style={styles.avatarText}>{currentUser?.fullname}</Text>
            </View>

            <View style={{ alignItems: 'center' }}>
                <TextInput
                    style={styles.textInput}
                    returnKeyType="next"
                    // placeholder="Username *"
                    placeholderTextColor={COLORS.WhiteRGBA32}
                    value={fullname}
                    autoCapitalize='none'
                    autoComplete='username'
                    textContentType='username'
                    onChangeText={(text) => handleInputChange('fullname', text)}
                />
                <TextInput
                    style={styles.textInput}
                    returnKeyType="next"
                    // placeholder="Email *"
                    placeholderTextColor={COLORS.WhiteRGBA32}
                    value={email}
                    autoCapitalize='none'
                    autoComplete='email'
                    textContentType='emailAddress'
                    keyboardType='email-address'
                    onChangeText={(text) => handleInputChange('email', text)}
                />
                <TextInput
                    style={styles.textInput}
                    returnKeyType="next"
                    // placeholder="Number *"
                    placeholderTextColor={COLORS.WhiteRGBA32}
                    value={number}
                    autoCapitalize='none'
                    autoComplete='cc-number'
                    textContentType='telephoneNumber'
                    keyboardType='number-pad'
                    onChangeText={(text) => handleInputChange('number', text)}
                />
                <TextInput
                    style={styles.textInput}
                    returnKeyType="next"
                    // placeholder="Password *"
                    placeholderTextColor={COLORS.WhiteRGBA32}
                    value={password}
                    autoCapitalize='none'
                    secureTextEntry
                    editable = {false}
                    selectTextOnFocus={false}
                    onChangeText={(text) => handleInputChange('password', text)}
                />
                <TextInput
                    style={styles.textInput}
                    returnKeyType="next"
                    // placeholder="Date of birth (YYYY-MM-DD) *"
                    placeholderTextColor={COLORS.WhiteRGBA32}
                    value={dateBirth}
                    autoComplete='birthdate-full'
                    onChangeText={(text) => handleInputChange('dateBirth', text)}
                />
                <TextInput
                    style={styles.textInput}
                    returnKeyType="done"
                    // placeholder="Address *"
                    placeholderTextColor={COLORS.WhiteRGBA32}
                    value={address}
                    autoComplete='street-address'
                    textContentType='fullStreetAddress'
                    onChangeText={(text) => handleInputChange('address', text)}
                />
                {/* <Button title='Login now' color={COLORS.Orange} onPress={LoginAction}/> */}
                <TouchableOpacity style={styles.btn} onPress={updateInforUserAction}>
                    <Text style={{ color: COLORS.White, fontSize: FONTSIZE.size_18, fontWeight: '600' }}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

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
    }
});

export default UserProfileScreen