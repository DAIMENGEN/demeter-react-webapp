import "./App.scss";
import React from "react";
import {BrowserRouter} from "react-router-dom";
import {DemeterRoute} from "@D/route/demeter-route";

function App() {
    return (
        <BrowserRouter>
            <DemeterRoute/>
        </BrowserRouter>
    );
}

export default App;
