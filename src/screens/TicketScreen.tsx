import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { COLORS, FONTSIZE, SPACING } from '../theme/theme'
import TextHeader from '../components/TextHeader'
import CastCard from '../components/CastCard'
import TicketCard from '../components/TicketCard'
import { LinearGradient } from 'expo-linear-gradient'

const TicketScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient style={{flex:1}} colors={[COLORS.Black,COLORS.Orange, COLORS.DarkGrey]}>
        <TextHeader header="My Tickets" />
        <ScrollView showsVerticalScrollIndicator={false} bounces={false} style={styles.content}>
          <Text style={styles.textHeading}>Today</Text>
          <TicketCard 
            startTime="19:30pm"
            endTime="21:00pm"
            title="Killers of the Flower Moon (2023)"
            price="5.10"
            img={{uri: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/dB6Krk806zeqd0YNp2ngQ9zXteH.jpg"}}
            Release_date="2023-12-10"
            onPress={() => navigation.navigate('TicketDetails')}
          />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    // display: 'flex',
    flex: 1,
    // backgroundColor: COLORS.DarkGrey,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    // backgroundColor: 'red'
  },
  textHeading:{
    color: COLORS.White,
    fontSize: FONTSIZE.size_16,
    paddingBottom: 10
  }
})

export default TicketScreen