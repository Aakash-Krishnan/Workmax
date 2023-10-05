import { useState } from "react";
import { PlusOutlined, HomeOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import "./index.scss";

import { Layout, Menu, theme } from "antd";
const HomeLayout = () => {
  const { Header, Content, Sider } = Layout;
  function getItem(label, key, icon, children) {
    return {
      key,
      icon,
      children,
      label,
    };
  }
  const items = [
    getItem("Home", "1", <HomeOutlined />),
    getItem("Add tasks", "2", <PlusOutlined />),
  ];
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          backgroundColor: "orange",
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          defaultSelectedKeys={["1"]}
          mode="inline"
          style={{ backgroundColor: "orange" }}
          items={items}
        />
      </Sider>
      <Layout
        style={{
          backgroundColor: "#242424",
        }}
      >
        <Header
          className="topbar-main"
          style={{
            padding: 0,
          }}
        >
          <Divider orientation="left" style={{ color: "ehite" }}>
            <p className="name">Welcome Aakash</p>
          </Divider>
        </Header>

        <Content
          style={{
            margin: "16px",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              color: "black",
            }}
          >
            <p>Home Component</p>
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;
