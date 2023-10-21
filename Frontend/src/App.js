import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import {NavBar} from './NavBar/NavBar'
import {Hero} from './Hero/Hero.jsx'
import {Tabs} from './Tabs/Tabs.jsx'
import {Community} from './Community/Community.jsx'
import {Footer} from './Footer/Footer.jsx'
import {Forms} from './Forms/Forms.jsx'
import {UserAuthPage} from '../src/Pages/UserAuthPage.jsx'
import {Home} from '../src/Home/Home.jsx'
function App() {

  return (
    <div className="App">
      <NavBar/>
      <Home/>
    </div>
   );
}

export default App;
