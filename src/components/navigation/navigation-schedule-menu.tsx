import React from "react";
import {Button, Card, Carousel, Flex, Image, Typography} from "antd";
import full_schedule_day_png from "@D/assets/images/schedule/full-schedule-day.png";
import full_schedule_week_png from "@D/assets/images/schedule/full-schedule-week.png";
import full_schedule_month_png from "@D/assets/images/schedule/full-schedule-month.png";
import full_schedule_quarter_png from "@D/assets/images/schedule/full-schedule-quarter.png";
import full_schedule_year_png from "@D/assets/images/schedule/full-schedule-year.png";
import {useNavigate} from "react-router-dom";

export const NavigationScheduleMenu: React.FC = () => {
    const navigate = useNavigate();
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
                        Gantt charts are powerful visual tools that help teams effectively track progress and manage schedules, ensuring resources are allocated efficiently throughout a project.
                    </Typography.Text>
                    <Button type="primary" onClick={() => navigate('/home-page/schedule-home')}>
                        Enter
                    </Button>
                </Flex>
            </Flex>
        </Card>
    )
}