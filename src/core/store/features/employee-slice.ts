import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type EmployeeStore = {
    username: string;
};

const initialState: EmployeeStore = {
    username: "",
};

const employeeStoreSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        setUsernameAction: (state, action: PayloadAction<string>) => {
            state.username = action.payload;
        }
    }
});

export const {setUsernameAction} = employeeStoreSlice.actions;
export default employeeStoreSlice.reducer;