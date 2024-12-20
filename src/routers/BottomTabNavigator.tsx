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

const Tab = createBottomTabNavigator();

const BottomTabScreen = () => {
  const isFocused = useIsFocused();
  let {params}: any = useRoute();

  const screens = [
    // { name: ProjectName.DASH_BOARD_DIRECTOR, component: DashboardDirector },
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
        },
        lazy: true,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}>
      <Tab.Screen
        name={TabNames.HomeScreen}
        component={HomeScreen}
        options={{
          tabBarLabel: ({ focused }) => <BottomTabLabel focused={focused} content={'Home'} />,
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <BottomTabButton focused={focused} name="restaurant-outline" />
          ),
        }}
      />

      <Tab.Screen
        name={TabNames.DonHangScreen}
        component={DonHangScreen}
        options={{
          tabBarLabel: ({ focused }) => <BottomTabLabel focused={focused} content={'Đơn hàng'} />,
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <BottomTabButton focused={focused} name={'document-text-outline'} />
          ),
        }}
      />

      <Tab.Screen
        name={TabNames.YeuThichScreen}
        component={YeuThichScreen}
        options={{
          tabBarLabel: ({ focused }) => <BottomTabLabel focused={focused} content={'Thích'} />,
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <BottomTabButton focused={focused} name={'heart-outline'} />
          ),
        }}
      />

      <Tab.Screen
        name={TabNames.ThongBaoScreen}
        component={ThongBaoScreen}
        options={{
          tabBarLabel: ({ focused }) => <BottomTabLabel focused={focused} content={'Thông báo'} />,
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <BottomTabButton focused={focused} name={'notifications-outline'} />
          ),
        }}
      />

      <Tab.Screen
        name={TabNames.TaiKhoanScreen}
        component={TaiKhoanScreen}
        options={{
          tabBarLabel: ({ focused }) => <BottomTabLabel focused={focused} content={'Tôi'} />,
          tabBarIcon: ({focused}: {focused: boolean}) => (
            <BottomTabButton focused={focused} name={'person-outline'} />
          ),
        }}
      />

      {/* {screens?.map((item, i) => {
				return (
					<Tab.Screen
						key={i}
						name={item?.name}
						component={item?.component}
						options={{
							tabBarItemStyle: { display: 'none' },
							tabBarLabel: ({ focused }) => <BottomTabLabel focused={focused} content={''} />,
							tabBarIcon: ({ focused }: { focused: boolean }) => (
								<BottomTabButton source={icons.ic_menu_work} focused={focused} />
							),
							tabBarHideOnKeyboard: true,
						}}
					/>
				)
			})} */}
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
