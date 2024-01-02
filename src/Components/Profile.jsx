import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import toast,{ Toaster } from 'react-hot-toast'
import useFetch from '../hooks/fectchHook.js'
import { useFormik } from 'formik'
import { useAuthStore } from '../store/store.js'
import {profileValidation} from '../common/Validate'
import {updateUser} from '../common/Common.js'
import convertToBase64 from '../common/Convert.js'


function Profile() {
  const [file,setFile] = useState()
  
  const [{ isLoading, apiData, serverError}] = useFetch()
  const navigate = useNavigate()

    const formik =useFormik({
        initialValues : {
            firstName:apiData?.firstName ||'',
            email:apiData?.email ||"",
            lastName:apiData?.lastName||'',
            mobile:apiData?.mobile||'',
            address:apiData?.address||''
        },
        enableReinitialize: true,
        validate:profileValidation,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: async values =>{
          values = await Object.assign(values,{profile : file ||apiData?.profile || ''})
          let updatePromise = updateUser(values)
          console.log(values)
          toast.promise(updatePromise, {
            loading : 'Updating...',
            success : <b>update Successfully...!</b>,
            error : <b>Could not Update!</b>
        });
        navigate('/login')           
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

    /**logout handler function */
    let userLogout=()=>{
      localStorage.removeItem('token')
      navigate('/')
    }

    if(isLoading) return <h1>isLoading</h1>
    if(serverError) return <h1 style={{"color":"red"}}>{serverError.message}</h1>
  return (
    
    <div className="container fluid ">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=" text-center mt-5 col d-flex justify-content-center">
            <div className=' card cardSetup shadow p-3 mb-5  rounded '>
                <div className="">
                    <h4 className='h4'>Profile</h4>
                    <p>You can update the details</p>
                </div>
                <div className="card-body">
                    <form  className='p-1' onSubmit={formik.handleSubmit}>
                        <div className="d-flex justify-content-center p-4">
                          <label htmlFor="profile">
                          <img className='avatar  shadow' src={apiData?.profile||file || avatar} alt="avatar"  />
                          <input type="file" onChange={onUpload} style={{display:"none"}} id='profile' name='profile' />
                          </label>
                            
                        </div>  
                        <div className="name d-flex  gap-4">
                        <input {...formik.getFieldProps('firstName')} className='form-control p-2  ' type="text" placeholder='First Name*' />
                        <input {...formik.getFieldProps('LastName')} className='form-control p-2  ' type="text" placeholder='Last Name*' />
                        </div>
                        <div className="name d-flex  gap-4 mt-2">
                        <input {...formik.getFieldProps('mobile')} className='form-control p-2  ' type="text" placeholder='Mobile *' />
                        <input {...formik.getFieldProps('email')} className='form-control p-2  ' type="text" placeholder='E-mail*' />
                        </div>
                        <div className="name d-flex  gap-4 mt-2">
                        <input {...formik.getFieldProps('address')} className='form-control p-2  ' type="text" placeholder='Address *' />
                       
                        </div>
                        <div className="textbox form-group  ">
                        {/* <input {...formik.getFieldProps('email')} className='form-control p-2  ' type="text" placeholder='Email*' />
                        <input {...formik.getFieldProps('username')} className='form-control p-2  ' type="text" placeholder='Username*' />
                        <input {...formik.getFieldProps('password')} className='form-control p-2  ' type="password" placeholder='Password*' /> */}

                        <button className='btn btn-primary p-2 w-100 mt-2' type='submit'>Update</button>
                        </div> 
                        <div className="text-center mb-4">
                            <span>Come back later? <button onClick={userLogout} to='/' style={{"border":"none","backgroundColor":"lightGray", "textDecoration":"none" , "color":"orangered"}}>Log out</button></span>
                        </div>                     
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Profile