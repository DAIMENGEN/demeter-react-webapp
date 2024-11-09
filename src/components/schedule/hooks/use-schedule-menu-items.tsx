import {useDemeterSelector} from "@D/core/store/demeter-hook";
import {MenuUtil} from "@D/utils/menu/menu-util";

export const useScheduleMenuItems = () => {
    const projectEntities = useDemeterSelector(state => state.projectStore.projectEntities);
    return MenuUtil.generateScheduleMenuItems(projectEntities);
}