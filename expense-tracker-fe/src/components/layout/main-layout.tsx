/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu } from "antd";
import NavigationMenu from "../../data/navigation-menu";
import APP_PATH from "../../routes/app-path";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 768);
  const [activeMenu, setActiveMenu] = useState(APP_PATH.dashboard.Label);


  const path = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (path.pathname) {
      const menuItem = NavigationMenu.find((item) => item?.path === path.pathname);
      menuItem && setActiveMenu(menuItem?.key as string);
    }
  }, [path.pathname]);

  // ✅ Handle screen resize for responsive sidebar
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        breakpoint="md"
        collapsedWidth={80}
        className="custom-sider"
      >
        <div className="sidebar-header">Logo</div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[activeMenu]}
          items={NavigationMenu}
          onClick={({ item }: any) => {
            navigate(item?.props?.path);
          }}
        />
      </Sider>

      <Layout className="main-layout">
        <Header className="header">
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            className="menu-toggle-btn"
          />
        </Header>

        <Content className="content-container">
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
