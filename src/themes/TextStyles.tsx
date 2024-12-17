import { StyleSheet } from 'react-native'
import { appColors } from '../constants/color'
import { appFontSizes } from '../constants/fontSize'

const fontDefault = {
	fontFamily: 'Cabin-Medium',
}

export const textStyles = StyleSheet.create({
	textMainButton: {
		...fontDefault,
		color: appColors.trang,
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
		color: appColors.den,
	},
	textNormalMedium: {
		...fontDefault,
		fontWeight: '500',
		fontSize: appFontSizes.small,
		lineHeight: 20,
		color: appColors.cam,
	},
	textContent: {
		...fontDefault,
		fontWeight: '400',
		fontSize: appFontSizes.small,
		lineHeight: 14,
		color: appColors.den,
	},
	textMediumBold: {
		...fontDefault,
		fontWeight: '700',
		fontSize: appFontSizes.medium,
		lineHeight: 20.24,
		color: appColors.den,
	},
	textExtraSmall: {
		...fontDefault,
		fontWeight: '400',
		fontSize: appFontSizes.extraSmall,
		lineHeight: 12,
		color: appColors.den,
	},
	textExtraSmallBold: {
		...fontDefault,
		fontWeight: '700',
		fontSize: appFontSizes.extraSmall,
		lineHeight: 15.8,
		color: appColors.den,
	},
	textExtraSmallMedium: {
		...fontDefault,
		fontWeight: '500',
		fontSize: appFontSizes.extraSmall,
		lineHeight: 15.8,
		color: appColors.nau,
	},
	textNomalBold: {
		...fontDefault,
		color: appColors.cam,
		lineHeight: 20,
		fontWeight: '700',
		fontSize: appFontSizes.small,
	},
	textExtraSmallContent: {
		...fontDefault,
		color: appColors.den,
		lineHeight: 20,
		fontWeight: '400',
		fontSize: 14,
	},
})
