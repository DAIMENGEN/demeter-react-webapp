import {useDemeterDispatch, useDemeterSelector} from "@D/core/store/demeter-hook";
import {setAddScheduleModalVisible} from "@D/core/store/features/schedule-slice";

export const useAddScheduleModalVisible = () => {
    const dispatch = useDemeterDispatch();
    const setVisible = (visible: boolean) => {
        dispatch(setAddScheduleModalVisible(visible))
    }
    const visible = useDemeterSelector(state => state.scheduleStore.addScheduleModalVisible);
    return {
        addScheduleModalVisible: visible,
        setAddScheduleModalVisible: setVisible
    };
}