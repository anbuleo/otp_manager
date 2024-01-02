import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom"

/*import all the created components*/

import Login from "./Components/Login"
import Register from "./Components/Register"
import Password from "./Components/Password"
import Recovery from "./Components/Recovery"
import Reset from "./Components/Reset"
import Profile from "./Components/Profile"
import PageNotFound from "./Components/PageNotFound"
import UserName from "./Components/UserName"
import {AuthorizeUser , ProtectRoute} from "./middleware/auth"

function App() {
  
  return <>
  <BrowserRouter>
  <Routes>
    <Route path='/' element={<UserName/>} />
    <Route path='/username' element={<UserName/>}/>
    <Route path="/password" element={<Password/>}/>
    <Route path='/register' element={<Register/>} />
    <Route path='/reset' element={<Reset/>} />
    <Route path='/profile' element={<AuthorizeUser><Profile/></AuthorizeUser>} />
    <Route path='/login' element={<AuthorizeUser><Login/></AuthorizeUser>} />
    <Route path='/recovery' element={<Recovery/>} />
    <Route path='/pagenotfound' element={<PageNotFound/>} />
   
    <Route path='*' element = { <Navigate to='/pagenotfound' />} />
  </Routes>
  </BrowserRouter>
  </>
}

export default App
