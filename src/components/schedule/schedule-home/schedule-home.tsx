import "./schedule-home.scss";
import React, {useState} from "react";
import {Button, Collapse, Layout, Menu, Space} from "antd";
import {StarIcon01} from "@D/common/icons/star-icon-01";
import {StarIcon02} from "@D/common/icons/star-icon-02";
import {FavoritesEmptyIcon} from "@D/common/icons/favorites-empty-icon";
import {CarryOutOutlined, HomeOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import {WorkspaceIcon01} from "@D/common/icons/workspace-icon-01";
import {ConditionalRender} from "@D/utils/ConditionalRender";
import {MoreIcon01} from "@D/common/icons/more-icon-01";
import {SearchIcon01} from "@D/common/icons/search-icon-01";

export const ScheduleHome: React.FC = () => {
    const {Sider, Content} = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [activeKeys, setActiveKeys] = useState<Array<string>>([]);
    return (
        <Layout className={"schedule-home"}>
            <Sider className={"schedule-home-sider"} width={200} trigger={null} collapsedWidth={50} collapsible
                   collapsed={collapsed}>
                <div className={"schedule-home-sider-trigger"} onClick={() => setCollapsed(!collapsed)}>
                    {collapsed ? <RightOutlined/> : <LeftOutlined/>}
                </div>
                <ConditionalRender isLoggedIn={collapsed} loggedInContent={null} loggedOutContent={
                    <>
                        <Menu className={"schedule-home-sider-menu"} mode="inline"
                              defaultSelectedKeys={['schedule-home']} items={[
                            {
                                key: 'schedule-home-divider',
                                type: 'divider',
                            },
                            {
                                key: 'schedule-home',
                                icon: <HomeOutlined/>,
                                label: 'Schedule home'
                            },
                            {
                                key: 'my-work-divider_1',
                                type: 'divider',
                            },
                            {
                                key: 'my-work',
                                icon: <CarryOutOutlined/>,
                                label: 'My work'
                            },
                            {
                                key: 'my-work-divider_2',
                                type: 'divider',
                            },
                        ]}/>
                        <Collapse className={"schedule-home-sider-favorites-collapse"}
                                  expandIcon={(e) => e.isActive ?
                                      <StarIcon01 width={16} height={16} color={"#efce4a"}/> :
                                      <StarIcon02 width={16} height={16} color={"#2c2c2c"}/>}
                                  onChange={(key) => setActiveKeys(key)}
                                  activeKey={activeKeys}
                                  accordion
                                  ghost
                                  items={[
                                      {
                                          key: 'favorites',
                                          label: 'Favorites',
                                          children: <div
                                              className={"schedule-home-sider-favorites-collapse-empty-content"}>
                                              <div>
                                                  <FavoritesEmptyIcon/>
                                              </div>
                                              <div>
                                                  You have no favorites yet!
                                              </div>
                                              <div>
                                                  Add boards, docs, or dashboards to your favorites tab for quick and
                                                  easy
                                                  access.
                                              </div>
                                          </div>
                                      }
                                  ]}/>
                        <Collapse className={"schedule-home-sider-workspace-collapse"}
                                  expandIcon={(_) => <WorkspaceIcon01 width={15} height={15} color={"2c2c2c"}/>}
                                  onChange={(key) => setActiveKeys(key)}
                                  activeKey={activeKeys}
                                  accordion
                                  ghost
                                  items={[
                                      {
                                          key: "workspaces",
                                          label: 'Workspaces',
                                          extra: <Space size={"small"}>
                                              <Button type={"text"}
                                                      style={{width: 25, height: 25}}
                                                      onClick={(e) => e.stopPropagation()}
                                                      icon={<MoreIcon01 width={16} height={16} color={"#2c2c2c"}/>}/>
                                              <Button type={"text"}
                                                      style={{width: 25, height: 25}}
                                                      onClick={(e) => e.stopPropagation()}
                                                      icon={<SearchIcon01 width={16} height={16} color={"#2c2c2c"}/>}/>
                                          </Space>,
                                          children: <Menu className={"schedule-home-sider-workspace-collapse-menu"} mode="inline" items={[
                                              {
                                                  key: 'schedule-1',
                                                  label: 'Schedule 1'
                                              },
                                              {
                                                  key: 'schedule-2',
                                                  label: 'Schedule 2'
                                              },
                                              {
                                                  key: 'schedule-3',
                                                  label: 'Schedule 3'
                                              },
                                              {
                                                  key: 'schedule-4',
                                                  label: 'Schedule 5'
                                              },
                                              {
                                                  key: 'schedule-5',
                                                  label: 'Schedule 5'
                                              },
                                              {
                                                  key: 'schedule-6',
                                                  label: 'Schedule 6'
                                              },
                                              {
                                                  key: 'schedule-7',
                                                  label: 'Schedule 7'
                                              },
                                              {
                                                  key: 'schedule-8',
                                                  label: 'Schedule 8'
                                              },
                                          ]}/>
                                      }
                                  ]}/>
                    </>
                }/>
            </Sider>
            <Content className={"schedule-home-content"}>
                <p>long content</p>
                {
                    // indicates very long content
                    Array.from({length: 100}, (_, index) => (
                        <React.Fragment key={index}>
                            {index % 20 === 0 && index ? 'more' : '...'}
                            <br/>
                        </React.Fragment>
                    ))
                }
            </Content>
        </Layout>
    )
}