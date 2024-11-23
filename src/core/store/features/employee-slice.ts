import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type EmployeeStore = {
    employeeName: string;
};

const initialState: EmployeeStore = {
    employeeName: "",
};

const employeeStoreSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        setEmployeeNameAction: (state, action: PayloadAction<string>) => {
            state.employeeName = action.payload;
        }
    }
});

export const {setEmployeeNameAction} = employeeStoreSlice.actions;
export default employeeStoreSlice.reducer;