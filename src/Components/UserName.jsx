import React from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assets/profile.png'
import { Toaster } from 'react-hot-toast'
import { useFormik } from 'formik'
import {userNameValidate} from '../common/Validate'
function UserName() {

    const formik =useFormik({
        initialValues : {
            username :''
        },
        validate:userNameValidate,
        validateOnBlur:false,
        validateOnChange:false,
        onSubmit: async values =>{
            console.log(values)
        }
    })
  return (
    
    <div className="container fluid ">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=" text-center mt-5 ">
            <div className=' card cardSetup shadow p-3 mb-5 bg-white rounded'>
                <div className="">
                    <h4 className='card-header'>Hello Again!</h4>
                    <p>Explore More by Connecting with us..</p>
                </div>
                <div className="card-body">
                    <form  className='p-1' onSubmit={formik.handleSubmit}>
                        <div className="d-flex justify-content-center p-4">
                            <img className='avatar img-circle shadow' src={avatar} alt="avatar" sizes='3%' />
                        </div>  
                        <div className="textbox form-group d-flex gap-3 justify-content-center ">
                        <input {...formik.getFieldProps('username')} className='form-control p-2 w-50 ' type="text" placeholder='Username' />
                        <button className='btn btn-primary p-2' type='submit'>let's go</button>
                        </div> 
                        <div className="text-center mb-4">
                            <span>Not a Member <Link to='/register' style={{"textDecoration":"none" , "color":"orangered"}}>Register Now</Link></span>
                        </div>                     
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default UserName