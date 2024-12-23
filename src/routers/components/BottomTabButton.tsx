import React, {useEffect, useRef} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {appColors} from '../../constants/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppText} from '../../compoments/text/AppText';
import {textStyles} from '../../themes/TextStyles';
import {appConfig} from '../../constants/AppConfig';
import Animated, {useSharedValue, withTiming} from 'react-native-reanimated';

type TabButtonPropsType = {
  props: any;
};

const tabWidth = appConfig.width / 5;

export const BottomTabButton: React.FC<any> = React.memo(props => {
  const {item, onPress, accessibilityState} = props;
  console.log('item: ', item);
  let focused = accessibilityState.selected;
  let tintColor: any = focused ? appColors.cam : appColors.xam;

  const viewRef = useRef(null);

  let scaleAnimted = useSharedValue(1);

  useEffect(() => {
    if (focused) {
      scaleAnimted.value = withTiming(1.2, {
        duration: 500,
      });
    } else {
      scaleAnimted.value = withTiming(1, {
        duration: 500,
      });
    }
  }, [focused]);

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        style.container,
      ]}>
      <Animated.View
        ref={viewRef}
        style={[
          style.body,
          {
            transform: [{scale: scaleAnimted}],
          },
        ]}>
        <Ionicons name={item.icon} size={23} color={tintColor} />
        <AppText
            style={{
              ...textStyles.textNormalMedium,
              color: focused ? appColors.cam : appColors.xam,
              fontSize: 13,
              lineHeight: 13
            }}>
            {item.name}
          </AppText>
      </Animated.View>
    </TouchableOpacity>
  );
});

const style = StyleSheet.create({
  container: {
    flex: 1,
    // width: tabWidth,
  },
  icon: {
    height: 30,
    width: 30,
  },
  qrIcon: {
    width: 35,
    height: 35,
  },
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5
  },
});
