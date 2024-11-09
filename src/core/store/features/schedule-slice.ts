import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ScheduleStore = {
    addScheduleModalVisible: boolean
}

const initialState: ScheduleStore = {
    addScheduleModalVisible: false,
};

const scheduleStoreSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        setAddScheduleModalVisible: (state, action: PayloadAction<boolean>) => {
            state.addScheduleModalVisible = action.payload;
        },
    },
});

export const {setAddScheduleModalVisible} = scheduleStoreSlice.actions;
export default scheduleStoreSlice.reducer;