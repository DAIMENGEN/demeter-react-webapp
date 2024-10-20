import "./index.css";
import App from "@D/App";
import React from "react";
import {ConfigProvider} from "antd";
import {Provider} from "react-redux";
import ReactDOM from "react-dom/client";
import {PersistGate} from "redux-persist/integration/react";
import {demeterStore, persistor} from "@D/core/store/demeter-store";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ConfigProvider theme={{
            token: {
                colorPrimary: '#91003c',
            },
        }}>
            <Provider store={demeterStore}>
                <PersistGate persistor={persistor} loading={null}>
                    <App/>
                </PersistGate>
            </Provider>
        </ConfigProvider>
    </React.StrictMode>
);
