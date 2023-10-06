import { useState } from "react";
import { PlusOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Divider } from "antd";
import "./index.scss";
import { Layout, Menu, theme } from "antd";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../App/Api/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetails, setSignOutState } from "../../App/User/userSlice";
import HomeComponent from "../../Components/HomeComponent";
import AddTasksComponent from "../../Components/AddTaskComponent";

// To update userDetails in the Firestore
// To get userDetails
// To add route to the taskpage or conditionally render the component
// To add form for the task

const HomeLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails)?.user;
  const [toggleComponent, setToggleComponent] = useState(true);
  const { Header, Content, Sider } = Layout;
  function getItem(label, key, icon, target) {
    return {
      key,
      icon,
      target,
      label,
    };
  }
  const handleMenuClick = ({ key }) => {
    const { target } = items.find((item) => item.key === key) || {};
    if (target) {
      if (target == "/") {
        Logout();
        dispatch(setSignOutState());
      } else {
        setToggleComponent(!toggleComponent);
      }
    }
  };
  const items = [
    getItem("Home", "1", <HomeOutlined />, "home"),
    getItem("Add tasks", "2", <PlusOutlined />, "add-task"),
    getItem("Signout", "3", <UserOutlined />, "/"),
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
          onClick={handleMenuClick}
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
            <p className="name">Welcome {user?.displayName}</p>
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
              minHeight: "95%",
              background: colorBgContainer,
              color: "black",
            }}
          >
            {toggleComponent ? <HomeComponent /> : <AddTasksComponent />}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomeLayout;
