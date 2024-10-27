import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {EmployeeService} from "@D/core/service/employee-service";

export type UserStoreState = {
    employeeService?: EmployeeService;
};

const initialState: UserStoreState = {
    employeeService: undefined,
};

const employeeStoreStateSlice = createSlice({
    name: "employee",
    initialState,
    reducers: {
        setEmployeeServiceAction: (state, action: PayloadAction<EmployeeService | undefined>) => {
            state.employeeService = action.payload;
        }
    }
});

export const {setEmployeeServiceAction} = employeeStoreStateSlice.actions;
export default employeeStoreStateSlice.reducer;