import "./table-header-title.scss";
import React from "react";
import {Button, Flex, Popover} from "antd";
import {HideIcon01} from "@D/icons/hide-icon-01";
import {ProColumns} from "@ant-design/pro-table";
import {MaintainScheduleTableRow} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types";
import {
    TableColumnDisplay
} from "@D/components/schedule/schedule-maintenance/segments/table-column-display/table-column-display";

export const TableHeaderTitle: React.FC<{
    columns: Array<ProColumns<MaintainScheduleTableRow>>;
    showColumns: (React.Key | undefined)[];
    setShowColumns: React.Dispatch<React.SetStateAction<(React.Key | undefined)[]>>;
}> = ({columns, showColumns, setShowColumns}) => {
    return (
        <div className={"table-header-title"}>
            <Flex gap={20}>
                <Popover title={"Display columns"}
                         trigger="click"
                         arrow={false}
                         placement="bottomLeft"
                         content={<TableColumnDisplay columns={columns}
                                                      showColumns={showColumns}
                                                      setShowColumns={setShowColumns}/>}>
                    <Button type="text" icon={<HideIcon01 width={16} height={16} color={"#000000"}/>}>
                        Hide
                    </Button>
                </Popover>
            </Flex>
        </div>
    );
}