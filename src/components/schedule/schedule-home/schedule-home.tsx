import "./schedule-home.scss";
import React, {useState} from "react";
import {Button, Card, Collapse, Dropdown, Flex, Image, Layout, Menu, Space} from "antd";
import {StarIcon01} from "@D/common/icons/star-icon-01";
import {StarIcon02} from "@D/common/icons/star-icon-02";
import {FavoritesEmptyIcon} from "@D/common/icons/favorites-empty-icon";
import {CaretRightOutlined, CarryOutOutlined, HomeOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import {WorkspaceIcon01} from "@D/common/icons/workspace-icon-01";
import {ConditionalRender} from "@D/utils/ConditionalRender";
import {MoreIcon01} from "@D/common/icons/more-icon-01";
import {SearchIcon01} from "@D/common/icons/search-icon-01";
import getStartedSvg from "@D/assets/images/common/get-started-svg.svg";
import helpCenterSvg from "@D/assets/images/common/help-center-svg.svg";
import scheduleTemplate from "@D/assets/images/schedule/schedule_template.svg";
import fullScheduleDayPng from "@D/assets/images/schedule/full-schedule-day.png";
import schedulerIllustrationSvg from "@D/assets/images/schedule/scheduler-illustration.svg"
import {FeedbackIcon01} from "@D/common/icons/feedback-icon-01";
import {QuickIcon01} from "@D/common/icons/quick-icon-01";
import {useDemeterSelector} from "@D/core/store/demeter-hook";
import {DateUtil} from "@D/utils/date/date-util";
import {SortIcon01} from "@D/common/icons/sort-icon-01";
import {AddIcon01} from "@D/common/icons/add-icon-01";
import {ImportIcon01} from "@D/common/icons/import-icon-01";

export const ScheduleHome: React.FC = () => {
    const {Sider, Header, Content} = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const [marginInlineStart, setMarginInlineStart] = useState(200);
    const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
    const [siderActiveKeys, setSiderActiveKeys] = useState<Array<string>>([]);
    const [contentActiveKeys, setContentActiveKeys] = useState<Array<string>>(["recently-visited", "update-feed"]);
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
                                  onChange={(key) => setSiderActiveKeys(key)}
                                  activeKey={siderActiveKeys}
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
                                  onChange={(key) => setSiderActiveKeys(key)}
                                  activeKey={siderActiveKeys}
                                  accordion
                                  ghost
                                  items={[
                                      {
                                          key: "workspaces",
                                          label: 'Workspaces',
                                          extra: <Space size={"small"}>
                                              <Dropdown menu={{
                                                  items: [
                                                      {
                                                          key: '0',
                                                          label: <span>Add new schedule</span>,
                                                          icon: <AddIcon01 width={15} height={15} color={"#2c2c2c"}/>,
                                                      },
                                                      {
                                                          key: '1',
                                                          label: <span>Sort schedule</span>,
                                                          icon: <SortIcon01 width={15} height={15} color={"#2c2c2c"}/>,
                                                      },
                                                      {
                                                          key: '2',
                                                          label: <span>Import schedule</span>,
                                                          icon: <ImportIcon01 width={15} height={15}
                                                                              color={"#2c2c2c"}/>,
                                                      },
                                                      {
                                                          type: 'divider',
                                                      },
                                                      {
                                                          key: '3',
                                                          label: '3rd menu item',
                                                      },
                                                  ]
                                              }}>
                                                  <Button type={"text"}
                                                          style={{width: 25, height: 25}}
                                                          onClick={(e) => e.stopPropagation()}
                                                          icon={<MoreIcon01 width={16} height={16}
                                                                            color={"#2c2c2c"}/>}/>
                                              </Dropdown>
                                              <Button type={"text"}
                                                      style={{width: 25, height: 25}}
                                                      onClick={(e) => e.stopPropagation()}
                                                      icon={<SearchIcon01 width={16} height={16} color={"#2c2c2c"}/>}/>
                                          </Space>,
                                          children: <Menu className={"schedule-home-sider-workspace-collapse-menu"}
                                                          mode="vertical"
                                                          selectedKeys={selectedKeys}
                                                          onClick={(e) => setSelectedKeys([e.key])}
                                                          items={[
                                                              {
                                                                  key: 'schedule-1',
                                                                  label: 'Schedule 1',
                                                                  children: [
                                                                      {key: 'schedule-1-1', label: 'Open in New Tab'},
                                                                      {key: 'schedule-1-divider-1', type: 'divider'},
                                                                      {key: 'schedule-1-2', label: 'Rename Schedule'},
                                                                      {key: 'schedule-1-3', label: 'Add to favorites'},
                                                                      {
                                                                          key: 'schedule-1-4',
                                                                          label: 'Save as a template'
                                                                      },
                                                                      {key: 'schedule-1-divider-2', type: 'divider'},
                                                                      {key: 'schedule-1-5', label: 'Delete Schedule'},
                                                                      {key: 'schedule-1-6', label: 'Export Schedule'},
                                                                      {key: 'schedule-1-7', label: 'Share Schedule'},
                                                                  ],
                                                              },
                                                              {
                                                                  key: 'schedule-2',
                                                                  label: 'Schedule 2',
                                                                  children: [
                                                                      {key: 'schedule-2-1', label: 'Open in New Tab'},
                                                                      {key: 'schedule-2-divider-1', type: 'divider'},
                                                                      {key: 'schedule-2-2', label: 'Rename Schedule'},
                                                                      {key: 'schedule-2-3', label: 'Add to favorites'},
                                                                      {
                                                                          key: 'schedule-2-4',
                                                                          label: 'Save as a template'
                                                                      },
                                                                      {key: 'schedule-2-divider-2', type: 'divider'},
                                                                      {key: 'schedule-2-5', label: 'Delete Schedule'},
                                                                      {key: 'schedule-2-6', label: 'Export Schedule'},
                                                                      {key: 'schedule-2-7', label: 'Share Schedule'},
                                                                  ],
                                                              },
                                                              {
                                                                  key: 'schedule-3',
                                                                  label: 'Schedule 3',
                                                                  children: [
                                                                      {key: 'schedule-3-1', label: 'Open in New Tab'},
                                                                      {key: 'schedule-3-divider-1', type: 'divider'},
                                                                      {key: 'schedule-3-2', label: 'Rename Schedule'},
                                                                      {key: 'schedule-3-3', label: 'Add to favorites'},
                                                                      {
                                                                          key: 'schedule-3-4',
                                                                          label: 'Save as a template'
                                                                      },
                                                                      {key: 'schedule-3-divider-2', type: 'divider'},
                                                                      {key: 'schedule-3-5', label: 'Delete Schedule'},
                                                                      {key: 'schedule-3-6', label: 'Export Schedule'},
                                                                      {key: 'schedule-3-7', label: 'Share Schedule'},
                                                                  ],
                                                              },
                                                              {
                                                                  key: 'schedule-4',
                                                                  label: 'Schedule 4',
                                                                  children: [
                                                                      {key: 'schedule-4-1', label: 'Open in New Tab'},
                                                                      {key: 'schedule-4-divider-1', type: 'divider'},
                                                                      {key: 'schedule-4-2', label: 'Rename Schedule'},
                                                                      {key: 'schedule-4-3', label: 'Add to favorites'},
                                                                      {
                                                                          key: 'schedule-4-4',
                                                                          label: 'Save as a template'
                                                                      },
                                                                      {key: 'schedule-4-divider-2', type: 'divider'},
                                                                      {key: 'schedule-4-5', label: 'Delete Schedule'},
                                                                      {key: 'schedule-4-6', label: 'Export Schedule'},
                                                                      {key: 'schedule-4-7', label: 'Share Schedule'},
                                                                  ],
                                                              },
                                                              {
                                                                  key: 'schedule-5',
                                                                  label: 'Schedule 5',
                                                                  children: [
                                                                      {key: 'schedule-5-1', label: 'Open in New Tab'},
                                                                      {key: 'schedule-5-divider-1', type: 'divider'},
                                                                      {key: 'schedule-5-2', label: 'Rename Schedule'},
                                                                      {key: 'schedule-5-3', label: 'Add to favorites'},
                                                                      {
                                                                          key: 'schedule-5-4',
                                                                          label: 'Save as a template'
                                                                      },
                                                                      {key: 'schedule-5-divider-2', type: 'divider'},
                                                                      {key: 'schedule-5-5', label: 'Delete Schedule'},
                                                                      {key: 'schedule-5-6', label: 'Export Schedule'},
                                                                      {key: 'schedule-5-7', label: 'Share Schedule'},
                                                                  ],
                                                              },
                                                              {
                                                                  key: 'schedule-6',
                                                                  label: 'Schedule 6',
                                                                  children: [
                                                                      {key: 'schedule-6-1', label: 'Open in New Tab'},
                                                                      {key: 'schedule-6-divider-1', type: 'divider'},
                                                                      {key: 'schedule-6-2', label: 'Rename Schedule'},
                                                                      {key: 'schedule-6-3', label: 'Add to favorites'},
                                                                      {
                                                                          key: 'schedule-6-4',
                                                                          label: 'Save as a template'
                                                                      },
                                                                      {key: 'schedule-6-divider-2', type: 'divider'},
                                                                      {key: 'schedule-6-5', label: 'Delete Schedule'},
                                                                      {key: 'schedule-6-6', label: 'Export Schedule'},
                                                                      {key: 'schedule-6-7', label: 'Share Schedule'},
                                                                  ],
                                                              },
                                                              {
                                                                  key: 'schedule-7',
                                                                  label: 'Schedule 7',
                                                                  children: [
                                                                      {key: 'schedule-7-1', label: 'Open in New Tab'},
                                                                      {key: 'schedule-7-divider-1', type: 'divider'},
                                                                      {key: 'schedule-7-2', label: 'Rename Schedule'},
                                                                      {key: 'schedule-7-3', label: 'Add to favorites'},
                                                                      {
                                                                          key: 'schedule-7-4',
                                                                          label: 'Save as a template'
                                                                      },
                                                                      {key: 'schedule-7-divider-2', type: 'divider'},
                                                                      {key: 'schedule-7-5', label: 'Delete Schedule'},
                                                                      {key: 'schedule-7-6', label: 'Export Schedule'},
                                                                      {key: 'schedule-7-7', label: 'Share Schedule'},
                                                                  ],
                                                              },
                                                              {
                                                                  key: 'schedule-8',
                                                                  label: 'Schedule 8',
                                                                  children: [
                                                                      {key: 'schedule-8-1', label: 'Open in New Tab'},
                                                                      {key: 'schedule-8-divider-1', type: 'divider'},
                                                                      {key: 'schedule-8-2', label: 'Rename Schedule'},
                                                                      {key: 'schedule-8-3', label: 'Add to favorites'},
                                                                      {
                                                                          key: 'schedule-8-4',
                                                                          label: 'Save as a template'
                                                                      },
                                                                      {key: 'schedule-8-divider-2', type: 'divider'},
                                                                      {key: 'schedule-8-5', label: 'Delete Schedule'},
                                                                      {key: 'schedule-8-6', label: 'Export Schedule'},
                                                                      {key: 'schedule-8-7', label: 'Share Schedule'},
                                                                  ],
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
                        <Flex vertical={false}>
                            <div className={"title"}>
                                <div>{DateUtil.getGreeting()}, {username} !</div>
                                <div>Quickly access your recent boards, Inbox and workspaces</div>
                            </div>
                            <div className={"background"}>
                                <img src={schedulerIllustrationSvg} alt={"background"}/>
                            </div>
                        </Flex>
                        <Flex vertical={false} gap={10}>
                            <div className={"feedback-button"}>
                                <Button type="text" icon={<FeedbackIcon01 width={20} height={20} color={"#2c2c2c"}/>}>Give
                                    feedback </Button>
                            </div>
                            <div className={"search-button"}>
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
                            <Collapse ghost
                                      activeKey={contentActiveKeys}
                                      onChange={(key) => setContentActiveKeys(key)}
                                      expandIcon={({isActive}) => <CaretRightOutlined rotate={isActive ? 90 : 0}/>}
                                      items={[
                                          {
                                              key: 'recently-visited',
                                              label: <div>Recently visited</div>,
                                              children: <div>
                                                  {Array.from({length: 8}, (_, i) => (
                                                      <Flex key={i} vertical={true}>
                                                          <img src={scheduleTemplate} alt={"schedule template"}/>
                                                          <div>
                                                              <span>First Schedule</span>
                                                          </div>
                                                          <div>
                                                              <span>Schedule owner: Mengen.dai</span>
                                                          </div>
                                                      </Flex>
                                                  ))}
                                              </div>,
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
                            <Flex vertical={true} gap={"middle"}>
                                <Flex vertical={true}
                                      gap={15}>
                                    <Image src={fullScheduleDayPng} preview={{src: fullScheduleDayPng}}/>
                                    <p>
                                        Boost your workflow in minutes with ready-made templates
                                    </p>
                                    <Button>Explore templates</Button>
                                </Flex>
                                <div>
                                    Learn & get inspired
                                </div>
                                <Card hoverable bordered={false}>
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
                                <Card hoverable bordered={false}>
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
                            </Flex>
                        </div>
                    </Flex>
                </Content>
            </Layout>
        </Layout>
    )
}