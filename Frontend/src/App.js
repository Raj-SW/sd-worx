import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import {NavBar} from './NavBar/NavBar'
import {Hero} from './Hero/Hero.jsx'
import {Tabs} from './Tabs/Tabs.jsx'
import {Community} from './Community/Community.jsx'
import AvailableDrivers from './AvailableDriver/AvailableDriver'
import { ConfigProvider } from 'antd';
import CarPoolingManagement from './CarpoolingManagement/CarPoolingManagement'
import {Footer} from './Footer/Footer.jsx'
import {Forms} from './Forms/Forms.jsx'
import {UserAuthPage} from '../src/Pages/UserAuthPage.jsx'

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
    { <NavBar/>
    /* <Hero/>
    <Tabs/>
    <Community/> */}
    <CarPoolingManagement />
    </div>
   
  </ConfigProvider>
  )
}

export default App;
