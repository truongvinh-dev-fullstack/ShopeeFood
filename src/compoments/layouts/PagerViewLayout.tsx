import React, {useRef, useState} from 'react';
import {
  Animated,
  NativeSyntheticEvent,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import SegmentedControl, {
  NativeSegmentedControlIOSChangeEvent,
} from '@react-native-segmented-control/segmented-control';
import {appConfig} from '../../constants/AppConfig';
import {appColors} from '../../constants/color';
import {textStyles} from '../../themes/TextStyles';

type AppSegmentedControlProps = {
  onSegmentChange?: (index: any) => void;
  tabSelected?: any;
  segmentData?: string[];
  style?: any;
};

type PagerViewLayoutProps = {
  containerStyle?: ViewStyle;
  children: React.ReactNode; // Children must have key
} & AppSegmentedControlProps;
const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

export const PagerViewLayout: React.FC<PagerViewLayoutProps> = ({
  containerStyle,
  children,
  tabSelected = 0,
  style,
  segmentData = [],
  ...props
}) => {
  const [selectedIndex, setSelectedIndex] = useState(tabSelected);

  const refPagerView = useRef<PagerView>(null);

  const onPageScroll = (e: any) => {
    // console.log(e.nativeEvent.position, 'position,offset')
  };

  const onSegmentChange = (index: number) => {
    refPagerView.current?.setPage(index);
  };

  const onChange = (
    event: NativeSyntheticEvent<NativeSegmentedControlIOSChangeEvent>,
  ) => {
    setSelectedIndex(event.nativeEvent.selectedSegmentIndex);
    onSegmentChange?.(event.nativeEvent.selectedSegmentIndex);
  };

  return (
    <View style={{flex: 1, paddingHorizontal: 12}}>
      <SegmentedControl
        style={[{height: 38, marginTop: 12}, style]}
        fontStyle={{...textStyles.textNormalMedium, color: appColors.nau}}
        activeFontStyle={{...textStyles.textNormalMedium}}
        tabStyle={styles.tabStyle}
        values={segmentData}
        selectedIndex={selectedIndex}
        onChange={onChange}
      />
      {/* <AppSegmentedControl onSegmentChange={onSegmentChange} {...props} /> */}
      <AnimatedPagerView
        ref={refPagerView}
        style={{flex: 1}}
        scrollEnabled={false}
        onPageSelected={onPageScroll}
        initialPage={0}>
        {children}
      </AnimatedPagerView>
    </View>
  );
};
const styles = StyleSheet.create({
  chart: {
    width: appConfig.width - 64,
    height: 300,
    backgroundColor: appColors.trang,
  },
  tabStyle: {
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
