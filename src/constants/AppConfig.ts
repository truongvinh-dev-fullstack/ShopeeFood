import { Dimensions, Platform } from 'react-native'
const dimen = Dimensions.get('window')
const isIphoneWithNotch = () => {
	return (
		Platform.OS === 'ios' &&
		!Platform.isPad &&
		!Platform.isTV &&
		(dimen.height === 780 ||
			dimen.width === 780 ||
			dimen.height === 812 ||
			dimen.width === 812 ||
			dimen.height === 844 ||
			dimen.width === 844 ||
			dimen.height === 896 ||
			dimen.width === 896 ||
			dimen.height === 926 ||
			dimen.width === 926)
	)
}
const appConfig = {
	isAndroid: Platform.OS === 'android',
	isIOS: Platform.OS === 'ios',
	statusBarHeight: Platform.select({
		ios: isIphoneWithNotch() ? 50 : 50,
		// android: StatusBar.currentHeight,
		android: 0,
		default: 0,
	}),
	width: dimen.width,
	height: dimen.height,
	iconSmall: 16,
}
export { appConfig }
