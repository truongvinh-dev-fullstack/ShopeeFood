import { OrderState } from "../slices/type"

export const orderSelectors: (state: {orders: OrderState} ) => any = (state) => {
    return state.orders
}