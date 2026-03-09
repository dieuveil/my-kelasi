import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Button, theme, Space } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  SettingOutlined,
  LogoutOutlined,
  BellOutlined,
} from '@ant-design/icons';

import 'antd/dist/reset.css';
import styles from './Home.module.css';

import List_Users from "../components/List_Users";
import Add_Documents from "../components/Add_Documents";
import List_Documents from "../components/List_Documents";

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;


// Content Components
const Dashboard = () => <List_Documents />;
const Users = () => <List_Users />;
const Orders = () => <Add_Documents />;

const Settings = () => (
  <div className={styles.contentContainer}>
    <Title level={2}>Settings</Title>
    <div className={styles.placeholderContent}>
      <Text>Settings content goes here</Text>
    </div>
  </div>
);

function Home2() {

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const [user, setUser] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  // Detect logged user
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {

      if (currentUser) {
        setUser(currentUser);
      } else {
        navigate("/connexion");
      }

    });

    return () => unsubscribe();

  }, []);


  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };


  // Logout function
  const handleLogout = async () => {

    try {

      await signOut(auth);

      navigate("/login");

    } catch (error) {

      console.error("Logout error:", error);

    }

  };


  // Render content
  const renderContent = () => {

    switch (selectedKey) {

      case '1':
        return <Dashboard />;

      case '2':
        return <Users />;

      case '3':
        return <Orders />;

      case '4':
        return <Settings />;

      default:
        return <Dashboard />;
    }

  };



  return (
    <Layout style={{ minHeight: '100vh' }}>

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        theme="light"
        style={{
          boxShadow: '2px 0 8px rgba(0,0,0,0.05)',
        }}
      >

        <div className={styles.logoContainer}>
          <Title level={collapsed ? 5 : 3} style={{ margin: 0, color: '#1890ff' }}>
            {collapsed ? 'A' : 'Kelasi-Tech'}
          </Title>
        </div>

        {/* User Info */}
        <div className={styles.userInfoSidebar}>

          {!collapsed && user && (
            <div className={styles.userDetails}>

              <Text strong>
                {user.name || "Utilisateurs"}
              </Text>

              <br />

              <Text type="secondary" style={{ fontSize: '12px' }}>
                {user.email}
              </Text>

            </div>
          )}

        </div>


        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: 'Liste De Documents',
            },
            {
              key: '2',
              icon: <UserOutlined />,
              label: 'Autres Utilisateurs',
            },
            {
              key: '3',
              icon: <ShoppingOutlined />,
              label: 'Publier Un Document',
            },
            {
              key: '4',
              icon: <SettingOutlined />,
              label: 'Parametres',
            },
          ]}
        />

      </Sider>


      <Layout>

        <Header
          style={{
            padding: '0 24px',
            background: colorBgContainer,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
          }}
        >

          <Title level={4} style={{ margin: 0 }}>
            Bienvenu Sur Kelasi-Tech
          </Title>

          <Space size="middle">

            <Button type="text" icon={<BellOutlined />} />

            {/* Logout Icon */}
            <Button
              type="text"
              icon={<LogoutOutlined />}
              onClick={handleLogout}
            />

          </Space>

        </Header>


        <Content style={{ margin: '24px' }}>

          <div
            style={{
              padding: 24,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              minHeight: 'calc(100vh - 112px)',
            }}
          >

            {renderContent()}

          </div>

        </Content>

      </Layout>

    </Layout>
  );
}

export default Home2;
