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

const ChiTietCuaHang = () => {
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

  const pan = Gesture.Pan()
    .onBegin(() => {
      // topAnimation.value = 0;
    })
    .onUpdate(event => {
      console.log('event pan');
      // Kéo từ vị trí top:150 đến 0
      if (event.translationY < 0) {
        if (
          150 + event.translationY >= 0 &&
          150 + event.translationY < 150 &&
          topAnimation.value != 0
        ) {
          topAnimation.value = 150 + event.translationY;
        } else if (event.translationY - topAnimation.value < -150) {
          topAnimation.value = 0;
        }
      } else {
        // Kéo từ vị trí 150 xuống dưới hoặc từ trên cùng xuống
        if (topAnimation.value < 150) {
          topAnimation.value = event.translationY;
        } else if (topAnimation.value >= 150) {
          if (
            event.translationY > 150 &&
            event.translationY > topAnimation.value
          ) {
            topAnimation.value = event.translationY;
          } else {
            topAnimation.value = 150 + event.translationY;
          }
        }
      }
    })
    .onEnd(() => {
      if (topAnimation.value > 150) {
        topAnimation.value = withSpring(150, {
          damping: 100,
          stiffness: 400,
        });
      }
    });

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const panScroll = Gesture.Pan()
    .onUpdate(event => {
      // console.log('event panScroll: ', event);
      // console.log('Khoang cach ban đầu: ', khoangCach.value);
      // console.log('topAnimation ban đầu: ', topAnimation.value)
      if (event.translationY != 0) {
        if (
          event.translationY > 0 &&
          topAnimation.value == 0 &&
          scrollY.value > 0
        ) {
          runOnJS(setEnableScroll)(true);
        } else {
          if (event.translationY < 0) {
            console.log('Kéo lên trên');
            if (
              150 + event.translationY >= 0 &&
              150 + event.translationY < 150 &&
              topAnimation.value != 0
            ) {
              // console.log('Khoảng cách khi trượt lên: ', khoangCach.value);
              if (khoangCach.value > 0) {
                if (khoangCach.value + event.translationY < 0) {
                  topAnimation.value = 0;
                } else {
                  topAnimation.value = khoangCach.value + event.translationY;
                }
              } else {
                topAnimation.value = 150 + event.translationY;
              }
            }
          } else {
            // Kéo từ vị trí 150 xuống dưới hoặc từ trên cùng xuống
            if (topAnimation.value < 150) {
              if (scrollY.value == 0 && topAnimation.value == 0) {
                topAnimation.value = 0.1;
                khoangCach.value = event.translationY;
                // khoangCach.value = 0;
              } else {
                console.log('Khoang cach khi kéo xuống: ', khoangCach.value);
                topAnimation.value = event.translationY + khoangCach.value;
                if (topAnimation.value == 0.1) {
                  console.log('Vào đây rồi: ');
                  topAnimation.value = event.translationY - khoangCach.value;
                  khoangCach.value = -khoangCach.value;
                  console.log('Vào đây rồi: ', khoangCach.value);
                } else {
                  topAnimation.value = event.translationY + khoangCach.value;
                }
              }
              // topAnimation.value = event.translationY;
            } else if (topAnimation.value >= 150) {
              // console.log('Khoang cach khi kéo xuống khi top > 150: ', khoangCach.value);
              // // console.log('y2: ', event.translationY - 150 + khoangCach.value);
              // if (khoangCach.value > 0) {
              //   topAnimation.value =
              //     150 + event.translationY - 150 + khoangCach.value;
              // } else {
              //   if (event.translationY > 150) {
              //     topAnimation.value = 150 + event.translationY - 150;
              //   }
              // }
              // if (khoangCach.value > 0 && event.translationY > 150) {
              //   topAnimation.value = event.translationY;
              // } else {
              //   topAnimation.value = 150 + event.translationY * 0.3;
              // }
            }
          }
        }

        console.log('topAnimation sau: ', topAnimation.value);
        if (topAnimation.value > 0) {
          console.log('tắt scroll:');
          runOnJS(setEnableScroll)(false);
          // topAnimation.value = event.translationY * 0.3;
          // if (event.translationY > 0 && event.translationY <= 180) {
          //   let scale = ((event.translationY - 1) / (180 - 1)) * (1.5 - 1) + 1;
          //   console.log('event.translationY: ', event.translationY);
          //   console.log('scale: ', scale);
          //   scaleHeader.value = scale;
          // }
        } else {
          runOnJS(setEnableScroll)(true);
        }
      }

      // Top từ 150 đến 100 thì hiển thị hết header 1
      if (topAnimation.value >= 100 && topAnimation.value < 150) {
        // opacityHeader1.value = mapRange(topAnimation.value, 100, 150, 1, 0)
        opacityHeader1.value =
          ((150 - topAnimation.value) * (1 - 0)) / (150 - 100) + 0;
      }
      zIndexHeader1.value = topAnimation.value < 150 ? 2 : 1;
      zIndexHeader2.value = topAnimation.value < 150 ? 1 : 2;
    })
    .onEnd(event => {
      runOnJS(setEnableScroll)(true);
      if (topAnimation.value > 0 && topAnimation.value < 150) {
        if (event.translationY < 0 || event.translationY > 0) {
          khoangCach.value = topAnimation.value;
        }
      }
      // Khi kéo xuống quá mốc 150 thì trở về ban đầu, khoảng cách = 0
      if (event.translationY > 0 && topAnimation.value > 150) {
        khoangCach.value = 0;
      }

      if (topAnimation.value == 0) khoangCach.value = 0;
      console.log('khoang cách end: ', khoangCach.value);
      if (topAnimation.value > 150) {
        topAnimation.value = withSpring(150, {
          damping: 100,
          stiffness: 400,
        });
      }
    });
  const scrollViewGesture = Gesture.Native();

  return (
    <Screen>
      {/* Header1 */}
      <Animated.View style={headerStyle1}>
        <Header hasBack={true} title="Chi tiết cửa hàng" />
      </Animated.View>
      {/* Header 1 */}

      {/* Header 2 */}
      <Animated.View
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
              contentContainerStyle={{zIndex: 101}}>
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
