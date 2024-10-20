import type {IUserEntity} from "@D/core/entity/user-entity";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {UserService} from "@D/core/service/user-service";

export type UserStoreState = {
    currentUser?: IUserEntity;
    userService?: UserService;
};

const initialState: UserStoreState = {
    currentUser: undefined,
    userService: undefined,
};

const userStoreStateSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setCurrentUserAction: (state, action: PayloadAction<IUserEntity | undefined>) => {
            state.currentUser = action.payload;
        },
        setUserServiceAction: (state, action: PayloadAction<UserService | undefined>) => {
            state.userService = action.payload;
        }
    }
});

export const {setCurrentUserAction, setUserServiceAction} = userStoreStateSlice.actions;
export default userStoreStateSlice.reducer;