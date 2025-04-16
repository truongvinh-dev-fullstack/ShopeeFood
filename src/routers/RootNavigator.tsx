import React, {useCallback, useEffect, useState} from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStackParamList ';
import {RouteNames, TabNames} from './RouteNames';
import LoginScreen from '../screen/auth/login';
import {AppText} from '../compoments/text/AppText';
import {View} from 'react-native';
import WelcomeScreen from '../screen/welcome/welcome';
import BottomTabScreen from './BottomTabNavigator';
import BottomTabQuanLy from './BottomTabNavigatorQuanLy';
import ChiTietCuaHang from '../screen/cus/restaurants/chiTietCuaHang';
import chiTietCuaHangQuanLy from '../screen/restaurants/chiTietCuaHangQuanLy';

const {Navigator, Screen} = createNativeStackNavigator<RootStackParamList>();
export default function RootNavigator() {
  const [initialRouteName, setInitialRouteName] =
    useState<keyof RootStackParamList>();
  useEffect(() => {}, []);

  const screen = [
    {name: RouteNames.WELCOME, component: WelcomeScreen},
    {name: RouteNames.LOGIN, component: LoginScreen},
    {name: RouteNames.MAIN, component: BottomTabScreen},
    {name: RouteNames.MAIN_QUANLY, component: BottomTabQuanLy},

    {name: TabNames.ChiTietCuaHang, component: ChiTietCuaHang},
    {name: TabNames.chiTietCuaHangQuanLy, component: chiTietCuaHangQuanLy},
  ];

  return (
    <Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRouteName}>
      {screen?.map(item => {
        return (
          <Screen
            key={item.name}
            options={{
              gestureEnabled: false,
              headerLeft: () => null,
              headerShown: false,
            }}
            name={item?.name}
            component={item?.component}
          />
        );
      })}
    </Navigator>
  );
}
