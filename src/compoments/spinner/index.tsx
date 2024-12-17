// LoadingManager.js

import React from 'react'
import { Modal, ActivityIndicator, View, StyleSheet } from 'react-native'
import { appColors } from '../../constants/color'
import { useLoading } from '../../hook/LoadingContex'

const Spinner = () => {
	const { isLoading } = useLoading()
	return (
		<Modal transparent animationType="slide" visible={isLoading}>
			<View style={styles.modalContainer}>
				<ActivityIndicator size="large" color={appColors.camDam} />
			</View>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		// backgroundColor: 'rgba(0, 0, 0, 0.5)',
	},
})

export default Spinner
