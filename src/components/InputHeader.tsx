import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';
import fonts from '../theme/fonts';

const InputHeader = (props: any) => {
  const [searchText, setSearchText] = useState<string>('');
  return (
    <View style={styles.inputBox}>
      <TextInput
        style={styles.textInput}
        onChangeText={textInput => setSearchText(textInput)}
        value={searchText}
        placeholder="Search your Movies..."
        placeholderTextColor={COLORS.WhiteRGBA50}
        editable={props.disable}
      />
      <TouchableOpacity
        style={styles.searchIcon}
        onPress={() => props.searchFunction(searchText)}>
        <CustomIcon name={require('~/assets/icons/search-bar.png')} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBox: {
    display: 'flex',
    paddingVertical: SPACING.space_8,
    paddingHorizontal: SPACING.space_24,
    borderWidth: 2,
    borderColor: COLORS.WhiteRGBA50,
    borderRadius: BORDERRADIUS.radius_25,
    flexDirection: 'row',
  },
  textInput: {
    width: '90%',
    // fontFamily: FONTFAMILY.regular,
    fontSize: FONTSIZE.size_14,
    color: COLORS.White,
  },
  searchIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: SPACING.space_10,
  },
});

export default InputHeader;
