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
import {Screen} from '../../compoments/screen/screen';
import {CuaHang} from '../bottomTabQuanLy/type';
import {PagerViewLayout} from '../../compoments/layouts/PagerViewLayout';
import {ThucDon} from './components/thucDon';
import Animated, {
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {goBack} from '../../routers/NavigationService';

const ChiTietCuaHangQuanLy = () => {
  const isFocus = useIsFocused();

  let {params}: any = useRoute();

  const [cuaHang, setCuaHang] = useState<CuaHang | null>();

  const segmentData = ['Thực đơn', 'Đánh giá'];

  const topAnimation = useSharedValue(150);
  const [enableScroll, setEnableScroll] = useState(true);
  const scrollY = useSharedValue(0);
  // const scaleHeader = useSharedValue(1);
  const opacityHeader1 = useSharedValue(1);
  const zIndexHeader1 = useSharedValue(1);
  const zIndexHeader2 = useSharedValue(2);
  const khoangCach = useSharedValue(0);

  useEffect(() => {
    fetchData();
    return () => {
      setCuaHang(null);
    };
  }, [isFocus]);

  const fetchData = () => {
    setCuaHang(params?.item);
  };

  const animationStyle = useAnimatedStyle(() => ({
    marginTop: topAnimation.value,
  }));

  const headerStyle1 = useAnimatedStyle(() => ({
    zIndex: zIndexHeader1.value,
    opacity: opacityHeader1.value,
  }));

  

  return (
    <Screen>
      {/* Header1 */}
      <Animated.View style={headerStyle1}>
        <Header hasBack={true} title="Chi tiết cửa hàng" />
      </Animated.View>
      {/* Header 1 */}

      {/* Header 2 */}
      {/* <Animated.View
        style={[
          {
            position: 'absolute',
            zIndex: zIndexHeader2,
            // transform: [{scale: scaleHeader}],
          },
        ]}>
        <FastImage
          source={{uri: cuaHang?.images}}
          style={appStyles.imageBannerCuaHang}
          resizeMode="stretch"
        />
        <TouchableOpacity style={styles.backHerader} onPress={goBack}>
          <Ionicons
            name="arrow-back-outline"
            size={25}
            color={appColors.trang}
          />
        </TouchableOpacity>
      </Animated.View> */}
        <ThucDon key={'0'} cuaHang={params?.item} />
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

export default ChiTietCuaHangQuanLy;
