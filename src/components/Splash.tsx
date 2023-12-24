import React from 'react';
import { ActivityIndicator, Image, Text, View } from 'react-native';
import { COLORS } from '../theme/theme';

function Splash() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.White,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text>LOGO</Text>
      <ActivityIndicator
        color={COLORS.Orange}
        size="large"
        style={{ marginTop: 50 }}
      />
    </View>
  );
}

export default Splash;