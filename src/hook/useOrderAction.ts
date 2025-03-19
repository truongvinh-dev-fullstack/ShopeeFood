import { OrderType } from "../redux/slices/type"
import { useAppDispatch } from "../redux/stores/hook"
import { addOrder, removeItem } from "../redux/slices/orderSlice"


export const useOrderActions = () => {
	const dispatch = useAppDispatch()

	const addListOrder= async (data: OrderType) => {
		dispatch(addOrder(data))
	}
	const removeItemOrder= async (id: string) => {
		dispatch(removeItem(id))
	}
	return {
		addListOrder,
		removeItemOrder
	}
}
