import { setDanhSachCuaHang, setLoadingCuaHang } from "../redux/slices/cuaHangSlice"
import { CuaHangType } from "../redux/slices/type"
import { useAppDispatch } from "../redux/stores/hook"


export const useCuaHangActions = () => {
	const dispatch = useAppDispatch()

	const setDanhSachCuaHangRedux = async (data: CuaHangType[]) => {
		dispatch(setDanhSachCuaHang(data))
		// await onCountUnseenNotification();
	}

    const setLoadingCuaHangRedux = async () => {
		dispatch(setLoadingCuaHang({}))
		// await onCountUnseenNotification();
	}
	
	return {
		setDanhSachCuaHangRedux,
        setLoadingCuaHangRedux
	}
}
