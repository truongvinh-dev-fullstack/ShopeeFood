import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Platform, View} from 'react-native';
import {BottomTabButton, BottomTabLabel} from './components';
import {useIsFocused, useRoute} from '@react-navigation/native';
import {TabNames} from './RouteNames';
import QuanLyCuaHang from '../screen/bottomTabQuanLy/quanLyCuaHang';

const Tab = createBottomTabNavigator();

const BottomTabQuanLy = () => {
  const isFocused = useIsFocused();
  let {params}: any = useRoute();

  const tabs = [
    {route: TabNames.QuanLyCuaHang,component: QuanLyCuaHang, name: 'Cửa hàng', icon: 'restaurant'},
    // {route: TabNames.DonHangScreen,component: DonHangScreen, name: 'Đơn hàng', icon: 'document-text'},
    // {route: TabNames.YeuThichScreen,component: YeuThichScreen, name: 'Đánh giá', icon: 'receipt'},
    // {route: TabNames.ThongBaoScreen,component: ThongBaoScreen, name: 'Thông báo', icon: 'notifications'},
    // {route: TabNames.TaiKhoanScreen,component: TaiKhoanScreen, name: 'Tôi', icon: 'person'},
  ];

  useEffect(() => {
    fetchData();
  }, [isFocused, params?.isRefeshCount]);

  const fetchData = async () => {};

  return (
    <Tab.Navigator
      initialRouteName={TabNames.QuanLyCuaHang}
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

export default BottomTabQuanLy;

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
