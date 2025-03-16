import { OrderType } from "../redux/slices/type"
import { useAppDispatch } from "../redux/stores/hook"
import { addOrder } from "../redux/slices/orderSlice"


export const useOrderActions = () => {
	const dispatch = useAppDispatch()

	const addListOrder= async (data: OrderType) => {
		dispatch(addOrder(data))
	}
	return {
		addListOrder,
	}
}
