import {useDemeterSelector} from "@D/core/store/demeter-hook";
import {MenuUtil} from "@D/utils/menu/menu-util";

export const useScheduleMenuItems = (onClick: (projectId: string) => void) => {
    const projectEntities = useDemeterSelector(state => state.projectStore.projectEntities);
    return MenuUtil.generateScheduleMenuItems(projectEntities, onClick);
}