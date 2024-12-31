import * as React from 'react';
import {TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';
import {CheckboxProps} from './checkbox.props';
import Ionicons from "react-native-vector-icons/Ionicons";
import { appColors } from '../../constants/color';

export const spacing = [0, 4, 8, 12, 16, 24, 32, 48, 64]

const ROOT: ViewStyle = {
  flexDirection: 'row',
  paddingVertical: spacing[1],
  alignSelf: 'flex-start',
};

const DIMENSIONS = {width: 20, height: 20};

const OUTLINE: ViewStyle = {
  ...DIMENSIONS,
  marginTop: 2, // finicky and will depend on font/line-height/baseline/weather
  // justifyContent: 'center',
  // alignItems: 'center',
  borderWidth: 2,
  borderColor: appColors.xamDam,
  borderRadius: 5,
};

const FILL: ViewStyle = {
  width: DIMENSIONS.width-4,
  height: DIMENSIONS.height-4,
  backgroundColor: appColors.xanhDuong,
  justifyContent: 'center',
  alignItems: 'center',
};

const LABEL: TextStyle = {paddingLeft: spacing[2]};

export function Checkbox(props: CheckboxProps) {
  const numberOfLines = props.multiline ? 0 : 1;

  const rootStyle = [ROOT, props.style];
  const outlineStyle = [OUTLINE, props.outlineStyle];
  const fillStyle = [FILL, props.fillStyle];

  // const onPress = props.onToggle ? () => props.onToggle && props.onToggle(!props.value) : null;

  return (
    <TouchableOpacity
      // activeOpacity={1}
      // disabled={!props.onToggle}
      onPress={props.onToggle}
      style={rootStyle}
    >
      <View style={outlineStyle}>
        {props.value && <View style={[fillStyle]}>
              <Ionicons name='checkmark-outline' size={15} color={appColors.trang}/>
        </View>}
      </View>
      {/* <Text text={props.text} tx={props.tx} numberOfLines={numberOfLines} style={[LABEL, {fontSize: 13}]}/> */}
    </TouchableOpacity>
  );
}
