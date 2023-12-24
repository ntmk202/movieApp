import { View, Text, StatusBar, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import React from 'react'
import AppHeader from '../components/AppHeader'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme'

const UserProfileScreen = ({ navigation }: any) => {
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
                    source={require('~/assets/image/avatar.png')}
                    style={styles.avatarImage}
                />
                <Text style={styles.avatarText}>John Doe</Text>
            </View>

            <View style={{alignItems:'center'}}>
                <TextInput
                    style={styles.textInput}
                    returnKeyType="next"
                    // placeholder="Username *"
                    placeholderTextColor={COLORS.WhiteRGBA32}
                    value='John Doe' 
                    autoCapitalize='none'
                    autoComplete='username'
                    textContentType='username'
                />
                <TextInput
                    style={styles.textInput}
                    returnKeyType="next"
                    // placeholder="Email *"
                    placeholderTextColor={COLORS.WhiteRGBA32}
                    value='JohnDoe@gmail.com' 
                    autoCapitalize='none'
                    autoComplete='email'
                    textContentType='emailAddress'
                    keyboardType='email-address'
                />
                <TextInput
                    style={styles.textInput}
                    returnKeyType="next"
                    // placeholder="Number *"
                    placeholderTextColor={COLORS.WhiteRGBA32}
                    value='2543213' 
                    autoCapitalize='none'
                    autoComplete='cc-number'
                    textContentType='telephoneNumber'
                    keyboardType='number-pad'
                />
                <TextInput
                    style={styles.textInput}
                    returnKeyType="next"
                    // placeholder="Password *"
                    placeholderTextColor={COLORS.WhiteRGBA32}
                    value='52535353' 
                    autoCapitalize='none'
                    secureTextEntry
                />
                <TextInput
                    style={styles.textInput}
                    returnKeyType="next"
                    // placeholder="Date of birth (YYYY-MM-DD) *"
                    placeholderTextColor={COLORS.WhiteRGBA32}
                    value='1992-03-12' 
                    autoComplete='birthdate-full'
                />
                <TextInput
                    style={styles.textInput}
                    returnKeyType="done"
                    // placeholder="Address *"
                    placeholderTextColor={COLORS.WhiteRGBA32}
                    value='Vietnam' 
                    autoComplete='street-address'
                    textContentType='fullStreetAddress'
                />
                {/* <Button title='Login now' color={COLORS.Orange} onPress={LoginAction}/> */}
                <TouchableOpacity style={styles.btn}  >
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