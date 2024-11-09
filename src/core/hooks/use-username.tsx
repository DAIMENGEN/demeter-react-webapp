import {useDemeterSelector} from "@D/core/store/demeter-hook";

export const useUsername = () => {
    return useDemeterSelector(state => state.employeeStore.username);
}