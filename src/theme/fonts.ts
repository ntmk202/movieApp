import * as Font from 'expo-font';

// fonts preloading
export const fontAssets = [
  {
    monserrat_regular: require('../../assets/fonts/montserrat/Montserrat-Regular.ttf'),
  },
  {
    monserrat_black: require('../../assets/fonts/montserrat/Montserrat-Black.ttf'),
  },
  {
    monserrat_bold: require('../../assets/fonts/montserrat/Montserrat-Bold.ttf'),
  },
  {
    monserrat_extra_bold: require('../../assets/fonts/montserrat/Montserrat-ExtraBold.ttf'),
  },
  {
    monserrat_extra_light: require('../../assets/fonts/montserrat/Montserrat-ExtraLight.ttf'),
  },
  {
    monserrat_light: require('../../assets/fonts/montserrat/Montserrat-Light.ttf'),
  },
  {
    monserrat_medium: require('../../assets/fonts/montserrat/Montserrat-Medium.ttf'),
  },
  {
    monserrat_semibold: require('../../assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
  },
  {
    monserrat_thin: require('../../assets/fonts/montserrat/Montserrat-Thin.ttf'),
  },
  // @ts-ignore
].map((x) => Font.loadAsync(x));

const fonts = {
  monserrat: {
    regular: 'monserrat_regular',
    black: ' monserrat_black',
    bold: 'monserrat_bold',
    extraBold: 'monserrat_extra_bold',
    extraLight: 'monserrat_extra_light',
    light: 'monserrat_light',
    medium: 'monserrat_medium',
    semibold: 'monserrat_semibold',
    thin: 'monserrat _thin',
  },
} as const;

export default fonts;