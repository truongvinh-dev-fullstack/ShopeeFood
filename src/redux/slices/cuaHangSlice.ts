import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CuaHangState, CuaHangType } from './type'

const initialState: CuaHangState = {
	items: [],
	isLoading: true
}

const cuaHangSlice = createSlice({
	name: 'cuaHang',
	initialState,
	reducers: {
		setDanhSachCuaHang(state: CuaHangState, action: PayloadAction<any[]>) {
			console.log("action cua hang: ", action)
			state.items = action.payload
			state.isLoading = false
		},
		setLoadingCuaHang(state: CuaHangState, action: PayloadAction<any>) {
			state.isLoading = true
		},
	},
})

export const { setDanhSachCuaHang, setLoadingCuaHang } = cuaHangSlice.actions
export default cuaHangSlice.reducer
