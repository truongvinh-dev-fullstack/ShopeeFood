import { orderSelectors } from "../redux/selectors/orderSelectors"
import { OrderState } from "../redux/slices/type"
import { useAppSelector } from "../redux/stores/hook"

export const useOrderState = () => {
	const orderState : OrderState = useAppSelector(orderSelectors)
	return {
		orders: orderState.items,
	}
}
