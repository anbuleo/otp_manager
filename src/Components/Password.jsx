import React, { useEffect } from 'react'
import { Link , useNavigate} from 'react-router-dom'
import avatar from '../assets/profile.png'
import toast,{ Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import {passwordValidate} from '../common/Validate'
import useFetch from '../hooks/fectchHook.js'
import { useAuthStore } from '../store/store.js'
import {verifyPassword} from '../common/Common.js'

function Password() {
    
  const navigate = useNavigate()
  const { username } = useAuthStore(state => state.auth)
  
  const [{isLoading,apiData,serverError}] = useFetch(`/user/${username}`)
   
  const formik = useFormik({
    initialValues : {
      password : ''
    },
    validate : passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      
      let loginPromise = verifyPassword({ username, password : values.password })
      toast.promise(loginPromise, {
        loading: 'Checking...',
        success : <b>Login Successfully...!</b>,
        error : <b>Password Not Match!</b>
      });

      loginPromise.then(res => {
        let token = res.data;
        let newTo = token.data
       
        console.log(newTo)
        localStorage.setItem('token',newTo.token);
        navigate('/profile')
       
      })
     
    }
  })

  if(isLoading) return <h1>isLoading...</h1>
    if(serverError) return <h1 style={{"color":"red"}}>{serverError.message}</h1>

  return <div className="container fluid ">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=" text-center mt-5 col d-flex justify-content-center">
            <div className=' card cardSetup shadow p-3 mb-5  rounded'>
                <div className="">
                    <h4 className=''>Hello {apiData?.firstName || apiData?.username || ''}!</h4>
                    <p>Explore More by Connecting with us..</p>
                </div>
                <div className="card-body">
                    <form  className='p-1' onSubmit={formik.handleSubmit}>
                        <div className="d-flex justify-content-center p-4">
                            <img className='avatar img-circle shadow' src={apiData?.profile || avatar} alt="avatar" sizes='3%' />
                        </div>  
                        <div className="textbox form-group  ">
                        <input {...formik.getFieldProps('password')} className='form-control p-2  ' type="password" placeholder='Password' />

                        <button className='btn btn-primary w-100 p-2 mt-2' type='submit'>Sign In</button>
                        </div> 
                        <div className="text-center mb-4">
                            <span>Forget Password? <Link to='/recovery' style={{"textDecoration":"none" , "color":"orangered"}}>Recover Now</Link></span>
                        </div>                     
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
  
}

export default Password