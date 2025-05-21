import React, {useEffect, useState} from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RootStackParamList} from './RootStackParamList ';
import {RouteNames, TabNames} from './RouteNames';
import LoginScreen from '../screen/auth/login';
import WelcomeScreen from '../screen/welcome/welcome';
import BottomTabScreen from './BottomTabNavigator';
import BottomTabQuanLy from './BottomTabNavigatorQuanLy';
import ChiTietCuaHang from '../screen/cus/restaurants/chiTietCuaHang';
import chiTietCuaHangQuanLy from '../screen/restaurants/chiTietCuaHangQuanLy';
import { AddressListScreen } from '../screen/cus/address/addressList';
import { ChooseMap } from '../screen/cus/address/chooseMap';
import PurchasePackageListScreen from '../screen/cus/purchasePackageList/purchasePackageListScreen';

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
    {name: RouteNames.ADDRESS_LIST, component: AddressListScreen},
    {name: RouteNames.CHOOSE_MAP, component: ChooseMap},
    {name: RouteNames.PURCHASE_PACKAGE_LIST, component: PurchasePackageListScreen},
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
