import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ProjectEntity} from "@D/core/entity/project-entity";

export type ProjectStore = {
    projectEntities: Array<ProjectEntity>;
}

const initialState: ProjectStore = {
    projectEntities: []
}

const projectStoreSlice = createSlice({
    name: "project",
    initialState,
    reducers: {
        addProjectEntity(state, action: PayloadAction<ProjectEntity>) {
            state.projectEntities.push(action.payload);
        },
        addProjectEntities(state, action: PayloadAction<Array<ProjectEntity>>) {
            state.projectEntities.push(...action.payload);
        },
        updateProjectEntity(state, action: PayloadAction<ProjectEntity>) {
            const projectId = action.payload.id;
            const index = state.projectEntities.findIndex(project => project.id === projectId);
            if (index !== -1) {
                state.projectEntities[index] = action.payload;
            } else {
                console.error(`Project with ID ${projectId} not found in the state.`);
            }
        },
        updateProjectEntities(state, action: PayloadAction<Array<ProjectEntity>>) {
            action.payload.forEach(updatedProject => {
                const index = state.projectEntities.findIndex(project => project.id === updatedProject.id);
                if (index !== -1) {
                    state.projectEntities[index] = updatedProject;
                } else {
                    console.error(`Project with ID ${updatedProject.id} not found in the state.`);
                }
            });
        },
        deleteProjectEntity(state, action: PayloadAction<ProjectEntity>) {
            state.projectEntities = state.projectEntities.filter(project => project.id !== action.payload.id);
        },
        deleteProjectEntities(state, action: PayloadAction<Array<ProjectEntity>>) {
            state.projectEntities = state.projectEntities.filter(project => !action.payload.some(deletedProject => deletedProject.id === project.id));
        },
        setProjectEntities(state, action: PayloadAction<Array<ProjectEntity>>) {
            state.projectEntities = action.payload;
        }
    }
});

export const {
    addProjectEntity,
    addProjectEntities,
    updateProjectEntity,
    updateProjectEntities,
    deleteProjectEntity,
    deleteProjectEntities,
    setProjectEntities
} = projectStoreSlice.actions;
export default projectStoreSlice.reducer;