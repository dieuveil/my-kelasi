import React, { useState, useEffect } from 'react';
import { Layout, Menu, Typography, Button, theme, Space, Avatar } from 'antd';
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
import Competition from '../components/Competition';

import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";

import { useNavigate } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;


// Dashboard pages
const Dashboard = () => <List_Documents />;
const Users = () => <List_Users />;
const Orders = () => <Add_Documents />;

const Settings = () => (
  <div>Organisation d'une compétition d'entrepreneurs en cours ...</div>
);


function Home2() {

  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');

  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();
  const auth = getAuth();

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();


  // Detect logged user and fetch Firestore data
  useEffect(() => {

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {

      if (currentUser) {

        try {

          const userRef = doc(db, "users", currentUser.uid);
          const userSnap = await getDoc(userRef);

          if (userSnap.exists()) {

            setUserData(userSnap.data());

          } else {

            console.log("User document not found");

          }

        } catch (error) {

          console.error("Error loading user:", error);

        }

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

      navigate("/connexion");

    } catch (error) {

      console.error("Logout error:", error);

    }

  };


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

          {!collapsed && userData && (

            <div className={styles.userDetails} style={{ textAlign: "center" }}>
              
              <Avatar
                size={64}
                icon={<UserOutlined />}
                style={{ backgroundColor: "#1890ff", marginLeft: "50px" }}
              />

              <Text strong>
                {userData.name}
              </Text>

              <Text type="secondary" style={{ fontSize: '12px' }}>
                {userData.email}
              </Text>

              <Text type="secondary" style={{ fontSize: '12px' }}>
                {userData.phone}
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
              label: 'Compétition',
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
            
          </Title>

          <Space size="middle">

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