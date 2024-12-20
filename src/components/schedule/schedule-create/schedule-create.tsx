import "./schedule-create.scss";
import dayjs from "dayjs";
import {useState} from "react";
import {Button, Flex, Form, Input, Select} from "antd";
import {FullDraggableModal} from "full-flex-ui";
import {useFormDateFieldRules} from "@D/core/hooks/form/form-field/use-form-date-filed-rules";
import {useScheduleStatus} from "@D/components/schedule/schedule-create/hooks/use-schedule-status";
import {useCreateSchedule} from "@D/components/schedule/schedule-create/hooks/use-create-schedule";
import {useDemeterDispatch, useDemeterSelector} from "@D/core/store/demeter-hook";
import {setAddScheduleModalVisible} from "@D/core/store/features/schedule-slice";

export const ScheduleCreate = () => {
    const {TextArea} = Input;
    const [form] = Form.useForm();
    const dispatch = useDemeterDispatch();
    const {addScheduleHolderMessage, addSchedule} = useCreateSchedule();
    const [scheduleName, setScheduleName] = useState<string>("New Schedule");
    const addScheduleModalVisible = useDemeterSelector(state => state.scheduleStore.addScheduleModalVisible);
    return (
        <FullDraggableModal classNames={{content: "schedule-create-draggable-modal"}}
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
                            onCancel={() => dispatch(setAddScheduleModalVisible(false))}
                            maskClosable={false}
                            cancelText={"Cancel"}
                            okText={"Add schedule"}
                            onOk={() => form.submit()}>
            {addScheduleHolderMessage}
            <Form name={"schedule-create"} layout={"vertical"} form={form} onFinish={addSchedule} initialValues={{
                "projectName": "New Schedule",
                "projectStatus": 3,
                "startDateTime": dayjs().format("YYYY-MM-DD")
            }}>
                <Form.Item layout={"vertical"} label="Schedule name" name="projectName" rules={[{required: true}]}>
                    <Input onChange={e => setScheduleName(e.target.value)}/>
                </Form.Item>
                <Form.Item layout={"vertical"} label="Schedule status" name="projectStatus" rules={[{required: true}]}>
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