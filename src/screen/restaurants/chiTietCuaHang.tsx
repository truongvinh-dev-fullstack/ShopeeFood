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
  Extrapolate,
  interpolate,
  runOnJS,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
  NativeViewGestureHandler,
} from 'react-native-gesture-handler';
import HeaderImagerAnimated, {
  BottomSheetMethods,
} from './components/headerImagerAnimated';

const ChiTietCuaHang = () => {
  const isFocus = useIsFocused();

  let {params}: any = useRoute();

  const [cuaHang, setCuaHang] = useState<CuaHang | null>();

  const segmentData = ['Thực đơn', 'Đánh giá'];

  const topAnimation = useSharedValue(0);
  const [enableScroll, setEnableScroll] = useState(true);
  const scrollBegin = useSharedValue(0);
  const scrollY = useSharedValue(0);
  const scaleHeader = useSharedValue(1);
  const opacityHeader1 = useSharedValue(1);
  const zIndexHeader1 = useSharedValue(1);

  useEffect(() => {
    fetchData();
    return () => {
      setCuaHang(null);
    };
  }, [isFocus]);

  const fetchData = () => {
    setCuaHang(params?.item);
  };

  const animationStyle = useAnimatedStyle(() => {
    const top = topAnimation.value;
    return {
      marginTop: top,
    };
  });

  const pan = Gesture.Pan()
    .onBegin(() => {
      topAnimation.value = 0;
    })
    .onUpdate(event => {
      if (event.translationY > 0) {
        topAnimation.value = withSpring(event.translationY, {
          damping: 100,
          stiffness: 400,
        });
      }
    })
    .onEnd(() => {
      topAnimation.value = withSpring(0, {
        damping: 100,
        stiffness: 400,
      });
      // if (topAnimation.value > openHeight + 50) {
      //   topAnimation.value = withSpring(closeHeight, {
      //     damping: 100,
      //     stiffness: 400,
      //   });
      // } else {
      //   topAnimation.value = withSpring(openHeight, {
      //     damping: 100,
      //     stiffness: 400,
      //   });
      // }
    });

  const onScroll = useAnimatedScrollHandler({
    onBeginDrag: event => {
      scrollBegin.value = event.contentOffset.y;
    },
    onScroll: event => {
      console.log('event: ', event);
      scrollY.value = event.contentOffset.y;
      if (event.contentOffset.y >= 0 && event.contentOffset.y <= 80) {
        zIndexHeader1.value = 101;
        // zIndexHeader2.value = 1;
        opacityHeader1.value =
          ((event.contentOffset.y - 0) / (80 - 0)) * (1 - 0) + 1;
        console.log('opacityHeader: ', opacityHeader1.value);
      }
    },
  });

  const panScroll = Gesture.Pan()
    .onBegin(() => {
      topAnimation.value = 0;
    })
    .onUpdate(event => {
      if (event.translationY > 0 && scrollY.value === 0) {
        runOnJS(setEnableScroll)(false);
        topAnimation.value = event.translationY * 0.3;
        if (event.translationY > 0 && event.translationY <= 180) {
          let scale = ((event.translationY - 1) / (180 - 1)) * (1.5 - 1) + 1;
          console.log('event.translationY: ', event.translationY);
          console.log('scale: ', scale);
          scaleHeader.value = scale;
        }
      }
    })
    .onEnd(() => {
      runOnJS(setEnableScroll)(true);

      topAnimation.value = withSpring(0, {
        damping: 100,
        stiffness: 400,
      });

      scaleHeader.value = withTiming(1, {
        duration: 500,
      });
      // else {
      //   topAnimation.value = withSpring(openHeight, {
      //     damping: 100,
      //     stiffness: 400,
      //   });
      // }
    });
  const scrollViewGesture = Gesture.Native();

  return (
    <Screen>
      {/* Header1 */}
      <Animated.View
        style={{
          zIndex: zIndexHeader1,
          opacity: opacityHeader1,
        }}>
        <Header hasBack={true} title="Chi tiết cửa hàng" />
      </Animated.View>
      {/* Header 1 */}

      {/* Header 2 */}
      <Animated.View
        style={[{
          position: 'absolute',
          zIndex: 100,
          transform: [{scale: scaleHeader}],
         
        }]}>
        <FastImage
          source={{uri: cuaHang?.images}}
          style={appStyles.imageBannerCuaHang}
          resizeMode="stretch"
        />
        <TouchableOpacity style={styles.backHerader}>
          <Ionicons
            name="arrow-back-outline"
            size={25}
            color={appColors.trang}
          />
        </TouchableOpacity>
      </Animated.View>
      {/* Header 2 */}

      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.container, animationStyle]}>
          <GestureDetector
            gesture={Gesture.Simultaneous(scrollViewGesture, panScroll)}>
            <Animated.ScrollView
              scrollEnabled={enableScroll}
              bounces={true}
              scrollEventThrottle={16}
              onScroll={onScroll}
              contentContainerStyle={{marginTop: 150, zIndex: 99}}
              >
              <View style={{zIndex: 101}}>
                <ThucDon key={'0'} cuaHang={params?.item} />
              </View>
            </Animated.ScrollView>
          </GestureDetector>
        </Animated.View>
      </GestureDetector>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.trangNhat,
    zIndex: 99
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
