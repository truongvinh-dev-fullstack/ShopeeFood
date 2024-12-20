import React from 'react';
import FastImage, {Source} from 'react-native-fast-image';
import {StyleSheet, View} from 'react-native';
import {appColors} from '../../constants/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppText} from '../../compoments/text/AppText';
import {textStyles} from '../../themes/TextStyles';

type TabButtonPropsType = {
  source?: Source;
  name: string;
  focused?: boolean;
};

export const BottomTabButton: React.FC<TabButtonPropsType> = React.memo(
  ({source, name, focused}) => {
    let tintColor: any = focused ? appColors.cam : appColors.xam;
    return (
      <View style={[]}>
        <Ionicons name={name} size={25} color={tintColor} />
        {/* <AppText
          allowFontScaling={false}
          style={{
            ...textStyles.textNormalMedium,
            color: focused ? appColors.cam : appColors.xam,
            fontSize: 13,
          }}>
          vinh
        </AppText> */}
        {/* <FastImage
				source={source}
				style={[style.icon]}
				tintColor={tintColor}
			/> */}
      </View>
    );
  },
);

const style = StyleSheet.create({
  container: {
    width: 60,
    height: 60,
    borderWidth: 4,
    borderRadius: 30,
    borderColor: '#E9F0FE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    height: 30,
    width: 30,
  },
  qrIcon: {
    width: 35,
    height: 35,
  },
});
