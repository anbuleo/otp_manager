import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuthStore } from '../store/store.js'
import useFetch from '../hooks/fectchHook.js'
import avatar from '../assets/profile.png'


function Login() {
  let params = useParams()
  let navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  const [{isLoading,apiData,serverError}] = useFetch(`/user/${username}`)
  // console.log(apiData)
  let handleSignOut = () =>{
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <div className='bg-secondary h-100'>
      <nav className='navbar navbar-expand-lg navbar-light bg-dark d-flex justify-content-between p-2'>
        
          <h2 className='text-white '>Ho<span className='text-secondary'>me</span></h2> 
          <p className='text-white d-flex align-items-center'><span>{apiData?.username || ''}</span>&nbsp;&nbsp;<img onClick={()=>navigate('/profile')} className=' img-circle shadow mt-2' style={{"borderRadius":"50%"}} src={apiData?.profile || avatar} alt="avatar" width="50px" height="50px"  /></p>       
        </nav>
        <div className='d-flex justify-content-center' style={{"backgroundColor": "gray","height":"100vh"}}>
          <div className="content  justify-content-center pt-5" >
          <h4 className=''>Welcome <span style={{"textTransform":"uppercase"}} className='text-white touppercase'>{apiData?.firstName||username}</span></h4>

          <p className='text-center mt-4'><button className='btn btn-danger' onClick={handleSignOut}> Log Out</button></p>

          </div>

        </div>
  </div>
  )
}

export default Login