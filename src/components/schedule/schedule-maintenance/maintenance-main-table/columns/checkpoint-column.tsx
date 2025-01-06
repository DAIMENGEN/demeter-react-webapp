import React from "react";
import {
    TableColumn
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/maintenance-main-table-types";
import {Button} from "antd";

export const CheckpointColumn: React.FC<{
    projectId: string,
    createTableColumn: (tableColumn: TableColumn) => void;
}> = () => {

    return (
        <div className={"checkpoint-column"}>
            <Button>
                Checkpoint
            </Button>
        </div>
    );
}