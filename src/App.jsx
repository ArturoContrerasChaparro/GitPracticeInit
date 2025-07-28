import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import Home from './pages/Home';
import About from './pages/About';

const { Header, Content } = Layout;

function App() {
  const location = useLocation();

  const menuItems = [
    {
      key: '/',
      label: <Link to="/">Inicio</Link>,
    },
    {
      key: '/about',
      label: <Link to="/about">Acerca de</Link>,
    },
  ];

  return (
    <Layout>
      <Header>
        <Menu
          theme="dark"
          mode="horizontal"
          selectedKeys={[location.pathname]}
          items={menuItems}
        />
      </Header>
      <Content style={{ padding: '20px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Content>
    </Layout>
  );
}

export default App;
