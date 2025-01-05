import React, {MutableRefObject, useMemo, useState} from "react";
import {ActionType, ProColumns} from "@ant-design/pro-table";
import {ProjectTaskPayload} from "@D/http/payload/project-task-payload.ts";
import {Button, Checkbox, Dropdown, Flex, Input, Popover, Space} from "antd";
import {ScheduleMaintenanceUtils} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-utils.ts";
import {HideIcon01} from "@D/icons/hide-icon/hide-icon-01.tsx";
import {HIGHLIGHT_COLOR} from "@D/core/style/theme.ts";
import {SearchIcon01} from "@D/icons/search-icon/search-icon-01.tsx";
import {AddColumnIcon01} from "@D/icons/column-icon/add-column-icon-01.tsx";
import {ImportIcon01} from "@D/icons/import-icon/import-icon-01.tsx";
import {DownOutlined} from "@ant-design/icons";
import {
    TableColumnConfigs
} from "@D/components/schedule/schedule-maintenance/maintenance-main-table/maintenance-main-table-types";

export const MaintenanceTableHeaderTitle: React.FC<{
    tableActionRef: MutableRefObject<ActionType | undefined>;
    parentKey: string | undefined;
    createTableColumn: (tableColumn: ProColumns<ProjectTaskPayload>) => void;
    updateTableColumn: (tableColumn: ProColumns<ProjectTaskPayload>) => void;
    hiddenTableColumn: (tableColumnKey: React.Key) => void;
    displayTableColumn: (tableColumnKey: React.Key) => void;
    tableColumnConfigs: TableColumnConfigs;
    copyTableRowData?: ProjectTaskPayload;
    setExpandedRowKeys: (value: React.SetStateAction<React.Key[]>) => void;
}> = ({
          tableActionRef,
          tableColumnConfigs,
          parentKey,
          createTableColumn,
          // updateTableColumn,
          hiddenTableColumn,
          displayTableColumn,
          copyTableRowData,
          setExpandedRowKeys
      }) => {
    const [hiddenTableColumnKeys, setHiddenTableColumnKeys] = useState<React.Key[]>([]);
    const [highlightHideColumnButton, setHighlightHideColumnButton] = useState<boolean>();
    const [highlightCreateColumnButton, setHighlightCreateColumnButton] = useState<boolean>();
    const isAllColumnsVisible = useMemo(() => tableColumnConfigs.every(c => c.display), [tableColumnConfigs]);
    return (
        <div className={"schedule-maintenance-main-table-header-title"}>
            <Flex gap={10}>
                <Dropdown.Button type={"primary"}
                                 placement={"bottomLeft"}
                                 icon={<DownOutlined/>}
                                 menu={{
                                     items: [
                                         {
                                             key: "import-task",
                                             icon: <ImportIcon01 width={16} height={16} color={"#000000"}/>,
                                             label: "Import tasks",
                                             onClick: () => alert("Import tasks")
                                         }
                                     ]
                                 }}
                                 onClick={() => {
                                     tableActionRef.current?.addEditRecord(ScheduleMaintenanceUtils.createRecord(parentKey, copyTableRowData), {
                                         parentKey: parentKey,
                                         newRecordType: "dataSource",
                                     });
                                     if (parentKey) {
                                         setExpandedRowKeys(keys => [...keys, parentKey])
                                     }
                                 }}>
                    New Task
                </Dropdown.Button>
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
                                        const hiddenTableColumnKeys = tableColumnConfigs.filter(c => !regex.test(c.tableColumn.title as string)).map(c => c.tableColumn.key).filter(c => c !== undefined);
                                        setHiddenTableColumnKeys(hiddenTableColumnKeys);
                                    }}
                                    suffix={<SearchIcon01 width={16} height={16} color={"#bfbfbf"}/>}/>
                             <Checkbox indeterminate={!isAllColumnsVisible} onChange={e => {
                                 const checked = e.target.checked;
                                 if (checked) displayTableColumn("*"); else hiddenTableColumn("*");
                             }} checked={isAllColumnsVisible}>
                                 <span style={{fontWeight: "bold"}}>All columns</span>
                                 <span>&nbsp;&nbsp;&nbsp;</span>
                                 <span
                                     style={{color: "#7e7f8d"}}>{tableColumnConfigs.filter(c => c.display).length} selected</span>
                             </Checkbox>
                             <Flex vertical={true} gap={"small"}>
                                 {
                                     tableColumnConfigs.filter(c => c.tableColumn.key !== undefined && !hiddenTableColumnKeys.includes(c.tableColumn.key)).map(option =>
                                         <Checkbox key={option.tableColumn.key}
                                                   value={option.tableColumn.key}
                                                   checked={option.display}
                                                   onChange={e => {
                                                       const checked = e.target.checked;
                                                       if (checked) displayTableColumn(option.tableColumn.key as string); else hiddenTableColumn(option.tableColumn.key as string);
                                                   }}
                                         >{option.tableColumn.title as string}</Checkbox>)
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
                                 <Button onClick={() => {
                                     createTableColumn({
                                         key: "newColumn",
                                         title: "New Column",
                                         dataIndex: "newColumn",
                                     });
                                     displayTableColumn("newColumn");
                                 }}>
                                     Text
                                 </Button>
                             </Flex>
                         </Space>}>
                    <Button type="text"
                            style={{backgroundColor: highlightCreateColumnButton ? HIGHLIGHT_COLOR : ""}}
                            icon={<AddColumnIcon01 width={16} height={16} color={"#000000"}/>}>
                        Colum</Button>
                </Popover>
            </Flex>
        </div>
    );
}