import {MenuProps} from "antd";
import {ProjectEntity} from "@D/core/entity/project-entity";

export class MenuUtil {
    static generateScheduleMenuItems(projects: Array<ProjectEntity>, onClick: (projectId: string) => void): MenuProps["items"] {
        return projects.map(project => ({
            key: project.id,
            label: <div onClick={() => onClick(project.id)}>{project.name}</div>,
            children: [
                {key: `${project.id}-open`, label: 'Open'},
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