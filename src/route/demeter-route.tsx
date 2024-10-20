import React from "react";
import {Route, Routes} from "react-router-dom";
import {LoginPage} from "@D/page/login-page/login-page";
import {Authentication} from "@D/route/authentication";

export const DemeterRoute: React.FC = () => {
    return (
        <Routes>
            <Route path="/" element={<LoginPage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/home" element={<Authentication children={<div>Home</div>}/>}/>
        </Routes>
    )
}