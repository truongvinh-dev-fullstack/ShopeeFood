import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ViewStyle, TextStyle } from 'react-native'
import DatePicker from 'react-native-date-picker'
import AppIcon from '../icons/Icon'
import { appColors } from '../../constants/color'
import { formatDate } from '../../helper/postServices'
import { textStyles } from '../../themes/TextStyles'
import Ionicons from 'react-native-vector-icons/Ionicons';

export type AppDatePickerProps = {
	labelColor?: string
	label?: string
	require?: boolean
	style?: ViewStyle
	dateSelected: Date | undefined
	minDate?: Date | undefined
	maxDate?: Date
	onDateChange: (date: Date) => void,
	mode?: string,
	format?: string,
	showIcon?: boolean,
	styleText?: TextStyle
}

const AppDatePicker: React.FC<AppDatePickerProps> = ({
	label,
	require,
	style,
	dateSelected,
	onDateChange,
	minDate,
	maxDate,
	mode = 'date',
	format,
	showIcon = true,
	styleText,
	labelColor = appColors.den,
}) => {
	const [open, setOpen] = useState(false)
	const onPress = () => setOpen(true)
	return (
		<>
			<View style={[{ gap: 8 }]}>
				{label ? (
					<Text
						style={[
							textStyles.textNormalMedium,
							{ color: appColors.den, alignItems: 'center', justifyContent: 'center' },
						]}>
						{label} {require ? <Text style={{ color: appColors.do }}>{'⁕'}</Text> : null}
					</Text>
				) : null}
				<TouchableOpacity onPress={onPress} style={[styles.dropdown, style]}>
					<Text adjustsFontSizeToFit={true} numberOfLines={1}  style={[styles.text,styleText]}>{dateSelected ? formatDate(dateSelected,format ? format : 'dd/MM/YYYY') : format?.toString()}</Text>
					{showIcon ? <Ionicons name='calendar' color={appColors.cam} size={25} /> : null}
				</TouchableOpacity>
			</View>
			<DatePicker
				modal
				open={open}
				date={dateSelected ?? new Date()}
				onConfirm={(date) => {
					setOpen(false)
					onDateChange(date)
				}}
				onCancel={() => {
					setOpen(false)
				}}
				mode={mode ? mode : 'date'}
				title="Chọn ngày"
				locale="vi-VN"
				confirmText='Xác nhận'
				cancelText='Hủy'
				// minDate={minDate}
				// maximumDate={maxDate}
			/>
		</>
	)
}

export default AppDatePicker

const styles = StyleSheet.create({
	dropdown: {
		height: 45,
		backgroundColor: appColors.trang,
		borderRadius: 8,
		padding: 12,
		borderColor: appColors.nau,
		borderWidth: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		// width: "60%"
	},
	txRequire: {
		color: appColors.do,
	},
	icon: {
		marginRight: 5,
	},
	item: {
		padding: 17,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textItem: {
		flex: 1,
		fontSize: 16,
	},
	placeholderStyle: {
		fontSize: 16,
	},
	selectedTextStyle: {
		fontSize: 16,
	},
	iconStyle: {
		width: 20,
		height: 20,
	},
	inputSearchStyle: {
		height: 40,
		fontSize: 16,
	},
	text: {
		color: appColors.den
	}
})
