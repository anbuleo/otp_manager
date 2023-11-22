import React, { useEffect,  useState } from 'react'
import toast,{ Toaster } from 'react-hot-toast'
import { useAuthStore } from '../store/store'
import {generateOTP, verifyOTP} from "../common/Common.js"
import { useNavigate } from 'react-router-dom'

function Recovery() {
    let navigate = useNavigate()
    const {username} = useAuthStore(state => state.auth)
    const [ OTP, setOTP] = useState()
    useEffect(()=>{
        generateOTP(username).then((OTP)=>{
            console.log(username)
            if(OTP) return toast.success('OTP has been send to your email');
            return toast.error('Problem while generating OTP')
        })
    },[username])
    let onSubmit = async(e)=>{
        e.preventDefault();
        let {status}= await verifyOTP({username, code:OTP})
        if(status === 201){
            toast.success('Verify Successfully !')
            return navigate('/reset')
        }
        return toast.error('Wrong OTP! Check email')
    }
    //resend otp
    let resendOTP = ()=>{
        let sendPromise = generateOTP(username)

        toast.promise(sendPromise,{
            loading:'Sending..',
            success: <b>OTP has been send to your email</b>,
            error : <b>Could not send it!</b>
        });

        sendPromise.then(OTP => {
            console.log(OTP)
        })
    }
  
  return (
    
    <div className="container fluid ">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=" text-center mt-5  col d-flex justify-content-center">
            <div className=' card cardSetup  shadow p-3 mb-5  rounded ' style={{"max-width": "30rem"}}>
                <div className="">
                    <h4 className=''>Recovery</h4>
                    <p>Enter OTP to recover password</p>
                </div>
                <div className="card-body">
                    <form  className='p-5' onSubmit={onSubmit} >
                      <div className="input text-center">
                      <span className='text-muted '><small>Enter 6 digit OTP Sent to your E-mail address</small></span>
                      <input onChange={(e)=>setOTP(e.target.value)} className='form-control p-2 mt-2 ' type="password" placeholder='OTP' />
                      </div>
                    
                        <div className="textbox form-group d-flex gap-3 justify-content-center ">                        
                        

                        <button onClick={resendOTP} className='btn btn-primary p-2 w-100 mt-2' type='submit'>Recover</button>
                        </div> 
                        <div className="text-center mb-4">
                            <span>Can't get OTP? <button to='/recovery' style={{"border":"none" , "color":"orangered","backgroundColor":"none"}}>Resend</button></span>
                        </div>                     
                    </form>
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Recovery