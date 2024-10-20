import React from "react";
import {Button, Card, Carousel, Flex, Image, Typography} from "antd";
import full_schedule_day_png from "@D/assets/images/schedule/full-schedule-day.png";
import full_schedule_week_png from "@D/assets/images/schedule/full-schedule-week.png";
import full_schedule_month_png from "@D/assets/images/schedule/full-schedule-month.png";
import full_schedule_quarter_png from "@D/assets/images/schedule/full-schedule-quarter.png";
import full_schedule_year_png from "@D/assets/images/schedule/full-schedule-year.png";

export const ScheduleNavigationMenu: React.FC = () => {
    return (
        <Card hoverable style={{width: 600}} styles={{body: {padding: 5, overflow: 'hidden'}}}>
            <Flex justify="space-between">
                <div style={{width: 380}}>
                    <Carousel arrows autoplay>
                        <Image src={full_schedule_day_png}
                               preview={{src: full_schedule_day_png}}/>
                        <Image src={full_schedule_week_png}
                               preview={{src: full_schedule_week_png}}/>
                        <Image src={full_schedule_month_png}
                               preview={{src: full_schedule_month_png}}/>
                        <Image src={full_schedule_quarter_png}
                               preview={{src: full_schedule_quarter_png}}/>
                        <Image src={full_schedule_year_png}
                               preview={{src: full_schedule_year_png}}/>
                    </Carousel>
                </div>
                <Flex vertical align="flex-end" justify="space-between"
                      style={{padding: 10, width: 220}}>
                    <Typography.Text>
                        Gantt charts are visual tools to help teams
                        track progress and manage resources effectively.
                    </Typography.Text>
                    <Button type="primary" href="#" target="_blank">
                        Enter
                    </Button>
                </Flex>
            </Flex>
        </Card>
    )
}