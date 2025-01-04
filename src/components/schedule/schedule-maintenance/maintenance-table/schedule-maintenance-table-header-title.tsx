import React, {MutableRefObject, useEffect, useState} from "react";
import {ActionType, ProColumns} from "@ant-design/pro-table";
import {ProjectTaskPayload} from "@D/http/payload/project-task-payload.ts";
import {Button, Checkbox, Flex, Input, Popover, Space} from "antd";
import {AddIcon01} from "@D/icons/add-icon/add-icon-01.tsx";
import {ScheduleMaintenanceUtils} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-utils.ts";
import {HideIcon01} from "@D/icons/hide-icon/hide-icon-01.tsx";
import {HIGHLIGHT_COLOR} from "@D/core/style/theme.ts";
import {SearchIcon01} from "@D/icons/search-icon/search-icon-01.tsx";
import {AddColumnIcon01} from "@D/icons/column-icon/add-column-icon-01.tsx";

export const ScheduleMaintenanceTableHeaderTitle: React.FC<{
    tableActionRef: MutableRefObject<ActionType | undefined>;
    tableColumns: ProColumns<ProjectTaskPayload>[];
    displayColumns: ProColumns<ProjectTaskPayload>[];
    parentKey: string | undefined;
    createTableColumn: (tableColumn: ProColumns<ProjectTaskPayload>) => void;
    updateTableColumn: (tableColumn: ProColumns<ProjectTaskPayload>) => void;
    hiddenTableColumn: (tableColumnKey: React.Key) => void;
    displayTableColumn: (tableColumnKey: React.Key) => void;
    isAllColumnsVisible: boolean,
    copyTableRowData?: ProjectTaskPayload;
    setExpandedRowKeys: (value: React.SetStateAction<React.Key[]>) => void;
}> = ({
          tableActionRef,
          tableColumns,
          displayColumns,
          parentKey,
          // createTableColumn,
          // updateTableColumn,
          hiddenTableColumn,
          displayTableColumn,
          isAllColumnsVisible,
          copyTableRowData,
          setExpandedRowKeys
      }) => {
    const [options, setOptions] = useState(tableColumns);
    const [highlightHideColumnButton, setHighlightHideColumnButton] = useState<boolean>();
    const [highlightCreateColumnButton, setHighlightCreateColumnButton] = useState<boolean>();


    useEffect(() => {
        setOptions(tableColumns)
    }, [tableColumns]);
    return (
        <div className={"schedule-maintenance-table-header-title"}>
            <Flex gap={10}>
                <Button type="primary"
                        iconPosition={"end"}
                        icon={<AddIcon01 width={16} height={16} color={"#fff"}/>}
                        onClick={() => {
                            tableActionRef.current?.addEditRecord(ScheduleMaintenanceUtils.createRecord(parentKey, copyTableRowData), {
                                parentKey: parentKey,
                                newRecordType: "dataSource",
                            });
                            if (parentKey) {
                                setExpandedRowKeys(keys => [...keys, parentKey])
                            }
                        }}>
                    Add task
                </Button>
                <Popover title={<span style={{fontWeight: "700", fontSize: "16px"}}>Display columns</span>}
                         arrow={false}
                         trigger={"click"}
                         placement={"bottomLeft"}
                         destroyTooltipOnHide={true}
                         onOpenChange={setHighlightHideColumnButton}
                         content={<Space direction={"vertical"} size={"small"} style={{width: 300}}>
                             <Input placeholder="Find columns to show/hide"
                                    onChange={e => {
                                        const searchValue = e.target.value;
                                        const regex = new RegExp(searchValue, "i");
                                        setOptions(tableColumns.filter(column => regex.test(column.title as string)));
                                    }}
                                    suffix={<SearchIcon01 width={16} height={16} color={"#bfbfbf"}/>}/>
                             <Checkbox indeterminate={!isAllColumnsVisible} onChange={e => {
                                 const checked = e.target.checked;
                                 if (checked) displayTableColumn("*"); else hiddenTableColumn("*");
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
                                                   checked={displayColumns.some(c => c.key === column.key)}
                                                   onChange={e => {
                                                       const checked = e.target.checked;
                                                       if (checked) displayTableColumn(column.key as string); else hiddenTableColumn(column.key as string);
                                                   }}
                                         >{column.title as string}</Checkbox>)
                                 }
                             </Flex>
                         </Space>}>
                    <Button type="text"
                            style={{backgroundColor: highlightHideColumnButton ? HIGHLIGHT_COLOR : ""}}
                            icon={<HideIcon01 width={16} height={16} color={"#000000"}/>}>
                        Hide
                    </Button>
                </Popover>
                <Popover title={<span style={{fontWeight: "700", fontSize: "16px"}}>Create columns</span>}
                         arrow={false}
                         trigger={"click"}
                         placement={"bottomLeft"}
                         destroyTooltipOnHide={true}
                         onOpenChange={setHighlightCreateColumnButton}
                         content={<Space direction={"vertical"} size={"small"} style={{width: 300}}>
                             <Input placeholder="Search column type"
                                    onChange={e => {
                                        const searchValue = e.target.value;
                                        console.log(searchValue);
                                    }}
                                    suffix={<SearchIcon01 width={16} height={16} color={"#bfbfbf"}/>}/>
                             <Flex gap={10} wrap={true}>
                                 <Button>
                                     Text
                                 </Button>
                             </Flex>
                         </Space>}>
                    <Button type="text"
                            style={{backgroundColor: highlightCreateColumnButton ? HIGHLIGHT_COLOR : ""}}
                            icon={<AddColumnIcon01 width={16} height={16} color={"#000000"}/>}>
                        colum</Button>
                </Popover>
            </Flex>
        </div>
    );
}