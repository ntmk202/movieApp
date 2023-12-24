import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { COLORS, FONTSIZE } from '../theme/theme'

const TicketCard = (props: any) => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.borderTicket}>
            <Image source={props.img} style={styles.img} />
            <View style={styles.container}>
                <View style={styles.imgShadow}/>
                <View style={styles.content}>
                    <Text style={styles.showtime}>{props.startTime} - {props.endTime}</Text>
                    <Text numberOfLines={1} style={styles.name}>{props.title}</Text>
                    <Text style={styles.price}>${props.price}</Text>
                    <Text style={styles.Releasedate}>Release date: {props.Release_date}</Text>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    borderTicket:{
        width: '100%',
        height: 100,
        marginTop: 30,
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: COLORS.BlackRGB10,
        borderRadius: 10,
    },
    content: {
        flex: 1,
        padding: 5,
        flexDirection: 'column',
    },
    img: {
        width: 100,
        height: 110,
        borderRadius: 10,
        marginLeft: 10,
        top: -20,
        position:'absolute',
        zIndex: 1
    },
    imgShadow: {
        width: 100,
        height: 100,
        borderRadius: 10,
        marginEnd: 25,
        backgroundColor:COLORS.BlackRGB10
    },
    name: {
        fontSize: FONTSIZE.size_20,
        fontWeight: 'bold',
        color: COLORS.White,
        paddingEnd: 15
    },
    price: {
        fontSize: FONTSIZE.size_18,
        fontWeight: 'bold',
        color: COLORS.White,
        marginVertical: 2
    },
    showtime: {
        fontSize: FONTSIZE.size_12,
        color: COLORS.WhiteRGBA75,
        textAlign: 'right',
        paddingRight: 10,
        paddingVertical: 3,
        borderBottomColor: 'white',
        borderBottomWidth: 1
    },
    Releasedate: {
        fontSize: FONTSIZE.size_12,
        color: COLORS.WhiteRGBA50,
    },

})

export default TicketCard