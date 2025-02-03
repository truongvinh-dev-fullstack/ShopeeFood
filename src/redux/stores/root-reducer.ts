import { combineReducers } from 'redux'
import cuaHangReducer from '../slices/cuaHangSlice'
export default combineReducers({
	cuaHang: cuaHangReducer,
})
