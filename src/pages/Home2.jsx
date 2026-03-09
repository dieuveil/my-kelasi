import React, { useState } from 'react';
import { Layout, Menu, Avatar, Typography, Button, theme, Space } from 'antd';
import {
  DashboardOutlined,
  UserOutlined,
  ShoppingOutlined,
  SettingOutlined,
  LogoutOutlined,
  PieChartOutlined,
  BellOutlined,
} from '@ant-design/icons';
import 'antd/dist/reset.css';
import styles from './Home.module.css'; // Import as styles object

import List_Users from "../components/List_Users";
import Add_Documents from "../components/Add_Documents";
import List_Documents from "../components/List_Documents";

const { Header, Sider, Content } = Layout;
const { Title, Text } = Typography;


// Content Components
const Dashboard = () => (
  <List_Documents />
);

const Users = () => (
  <List_Users />
);

const Orders = () => (
  <Add_Documents />
);

const Settings = () => (
  <div className={styles.contentContainer}>
    <Title level={2}>Settings</Title>
    <div className={styles.placeholderContent}>
      <Text>Settings content goes here</Text>
    </div>
  </div>
);

// Mock user data
const userInfo = {
  name: 'John Doe',
  email: 'john.doe@example.com',
  role: 'Administrator',
  avatar: 'https://api.dicebear.com/7.x/miniavs/svg?seed=1',
};

function Home2() {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (e) => {
    setSelectedKey(e.key);
  };

  const handleLogout = () => {
    console.log('Logout clicked');
    // Add your logout logic here
  };

  // Render content based on selected menu item
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
        
        {/* User Info Section */}
        <div className={styles.userInfoSidebar}>
          <Avatar 
            size={collapsed ? 32 : 48} 
            src={userInfo.avatar}
            style={{ backgroundColor: '#1890ff' }}
          /><br/>
          {!collapsed && (
            <div className={styles.userDetails}>
              <Text strong>{userInfo.name}</Text>
              <Text type="secondary" style={{ fontSize: '12px' }}>{userInfo.role}</Text>
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
        
        {/* Logout Button at Bottom */}
        <div className={styles.logoutContainer}>
          <Button 
            type="text" 
            icon={<LogoutOutlined />}
            onClick={handleLogout}
            block
            className={styles.logoutButton}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: collapsed ? 'center' : 'flex-start',
              gap: '8px',
            }}
          >
            {!collapsed && 'Logout'}
          </Button>
        </div>
      </Sider>
      
      <Layout>
        <Header style={{ 
          padding: '0 24px', 
          background: colorBgContainer,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
        }}>
          <div>
            <Title level={4} style={{ margin: 0 }}>Bienvenu Sur Kelasi-Tech</Title>
          </div>
          <Space size="middle">
            <Button type="text" icon={<BellOutlined />} />
            <Avatar src={userInfo.avatar} />
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