import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export type ScheduleStore = {
    addScheduleModalVisible: boolean,
    renameScheduleId?: string,
    renameScheduleModalVisible: boolean,
}

const initialState: ScheduleStore = {
    addScheduleModalVisible: false,
    renameScheduleId: undefined,
    renameScheduleModalVisible: false,
};

const scheduleStoreSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        setAddScheduleModalVisible: (state, action: PayloadAction<boolean>) => {
            state.addScheduleModalVisible = action.payload;
        },
        setRenameScheduleId: (state, action: PayloadAction<string>) => {
            state.renameScheduleId = action.payload;
        },
        setRenameScheduleModalVisible: (state, action: PayloadAction<boolean>) => {
            state.renameScheduleModalVisible = action.payload;
        },
    },
});

export const {setAddScheduleModalVisible, setRenameScheduleId, setRenameScheduleModalVisible} = scheduleStoreSlice.actions;
export default scheduleStoreSlice.reducer;