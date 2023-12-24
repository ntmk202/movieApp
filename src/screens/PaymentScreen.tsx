import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppHeader from '../components/AppHeader'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme'
import { LinearGradient } from 'expo-linear-gradient'

const PaymentScreen = ({ navigation }: any) => {

  const [radio, setRadio] = useState(true)
  const handleRadioPress = () => {
    setRadio(!radio); // Toggle the state of the radio button
  };

  return (
    // <SafeAreaView>
      <LinearGradient style={{ flex: 1 }} colors={[COLORS.DarkGrey, COLORS.Orange, COLORS.DarkGrey]}>
        <View style={styles.appHeaderContainer}>
          <AppHeader
            name={require('~/assets/icons/left-arrow.png')}
            header={'Payment Details'}
            action={() => navigation.goBack()}
          />
        </View>
        <View style={styles.container}>
          <View style={styles.row}>
            <Text style={styles.title}>Movie title: </Text>
            <Text style={styles.title}>Killers of the Flower Moon</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>show times: </Text>
            <Text style={styles.title}>19:30pm - 21:30pm</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>theater: </Text>
            <Text style={styles.title}>Star Cinema</Text>
          </View>

          <View style={styles.devide} />
          <View style={styles.row}>
            <Text style={styles.title}>Customer's name: </Text>
            <Text style={styles.title}>Chalee</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Quanity of tickets: </Text>
            <Text style={styles.title}>Seat: f2</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>fees: </Text>
            <Text style={[styles.title,{color: COLORS.Yellow, fontWeight:'600'}]}>$8.00</Text>
          </View>

          <View style={styles.devide} />
          <View style={styles.row}>
            <Text style={styles.title}>Voucher: </Text>
            <Text style={styles.title}>ddsfhfuhukfhnjkb</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.title}>Total: </Text>
            <Text style={[styles.title,{color: 'lightgreen', fontWeight:'600'}]}>$8.00</Text>
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Payment Methods</Text>
          <TouchableOpacity style={[styles.row,{justifyContent: 'flex-start'}]} onPress={handleRadioPress}>
            <View style={styles.radioOuter}>
              {radio && <View style={styles.radioInner} />}
            </View>
            <View style={[styles.row,{justifyContent: 'flex-start', alignItems:'center'}]}>
              <Image source={require('~/assets/icons/paypal.png')} />
              <Text style={[styles.title,{marginStart: 10}]}>Internet banking/ PayPal </Text>
            </View>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.textBtn}>
          <Text style={styles.label}>Continue</Text>
        </TouchableOpacity>
      </LinearGradient>
    // </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  appHeaderContainer: {
    marginStart: SPACING.space_32,
    marginTop: SPACING.space_20 * 2,
  },
  container:{
    padding: SPACING.space_28,
    // alignItems: 'center',
    // justifyContent: 'flex-start',
  },
  row:{
    flexDirection:'row',
    // width: '100%',
    justifyContent: 'space-between',
    marginBottom: SPACING.space_15
  },
  title: {
    color:COLORS.White,
    textTransform: 'capitalize',
    fontSize: FONTSIZE.size_16
  },
  devide:{
    width: '100%',
    height: 1,
    backgroundColor: COLORS.WhiteRGBA50,
    marginVertical: SPACING.space_12
  },
  label:{
    color:COLORS.White,
    textTransform: 'uppercase',
    fontSize: FONTSIZE.size_18,
    marginBottom: SPACING.space_15
  },
  radioOuter: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: SPACING.space_20,
    marginTop: 5, 
    borderColor: COLORS.White
  },
  radioInner: {
    width: 15,
    height: 15,
    borderRadius: 10,
    backgroundColor: COLORS.WhiteRGBA75
  },
  textBtn:{
    position: 'absolute',
    bottom: 5,
    backgroundColor: COLORS.DarkGrey,
    paddingVertical: SPACING.space_18,
    alignItems:'center',
    width: '100%',
    borderRadius: 10
  }
})

export default PaymentScreen