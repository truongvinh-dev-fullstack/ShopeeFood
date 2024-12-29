import React from 'react'
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native'
import Modal, { ModalProps } from 'react-native-modal'
import AppIcon from '../icons/Icon'
import { icons } from '../../assets/icons'
import { appColors } from '../../constants/color'

type AppModalProps = {
	isVisible?: boolean
	onCloseModal: () => void
	children: React.ReactNode
	contentStyle?: any
	[x: string]: any
}

export const AppModal = ({
	onCloseModal,
	children,
	contentStyle ,
	isVisible = true,
	...props
}: AppModalProps) => {
	return (
		<Modal
			isVisible={isVisible}
			animationInTiming={800}
			animationOutTiming={800}
			backdropTransitionInTiming={800}
			backdropTransitionOutTiming={800}
			onBackdropPress={onCloseModal}
			style={[contentStyle]}
			{...props}>
			{children}
		</Modal>
	)
}

const ModalContainer = ({ children }: { children: React.ReactNode }) => (
	<View style={styles.container}>{children}</View>
)

const ModalHeader = ({ title, onCloseModal }: { title: string; onCloseModal: () => void }) => (
	<View style={styles.header}>
		<Text style={styles.textHeader}>{title}</Text>
		<AppIcon source={icons.ic_cancel} onPress={onCloseModal} />
	</View>
)

const ModalBody = ({ children, style }: { children?: React.ReactNode; style?: ViewStyle }) => (
	<View style={{ ...styles.body, ...style }}>{children}</View>
)

const ModalFooter = ({ children }: { children?: React.ReactNode }) => (
	<View style={styles.footer}>{children}</View>
)

const styles = StyleSheet.create({
	container: {
		backgroundColor: appColors.trang,
		borderRadius: 15,
		bottom: 0,
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingVertical: 15,
		paddingHorizontal: 20,
		backgroundColor: appColors.cam,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	textHeader: {
		textAlign: 'left',
		fontWeight: '700',
		lineHeight: 20,
		fontSize: 15,
		color: appColors.trang,
	},
	body: {
		justifyContent: 'center',
		paddingHorizontal: 16,
		paddingVertical: 22,
		minHeight: 50,
	},
	footer: {
		padding: 16,
	},
})

AppModal.Header = ModalHeader
AppModal.Container = ModalContainer
AppModal.Body = ModalBody
AppModal.Footer = ModalFooter
