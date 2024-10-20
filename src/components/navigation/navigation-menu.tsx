import React from "react";
import {Card, Flex} from "antd";
import {ScheduleNavigationMenu} from "@D/components/navigation/schedule-navigation-menu";

export const NavigationMenu: React.FC = () => {
    return (
        <Flex gap={20} vertical style={{
            backgroundColor: "#f0f2f5",
            padding: 20
        }}>
            <Card title="热门工具" bordered={false}>
                <ScheduleNavigationMenu/>
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