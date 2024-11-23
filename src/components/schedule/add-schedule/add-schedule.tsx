import "./add-schedule.scss";
import dayjs from "dayjs";
import React, {useState} from "react";
import {Button, Flex, Form, Input, Select} from "antd";
import {FullDraggableModal} from "full-flex-ui";
import {useFormDateFieldRules} from "@D/core/hooks/form/form-field/use-form-date-filed-rules";
import {useScheduleStatus} from "@D/components/schedule/add-schedule/hooks/use-schedule-status";
import {useAddSchedule} from "@D/components/schedule/add-schedule/hooks/use-add-schedule";
import {useAddScheduleModalVisible} from "@D/components/schedule/hooks/use-add-schedule-modal-visible";

export const AddSchedule = () => {
    const {TextArea} = Input;
    const [form] = Form.useForm();
    const {addScheduleHolderMessage, addSchedule} = useAddSchedule();
    const {addScheduleModalVisible, setAddScheduleModalVisible} = useAddScheduleModalVisible();
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
                            style={{top: 80}}
                            open={addScheduleModalVisible}
                            closable={true}
                            onCancel={() => setAddScheduleModalVisible(false)}
                            maskClosable={false}
                            cancelText={"Cancel"}
                            okText={"Add schedule"}
                            onOk={() => form.submit()}>
            {addScheduleHolderMessage}
            <Form name={"add-schedule"} layout={"vertical"} form={form} onFinish={addSchedule} initialValues={{
                "name": "New Schedule",
                "status": 3,
                "startDateTime": dayjs().format("YYYY-MM-DD")
            }}>
                <Form.Item layout={"vertical"} label="Schedule name" name="name" rules={[{required: true}]}>
                    <Input onChange={e => setScheduleName(e.target.value)}/>
                </Form.Item>
                <Form.Item layout={"vertical"} label="Schedule status" name="status" rules={[{required: true}]}>
                    <Select showSearch options={useScheduleStatus()} filterOption={(input, option) => {
                        return (option?.label?.toString() ?? "").toLowerCase().includes(input.toLowerCase());
                    }}/>
                </Form.Item>
                <Form.Item layout={"vertical"} label="Schedule startDate" name="startDateTime"
                           rules={useFormDateFieldRules(true)}>
                    <Input/>
                </Form.Item>
                <Form.Item layout={"vertical"} label="Schedule endDate" name="endDateTime"
                           rules={useFormDateFieldRules(false)}>
                    <Input/>
                </Form.Item>
                <Form.Item layout={"vertical"} label="Schedule description" name="description"
                           rules={[{required: false}]}>
                    <TextArea placeholder="Autosize height with minimum and maximum number of lines"
                              autoSize={{minRows: 3, maxRows: 10}}/>
                </Form.Item>
            </Form>
        </FullDraggableModal>
    )
}