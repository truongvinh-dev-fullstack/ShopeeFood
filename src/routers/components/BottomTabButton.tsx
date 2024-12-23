import React from 'react';
import {StyleSheet, View} from 'react-native';
import {appColors} from '../../constants/color';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppText} from '../../compoments/text/AppText';
import {textStyles} from '../../themes/TextStyles';
import { appConfig } from '../../constants/AppConfig';

type TabButtonPropsType = {
  label?: string;
  name: string;
  focused?: boolean;
};

const tabWidth = appConfig.width / 5

export const BottomTabButton: React.FC<TabButtonPropsType> = React.memo(
  ({label, name, focused}) => {
    let tintColor: any = focused ? appColors.cam : appColors.xam;
    return (
      <View style={style.container}>
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Ionicons name={name} size={25} color={tintColor} />
          <AppText
            allowFontScaling={false}
            style={{
              ...textStyles.textNormalMedium,
              color: focused ? appColors.cam : appColors.xam,
              fontSize: 13,
            }}>
            {label}
          </AppText>
        </View>
        
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
    width: tabWidth,
    borderRightWidth: 1,
    borderColor: appColors.cam,
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
