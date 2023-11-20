import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import {resetPasswordValidation} from '../common/Validate'

function Reset() {

    const formik =useFormik({
        initialValues : {
            password :'',
            confirm_pwd:''
        },
        validate:resetPasswordValidation,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: async values =>{
            console.log(values)
        }
    })
  return (
    
    <div className="container fluid ">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=" text-center mt-5 col d-flex justify-content-center">
            <div className=' card cardSetup shadow p-3 mb-5 bg-white rounded'>
                <div className="">
                    <h4 className='c'>Reset</h4>
                    <p>Enter new password</p>
                </div>
                <div className="card-body">
                    <form  className='p-2' onSubmit={formik.handleSubmit}>
                       
                        <div className="textbox form-group  ">
                        <input {...formik.getFieldProps('password')} className='form-control p-2 ' type="password" placeholder='New Password' />
                        <input {...formik.getFieldProps('confirm_pwd')} className='form-control p-2 mt-2 ' type="password" placeholder='Repeat Password' />
                        <button className='btn btn-primary p-2 w-100 mt-2' type='submit'>Reset</button>
                        </div> 
                                          
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Reset