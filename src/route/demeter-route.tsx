import React from "react";
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "@D/page/login-page/login-page";
import {Authentication} from "@D/route/authentication";
import {HomePage} from "@D/page/home-page/home-page";
import {NavigationMenu} from "@D/components/navigation/navigation-menu";

export const DemeterRoute: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/logout" element={<LoginPage/>}/>
            <Route path="/home" element={<Authentication children={<HomePage/>}/>}>
                <Route index element={<NavigationMenu/>}/>
            </Route>
        </Routes>
    )
}