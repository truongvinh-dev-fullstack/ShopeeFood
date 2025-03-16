import { setUserInfo } from "../redux/slices/userSlice"
import { UserState } from "../redux/slices/type"
import { useAppDispatch } from "../redux/stores/hook"


export const useUserActions = () => {
	const dispatch = useAppDispatch()

	const setUserInfoRedux = async (data: UserState) => {
		dispatch(setUserInfo(data))
		// await onCountUnseenNotification();
	}
  
	
	return {
		setUserInfoRedux,
	}
}
