import React from 'react'
import { StyleProp, StyleSheet, Text, TextProps, TextStyle } from 'react-native'
import { appFontSizes } from '../../constants/fontSize'
import { appColors } from '../../constants/color'

export type AppTextProps = {
	fontSize?: keyof typeof appFontSizes
	color?: keyof typeof appColors
	fontWeight?:
		| 'normal'
		| 'bold'
		| '100'
		| '200'
		| '300'
		| '400'
		| '500'
		| '600'
		| '700'
		| '800'
		| '900'
		| undefined
} & TextProps

export const AppText = (props: TextProps) => {
	console.log("props: ", props)
	const customStyle = {
		lineHeight: appFontSizes["small"] + 6,
		fontSize: appFontSizes["small"],
		color: 'black',
		fontWeight: '400',
		fontFamily: 'Cabin-Medium',
	}
	const styleDefault = StyleSheet.flatten([customStyle as StyleProp<TextStyle>, props.style])

	return (
		<Text {...props} style={[styleDefault]}>
			{/* {children} */}
		</Text>
	)
}
