import { CuaHangState } from "../slices/type"

export const cuaHangSelectors: (state: {cuaHang: CuaHangState} ) => any = (state) => {
	return state.cuaHang
}