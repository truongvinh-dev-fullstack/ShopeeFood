import {
	createNavigationContainerRef,
	DrawerActions,
	NavigationContainerRef,
} from '@react-navigation/native'
// Tạo một biến tham chiếu đến navigation container
export const navigationRef: NavigationContainerRef<any> | null = createNavigationContainerRef()

// Cài đặt tham chiếu đến navigation container

// Lấy tham chiếu đến navigation container
export function getNavigationRef() {
	return navigationRef
}

// Điều hướng đến một màn hình mới
export function navigate(name: string, params?: object) {
	if(navigationRef?.isReady()){
		navigationRef?.navigate(name, params)
		navigationRef.getCurrentRoute()
	}
	
}

export function getNameNavige() {
	if(navigationRef?.isReady()){
		return navigationRef.getCurrentRoute()
	}
}
// Điều hướng quay lại màn hình trước đó
export function goBack() {
	navigationRef?.goBack()
}

export function openDrawer() {
	navigationRef?.dispatch(DrawerActions.openDrawer())
}

export function closeDrawer() {
	navigationRef?.dispatch(DrawerActions.closeDrawer())
}

export function toggleDrawer() {
	navigationRef?.dispatch(DrawerActions.toggleDrawer())
}

export function jumpToDrawer(name: string, params?: object) {
	navigationRef?.dispatch(DrawerActions.jumpTo(name, params))
}

// Điều hướng đến một màn hình khác và xóa lịch sử điều hướng hiện tại
export function resetRoot(name: string, params?: object) {
	navigationRef?.resetRoot({
		index: 0,
		routes: [{ name, params }],
	})
}
