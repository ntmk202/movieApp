import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

const CustomIcon = (props : any) => {
  return (
    <Image source={props.name} style={[styles.iconStyle, {...props.styles}]} />
  )
}

const styles = StyleSheet.create({
    iconStyle:{
        width:30,
        height:30
    }
})

export default CustomIcon
