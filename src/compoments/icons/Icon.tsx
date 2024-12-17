//@ts-nocheck
import _ from 'lodash'
import React from 'react'
import {
	ImageRequireSource,
	ImageStyle,
	StyleSheet,
	ViewStyle,
	StyleProp,
	TouchableOpacity,
	ImageURISource,
} from 'react-native'
import FastImage from 'react-native-fast-image'
import { appColors } from 'src/constants'

export type IAppIconTheme = {
	button: StyleProp<ViewStyle>
	icon: StyleProp<ImageStyle>
}

type AppIconProps = {
	source?: ImageRequireSource | ImageURISource
	Icon?: React.ReactNode
	onPress?: () => void
	theme?: AppIconTheme
	style?: StyleProp<ViewStyle>
	width?: any
	height?: any
	tintColor?: any
}
const AppIcon: React.FC<AppIconProps> = React.memo(
	({ source, style, onPress, Icon, tintColor, height = 24, width = 24, theme = styles }) => {
		return (
			<TouchableOpacity onPress={onPress} disabled={!onPress} style={[theme.button, style]}>
				{source ? (
					<FastImage
						resizeMode="contain"
						source={source}
						style={{ ...theme.icon, width: width, height: height }}
						tintColor={tintColor}
					/>
				) : (
					Icon
				)}
			</TouchableOpacity>
		)
	},
	(prevProps, nextProps) => {
		// Custom comparison logic here
		// Return true if the props are equal, false otherwise
		return _.isEqual(prevProps, nextProps)
	},
)
const styles = StyleSheet.create({
	button: {
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		resizeMode: 'contain',
	},
})

export default AppIcon
