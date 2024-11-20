import "./index.css";
import App from "@D/App";
import React from "react";
import {ConfigProvider} from "antd";
import {Provider} from "react-redux";
import ReactDOM from "react-dom/client";
import {PersistGate} from "redux-persist/integration/react";
import {demeterStore, persistor} from "@D/core/store/demeter-store";
import {PRIMARY_COLOR} from "@D/common/style/color";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <ConfigProvider theme={{
            token: {
                colorPrimary: PRIMARY_COLOR,
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
