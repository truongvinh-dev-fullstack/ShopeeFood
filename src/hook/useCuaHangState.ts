import { cuaHangSelectors } from "../redux/selectors"
import { CuaHangState } from "../redux/slices/type"
import { useAppSelector } from "../redux/stores/hook"

export const useCuaHangState = () => {
	const cuaHangs : CuaHangState = useAppSelector(cuaHangSelectors)
	return {
		cuaHangs: cuaHangs.items,
        loading: cuaHangs.isLoading
	}
}
