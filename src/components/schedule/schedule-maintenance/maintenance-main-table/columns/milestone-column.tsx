import React from "react";
import {
    TableColumn
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/maintenance-main-table-types";
import {Button} from "antd";

export const MilestoneColumn: React.FC<{
    projectId: string,
    createTableColumn: (tableColumn: TableColumn) => void;
}> = () => {

    return (
        <div className={"milestone-column"}>
            <Button>
                Milestone
            </Button>
        </div>
    );
}