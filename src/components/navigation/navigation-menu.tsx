import React from "react";
import {Card, Flex} from "antd";
import {NavigationScheduleMenu} from "@D/components/navigation/navigation-schedule-menu";

export const NavigationMenu: React.FC = () => {
    return (
        <Flex gap={20} vertical style={{padding: 20}}>
            <Card title="热门工具" bordered={false}>
                <NavigationScheduleMenu/>
            </Card>

            <Card title="内网平台" bordered={false}>
                <Flex wrap gap={20}>
                    {Array.from({length: 10}, (_, i) => (
                        <Card style={{width: 300}} key={i}>
                            <p>内网平台{i}</p>
                        </Card>
                    ))}
                </Flex>
            </Card>

            <Card title="学习平台" bordered={false}>
                <Flex wrap gap={20}>
                    {Array.from({length: 10}, (_, i) => (
                        <Card style={{width: 300}} key={i}>
                            <p>学习平台{i}</p>
                        </Card>
                    ))}
                </Flex>
            </Card>

            <Card title="技术社区" bordered={false}>
                <Flex wrap gap={20}>
                    {Array.from({length: 10}, (_, i) => (
                        <Card style={{width: 300}} key={i}>
                            <p>技术社区{i}</p>
                        </Card>
                    ))}
                </Flex>
            </Card>
        </Flex>
    )
}