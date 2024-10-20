import React from "react";
import {Navigate} from "react-router-dom";
import {useDemeterSelector} from "@D/core/store/demeter-hook";

export const Authentication: React.FC<{ children?: React.ReactNode }> = ({children}) => {
    const currentUser = useDemeterSelector(state => state.userStoreState.currentUser);
    if (currentUser) {
        return <>{children}</>;
    } else {
        return <Navigate to={"/login"} replace></Navigate>
    }
}