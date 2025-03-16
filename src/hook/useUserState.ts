import { userSelectors } from "../redux/selectors/userSelectors"
import { UserState } from "../redux/slices/type"
import { useAppSelector } from "../redux/stores/hook"

export const useUserState = () => {
	const userState : UserState = useAppSelector(userSelectors)
	return {
		user: userState,
	}
}
