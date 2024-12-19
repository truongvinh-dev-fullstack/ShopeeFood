//@ts-nocheck
import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {Source} from 'react-native-fast-image';
import {icons} from '../../assets/icons';
import {textStyles} from '../../themes/TextStyles';
import {goBack} from '../../routers/NavigationService';
import AppIcon from '../icons/Icon';
import {appColors} from '../../constants/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
// import AppSegmentedControl, { AppSegmentedControlProps } from '../segmentedControl'
import _ from 'lodash';

export type HeaderProps = {
  hasBack?: boolean;
  source?: Source;
  title?: string;
  Title?: React.ReactNode;
  titleColor?: any;
  iconRight?: Source;
  iconLeft?: Source;
  IconLeft?: React.ReactNode;
  onIconLeftPress?: () => void;
  onIconRightPress?: () => void;
  iconStyle?: ViewStyle;
  titleColor2?: string;
  count?: any;
} & AppSegmentedControlProps;

export const Header: React.FC<HeaderProps> = React.memo(
  ({
    hasBack = false,
    source,
    title,
    iconRight,
    titleColor = appColors.den,
    iconLeft,
    iconStyle,
    IconLeft,
    onIconLeftPress,
    onIconRightPress,
    titleColor2,
    count,
    Title = <View />,
    ...props
  }) => {
    const onBack = () => {
      goBack();
    };
    return (
      <View style={styles.container}>
        <View style={[styles.viewHeader]}>
          {iconLeft ? (
            <AppIcon
              onPress={onIconLeftPress}
              style={{alignSelf: 'flex-start', ...iconStyle}}
              source={iconLeft}
            />
          ) : hasBack ? (
            <AppIcon onPress={onBack} source={icons.ic_chevron_left} />
          ) : IconLeft ? (
            <TouchableOpacity>{IconLeft}</TouchableOpacity>
          ) : (
            <View style={{width: 1}} />
          )}
          {title ? (
            <Text
              style={{
                ...textStyles.textMediumBold,
                color: titleColor,
                fontSize: 17,
              }}>
              {title}
            </Text>
          ) : (
            Title
          )}
          {iconRight ? (
            <View>
              {count > 0 ? (
                <View
                  style={{
                    position: 'absolute',
                    backgroundColor: appColors.red,
                    width: 22,
                    height: 22,
                    borderRadius: 11,
                    alignItems: 'center',
                    justifyContent: 'center',
                    top: -10,
                    right: 0,
                  }}>
                  <Text style={[{fontSize: 10, color: appColors.white}]}>
                    {count}
                  </Text>
                </View>
              ) : null}
              <AppIcon
                onPress={onIconRightPress}
                style={{alignSelf: 'flex-start', ...iconStyle}}
                source={iconRight}
                tintColor={titleColor2}
              />
            </View>
          ) : (
            <View style={{width: 1}} />
          )}
        </View>
        {/* {props?.segmentData?.length ? <AppSegmentedControl {...props} /> : null} */}
      </View>
    );
  },
  (prevProps, nextProps) => {
    const areFunctionPropsEqual =
      _.isEqual(prevProps.iconStyle, nextProps.iconStyle) &&
      _.isEqual(prevProps.onIconLeftPress, nextProps.onIconLeftPress) &&
      _.isEqual(prevProps.onIconRightPress, nextProps.onIconRightPress) &&
      _.isEqual(prevProps.title, nextProps.title);
    return areFunctionPropsEqual;
  },
);
const styles = StyleSheet.create({
  container: {
    backgroundColor: appColors.trang,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: appColors.xamDam,
    gap: 20,
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
