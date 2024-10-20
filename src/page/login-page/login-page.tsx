import React, {useCallback} from "react";
import "./login-page.scss";
import {useNavigate} from "react-router-dom";
import {UserEntity} from "@D/core/entity/user-entity";
import {Button, Form, Input, Layout, Space} from "antd";
import {UserService} from "@D/core/service/user-service";
import {useAntdMessage} from "@D/core/hooks/use-antd-message";
import {useDemeterDispatch} from "@D/core/store/demeter-hook";
import {setCurrentUserAction} from "@D/core/store/features/user-slice";
import login_bg_image from "../../assets/images/bg/login-bg-image.jpeg";
import login_logo_wr_image from "../../assets/images/logo/login_logo_wr.jpg";

export const LoginPage: React.FC = () => {
    const {Content} = Layout;
    const navigate = useNavigate();
    const dispatch = useDemeterDispatch();
    const {contextHolderMessage, success, failure} = useAntdMessage();
    const onFinish = useCallback((values: { account: string, password: string }) => {
        const userService = new UserService();
        userService.login(
            values.account,
            values.password,
            (currentUser: UserEntity) => {
                success("Login Successfully").then(() => {
                    dispatch(setCurrentUserAction(currentUser));
                    navigate("/home");
                });
            },
            (error: Error) => {
                failure(error.message).then();
            }
        );
    }, [dispatch, navigate, success, failure]);

    return (
        <Layout className={"layout-container"} style={{
            backgroundImage: `url(${login_bg_image})`,
            backgroundSize: "cover",
            backgroundPositionX: "44%",
            backgroundAttachment: "fixed"
        }}>
            <Content className={"login-content"}>
                <div className={"login-form"}>
                    {contextHolderMessage}
                    <div className="logo-container">
                        <img src={login_logo_wr_image} alt="Advantest"/>
                    </div>
                    <h1 className="login-title">Welcome to Demeter</h1>
                    <Form
                        name="basic"
                        initialValues={{remember: true}}
                        onFinish={onFinish}
                        layout="vertical"
                    >
                        <Form.Item
                            name="account"
                            rules={[{required: true, message: 'Please enter your username!'}]}
                        >
                            <Input placeholder={"You Username"} autoComplete="username"/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please enter your password!'}]}
                        >
                            <Input.Password placeholder={"You Password"} autoComplete="current-password"/>
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-button">
                                Log in
                            </Button>
                        </Form.Item>
                    </Form>
                    <div style={{textAlign: "center", width: "100%"}}>
                        <Space>
                            <span style={{color: "#a7a5a5"}}>Don't have an account yet?</span>
                            <a href="https://www.advantest.com/" onClick={() => {
                                alert("敬请期待")
                            }}>Sign up</a>
                        </Space>
                    </div>
                </div>
            </Content>
        </Layout>
    )
}