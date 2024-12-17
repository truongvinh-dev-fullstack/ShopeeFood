import { Toast } from 'react-native-toast-message/lib/src/Toast'
import { Dimensions, Platform } from 'react-native'
// import { HTTPS_URL, HTTP_URL } from '../config';

const monthNames = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
]

const dayOfWeek = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'CN']
const dayOfWeek_2 = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN']
const dayOfWeek_3 = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7']

export const selectWeek = (date: any) => {
	return Array(7)
		.fill(new Date(date))
		.map((el, idx) => new Date(el.setDate(el.getDate() - el.getDay() + idx)))
}

export const selectWeek_VN = (date: any) => {
	let newDate = new Date(date)
	newDate.setHours(0)
	newDate.setMinutes(0)
	newDate.setSeconds(0)
	newDate.setMilliseconds(0)
	let arrDate = Array(8)
		.fill(newDate)
		.map((el, idx) => new Date(el.setDate(el.getDate() - el.getDay() + idx)))
	arrDate.shift()
	return arrDate
}
export const convertArrayToObject = (array: any, key: any) => {
	return array.reduce((obj: any, item: any) => {
		return {
			...obj,
			[item[key]]: item,
		}
	}, {})
}

export const convertArrayToObjectIndex = (array: any, key: any) => {
	let obj: any = {}
	array.map((item: any, index: any) => {
		obj[item[key]] = index
	})
	return obj
}

export const regexString = (string: string) => {
	if (string?.trim() == '') {
		return true
	}
	return false
}

export const regexPhone = (string: string) => {
	if (regexString(string)) {
		return true
	}
	let reg = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\.\/0-9]*$/
	if (!reg.test(string)) {
		return true
	}
	return false
}

export const regexDecimal = (string: string) => {
	if (regexString(string)) {
		return true
	}
	let reg = /^\d+(\.\d)?\d*$/
	if (!reg.test(string)) {
		return true
	}
	return false
}

export const regexEmail = (string: string) => {
	let reg = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
	if (!reg.test(string)) {
		return true
	}
	return false
}

