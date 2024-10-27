import "./home-page.scss";
import React, {useCallback} from "react";
import {Layout, Menu, MenuProps, Space, Watermark} from "antd";
import {useDemeterDispatch} from "@D/core/store/demeter-hook";
import header_logo_white_image from "../../assets/images/logo/header_logo_white.png"
import {HomeOutlined, LogoutOutlined} from "@ant-design/icons";
import {Outlet, useNavigate} from "react-router-dom";
import {setEmployeeServiceAction} from "@D/core/store/features/employee-slice";

export const HomePage: React.FC = () => {
    const {Header, Footer, Content} = Layout;
    const navigate = useNavigate();
    const dispatch = useDemeterDispatch();
    const onClick: MenuProps["onClick"] = useCallback((e: any) => {
        const {key} = e;
        switch (key) {
            case "/logout":
                localStorage.removeItem("token");
                dispatch(setEmployeeServiceAction(undefined));
                navigate(key);
                break;
            case "/home":
                navigate(key);
                break;
            default:
                break;
        }
    }, [dispatch, navigate]);

    return (
        <Watermark content={"用户名"}>
            <Layout className={"home-container"} style={{height: "100vh"}}>
                <Header className={"header"}>
                    <Space className="header-left">
                        <div className="demo-logo-vertical">
                            <img src={header_logo_white_image} alt="Advantest"/>
                        </div>
                        <Menu className="header-left-menu"
                              onClick={onClick}
                              theme="dark"
                              mode="horizontal"
                              items={[{
                                  key: '/home',
                                  label: 'Home',
                                  icon: <HomeOutlined/>,
                              }]}/>
                    </Space>
                    <Space className="header-right">
                        <Space>
                            <span style={{color: "white", fontSize: "16px"}}>{"用户名"}</span>
                        </Space>
                        <Menu className="header-right-menu"
                              onClick={onClick}
                              theme="dark"
                              mode="horizontal"
                              items={[{
                                  key: "/logout",
                                  label: "Logout",
                                  icon: <LogoutOutlined/>
                              }]}/>
                    </Space>
                </Header>
                <Content className={"content"}>
                    <Outlet/>
                </Content>
                <Footer style={{
                    textAlign: 'center',
                    color: '#fff',
                    backgroundColor: '#4096ff',
                }}>Footer</Footer>
            </Layout>
        </Watermark>
    )

}