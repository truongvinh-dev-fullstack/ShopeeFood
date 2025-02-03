/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import {SafeAreaProvider, SafeAreaView} from 'react-native-safe-area-context';

import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from '@react-navigation/native';
import {navigationRef} from './src/routers/NavigationService';
import {LoadingProvider} from './src/hook/LoadingContex';
import Spinner from './src/compoments/spinner';
import Toast, {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import {appColors} from './src/constants/color';
import RootNavigator from './src/routers/RootNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { store } from './src/redux/stores/config-store';

export const toastConfig = {
  success: (props: React.JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      style={{borderLeftColor: appColors.xanhLa, marginHorizontal: 20}}
      {...props}
      text1NumberOfLines={3}
      text2NumberOfLines={3}
    />
  ),
  error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      style={{borderLeftColor: appColors.do, marginHorizontal: 20}}
      {...props}
      text1NumberOfLines={3}
      text2NumberOfLines={3}
    />
  ),
  // // custom
  // tomatoToast: ({text1, props}) => (
  //   <View style={{height: 60, width: '100%', backgroundColor: 'tomato'}}>
  //     <Text numberOfLines={2}>{text1}</Text>
  //     <Text>{props.uuid}</Text>
  //   </View>
  // ),
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme();
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView>
        <Provider store={store}>
          <NavigationContainer
            theme={isDarkMode === 'dark' ? DarkTheme : DefaultTheme}
            ref={navigationRef}>
            <LoadingProvider>
              <RootNavigator />
              <Spinner />
              <Toast config={toastConfig} />
            </LoadingProvider>
          </NavigationContainer>
        </Provider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
