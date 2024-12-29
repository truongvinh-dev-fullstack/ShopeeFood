import { StyleProp } from 'react-native/types'
import {
	TouchableOpacity,
	ViewStyle,
	Text,
	TextStyle,
	TouchableOpacityProps,
	StyleSheet,
} from 'react-native'
import React from 'react'
import FastImage, { ImageStyle, Source } from 'react-native-fast-image'
import { textStyles } from '../../themes/TextStyles'
import { appColors } from '../../constants/color'
import _ from 'lodash'
export type IButtonTheme = {
	button?: ViewStyle
	text?: TextStyle
	iconLeft?: ImageStyle | undefined
	iconRight?: ImageStyle | undefined
}
type ButtonProps = {
	label: string
	theme?: IButtonTheme
	onPress?: () => void
	style?: StyleProp<ViewStyle>
	styleText?: StyleProp<TextStyle>
	iconLeft?: Source
	iconRight?: Source
	labelColor?: string
	buttonColor?: string
	disabled?: boolean
	IconLeft?: React.ReactNode
	IconRight?: React.ReactNode
} & TouchableOpacityProps

const Button: React.FC<ButtonProps> = React.memo(
	({
		disabled,
		label,
		onPress,
		style,
		styleText,
		buttonColor,
		iconLeft,
		IconLeft,
		IconRight,
		iconRight,
		labelColor,
		theme = mainButtonStyle,
		...props
	}) => {
		return (
			<TouchableOpacity
				disabled={!onPress}
				style={[theme.button, style, buttonColor ? { backgroundColor: buttonColor } : {}]}
				onPress={onPress}
				{...props}>
				{iconLeft ? (
					<FastImage source={iconLeft} resizeMode="contain" style={theme.iconLeft} />
				) : null}
				{IconLeft ? IconLeft : null}
				<Text style={[{ ...theme.text, color: labelColor || theme.text?.color },styleText]}>{label}</Text>
				{iconRight ? (
					<FastImage source={iconRight} resizeMode="contain" style={theme.iconRight} />
				) : null}
				{IconRight ? IconRight : null}
			</TouchableOpacity>
		)
	},
	(prevProps, nextProps) => {
		const areFunctionPropsEqual =
			_.isEqual(prevProps.theme, nextProps.theme) &&
			_.isEqual(prevProps.style, nextProps.style) &&
			_.isEqual(prevProps.label, nextProps.label) &&
			_.isEqual(prevProps.onPress, nextProps.onPress)
		return areFunctionPropsEqual
	},
)

const mainButtonStyle: IButtonTheme = StyleSheet.create({
	text: textStyles.textMainButton,
	button: {
		flexDirection: 'row',
		gap: 10,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 8,
		height: 44,
		// paddingHorizontal:45,
		flexGrow: 1,
		backgroundColor: appColors.cam,
	},
	iconLeft: {
		width: 20,
		height: 20
	},
	iconRight: {
		width: 20,
		height: 20
	}
})

export default Button
