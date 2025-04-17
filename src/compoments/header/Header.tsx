//@ts-nocheck
import * as React from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import { Source } from 'react-native-fast-image';
import { icons } from '../../assets/icons';
import { textStyles } from '../../themes/TextStyles';
import { goBack } from '../../routers/NavigationService';
import AppIcon from '../icons/Icon';
import { appColors } from '../../constants/color';
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
  IconRight?: React.ReactNode;
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
    IconRight,
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
          <View style={{ width: "6%" }}>
            {iconLeft ? (
              <AppIcon
                onPress={onIconLeftPress}
                style={{ alignSelf: 'flex-start', ...iconStyle }}
                source={iconLeft}
              />
            ) : hasBack ? (
              <AppIcon onPress={onBack} source={icons.ic_chevron_left} />
            ) : IconLeft ? (
              <TouchableOpacity onPress={onIconLeftPress}>{IconLeft}</TouchableOpacity>
            ) : (
              <View style={{ width: 1 }} />
            )}
          </View>

          <View style={{width: "85%", alignItems: 'center', justifyContent: 'center'}}>
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
          </View>
          <View style={{width: "6%"}}>
            {
              IconRight ? (
                <TouchableOpacity onPress={onIconRightPress}>{IconRight}</TouchableOpacity>
              ) : (
                <View style={{ width: 1 }} />)}
          </View>

        </View>
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
    borderBottomWidth: 1,
    borderColor: appColors.xamDam,
    gap: 20,
    height: 50,
    justifyContent: 'center'
  },
  viewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
});
