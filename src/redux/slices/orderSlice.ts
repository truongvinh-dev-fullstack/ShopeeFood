import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {OrderType, OrderState} from './type';

const initialState: OrderState = {
  items: [],
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addOrder(state: OrderState, action: PayloadAction<OrderType>) {
      const existingItem = state.items.find(
        item => item.id === action.payload.id,
      );
      if (existingItem) {
        existingItem.quantity += 1; // Trực tiếp tăng số lượng
      } else {
        state.items.push({...action.payload, quantity: 1}); // Đảm bảo có quantity ban đầu
      }
    },
    removeItem(state: OrderState, action: PayloadAction<string>) {
      const existingItem = state.items.find(
        item => item.id === action.payload,
      );
      if (existingItem) {
        existingItem.quantity -= 1; // Trực tiếp tăng số lượng
      }
    },
  },
});

export const {addOrder, removeItem} = orderSlice.actions;
export default orderSlice.reducer;
