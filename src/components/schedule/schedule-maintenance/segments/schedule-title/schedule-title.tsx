import React, {useState} from "react";
import {Button, Popover} from "antd";
import {DownIcon01} from "@D/icons/down-icon/down-icon-01";
import {HIGHLIGHT_COLOR} from "@D/core/style/theme";

export const ScheduleTitle: React.FC = () => {
    const [highlight, setHighlight] = useState<boolean>();

    return (
        <Popover title={"ScheduleTitle"}
                 trigger="click"
                 arrow={false}
                 placement="bottomLeft"
                 onOpenChange={setHighlight}>
            <Button type={"text"}
                    iconPosition={"end"}
                    style={{backgroundColor: highlight ? HIGHLIGHT_COLOR : ""}}
                    icon={<DownIcon01 width={15} height={15} color={"#000000"}/>}>
                <span style={{fontSize: 25, fontWeight: "normal"}}>CardTitle</span>
            </Button>
        </Popover>
    )
}