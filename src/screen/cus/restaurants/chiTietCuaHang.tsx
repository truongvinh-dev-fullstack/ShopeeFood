import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  ListRenderItem,
  RefreshControl,
} from 'react-native';
import {appColors} from '../../../constants/color';
import {SafeAreaView} from 'react-native-safe-area-context';

import {appConfig} from '../../../constants/AppConfig';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {Screen} from '../../../compoments/screen/screen';
import {CuaHang} from '../../bottomTabQuanLy/type';

import {goBack} from '../../../routers/NavigationService';
import { ThucDon } from './thucDon';
import FloatingCart from './components/floatingCart';

const ChiTietCuaHang = () => {
  const isFocus = useIsFocused();

  let {params}: any = useRoute();

  const [cuaHang, setCuaHang] = useState<CuaHang | null>();

  useEffect(() => {
    fetchData();
    return () => {
      setCuaHang(null);
    };
  }, [isFocus]);

  const fetchData = () => {
    setCuaHang(params?.item);
  };

  return (
    <Screen>
      <ThucDon key={'0'} cuaHang={params?.item} />
      <View>
        <FloatingCart />
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.trangNhat,
    zIndex: 2,
  },
  backHerader: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: 'rgba(15, 1, 1, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
    top: 16,
    left: 10,
  },
});

export default ChiTietCuaHang;
