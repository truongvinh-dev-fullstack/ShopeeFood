import React, {memo, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {appColors} from '../../constants/color';
import {SafeAreaView} from 'react-native-safe-area-context';

import {appConfig} from '../../constants/AppConfig';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {AppText} from '../../compoments/text/AppText';
import {AppInput} from '../../compoments/textInput/TextInput';
import {Header} from '../../compoments/header';
import {appStyles} from '../../themes/AppStyles';
import Ionicons from 'react-native-vector-icons/Ionicons';

import firestore from '@react-native-firebase/firestore';
import Button from '../../compoments/button';
import {AppModal} from '../../compoments/modal';
import FastImage from 'react-native-fast-image';
import { Screen } from '../../compoments/screen/screen';
import { CuaHang } from '../bottomTabQuanLy/type';

const ChiTietCuaHang = () => {
  const isFocus = useIsFocused();

  let {params} : any = useRoute()

  const [cuaHang, setCuaHang] = useState<CuaHang | null>()


  useEffect(() => {
    return () => {
        setCuaHang(null)
    };
  }, [isFocus]);

  const fetchData = () => {
    setCuaHang(params?.item)
  }


  return (
    <Screen>

    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.trangNhat,
  },
  bodyFlastScreen: {
    height: appConfig.height,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  flex_row: {
    flexDirection: 'row',
  },
  textLogo: {
    fontSize: 32,
    fontWeight: '700',
    color: appColors.cam,
  },
  image: {
    width: 80,
    height: 80,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    gap: 12,
    paddingVertical: 16,
  },
  btn_themMoi: {
    height: 40,
    width: 100,
  },
  text_header: {
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ChiTietCuaHang;
