import { StyleSheet } from 'react-native'
import { appColors } from '../constants/color'
import { appFontSizes } from '../constants/fontSize'

const fontDefault = {
	fontFamily: 'Cabin-Medium',
}

export const textStyles = StyleSheet.create({
	textMainButton: {
		...fontDefault,
		color: appColors.white,
		lineHeight: 20,
		fontWeight: '700',
		fontSize: appFontSizes.medium,
	},
	textLabelLager: {
		...fontDefault,
		fontWeight: '700',
		fontSize: appFontSizes.extraLarge,
		lineHeight: 30.36,
	},
	textLagerBold: {
		...fontDefault,
		fontWeight: '700',
		fontSize: appFontSizes.large,
		lineHeight: 22.77,
	},
	textNormal: {
		...fontDefault,
		fontWeight: '400',
		fontSize: appFontSizes.small,
		lineHeight: 32,
		color: appColors.black,
	},
	textNormalMedium: {
		...fontDefault,
		fontWeight: '500',
		fontSize: appFontSizes.small,
		lineHeight: 20,
		color: appColors.main,
	},
	textContent: {
		...fontDefault,
		fontWeight: '400',
		fontSize: appFontSizes.small,
		lineHeight: 14,
		color: appColors.black,
	},
	textMediumBold: {
		...fontDefault,
		fontWeight: '700',
		fontSize: appFontSizes.medium,
		lineHeight: 20.24,
		color: appColors.black,
	},
	textExtraSmall: {
		...fontDefault,
		fontWeight: '400',
		fontSize: appFontSizes.extraSmall,
		lineHeight: 12,
		color: appColors.white,
	},
	textExtraSmallBold: {
		...fontDefault,
		fontWeight: '700',
		fontSize: appFontSizes.extraSmall,
		lineHeight: 15.8,
		color: appColors.black,
	},
	textExtraSmallMedium: {
		...fontDefault,
		fontWeight: '500',
		fontSize: appFontSizes.extraSmall,
		lineHeight: 15.8,
		color: appColors.gray_1,
	},
	textNomalBold: {
		...fontDefault,
		color: appColors.main,
		lineHeight: 20,
		fontWeight: '700',
		fontSize: appFontSizes.small,
	},
	textExtraSmallContent: {
		...fontDefault,
		color: appColors.black,
		lineHeight: 20,
		fontWeight: '400',
		fontSize: 14,
	},
})
