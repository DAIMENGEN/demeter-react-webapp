import "./schedule-home.scss";
import React, {useState} from "react";
import {Button, Card, Collapse, Flex, Image, Layout, Menu, Space} from "antd";
import {StarIcon01} from "@D/common/icons/star-icon-01";
import {StarIcon02} from "@D/common/icons/star-icon-02";
import {FavoritesEmptyIcon} from "@D/common/icons/favorites-empty-icon";
import {CaretRightOutlined, CarryOutOutlined, HomeOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import {WorkspaceIcon01} from "@D/common/icons/workspace-icon-01";
import {ConditionalRender} from "@D/utils/ConditionalRender";
import {MoreIcon01} from "@D/common/icons/more-icon-01";
import {SearchIcon01} from "@D/common/icons/search-icon-01";
import schedulerIllustrationSvg from "@D/assets/images/schedule/scheduler-illustration.svg"
import getStartedSvg from "@D/assets/images/common/get-started-svg.svg";
import helpCenterSvg from "@D/assets/images/common/help-center-svg.svg";
import fullScheduleDayPng from "@D/assets/images/schedule/full-schedule-day.png";
import {FeedbackIcon01} from "@D/common/icons/feedback-icon-01";
import {QuickIcon01} from "@D/common/icons/quick-icon-01";
import {useDemeterSelector} from "@D/core/store/demeter-hook";
import {DateUtil} from "@D/utils/date/date-util";

export const ScheduleHome: React.FC = () => {
    const {Sider, Header, Content} = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [marginInlineStart, setMarginInlineStart] = useState(200);
    const [activeKeys, setActiveKeys] = useState<Array<string>>([]);
    const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
    const username = useDemeterSelector(state => state.employeeStore.username);
    return (
        <Layout className={"schedule-home"} hasSider>
            <Sider className={"schedule-home-sider"} width={200} trigger={null} collapsedWidth={50} collapsible
                   collapsed={collapsed}>
                <div className={"schedule-home-sider-trigger"} onClick={(_) => {
                    setCollapsed(!collapsed);
                    setMarginInlineStart(collapsed ? 200 : 50);
                }}>
                    {collapsed ? <RightOutlined/> : <LeftOutlined/>}
                </div>
                <ConditionalRender isLoggedIn={collapsed} loggedInContent={null} loggedOutContent={
                    <>
                        <Menu className={"schedule-home-sider-menu"}
                              mode="inline"
                              selectedKeys={selectedKeys}
                              onClick={(e) => setSelectedKeys([e.key])}
                              defaultSelectedKeys={['schedule-home']}
                              items={[
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
                                          children: <Menu className={"schedule-home-sider-workspace-collapse-menu"}
                                                          mode="inline"
                                                          selectedKeys={selectedKeys}
                                                          onClick={(e) => setSelectedKeys([e.key])}
                                                          items={[
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
            <Layout className={"schedule-home-content"} style={{marginInlineStart: marginInlineStart}}>
                <Header className={"schedule-home-content-header"}>
                    <Flex vertical={false} justify={"space-between"}>
                        <Flex vertical={false} className={"schedule-home-content-header-left"}>
                            <div className={"schedule-home-content-header-title"}>
                                <div>{DateUtil.getGreeting()}, {username} !</div>
                                <div>Quickly access your recent boards, Inbox and workspaces</div>
                            </div>
                            <div className={"schedule-home-content-header-background"}>
                                <img src={schedulerIllustrationSvg} alt={"background"}/>
                            </div>
                        </Flex>
                        <Flex vertical={false} className={"schedule-home-content-header-right"}>
                            <div className={"schedule-home-content-header-feedback-button"}>
                                <Button type="text" icon={<FeedbackIcon01 width={20} height={20} color={"#2c2c2c"}/>}>Give
                                    feedback </Button>
                            </div>
                            <div className={"schedule-home-content-header-search-button"}>
                                <Button type="primary" icon={<QuickIcon01 width={20} height={20} color={"#ffffff"}/>}>
                                    Quick Search
                                </Button>
                            </div>
                        </Flex>
                    </Flex>
                </Header>
                <Content className={"schedule-home-content-content"}>
                    <Flex vertical={false} gap={20}>
                        <div className={"schedule-home-content-content-left"}>
                            <Collapse expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
                                      accordion
                                      ghost
                                      items={[
                                          {
                                              key: 'recently-visited',
                                              label: <div
                                                  style={{fontSize: 18, fontWeight: 700, color: "#323338"}}>Recently
                                                  visited</div>,
                                              children: <p>
                                                  A dog is a type of domesticated animal.
                                                  Known for its loyalty and faithfulness,
                                                  it can be found as a welcome guest in many households across the
                                                  world.
                                              </p>,
                                          },
                                          {
                                              key: 'update-feed',
                                              label: <div
                                                  style={{fontSize: 18, fontWeight: 700, color: "#323338"}}>Update feed
                                                  (Inbox)</div>,
                                              children: <p>
                                                  A dog is a type of domesticated animal.
                                                  Known for its loyalty and faithfulness,
                                                  it can be found as a welcome guest in many households across the
                                                  world.
                                              </p>,
                                          }
                                      ]}/>
                        </div>
                        <div className={"schedule-home-content-content-right"}>
                            <Space direction={"vertical"} size={"middle"} style={{display: "flex"}}>
                                <Flex className={"schedule-home-content-content-explore-templates"}
                                      vertical={true}
                                      gap={15}>
                                    <Image src={fullScheduleDayPng} preview={{src: fullScheduleDayPng}}/>
                                    <p>
                                        Boost your workflow in minutes with ready-made templates
                                    </p>
                                    <Button>Explore templates</Button>
                                </Flex>
                                <div style={{fontSize: 16, fontWeight: 500, color: "#323338", textAlign: "left"}}>
                                    Learn & get inspired
                                </div>
                                <Card className={"schedule-home-content-content-right-card"} hoverable bordered={false}>
                                    <Flex justify="space-between">
                                        <div>
                                            <img src={getStartedSvg} alt={"Getting started"}/>
                                        </div>
                                        <div className={"schedule-home-content-content-right-card-text"}>
                                            <h2>Getting started</h2>
                                            <h3>Learn how to create schedule</h3>
                                        </div>
                                    </Flex>
                                </Card>
                                <Card className={"schedule-home-content-content-right-card"} hoverable bordered={false}>
                                    <Flex justify="space-between">
                                        <div>
                                            <img src={helpCenterSvg} alt={"Help center"}/>
                                        </div>
                                        <div className={"schedule-home-content-content-right-card-text"}>
                                            <h2>Help center</h2>
                                            <h3>Learn and get support</h3>
                                        </div>
                                    </Flex>
                                </Card>
                            </Space>
                        </div>
                    </Flex>
                </Content>
            </Layout>
        </Layout>
    )
}