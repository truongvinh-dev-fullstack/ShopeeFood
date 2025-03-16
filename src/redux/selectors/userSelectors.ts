import { UserState } from "../slices/type"

export const userSelectors: (state: {user: UserState} ) => any = (state) => {
    return state.user
}