import React, {useState} from "react";
import {Button, Checkbox, Flex, Popover} from "antd";
import {ProColumns} from "@ant-design/pro-table";
import {MaintainScheduleTableRow} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types";
import {HideIcon01} from "@D/icons/hide-icon-01";
import {HIGHLIGHT_COLOR} from "@D/core/style/theme";

export const TableColumnHide: React.FC<{
    columns: Array<ProColumns<MaintainScheduleTableRow>>;
    showColumns: (React.Key | undefined)[];
    setShowColumns: React.Dispatch<React.SetStateAction<(React.Key | undefined)[]>>;
}> = ({columns, showColumns, setShowColumns}) => {
    const [highlight, setHighlight] = useState<boolean>();
    const checkAll = columns.length === showColumns.length;
    const indeterminate = showColumns.length > 0 && showColumns.length < columns.length;
    return (
        <Popover title={"Display columns"}
                 arrow={false}
                 trigger={"click"}
                 placement={"bottomLeft"}
                 onOpenChange={setHighlight}
                 content={<>
                     <Checkbox indeterminate={indeterminate} onChange={(e) => {
                         setShowColumns(e.target.checked ? columns.map(column => column.key) : []);
                     }} checked={checkAll}>
                         Check all
                     </Checkbox>
                     <Checkbox.Group style={{width: "100%"}}
                                     value={showColumns}
                                     onChange={(checkedValues) => setShowColumns(checkedValues)}>
                         <Flex vertical={true} gap={"small"}>
                             {
                                 columns.map(column =>
                                     <Checkbox key={column.key}
                                               value={column.key}>{column.title as string}</Checkbox>)
                             }
                         </Flex>
                     </Checkbox.Group></>}>
            <Button type="text"
                    style={{backgroundColor: highlight ? HIGHLIGHT_COLOR : ""}}
                    icon={<HideIcon01 width={16} height={16} color={"#000000"}/>}>
                Hide
            </Button>
        </Popover>
    )
}