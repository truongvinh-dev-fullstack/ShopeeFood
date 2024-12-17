import React, { useCallback, useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { RootStackParamList } from './RootStackParamList '
import { RouteNames } from './RouteNames'
import LoginScreen from '../screen/auth/login'




const { Navigator, Screen } = createStackNavigator<RootStackParamList>()
export default function RootNavigator() {
	const [initialRouteName, setInitialRouteName] = useState<keyof RootStackParamList>()
	useEffect(() => {
	}, [])

	return (
		<Navigator
			screenOptions={{ headerShown: false, gestureEnabled: false }}
			initialRouteName={initialRouteName}
		>
			<Screen options={{gestureEnabled: false, headerLeft: () => null}} name={RouteNames.LOGIN} component={LoginScreen} />
			{/* <Screen name={RouteNames.MAIN} component={BottomTabScreen} /> */}
		</Navigator>
	)
}
