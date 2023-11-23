import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import avatar from '../assets/profile.png'
import toast,{ Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import {resetPasswordValidation} from '../common/Validate'
import {resetPassword} from '../common/Common.js'
import { useAuthStore } from '../store/store'
import useFetch from '../hooks/fectchHook.js'
import { useEffect } from 'react'
function Reset() {
    const {username} = useAuthStore(state => state.auth)
    const [{isLoading,status, apiData,serverError}] = useFetch('createResetSession')
    let navigate = useNavigate()
    useEffect(()=>{

    },[])
    const formik =useFormik({
        initialValues : {
            password :'',
            confirm_pwd:''
        },
        validate:resetPasswordValidation,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: async values =>{
            let resetPromise = resetPassword({username, password: values.password})
        toast.promise(resetPromise,{
            loading : 'Updating...',
            success:<b>Reset Successfully....</b>,
            error : <b>Could not Reset !</b>
        })
        resetPromise.then(()=>navigate('/'))

            console.log(values)
        }
    })
    if(isLoading) return <h1>isLoading</h1>
    if(serverError) return <h1 style={{"color":"red"}}>{serverError.message}</h1>
    if(status && status !==201) return <Navigate to={'/'} replace={true}></Navigate>
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