import React, {useCallback, useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {RootStackParamList} from './RootStackParamList ';
import {RouteNames} from './RouteNames';
import LoginScreen from '../screen/auth/login';
import {AppText} from '../compoments/text/AppText';
import {View} from 'react-native';
import WelcomeScreen from '../screen/welcome/welcome';

const {Navigator, Screen} = createStackNavigator<RootStackParamList>();
export default function RootNavigator() {
  const [initialRouteName, setInitialRouteName] =
    useState<keyof RootStackParamList>();
  useEffect(() => {}, []);

  return (
    <Navigator
      // screenOptions={{ headerShown: false, gestureEnabled: false }}
      initialRouteName={initialRouteName}>
      <Screen
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
          headerShown: false,
        }}
        name={RouteNames.WELCOME}
        component={WelcomeScreen}
      />
      <Screen
        options={{
          gestureEnabled: false,
          headerLeft: () => null,
          headerShown: false,
          headerTitle: 'Đăng nhập',
          headerTitleAlign: 'center',
        }}
        name={RouteNames.LOGIN}
        component={LoginScreen}
      />
      {/* <Screen name={RouteNames.MAIN} component={BottomTabScreen} /> */}
    </Navigator>
  );
}
