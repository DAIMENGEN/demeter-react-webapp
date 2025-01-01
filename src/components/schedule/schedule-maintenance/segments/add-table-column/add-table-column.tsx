import {Button, Flex, Input, Popover, Space} from "antd";
import {AddColumnIcon01} from "@D/icons/column-icon/add-column-icon-01";
import React, {useRef, useState} from "react";
import {HIGHLIGHT_COLOR} from "@D/core/style/theme";
import {SearchIcon01} from "@D/icons/search-icon/search-icon-01";
import {DataSourceType} from "@D/components/schedule/schedule-maintenance/schedule-maintenance-types.ts";
import {ProColumns} from "@ant-design/pro-table";
import {SnowflakeIdUtil} from "@D/utils/snowflake-id-util.ts";

export const AddTableColumn: React.FC<{
    addColumn: (column: ProColumns<DataSourceType>) => void;
    showColumn: (columnKey: React.Key) => void;
    updateColumn: (column: ProColumns<DataSourceType>) => void;
}> = ({addColumn, showColumn, updateColumn}) => {
    const [highlight, setHighlight] = useState<boolean>();
    const columnTitleRef = useRef<string>();

    return (
        <Popover title={<span style={{fontWeight: "bold", fontSize: "18px"}}>Add custom column</span>}
                 arrow={false}
                 trigger={"click"}
                 placement={"bottomLeft"}
                 destroyTooltipOnHide={true}
                 onOpenChange={setHighlight}
                 content={<Space direction={"vertical"} size={"small"} style={{width: 300}}>
                     <Input placeholder="Search column type"
                            onChange={e => {
                                const searchValue = e.target.value;
                                console.log(searchValue);
                            }}
                            suffix={<SearchIcon01 width={16} height={16} color={"#bfbfbf"}/>}/>
                     <Flex gap={10} wrap={true}>
                         <Button onClick={() => {
                             const key = SnowflakeIdUtil.nextId().toString();
                             addColumn({
                                 key: key,
                                 title: <Input onChange={e => {
                                     columnTitleRef.current = e.target.value;
                                 }} onPressEnter={() => {
                                     const title = columnTitleRef.current;
                                     if (title) {
                                        updateColumn({
                                            key: key,
                                            title: title,
                                            dataIndex: key,
                                        });
                                     }
                                 }}/>,
                             });
                             showColumn(key);
                         }}>
                             Text
                         </Button>
                         <Button>
                             TaskName
                         </Button>
                         <Button>
                             TaskOwner
                         </Button>
                         <Button>
                             TaskAssigner
                         </Button>
                         <Button>
                             TaskType
                         </Button>
                         <Button>
                             TaskStatus
                         </Button>
                         <Button>
                             TaskRule
                         </Button>
                         <Button>
                             StartDate
                         </Button>
                         <Button>
                             EndDate
                         </Button>
                         <Button>
                             Description
                         </Button>
                         <Button>
                             Order
                         </Button>
                     </Flex>
                 </Space>}>
            <Button type="text"
                    style={{backgroundColor: highlight ? HIGHLIGHT_COLOR : ""}}
                    icon={<AddColumnIcon01 width={16} height={16} color={"#000000"}/>}>
                colum</Button>
        </Popover>
    )
}