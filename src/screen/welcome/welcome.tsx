import React, {memo, useEffect, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import {AppText} from '../../compoments/text/AppText';
import {appColors} from '../../constants/color';
import {SafeAreaView} from 'react-native-safe-area-context';
import FastImage from 'react-native-fast-image';
import {images} from '../../assets/images';

import Animated, { FadeInRight, FadeInUp } from 'react-native-reanimated';
import { appConfig } from '../../constants/AppConfig';
import { navigate } from '../../routers/NavigationService';
import { RouteNames } from '../../routers/RouteNames';

interface ViewTextAnimatedProps {
    text: string;
    delay: number;
    duration: number;
    damping: number;
  }

const WelcomeScreen = () => {
  useEffect(() => {
    setTimeout(() => {
        navigate(RouteNames.LOGIN)
    },3500)
  },
   []);

   const ViewTextAnimated = memo(
      ({text, delay, duration, damping}: ViewTextAnimatedProps) => {
        const animationConfig = FadeInRight.withInitialValues({
          opacity: 0,
          transform: [{translateX: appConfig.width / 2 + 100}],
        })
          .delay(delay)
          .duration(duration)
          .springify()
          .damping(damping);
  
        return (
          <Animated.View entering={animationConfig}>
            <AppText style={styles.textLogo}>{text}</AppText>
          </Animated.View>
        );
      },
    );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.bodyFlastScreen}>
        <Animated.View
          entering={FadeInUp.withInitialValues({
            opacity: 0,
            transform: [{translateY: -appConfig.height / 2}],
          })
            .duration(400)
            .springify()}>
          <FastImage
            resizeMode="cover"
            source={images.shopeeFoodIcon}
            style={styles.image}
          />
        </Animated.View>
        <View style={styles.flex_row}>
          {['S', 'h', 'o', 'p', 'p', 'e', ' ', 'F', 'o', 'o', 'd'].map(
            (item, index) => {
              return (
                <ViewTextAnimated
                  key={'ViewTextAnimated' + item + index}
                  text={item}
                  delay={index * 100 + 400}
                  duration={500}
                  damping={30}
                />
              );
            },
          )}
        </View>
      </View>
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

export default WelcomeScreen;
