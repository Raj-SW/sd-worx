import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import {NavBar} from './NavBar/NavBar'
import { ConfigProvider, Breadcrumb, Layout, Menu, theme } from 'antd';
import CarPoolingManagement from './CarpoolingManagement/CarPoolingManagement'

function App() {

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
     <Header >
        <div className="demo-logo" />
        <NavBar />
      </Header>
      <Content > <Outlet /></Content>
    </div>
   
  </ConfigProvider>
  )
}

export default App;
