import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import toast,{ Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import registerValidation from '../common/Validate'
import convertToBase64 from '../common/Convert.js'
import {registerUser} from '../common/Common.js'

function Register() {

  const navigate = useNavigate()
  const [file,setFile] = useState()

  const formik = useFormik({
    initialValues : {
      email: '',
      username: '',
      password : ''
    },
    validate : registerValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      values = await Object.assign(values, { profile : file || ''})
      let registerPromise = registerUser(values)
      toast.promise(registerPromise, {
        loading: 'Creating...',
        success : <b>Register Successfully...!</b>,
        error : <b>Could not Register.</b>
      });

      registerPromise.then(function(){ navigate('/username')});
    }
  })

    /**Formik doesn't support file upload so we need to create this handler */
    const onUpload = async e =>{
      try {
        const base64 = await convertToBase64(e.target.files[0])
        console.log(base64)
      setFile(base64)
      } catch (error) {

        console.log(error)
      }
    }

  return (
    
    <div className="container fluid ">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=" text-center mt-5 col d-flex justify-content-center">
            <div className=' card cardSetup shadow p-3 mb-5  rounded '>
                <div className="">
                    <h4 className='h4'>Register</h4>
                    <p>Happy to join you</p>
                </div>
                <div className="card-body">
                    <form  className='p-1' onSubmit={formik.handleSubmit}>
                        <div className="d-flex justify-content-center p-4">
                          <label htmlFor="profile">
                          <img className='avatar img-circle shadow' src={file || avatar} alt="avatar"  />
                          <input type="file" onChange={onUpload} style={{display:"none"}} id='profile' name='profile' />
                          </label>
                            
                        </div>  
                        <div className="textbox form-group  ">
                        <input {...formik.getFieldProps('email')} className='form-control p-2  ' type="text" placeholder='Email*' />
                        <input {...formik.getFieldProps('username')} className='form-control p-2  ' type="text" placeholder='Username*' />
                        <input {...formik.getFieldProps('password')} className='form-control p-2  ' type="password" placeholder='Password*' />

                        <button className='btn btn-primary p-2 w-100' type='submit'>Register</button>
                        </div> 
                        <div className="text-center mb-4">
                            <span>Already Register? <Link to='/username' style={{"textDecoration":"none" , "color":"orangered"}}>Sign In</Link></span>
                        </div>                     
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register