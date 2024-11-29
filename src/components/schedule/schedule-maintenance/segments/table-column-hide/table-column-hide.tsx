import React, {useState} from "react";
import {Button, Checkbox, Flex, Input, Popover, Space} from "antd";
import {ProColumns} from "@ant-design/pro-table";
import {MaintainScheduleTableRow} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types";
import {HideIcon01} from "@D/icons/hide-icon/hide-icon-01";
import {HIGHLIGHT_COLOR} from "@D/core/style/theme";
import {SearchIcon01} from "@D/icons/search-icon/search-icon-01";

export const TableColumnHide: React.FC<{
    columns: Array<ProColumns<MaintainScheduleTableRow>>;
    showColumns: (React.Key | undefined)[];
    setShowColumns: React.Dispatch<React.SetStateAction<(React.Key | undefined)[]>>;
}> = ({columns, showColumns, setShowColumns}) => {
    const [options, setOptions] = useState(columns);
    const [highlight, setHighlight] = useState<boolean>();
    const checkAll = columns.length === showColumns.length;
    const indeterminate = showColumns.length > 0 && showColumns.length < columns.length;
    return (
        <Popover title={<span style={{fontWeight: "bold", fontSize: "18px"}}>Display columns</span>}
                 arrow={false}
                 trigger={"click"}
                 placement={"bottomLeft"}
                 destroyTooltipOnHide={true}
                 onOpenChange={open => {
                     setHighlight(open);
                     open && setOptions(columns);
                 }}
                 content={<Space direction={"vertical"} size={"small"} style={{width: 300}}>
                     <Input placeholder="Find columns to show/hide"
                            onChange={e => {
                                const searchValue = e.target.value;
                                const regex = new RegExp(searchValue, "i");
                                setOptions(columns.filter(column => regex.test(column.title as string)));
                            }}
                            suffix={<SearchIcon01 width={16} height={16} color={"#bfbfbf"}/>}/>
                     <Checkbox indeterminate={indeterminate} onChange={e => {
                         setShowColumns(e.target.checked ? columns.map(column => column.key) : []);
                     }} checked={checkAll}>
                         <span style={{fontWeight: "bold"}}>All columns</span>
                         <span>&nbsp;&nbsp;&nbsp;</span>
                         <span style={{color: "#7e7f8d"}}>{showColumns.length} selected</span>
                     </Checkbox>
                     <Flex vertical={true} gap={"small"}>
                         {
                             options.map(column =>
                                 <Checkbox key={column.key}
                                           value={column.key}
                                           checked={showColumns.includes(column.key)}
                                           onChange={e => {
                                               setShowColumns(e.target.checked ? [...showColumns, column.key] : showColumns.filter(key => key !== column.key));
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