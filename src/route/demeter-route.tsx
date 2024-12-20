import React from "react";
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "@D/page/login-page/login-page";
import {Authentication} from "@D/route/authentication";
import {HomePage} from "@D/page/home-page/home-page";
import {NavigationMenu} from "@D/components/navigation/navigation-menu/navigation-menu";
import {ScheduleHome} from "@D/components/schedule/schedule-home/schedule-home";
import {ScheduleHomeContent} from "@D/components/schedule/schedule-home/schedule-home-content";
import {ScheduleMaintenance} from "@D/components/schedule/schedule-maintenance/schedule-maintenance";

export const DemeterRoute: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/login-page" element={<LoginPage/>}/>
            <Route path="/home-page" element={<Authentication children={<HomePage/>}/>}>
                <Route index element={<NavigationMenu/>}/>
                <Route path="/home-page/schedule-home" element={<ScheduleHome/>}>
                    <Route index element={<ScheduleHomeContent/>}/>
                    <Route path="/home-page/schedule-home/maintenance-schedule" element={<ScheduleMaintenance/>}/>
                </Route>
            </Route>
        </Routes>
    )
}