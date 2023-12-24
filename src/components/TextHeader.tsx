import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import {COLORS, FONTSIZE, SPACING } from '../theme/theme';

const TextHeader = (props: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>{props.header}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
    //   flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    //   paddingVertical: SPACING.space_20 * 2,
      flex: .2
    },
    headerText: {
    //   flex: 1,
      // fontFamily: FONTFAMILY.medium,
      fontSize: FONTSIZE.size_30,
      textAlign: 'center',
      color: COLORS.White,
    }
  });

export default TextHeader