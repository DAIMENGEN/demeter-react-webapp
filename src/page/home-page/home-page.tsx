import "./home-page.scss";
import React, {useCallback} from "react";
import {Layout, Menu, MenuProps, Space} from "antd";
import {useDemeterSelector} from "@D/core/store/demeter-hook";
import header_logo_white_image from "../../assets/images/logo/header_logo_white.png"
import {HomeOutlined, LogoutOutlined} from "@ant-design/icons";
import {Outlet, useNavigate} from "react-router-dom";
import {EmployeeService} from "@D/core/service/employee-service";

export const HomePage: React.FC = () => {
    const {Header, Content} = Layout;
    const navigate = useNavigate();
    const username = useDemeterSelector(state => state.employeeStore.username);
    const onClick: MenuProps["onClick"] = useCallback((e: any) => {
        const {key} = e;
        switch (key) {
            case "/login-page":
                const employeeService: EmployeeService = EmployeeService.getInstance();
                employeeService.logoutRequest("mengen.dai", () => {
                    localStorage.removeItem("token");
                    navigate(key);
                }, (error: Error) => console.error(error))
                break;
            case "/home-page":
                navigate(key);
                break;
            default:
                break;
        }
    }, [navigate]);

    return (
        <Layout className={"home-page"}>
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
                              key: '/home-page',
                              label: 'Home',
                              icon: <HomeOutlined/>,
                          }]}/>
                </Space>
                <Space className="header-right">
                    <Space>
                        <span style={{color: "white", fontSize: "16px"}}>{username}</span>
                    </Space>
                    <Menu className="header-right-menu"
                          onClick={onClick}
                          theme="dark"
                          mode="horizontal"
                          items={[{
                              key: "/login-page",
                              label: "Logout",
                              icon: <LogoutOutlined/>
                          }]}/>
                </Space>
            </Header>
            <Content className={"content"}>
                <Outlet/>
            </Content>
        </Layout>
    )
}