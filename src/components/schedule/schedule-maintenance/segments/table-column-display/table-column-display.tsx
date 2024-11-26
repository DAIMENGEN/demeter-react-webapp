import "./table-column-display.scss";
import React from "react";
import {Checkbox, Flex} from "antd";
import {ProColumns} from "@ant-design/pro-table";
import {MaintainScheduleTableRow} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types";

export const TableColumnDisplay: React.FC<{
    columns: Array<ProColumns<MaintainScheduleTableRow>>;
    showColumns: (React.Key | undefined)[];
    setShowColumns: React.Dispatch<React.SetStateAction<(React.Key | undefined)[]>>;
}> = ({columns, showColumns, setShowColumns}) => {

    return (
        <Checkbox.Group style={{width: "100%"}}
                        defaultValue={showColumns}
                        onChange={(checkedValues) => setShowColumns(checkedValues)}>
            <Flex vertical={true} gap={"small"}>
                {
                    columns.map(column =>
                        <Checkbox key={column.key}
                                  value={column.key}>{column.title as string}</Checkbox>)
                }
            </Flex>
        </Checkbox.Group>
    )
}