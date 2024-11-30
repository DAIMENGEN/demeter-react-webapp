import React, {useState} from "react";
import {Button, Checkbox, Flex, Input, Popover, Space} from "antd";
import {ProColumns} from "@ant-design/pro-table";
import {DataSourceType} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types";
import {HideIcon01} from "@D/icons/hide-icon/hide-icon-01";
import {HIGHLIGHT_COLOR} from "@D/core/style/theme";
import {SearchIcon01} from "@D/icons/search-icon/search-icon-01";

export const TableColumnHide: React.FC<{
    columns: ProColumns<DataSourceType>[];
    showColumn: (columnKey: string) => void;
    hideColumn: (columnKey: string) => void;
    displayColumns: (React.Key | undefined)[];
    isAllColumnsVisible: boolean;
}> = ({columns, showColumn, hideColumn, displayColumns, isAllColumnsVisible}) => {
    const [options, setOptions] = useState(columns);
    const [highlight, setHighlight] = useState<boolean>();
    return (
        <Popover title={<span style={{fontWeight: "bold", fontSize: "18px"}}>Display columns</span>}
                 arrow={false}
                 trigger={"click"}
                 placement={"bottomLeft"}
                 destroyTooltipOnHide={true}
                 onOpenChange={open => {
                     setHighlight(open);
                     if (open) setOptions(columns);
                 }}
                 content={<Space direction={"vertical"} size={"small"} style={{width: 300}}>
                     <Input placeholder="Find columns to show/hide"
                            onChange={e => {
                                const searchValue = e.target.value;
                                const regex = new RegExp(searchValue, "i");
                                setOptions(columns.filter(column => regex.test(column.title as string)));
                            }}
                            suffix={<SearchIcon01 width={16} height={16} color={"#bfbfbf"}/>}/>
                     <Checkbox indeterminate={!isAllColumnsVisible} onChange={e => {
                         const checked = e.target.checked;
                         if (checked) showColumn("*"); else hideColumn("*");
                     }} checked={isAllColumnsVisible}>
                         <span style={{fontWeight: "bold"}}>All columns</span>
                         <span>&nbsp;&nbsp;&nbsp;</span>
                         <span style={{color: "#7e7f8d"}}>{displayColumns.length} selected</span>
                     </Checkbox>
                     <Flex vertical={true} gap={"small"}>
                         {
                             options.map(column =>
                                 <Checkbox key={column.key}
                                           value={column.key}
                                           checked={displayColumns.includes(column.key)}
                                           onChange={e => {
                                               const checked = e.target.checked;
                                               if (checked) showColumn(column.key as string); else hideColumn(column.key as string);
                                           }}
                                 >{column.title as string}</Checkbox>)
                         }
                     </Flex>
                 </Space>}>
            <Button type="text"
                    style={{backgroundColor: highlight ? HIGHLIGHT_COLOR : ""}}
                    icon={<HideIcon01 width={16} height={16} color={"#000000"}/>}>
                Hide
            </Button>
        </Popover>
    )
}