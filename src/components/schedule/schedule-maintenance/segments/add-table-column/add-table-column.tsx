import {Button, Input, Popover, Space} from "antd";
import {AddColumnIcon01} from "@D/icons/column-icon/add-column-icon-01";
import {useState} from "react";
import {HIGHLIGHT_COLOR} from "@D/core/style/theme";
import {SearchIcon01} from "@D/icons/search-icon/search-icon-01";

export const AddTableColumn = () => {
    const [highlight, setHighlight] = useState<boolean>();
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
                 </Space>}>
            <Button type="text"
                    style={{backgroundColor: highlight ? HIGHLIGHT_COLOR : ""}}
                    icon={<AddColumnIcon01 width={16} height={16} color={"#000000"}/>}>
                colum</Button>
        </Popover>
    )
}