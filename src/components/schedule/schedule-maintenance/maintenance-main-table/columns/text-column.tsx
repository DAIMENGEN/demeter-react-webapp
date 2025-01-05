import {Button} from "antd";
import React from "react";
import {ProColumns} from "@ant-design/pro-table";
import {ProjectTaskPayload} from "@D/http/payload/project-task-payload.ts";

export const TextColumn: React.FC<{
    createTableColumn: (tableColumn: ProColumns<ProjectTaskPayload>) => void;
}> = ({createTableColumn}) => {
    return (
        <div className={"text-column"}>
            <Button onClick={() => {
                createTableColumn({
                    key: "newColumn",
                    title: "New Column",
                    dataIndex: "newColumn",
                });
            }}>
                Text
            </Button>
        </div>
    )
}