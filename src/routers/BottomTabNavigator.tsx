import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, View} from 'react-native';
import {BottomTabButton, BottomTabLabel} from './components';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {TabNames} from './RouteNames';
import HomeScreen from '../screen/bottomTab/home';
import {icons} from '../assets/icons';
import DonHangScreen from '../screen/bottomTab/donHang';
import YeuThichScreen from '../screen/bottomTab/yeuThich';
import TaiKhoanScreen from '../screen/bottomTab/taiKhoan';
import ThongBaoScreen from '../screen/bottomTab/thongBao';
import {appColors} from '../constants/color';

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  const isFocused = useIsFocused();
  let {params}: any = useRoute();

  const tabs = [
    {route: TabNames.HomeScreen,component: HomeScreen, name: 'Home', icon: 'restaurant'},
    {route: TabNames.DonHangScreen,component: DonHangScreen, name: 'Đơn hàng', icon: 'document-text'},
    {route: TabNames.YeuThichScreen,component: YeuThichScreen, name: 'Thích', icon: 'heart'},
    {route: TabNames.ThongBaoScreen,component: ThongBaoScreen, name: 'Thông báo', icon: 'notifications'},
    {route: TabNames.TaiKhoanScreen,component: TaiKhoanScreen, name: 'Tôi', icon: 'person'},
  ];

  useEffect(() => {
    fetchData();
  }, [isFocused, params?.isRefeshCount]);

  const fetchData = async () => {};

  return (
    <Tab.Navigator
      initialRouteName={TabNames.HomeScreen}
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: Platform.OS == 'ios' ? 80 : 70,
          paddingTop: 5
        },
        lazy: true,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}>
      {tabs?.map(item => {
        return (
          <Tab.Screen
            key={item.route}
            name={item.route}
            component={item.component}
            options={{
              // tabBarLabel: ({focused}) => (
              //   <BottomTabLabel focused={focused} content={item.name} />
              // ),
              // tabBarIcon: ({focused}: {focused: boolean}) => (
              //   <BottomTabButton focused={focused} name={item.icon} />
              // ),
              tabBarButton: (props) => {
                return(
                  <BottomTabButton {...props} item={item} />
                )
              },
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};

export default BottomTabScreen;

const $tabBarItem: any = {
  paddingVertical: 7,
  justifyContent: 'space-around',
};

const $tabBarLabel: any = {
  fontSize: 15,
  fontWeight: '500',
};

const exitRoutes = ['Trang chủ'];
export const canExit = (routeName: string) => exitRoutes.includes(routeName);
