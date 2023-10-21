import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Outlet } from 'react-router-dom'
import {NavBar} from './NavBar/NavBar'
import { ConfigProvider, Breadcrumb, Layout, Menu, theme } from 'antd';
import CarPoolingManagement from './CarpoolingManagement/CarPoolingManagement'

function App() {
  const { Header, Content } = Layout;
  return (
    <ConfigProvider
    theme={{
      token: {
        // Seed Token
        colorPrimary: '#f8ad07',
      },
    }}
  >
     <div className="App">
        <NavBar />
      <Content > <Outlet /></Content>
    </div>
   
  </ConfigProvider>
  )
}

export default App;
