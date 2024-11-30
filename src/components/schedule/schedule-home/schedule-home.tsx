import "./schedule-home.scss";
import React, {useEffect, useState} from "react";
import {Button, Collapse, Dropdown, Layout, Menu, Space} from "antd";
import {StarIcon01} from "@D/icons/star-icon/star-icon-01";
import {StarIcon02} from "@D/icons/star-icon/star-icon-02";
import {FavoritesEmptyIcon} from "@D/icons/favorites-empty/favorites-empty-icon";
import {CarryOutOutlined, HomeOutlined, LeftOutlined, RightOutlined} from "@ant-design/icons";
import {WorkspaceIcon01} from "@D/icons/workspace-icon/workspace-icon-01";
import {ConditionalRender} from "@D/utils/conditional-render.tsx";
import {MoreIcon01} from "@D/icons/more-icon/more-icon-01";
import {SearchIcon01} from "@D/icons/search-icon/search-icon-01";
import {useDemeterDispatch} from "@D/core/store/demeter-hook";
import {SortIcon01} from "@D/icons/sort-icon/sort-icon-01";
import {AddIcon01} from "@D/icons/add-icon/add-icon-01";
import {ImportIcon01} from "@D/icons/import-icon/import-icon-01";
import {ScheduleCreate} from "@D/components/schedule/schedule-create/schedule-create";
import {useScheduleMenuItems} from "@D/components/schedule/schedule-home/hooks/use-schedule-menu-items";
import {useDeleteSchedule} from "@D/components/schedule/schedule-home/hooks/use-delete-schedule";
import {ProjectService} from "@D/core/service/project-service";
import {setProjectEntities} from "@D/core/store/features/project-slice";
import {ScheduleRename} from "@D/components/schedule/schedule-rename/schedule-rename";
import {Outlet} from "react-router-dom";
import {
    setAddScheduleModalVisible,
    setRenameScheduleId,
    setRenameScheduleModalVisible
} from "@D/core/store/features/schedule-slice";

export const ScheduleHome: React.FC = () => {
    const {Sider} = Layout;
    const [collapsed, setCollapsed] = useState(false);
    const dispatch = useDemeterDispatch();
    const [marginInlineStart, setMarginInlineStart] = useState(200);
    const [selectedKeys, setSelectedKeys] = useState<Array<string>>([]);
    const [siderActiveKeys, setSiderActiveKeys] = useState<Array<string>>([]);
    const {deleteScheduleHolderMessage, deleteSchedule} = useDeleteSchedule();

    useEffect(() => {
        const projectService = ProjectService.getInstance();
        projectService.getProjectsByEmployeeIdRequest(projects => {
            dispatch(setProjectEntities(projects));
        });
    }, [dispatch]);

    return (
        <Layout className={"schedule-home"} hasSider>
            {deleteScheduleHolderMessage}
            <Sider className={"schedule-home-sider"} width={200} trigger={null} collapsedWidth={30} collapsible
                   collapsed={collapsed}>
                <div className={"schedule-home-sider-trigger"} onClick={(_) => {
                    setCollapsed(!collapsed);
                    setMarginInlineStart(collapsed ? 200 : 30);
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
                                                          key: "add-new-schedule",
                                                          label: <span>Add new schedule</span>,
                                                          icon: <AddIcon01 width={15} height={15} color={"#2c2c2c"}/>
                                                      },
                                                      {
                                                          key: "sort-schedule",
                                                          label: <span>Sort schedule</span>,
                                                          icon: <SortIcon01 width={15} height={15} color={"#2c2c2c"}/>,
                                                      },
                                                      {
                                                          key: "import-schedule",
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
                                                  ],
                                                  onClick: (e) => {
                                                      e.domEvent.stopPropagation();
                                                      switch (e.key) {
                                                          case "add-new-schedule":
                                                              dispatch(setAddScheduleModalVisible(true));
                                                              break;
                                                          case "sort-schedule":
                                                              break;
                                                          case "import-schedule":
                                                              break;
                                                          default:
                                                              break;
                                                      }
                                                  }
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
                                                          items={useScheduleMenuItems(key => {
                                                              setSelectedKeys([key]);
                                                          })}
                                                          onClick={(e) => {
                                                              const {key, keyPath, domEvent} = e;
                                                              domEvent.stopPropagation();
                                                              setSelectedKeys(keyPath);
                                                              const projectId = keyPath[keyPath.length - 1];
                                                              switch (key) {
                                                                  case `${projectId}-open-in-new-table`:
                                                                      break;
                                                                  case `${projectId}-rename-schedule`:
                                                                      dispatch(setRenameScheduleId(projectId));
                                                                      dispatch(setRenameScheduleModalVisible(true));
                                                                      break;
                                                                  case `${projectId}-add-to-favorites`:
                                                                      break;
                                                                  case `${projectId}-save-as-a-template`:
                                                                      break;
                                                                  case `${projectId}-delete-schedule`:
                                                                      deleteSchedule(projectId);
                                                                      break;
                                                                  case `${projectId}-export-schedule`:
                                                                      break;
                                                                  case `${projectId}-share-schedule`:
                                                                      break;
                                                                  default:
                                                                      break;
                                                              }
                                                          }}/>
                                      }
                                  ]}/>
                    </>
                }/>
            </Sider>
            <Layout className={"schedule-home-body"} style={{marginInlineStart: marginInlineStart}}>
                <Outlet/>
            </Layout>
            <ScheduleCreate/>
            <ScheduleRename/>
        </Layout>
    )
}