import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
import CustomIcon from './CustomIcon';
import fonts from '../theme/fonts';

const SettingComponent = (props: any) => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <View style={styles.iconStyle} >
        <CustomIcon name={props.icon}/>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{props.heading}</Text>
        <Text style={styles.subtitle}>{props.subheading}</Text>
        <Text style={styles.subtitle}>{props.subtitle}</Text>
      </View>
      <View style={styles.iconBG}>
        <CustomIcon name={require('~/assets/icons/next.png')}/> 
      </View>
    </TouchableOpacity>
  );
};

export default SettingComponent;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: SPACING.space_20,
  },
  settingContainer: {
    flex: 1,
  },
  iconStyle: {
    justifyContent:'center',
    alignItems: 'center',
    paddingEnd: SPACING.space_20,
  },
  iconBG: {
    justifyContent: 'center',
  },
  title: {
    // fontFamily: FONTFAMILY.medium,
    fontSize: FONTSIZE.size_18,
    color: COLORS.White,
  },
  subtitle: {
    // fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.WhiteRGBA15,
  },
});
