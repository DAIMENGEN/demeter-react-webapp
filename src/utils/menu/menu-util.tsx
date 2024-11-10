import {MenuProps} from "antd";
import {ProjectEntity} from "@D/core/entity/project-entity";

export class MenuUtil {
    static generateScheduleMenuItems(projects: Array<ProjectEntity>, onClick: (projectId: string) => void): MenuProps["items"] {
        const truncateString = (str: string, maxLength: number) => {
            if (str.length > maxLength) {
                return str.substring(0, maxLength) + '...';
            } else {
                return str;
            }
        }
        return projects.map(project => ({
            key: project.id,
            label: <div className={`schedule-menu-item-title`} title={project.name} onClick={() => onClick(project.id)}>{truncateString(project.name, 14)}</div>,
            children: [
                {key: `${project.id}-open-in-new-table`, label: 'Open in New Tab'},
                {key: `${project.id}-divider-1`, type: 'divider'},
                {key: `${project.id}-rename-schedule`, label: 'Rename Schedule'},
                {key: `${project.id}-add-to-favorites`, label: 'Add to Favorites'},
                {key: `${project.id}-save-as-a-template`, label: 'Save as a Template'},
                {key: `${project.id}-divider-2`, type: 'divider'},
                {key: `${project.id}-delete-schedule`, label: 'Delete Schedule'},
                {key: `${project.id}-export-schedule`, label: 'Export Schedule'},
                {key: `${project.id}-share-schedule`, label: 'Share Schedule'}
            ]
        }));
    }
}