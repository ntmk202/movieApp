import { Provider } from 'react-redux';
import Index from './src/index';
import React from 'react';
import { store } from './src/redux/store';
// import { AppRegistry } from 'react-native';
// import * as Font from 'expo-font';

// const loadFonts = async () => {
//     await Font.loadAsync({
//         'monserrat_regular': require('./assets/fonts/montserrat/Montserrat-Regular.ttf'),
//         'monserrat_black': require('./assets/fonts/montserrat/Montserrat-Black.ttf'),
//         'monserrat_bold': require('./assets/fonts/montserrat/Montserrat-Bold.ttf'),
//         'monserrat_extra_bold': require('./assets/fonts/montserrat/Montserrat-ExtraBold.ttf'),
//         'monserrat_extra_light': require('./assets/fonts/montserrat/Montserrat-ExtraLight.ttf'),
//         'monserrat_light': require('./assets/fonts/montserrat/Montserrat-Light.ttf'),
//         'monserrat_medium': require('./assets/fonts/montserrat/Montserrat-Medium.ttf'),
//         'monserrat_semibold': require('./assets/fonts/montserrat/Montserrat-SemiBold.ttf'),
//         'monserrat_thin': require('./assets/fonts/montserrat/Montserrat-Thin.ttf'),
//     });
//   };
  
//   loadFonts().then(() => {
//     AppRegistry.registerComponent('MyApp', () => App);
//     AppRegistry.runApplication('MyApp', { rootTag: document.getElementById('app-root') });
//   });

const App = () => {
    return(
        // <React.StrictMode>
            <Provider store={store}>
                <Index/>
            </Provider>
        // </React.StrictMode>
    )
}

export default App;
