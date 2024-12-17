import React, { useRef } from 'react'
import {
	StyleProp,
	StyleSheet,
	TextInput,
	View,
	ViewStyle,
	KeyboardType,
	TextStyle,
	TextInputProps,
	Text,
	TouchableOpacity,
} from 'react-native'
// import { RegisterOptions } from 'react-hook-form/dist/types/validator'
import FastImage, { ImageStyle, Source } from 'react-native-fast-image'
import { appFontSizes } from '../../constants/fontSize'
import { appColors } from '../../constants/color'
import { textStyles } from '../../themes/TextStyles'

export type IAppInputTheme = {
	textInput: ViewStyle
	input: ViewStyle
	label: TextStyle
	error: TextStyle
	labelWrapper: TextStyle
	icon: ImageStyle
}

export type IAppInputProps = {
	ref?: any
	label?: string
	placeHolder?: string
	keyboardType?: KeyboardType
	style?: StyleProp<ViewStyle>
	inputStyle?: StyleProp<TextStyle>
	secureTextEntry?: boolean
	rules?: any
	disabled?: boolean
	required?: boolean
	multiLine?: boolean
	maxLength?: number
	iconLeft?: Source
	iconRight?: Source
	iconLeftColor?: string
	theme?: IAppInputTheme
	IconRight?: React.ReactNode
	IconLeft?: React.ReactNode
	numberOfLines?: number
	unitNameRight?:string
	value?:string
	onPressRight?: () => void
} & TextInputProps

export const AppInput = (props: IAppInputProps) => {
	let theme = styles
	return (
		<View style={props?.style}>
			{props?.label ? (
				<View style={theme.labelWrapper}>
					<Text style={theme.label}>{props?.label}</Text>
					{props?.required && props?.label ? (
						<Text style={{ fontSize: appFontSizes.small, color: appColors.do }}>{'⁕'}</Text>
					) : null}
				</View>
			) : null}
			<View style={[theme.textInput, props?.inputStyle]}>
				{props?.iconLeft ? (
					<FastImage
						source={props?.iconLeft}
						style={theme.icon}
						tintColor={props?.iconLeftColor || appColors.cam}
					/>
				) : null}
				{props?.IconLeft ? props?.IconLeft : null}
				<TextInput
					style={[theme.input]}
					placeholder={props?.placeHolder}
					keyboardType={props?.keyboardType}
					placeholderTextColor={appColors.xam}
					secureTextEntry={props?.secureTextEntry}
					editable={!props?.disabled}
					multiline={props?.multiLine}
					maxLength={props?.maxLength}
					numberOfLines={props?.numberOfLines}
					value={props?.value}
					{...props}
				/>
				{props?.iconRight ? <FastImage style={theme.icon} source={props?.iconRight} /> : null}
				{props?.IconRight ?
					<TouchableOpacity onPress={props?.onPressRight}>
						{props?.IconRight}
					</TouchableOpacity>
				: null}
				{props?.unitNameRight ? <Text style = {textStyles.textContent}>{props?.unitNameRight}</Text> : null}
			</View>
		</View>
	)
}
const styles = StyleSheet.create({
	textInput: {
		height: 48,
		borderColor: appColors.xam,
		borderWidth: 1,
		borderRadius: 8,
		paddingHorizontal: 12,
		fontSize: appFontSizes.medium,
		flexDirection: 'row',
		justifyContent: 'flex-start',
		alignItems: 'center',
		gap: 10
	},
	input: {
		// marginLeft: 20,
		flex: 1,
		color: appColors.den
	},
	label: { marginBottom: 8, marginRight: 5, color: appColors.den },
	error: { marginTop: 8, marginLeft: 10 },
	labelWrapper: { flexDirection: 'row' },
	icon: { width: 24, height: 24, resizeMode: 'contain' },
})
