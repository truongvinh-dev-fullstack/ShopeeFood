import React, {memo, useEffect, useRef, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {AppText} from '../../compoments/text/AppText';
import {appColors} from '../../constants/color';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets/images';

import Animated, {FadeInRight, FadeInUp} from 'react-native-reanimated';
import {appConfig} from '../../constants/AppConfig';
import {navigate} from '../../routers/NavigationService';
import {RouteNames} from '../../routers/RouteNames';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

const TaiKhoanScreen = () => {

  useFocusEffect(
    React.useCallback(() => {
      return () => {
     
      }; // Clear timeout khi màn hình mất focus
    }, []),
  );
 

  return (
    <SafeAreaView style={styles.container}>
    </SafeAreaView>
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
});

export default TaiKhoanScreen;
