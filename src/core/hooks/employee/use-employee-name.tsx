import {useDemeterSelector} from "@D/core/store/demeter-hook";

export const useEmployeeName = () => {
    return useDemeterSelector(state => state.employeeStore.employeeName);
}