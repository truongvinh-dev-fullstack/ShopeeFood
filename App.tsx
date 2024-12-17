/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect, useState} from 'react';
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
import FastImage from 'react-native-fast-image';
import {images} from './src/assets/images';
import {AppText} from './src/compoments/text/AppText';

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

  const [allowOpenApp, setAllowOpenApp] = useState(false);

  useEffect(() => {
    fetchData()
  },[])

  const fetchData = () => {
    setTimeout(() => {
      setAllowOpenApp(true)
    },1500)
  }


  if (!allowOpenApp) {
    return (
      <SafeAreaView style={styles.container}>
        <FastImage resizeMode='cover' source={images.shoppefood} style={styles.image} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer
        theme={isDarkMode === 'dark' ? DarkTheme : DefaultTheme}
        ref={navigationRef}>
        <LoadingProvider>
          <RootNavigator />
          <Spinner />
          <Toast config={toastConfig} />
        </LoadingProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: appColors.trangNhat,
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default App;
