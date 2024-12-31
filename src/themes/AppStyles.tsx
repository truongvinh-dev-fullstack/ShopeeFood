import { StyleSheet } from 'react-native'
import { appColors } from '../constants/color'
import { appFontSizes } from '../constants/fontSize'
import { appConfig } from '../constants/AppConfig'

export const appStyles = StyleSheet.create({
    flex_row: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center'
    },
    flex_between: {
        flexDirection: 'row',
        gap: 12,
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    box_item: {
        paddingVertical: 6,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: appColors.den,
        gap: 8
    },
    gap_10: {
        gap: 10
    },
    contentStyleModal: {
        justifyContent: 'flex-end',
		margin: 0,
    },
    viewBodyModal: {
        gap: 12,
        maxHeight: appConfig.height * 0.8
    },
    dropDownContainerStyle: {
		borderColor: appColors.nau,
		backgroundColor: appColors.xamNhat,
		borderTopWidth: 0,
		zIndex: 205,
		position: 'absolute',
		top: 50,
	},
	dropDownContainerTopStyle: {
		borderColor: appColors.nau,
		backgroundColor: appColors.xamNhat,
		borderTopWidth: 0,
		zIndex: 205,
	},
	dropDownPicker: {
		borderColor: appColors.xam,
		backgroundColor: appColors.trang,
		zIndex: 203,
	},
    flex1: {
        flex: 1
    }
})