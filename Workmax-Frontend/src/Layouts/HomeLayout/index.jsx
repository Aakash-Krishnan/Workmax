import { useState } from "react";
import { PlusOutlined, HomeOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Divider, FloatButton } from "antd";
import "./index.scss";
import { Layout, Menu, theme, Popover, Input, Radio } from "antd";
import { CustomerServiceOutlined, LinkOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Logout } from "../../App/Api/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import { selectUserDetails, setSignOutState } from "../../App/User/userSlice";
import HomeComponent from "../../Components/HomeComponent";
import AddTasksComponent from "../../Components/AddTaskComponent";
import ReactPlayer from "react-player";
import { BsFillPlayFill, BsPauseFill } from "react-icons/bs";
import { Spotify } from "react-spotify-embed";

const HomeLayout = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectUserDetails)?.user;
  const [toggleComponent, setToggleComponent] = useState(true);
  const tasks = useSelector((state) => state.tasks.tasks);
  const [isPlaying, setIsPlaying] = useState(false);
  const [music, setMusic] = useState("");
  const [spotifyMusic, setSpotifyMusic] = useState("https://open.spotify.com/");
  const [selectMusicType, setSelectMusicType] = useState(false);

  const handlePlay = () => {
    if (music) {
      setIsPlaying(!isPlaying);
    }
  };
  const musicProgres = (e) => {
    if (e.played === 1) {
      setIsPlaying(!isPlaying);
    }
  };
  const content = (
    <div className="music-wrapper">
      <div className="spotify-wrapper">
        {!selectMusicType && spotifyMusic !== "https://open.spotify.com/" && (
          <Spotify link={spotifyMusic} />
        )}
      </div>

      <div>
        <Radio.Group onChange={() => {}} className="music-button-wrapper">
          <Radio.Button
            style={{ marginRight: "10px" }}
            onClick={() => setSelectMusicType(true)}
            value="large"
          >
            Youtube
          </Radio.Button>
          <Radio.Button
            onClick={() => setSelectMusicType(false)}
            value="default"
          >
            Spotify
          </Radio.Button>
        </Radio.Group>
        {selectMusicType ? (
          <p>Enter youtube link</p>
        ) : (
          <p>Enter spotify link</p>
        )}
        <Input
          value={selectMusicType ? music : spotifyMusic}
          onChange={(e) => {
            selectMusicType
              ? setMusic(e.target.value)
              : setSpotifyMusic(e.target.value);
          }}
          onPressEnter={handlePlay}
          placeholder="Muisc Link"
        />
        {selectMusicType && <span>press enter!</span>}
      </div>
    </div>
  );

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
    <>
      <div>
        {selectMusicType && (
          <ReactPlayer
            url={music}
            width="0"
            height="0"
            playing={isPlaying}
            volume={0.2}
            onProgress={musicProgres}
          />
        )}
        <FloatButton.Group
          trigger="hover"
          type="primary"
          style={{
            right: 10,
          }}
          icon={<CustomerServiceOutlined />}
        >
          <div>
            <Popover
              content={content}
              title="Play music"
              style={{ width: "100%", color: "red" }}
            >
              <FloatButton icon={<LinkOutlined />} />
            </Popover>
            {selectMusicType && (
              <FloatButton
                onClick={handlePlay}
                icon={isPlaying ? <BsPauseFill /> : <BsFillPlayFill />}
              />
            )}
          </div>
        </FloatButton.Group>
      </div>
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
    </>
  );
};

export default HomeLayout;
