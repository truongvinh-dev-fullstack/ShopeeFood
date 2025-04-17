import { UserState } from "../slices/type"

export const userSelectors: (state: {user: UserState} ) => any = (state) => {
    console.log("state: ", state)
    return state.user
}