import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { UserState } from './type'

const initialState: UserState = {
    id:             "",
    email:          "",
    userId:         "",
    name:           "",
    paymentMethods: [],
    phone:          "",
    role:           "",
    avatar:         "",
    password:       "",
    address:        "",
    restaurantInfo: "",
}

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUserInfo(state: UserState, action: PayloadAction<any>) {
			console.log("action: ", action)
			state = action.payload
		},
		
	},
})

export const { setUserInfo } = userSlice.actions
export default userSlice.reducer
