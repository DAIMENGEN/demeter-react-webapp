import "./add-schedule.scss";
import React, {useState} from "react";
import {Button, Flex, Form, Input} from "antd";
import {FullDraggableModal} from "full-flex-ui";

export const AddSchedule: React.FC<{
    open: boolean,
    onCancel: () => void
}> = ({open, onCancel}) => {

    const [scheduleName, setScheduleName] = useState<string>("New Schedule");

    return (
        <FullDraggableModal classNames={{content: "add-schedule-draggable-modal"}}
                            title={<div>
                                <div>Add schedule</div>
                                <Flex justify={"center"}>
                                    <Button className={"add-schedule-icon"}>
                                        {scheduleName.at(0)}
                                    </Button>
                                </Flex>
                            </div>}
                            open={open}
                            closable={true}
                            onCancel={onCancel}
                            cancelText={"Cancel"}
                            okText={"Add schedule"}>
            <Form name={"add-schedule"} layout={"horizontal"} initialValues={{
                "name": "New Schedule",
            }}>
                <Form.Item layout={"vertical"} label="Schedule name" name="name" rules={[{required: true}]}>
                    <Input onChange={e => setScheduleName(e.target.value)}/>
                </Form.Item>
                <br/>
                <Form.Item layout={"vertical"} label="Schedule status" name="status" rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <br/>
                <Form.Item layout={"vertical"} label="Schedule description" name="description" rules={[{required: false}]}>
                    <Input/>
                </Form.Item>
                <br/>
                <Form.Item layout={"vertical"} label="Schedule startDate" name="startDateTime"
                           rules={[{required: true}]}>
                    <Input/>
                </Form.Item>
                <br/>
                <Form.Item layout={"vertical"} label="Schedule endDate" name="endDateTime" rules={[{required: false}]}>
                    <Input/>
                </Form.Item>
                <br/>
            </Form>
        </FullDraggableModal>
    )
}