import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { icons } from 'src/assets/icons'
import { Source } from 'react-native-fast-image'
import { appColors } from 'src/constants'

import _ from 'lodash'
import { navigate } from '../NavigationService'
import AppIcon from 'src/components/icons/Icon'

export const DrawerChildItem: React.FC<IDrawerChildItem> = React.memo(({ ...props }) => {
	const onPress = () => {
		navigate(props.routerName)
	}

	return (
		<TouchableOpacity onPress={onPress} style={styles.container}>
			<View style={styles.viewRow}>
				<AppIcon source={icons.ic_auth_user} />
				<Text>{props.label}</Text>
			</View>
			<View style={styles.viewRow}>
				<AppIcon source={icons.ic_chevron_right} />
			</View>
		</TouchableOpacity>
	)
})

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		borderWidth: 1,
		paddingHorizontal: 8,
		paddingVertical: 10,
		borderColor: appColors.border,
		backgroundColor: appColors.drawer_item_bg,
		justifyContent: 'space-between',
		borderRadius: 6,
		marginBottom: 12,
	},
	viewRow: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 12,
	},
})