export const regexPassword = (string: string) => {
	// let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
	// let reg = /^(?=.*[a-z])^(?=.*[0-9])(?=.*[A-Z])(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
	let reg = /^(?=.*[a-z])^(?=.*[0-9])(?=.*[A-Z])[A-Za-z\d@$!%*?&#^()_+\-=\[\]{};':"\\|,.<>\/?]{6,}$/
	if (!reg.test(string)) {
		return true
	}
	return false
}

export const showToast = (type: any, text1: any, text2 = null, visibilityTime = 3000) => {
	let params: any
	params = {
		type,
		text1,
		text2,
		visibilityTime,
	}
	Toast.show(params)
}

export const isIphoneWithNotch = () => {
	const dimen = Dimensions.get('window')
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

export const StatusBarHeight = Platform.select({
	ios: isIphoneWithNotch() ? 50 : 50,
	// android: StatusBar.currentHeight,
	android: 0,
	default: 0,
})

const padTo2Digits = (num: any) => {
	return num.toString().padStart(2, '0')
}

export const dateToTimestamp = (date: any) => {
	return date?.getTime()
}

export const getDay = (date: any) => {
	return padTo2Digits(date.getDate())
}

export const getHouse = (date: any) => {
	date = new Date(date)
	return padTo2Digits(date.getHours()) + ':' + padTo2Digits(date.getMinutes())
}

export const getMonth = (date: any) => {
	return monthNames[date.getMonth()]
}

export const timestampToDate = (timestamp: any, type: any = null) => {
	const date = new Date(timestamp)
	// if (Platform.OS === "ios") {
	//
	// } else {
	//     date.setHours(date.getHours() - 7)
	// }
	const day = padTo2Digits(date.getDate())
	const month = padTo2Digits(date.getMonth() + 1)
	const year = date.getFullYear()
	const hours = date.getHours()
	const minutes = padTo2Digits(date.getMinutes())
	const seconds = padTo2Digits(date.getSeconds())
	if (type == 'dd/MM/YYYY hh:mm') {
		return `${day}/${month}/${year} ${hours}:${minutes}`
	} else if (type == 'YYYY-MM-dd') {
		return `${year}-${month}-${day}`
	} else if (type == 'dd/MM/YYYY hh:mm:ss') {
		return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`
	}
	return [day, month, year].join('/')
}

export const converStrToDate = (str: any) => {
	if (!str) return
	const [dateValues, timeValues] = str.split('-')
	const [year, month, day] = dateValues.split('/')
	const [hours, minutes, seconds] = timeValues.split(':')

	return new Date(year, month - 1, day, hours, minutes, seconds)
}

export const creartNewDateGMT00 = (date: any) => {
	let _date = new Date(date).getTime()
	let GMT_device = new Date().getTimezoneOffset() / 60

	return new Date(_date + GMT_device * 60 * 60 * 1000)
}

export const formatDate = (
	date: any,
	type:
		| 'dd/MM/YYYY hh:mm'
		| 'dd/MM/YYYY'
		| 'dd MM YYYY'
		| 'hh:mm'
		| 'MM YYYY'
		| 'dd/MM/YY hh:mm'
		| 'hh:mm:ss'
		| 'dd/MM/YYYY hh:mm:ss'
		| 'YYYY-MM-DD'
		| 'dd-MM-YYYY'
		| 'Thu, dd/MM/YYYY'
		| any = null,
) => {
	if (date == null) {
		return ''
	}
	date = new Date(date)

	switch (type) {
		case 'dd/MM/YYYY hh:mm':
			return `${padTo2Digits(date.getDate())}/${padTo2Digits(
				date.getMonth() + 1,
			)}/${date.getFullYear()} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}`
		case 'dd/MM/YYYY':
			return `${padTo2Digits(date.getDate())}/${padTo2Digits(
				date.getMonth() + 1,
			)}/${date.getFullYear()}`
		case 'dd-MM-YYYY':
			return `${padTo2Digits(date.getDate())}-${padTo2Digits(
				date.getMonth() + 1,
			)}-${date.getFullYear()}`
		case 'Thu, dd/MM/YYYY':
			return `${getDayOfWeek(date)}, ${padTo2Digits(date.getDate())}/${padTo2Digits(
				date.getMonth() + 1,
			)}/${date.getFullYear()}`
		case 'hh:mm':
			return `${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}`

		case 'dd MM YYYY':
			return `${padTo2Digits(date.getDate())} ${monthNames[date.getMonth()]} ${date.getFullYear()}`

		case 'MM YYYY':
			return `${monthNames[date.getMonth()]} ${date.getFullYear()}`

		case 'dd/MM/YY hh:mm':
			return `${padTo2Digits(date.getDate())}/${padTo2Digits(date.getMonth() + 1)}/${date
				.getFullYear()
				?.toString()
				.substr(-2)} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}`

		case 'hh:mm:ss':
			return `${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(
				date.getSeconds(),
			)}`

		case 'dd/MM/YYYY hh:mm:ss':
			return `${padTo2Digits(date.getDate())}/${padTo2Digits(
				date.getMonth() + 1,
			)}/${date.getFullYear()} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}`

		case 'YYYY/MM/DD-hh:mm:ss':
			return `${date.getFullYear()}/${padTo2Digits(date.getMonth() + 1)}/${padTo2Digits(
				date.getDate(),
			)}-${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}:${padTo2Digits(
				date.getSeconds(),
			)}`

		case 'MM/DD/YYYY':
			return `${monthNames[date.getMonth()]}/${padTo2Digits(date.getDate())}/${date.getFullYear()}`

		case 'DD/MM/YYYY':
			return `${padTo2Digits(date.getDate())}/${padTo2Digits(
				date.getMonth() + 1,
			)}/${date.getFullYear()}`

		case 'YYYY-MM-DD':
			return `${date.getFullYear()}-${padTo2Digits(date.getMonth() + 1)}-${padTo2Digits(
				date.getDate(),
			)}`

		case 'dd/MM/YYYY hh:mm':
			return `${padTo2Digits(date.getDate())}/${padTo2Digits(
				date.getMonth() + 1,
			)}/${date.getFullYear()} ${padTo2Digits(date.getHours())}:${padTo2Digits(date.getMinutes())}`

		case 'DD/MM':
			return `${padTo2Digits(date.getDate())}/${padTo2Digits(date.getMonth() + 1)}`
		case 'Thứ-ngày-tháng-năm':
			let thu = getDayOfWeek(date)
			return `${thu} ngày ${padTo2Digits(date.getDate())} tháng ${padTo2Digits(
				date.getMonth() + 1,
			)} năm ${date.getFullYear()}`
		case 'EEEE-DD/MM/YYYY':
			let EEEE = getDayOfWeek(date)
			return `${EEEE}, ${padTo2Digits(date.getDate())}/${padTo2Digits(
				date.getMonth() + 1,
			)}/${date.getFullYear()}`
		default:
			// return [
			//     padTo2Digits(date.getMonth() + 1),
			//     padTo2Digits(date.getDate()),
			//     date.getFullYear(),
			// ].join("/")
			return `${padTo2Digits(date.getDate())}/${padTo2Digits(
				date.getMonth() + 1,
			)}/${date.getFullYear()}`
	}
}

export const formatNumber = (value: any, lamTron = false) => {
	if (isNaN(value)) {
		return 0
	}
	if (lamTron) {
		value = Math.round(value)
	}
	let number = new Intl.NumberFormat('en-US', {
		style: 'decimal',
	}).format(value)
	if (number) {
		return number
		// return number.replace(/[.,]/g, function(x) {
		// return x == "," ? "." : ","
		// })
	}
	return 0
}

export const numberFormat = (value: any) => {
	if (isNaN(value)) {
		return 0
	}
	const config = { currency: 'VND', maximumFractionDigits: 9 }
	const formated = new Intl.NumberFormat('vi-VN', config).format(value)

	return formated
}

export const displayMultiSelect = (list: any, value: any, type: any) => {
	let label = ''
	if (value?.length && list?.length) {
		for (let i = 0; i < value.length; i++) {
			label += list[value[i]?.row][type]
			if (i != value.length - 1) {
				label += ', '
			}
		}
		return label
	}
	return ''
}

export const displaySelect = (list: any, value: any, type: any) => {
	let label = ''
	if (value && list?.length) {
		label += list[value?.row][type]
		return label
	}
	return ''
}

export const calculateDate = (date1: any, date2: any) => {
	let milliSeconds = Math.abs(date2 - date1)
	return convertToDays(milliSeconds)
}

const convertToDays = (milliSeconds: any) => {
	let days = Math.floor(milliSeconds / (86400 * 1000))
	milliSeconds -= days * (86400 * 1000)
	let hours = Math.floor(milliSeconds / (60 * 60 * 1000))
	milliSeconds -= hours * (60 * 60 * 1000)
	let minutes = Math.floor(milliSeconds / (60 * 1000))
	return `${days} days, ${hours} hours, ${minutes} minutes`
}

export const stripHtml = (html: any) => {
	const regex = /(<([^>]+)>)/gi
	return html.replace(regex, '')
}

export const getDiffDate = (date1: Date, date2: Date) => {
	date1 = new Date(date1)
	if (date1.getTime() > date2.getTime()) {
		return '+0: 00: 00: 00'
	}

	if (!date1) {
		return '+0: 00: 00: 00'
	}

	let diffTime = Math.abs(+date2 - +date1) //milliseconds

	let D = Math.floor(diffTime / (1000 * 60 * 60 * 24))

	let remain1 = diffTime - D * (1000 * 60 * 60 * 24)
	let H: any = Math.floor(remain1 / (1000 * 60 * 60))
	if (H < 10) {
		H = '0' + H
	}

	let remain2 = remain1 - H * (1000 * 60 * 60)
	let M: any = Math.floor(remain2 / (1000 * 60))
	if (M < 10) {
		M = '0' + M
	}

	let remain3 = remain2 - M * (1000 * 60)
	let S: any = Math.floor(remain3 / 1000)
	if (S < 10) {
		S = '0' + S
	}

	return '+' + D + ': ' + H + ': ' + M + ': ' + S
}

export const getRemainDay = (date1: Date, date2: Date) => {
	date1 = new Date(date1)
	date2 = new Date(date2)
	if (date1.getTime() > date2.getTime()) {
		return '0-days Remaining'
	}

	if (!date1 || !date2) {
		return '0-days Remaining'
	}

	let diffTime = Math.abs(+date2 - +date1) //milliseconds

	let D = Math.floor(diffTime / (1000 * 60 * 60 * 24))

	return D + '-days Remaining'
}

export const getQueryVariable = (url: string) => {
	let regex = /[?&]([^=#]+)=([^&#]*)/g,
		params: any = {},
		match
	while ((match = regex.exec(url))) {
		params[match[1]] = match[2]
	}
	return params
}

export const getDaysInMonth = (time: any) => {
	time = timestampToDate(time, 'YYYY-MM-dd')
	time = new Date(time)
	let month = padTo2Digits(time.getMonth())
	month = parseInt(month)
	let year = time.getFullYear()
	year = parseInt(year)

	const date = new Date(year, month, 1)
	const days = []
	while (date.getMonth() === month) {
		date.setHours(7, 0, 0)
		days.push(new Date(date))
		date.setDate(date.getDate() + 1)
	}
	return days
}

export const dates = (current: any) => {
	current = new Date(current)
	current.setHours(7, 0, 0)
	const week: any = []
	// Starting Monday not Sunday
	if (current.getDay() == 0) {
		current.setDate(current.getDate() - 1)
	}
	current.setDate(current.getDate() - current.getDay() + 1)
	for (let i = 0; i < 7; i++) {
		week.push(new Date(current))
		current.setDate(current.getDate() + 1)
	}
	for (let i = 0; i < week.length; i++) {
		week[i] = dayOfWeek[week[i]?.getDay()]
	}
	return week
}

export const getDayOfWeek = (date: any) => {
	date = new Date(date)
	date.setDate(date.getDate() - 1)
	return dayOfWeek[date.getDay()]
}

export const getDayOfWeek_2 = (date: any) => {
	date = new Date(date)
	date.setDate(date.getDate() - 1)
	return dayOfWeek_2[date.getDay()]
}

export const getFullDayOfWeek = () => {
	const today = new Date()
	const currentDay = today.getDay() // 0 is Sunday, 1 is Monday, ..., 6 is Saturday
	console.log('get fullday')
	const startOfCurrentWeek = new Date(today)
	startOfCurrentWeek.setDate(today.getDate() - currentDay) // Move to the start of the week

	const weekDates = []
	for (let i = 0; i < 7; i++) {
		const currentDate = new Date(startOfCurrentWeek)
		currentDate.setDate(startOfCurrentWeek.getDate() + i)
		weekDates.push({
			day: dayOfWeek_3[currentDate.getDay()],
			date: `${padTo2Digits(currentDate.getDate())}/${padTo2Digits(currentDate.getMonth() + 1)}`,
			fullDate: currentDate,
		})
	}

	return weekDates
}

export const getRandomColor = () => {
	var letters = '0123456789ABCDEF'
	var color = '#'
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}
export const getDatesInRange = (startDate: any, endDate: any) => {
	const start = new Date(new Date(startDate).setUTCHours(0, 0, 0, 0))
	const end = new Date(new Date(endDate).setUTCHours(0, 0, 0, 0))

	const date = new Date(start.getTime())

	const dates = []

	while (date <= end) {
		dates.push(new Date(date))
		date.setDate(date.getDate() + 1)
	}

	return dates
}

export const formatCurrency = (number: number | string) => {
	// currencySymbol = '$'
	// Chuyển đổi số thành chuỗi và ngược lại để xử lý trường hợp số âm
	const numberString = typeof number === 'number' ? number.toFixed(2) : Number(number).toFixed(2)

	// Tách phần nguyên và phần thập phân
	const [integerPart, decimalPart] = numberString.split('.')

	// Thêm dấu chấm phẩy phân tách hàng nghìn
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

	// Kết hợp phần nguyên và phần thập phân để tạo số đã định dạng
	const formattedNumber = `${formattedInteger}.${decimalPart}`

	// Thêm ký tự đơn vị tiền tệ
	return number ? `${formattedNumber}` : '0'
}

export const formatCurrencyInput = (number: number | string) => {
	// currencySymbol = '$'
	// Chuyển đổi số thành chuỗi và ngược lại để xử lý trường hợp số âm
	const absoluteValue = Math.abs(Number(number)).toFixed(2)

	// Tách phần nguyên và phần thập phân
	const [integerPart, decimalPart] = absoluteValue.split('.')

	// Thêm dấu chấm phẩy phân tách hàng nghìn
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',')

	// Kết hợp phần nguyên và phần thập phân để tạo số đã định dạng
	const formattedNumber = `${formattedInteger}.${decimalPart}`

	// Thêm ký tự đơn vị tiền tệ
	return number ? `${formattedNumber}` : ''
}

export const calculateDaysBetweenDates = (startDate: Date | string, endDate: Date | string) => {
	// Convert both dates to milliseconds
	let start = new Date(startDate)
	let end = new Date(endDate)
	const startMillis = start.getTime()
	const endMillis = end.getTime()

	// Calculate the difference in milliseconds
	const differenceMillis = endMillis - startMillis

	// Convert the difference to days
	const daysDifference = Math.ceil(differenceMillis / (1000 * 60 * 60 * 24))

	return daysDifference + 1
}

export const getDateRange = (type: number) => {
	let currentDate = new Date()
	let DateRange = {
		fromDate: new Date(),
		toDate: new Date(),
	}
	switch (type) {
		case 1: // Tháng này
			DateRange.fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1)
			DateRange.toDate = new Date()
			break
		case 2: // Tháng trước
			DateRange.fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
			DateRange.toDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0)
			break
		case 3: // 3 tháng
			DateRange.fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1)
			DateRange.toDate = new Date()
			break
		case 4: // 6 tháng
			DateRange.fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1)
			DateRange.toDate = new Date()
			break
		case 5: // Năm nay
			DateRange.fromDate = new Date(currentDate.getFullYear(), 0, 1)
			DateRange.toDate = new Date()
			break
		case 6: // Năm trước
			DateRange.fromDate = new Date(currentDate.getFullYear() - 1, 0, 1)
			DateRange.toDate = new Date(currentDate.getFullYear() - 1, 11, 31)
			break
		case 7: // Tùy chọn
			DateRange.fromDate = new Date()
			DateRange.toDate = new Date()
			break
		case 8: // Tất cả
			DateRange.fromDate = undefined
			DateRange.toDate = undefined
			break
		default:
			throw new Error('Invalid type')
	}

	return DateRange
}

export const getDateRange2 = (type: number) => {
	let currentDate = new Date()
	let DateRange = {
		fromDate: new Date(),
		toDate: new Date(),
	}
	switch (type) {
		case 1:
			DateRange.fromDate = new Date(currentDate.getFullYear(), 0, 1) // Tháng 1
			DateRange.toDate = new Date(currentDate.getFullYear(), 11, 31) // Cuối tháng 12
			break
		case 2: // 3 tháng (Tháng hiện tại - 2 tháng trước)
			DateRange.fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 2, 1)
			DateRange.toDate = new Date()
			break
		case 3: // 6 tháng (Tháng hiện tại - 5 tháng trước)
			DateRange.fromDate = new Date(currentDate.getFullYear(), currentDate.getMonth() - 5, 1)
			DateRange.toDate = new Date()
			break
		case 4: // 3 năm (năm hiện tại - 2 năm trước)
			DateRange.fromDate = new Date(currentDate.getFullYear() - 2, currentDate.getMonth(), 1)
			DateRange.toDate = new Date()
			break
		case 5: // 5 năm (năm hiện tại - 4 năm trước)
			DateRange.fromDate = new Date(currentDate.getFullYear() - 4, currentDate.getMonth(), 1)
			DateRange.toDate = new Date()
			break
		case 6: // Tùy chọn
			break
		default:
			throw new Error('Invalid type')
	}

	return DateRange
}

export const convertDateToIOSString = (value: any) => {
	if (!value) return null
	const date = new Date(value)
	const year = date.getFullYear().toString().padStart(4, '0') // Lấy năm và thêm '0' nếu cần
	const month = (date.getMonth() + 1).toString().padStart(2, '0') // Lấy tháng và thêm '0' nếu cần
	const day = date.getDate().toString().padStart(2, '0') // Lấy ngày và thêm '0' nếu cần
	const hours = date.getHours().toString().padStart(2, '0') // Lấy giờ và thêm '0' nếu cần
	const minutes = date.getMinutes().toString().padStart(2, '0') // Lấy phút và thêm '0' nếu cần
	const seconds = date.getSeconds().toString().padStart(2, '0') // Lấy giây và thêm '0' nếu cần

	const isoString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
	// console.log(isoString); // In ra định dạng "2024-01-10T05:55:00" hoặc tương tự tùy vào thời điểm bạn chạy đoạn mã này
	return isoString
}

export const getFirstAndLastDayOfMonth = (year: number, month: number) => {
	// Kiểm tra xem tháng có hợp lệ không (từ 0 đến 11)
	if (month < 0 || month > 11) {
		return null
	}

	// Tạo một đối tượng Date với ngày đầu tiên của tháng
	let firstDay = new Date(year, month, 2)

	// Tạo một đối tượng Date với ngày cuối cùng của tháng bằng cách lấy ngày cuối cùng của tháng tiếp theo và trừ đi 1
	let lastDay = new Date(year, month + 1, 1)

	return {
		firstDay: firstDay,
		lastDay: lastDay,
	}
}

export const checkPermission = (permission: string, listAllPermission: string) => {
	let find = listAllPermission?.search(permission)
	if (find >= 0) return true
	return false
}

export const isDecimal = (str: any) => {
	// Biểu thức chính quy để kiểm tra số thập phân, bao gồm trường hợp chỉ có phần thập phân
	const regex = /^\d+(\.\d*)?$/
	return regex.test(str)
}

export function checkDinhDangKichThuoc(str: string) {
	const  regex = /^\d+x\d+(x\d+)?$/;
	return regex.test(str);
}

export const calculateDateDifference = (date1: any, date2: any) => {
	// Chuyển đổi ngày thành đối tượng Date
	const d1 = new Date(date1).getTime()
	const d2 = new Date(date2).getTime()

	// Tính số milliseconds giữa hai ngày
	const timeDifference = Math.abs(d2 - d1)

	// Chuyển đổi milliseconds thành ngày
	const dayDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))

	return dayDifference + 1
}

export const hexToRgba = (hex: string, alpha = 1) => {
	// Loại bỏ dấu #
	hex = hex.replace('#', '');
  
	// Chuyển hex thành RGB
	let r = parseInt(hex.substring(0, 2), 16);
	let g = parseInt(hex.substring(2, 4), 16);
	let b = parseInt(hex.substring(4, 6), 16);
  
	// Trả về chuỗi rgba
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }