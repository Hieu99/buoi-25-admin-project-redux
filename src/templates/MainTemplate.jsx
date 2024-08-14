import React, { useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
  AliwangwangOutlined,
  WindowsOutlined,
} from "@ant-design/icons";
import { Button, Layout, Menu, theme } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Footer } from "antd/es/layout/layout";
import { PAGE_PATH } from "../constants/pagePath";
const { Header, Sider, Content } = Layout;
const MainTemplate = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout className="h-[100vh]">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical text-white py-4 px-2 flex gap-5 items-center justify-center">
          <AliwangwangOutlined className="text-[30px]" />
          {!collapsed && <h3 className="font-semibold text-[18px]">Admin</h3>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={[
            location.pathname ? location.pathname : PAGE_PATH.home,
          ]}
          items={[
            {
              key: PAGE_PATH.home,
              icon: <WindowsOutlined />,
              label: "Home",
              onClick: () => {
                navigate(PAGE_PATH.home);
              },
            },
            {
              key: PAGE_PATH.user,
              icon: <UserOutlined />,
              label: "User",
              onClick: () => {
                navigate(PAGE_PATH.user);
              },
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: "18px 16px",
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
        <Footer
          className="!py-2 bg-white"
          children={<div className="text-center">Copy right</div>}
        />
      </Layout>
    </Layout>
  );
};
export default MainTemplate;
