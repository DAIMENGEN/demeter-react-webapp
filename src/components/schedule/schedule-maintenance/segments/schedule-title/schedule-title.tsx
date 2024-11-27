import React, {useState} from "react";
import {Button, Popover} from "antd";
import {DownIcon01} from "@D/icons/down-icon-01";

export const ScheduleTitle: React.FC = () => {
    const [titleButtonId, setTitleButtonId] = useState<string | undefined>(undefined);

    return (
        <Popover title={"ScheduleTitle"}
                 trigger="click"
                 arrow={false}
                 placement="bottomLeft"
                 onOpenChange={open => {
                     setTitleButtonId(open ? "highlight-button" : undefined);
                 }}>
            <Button id={titleButtonId}
                    type={"text"}
                    iconPosition={"end"}
                    icon={<DownIcon01 width={15} height={15} color={"#000000"}/>}>
                <span style={{fontSize: 25, fontWeight: "normal"}}>CardTitle</span>
            </Button>
        </Popover>
    )
}