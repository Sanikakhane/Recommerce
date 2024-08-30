import './App.css'
// import { Homepage } from './component/HomePage/Homepage'
import { Homepage } from './component/After_Login/Homepage'
// import LoginSignUp from './component/LoginSignUp/LoginSignUp'
// import { NavbarAfterLogin } from './component/After_Login/NavbarAfterLogin'

import { Navbar } from './component/HomePage/Navbar'


function App() {
  return (
    <div>
          <Navbar/>
         <Homepage/>
    </div>
  )
}

export default App
