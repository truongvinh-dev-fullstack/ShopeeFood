import { combineReducers } from 'redux'
import cuaHangReducer from '../slices/cuaHangSlice'
import userReducer from '../slices/userSlice'
import orderReducer from '../slices/orderSlice'
export default combineReducers({
	cuaHang: cuaHangReducer,
	user: userReducer,
	orders: orderReducer
})
