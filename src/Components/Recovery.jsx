import React, { useEffect,  useRef,  useState } from 'react'
import toast,{ Toaster } from 'react-hot-toast'
import { useAuthStore } from '../store/store'
import {generateOTP, verifyOTP} from "../common/Common.js"
import { useNavigate } from 'react-router-dom'

function Recovery() {
    let btnRef = useRef()
    let submitBtn = useRef()
    let otpInputRef = useRef(0)
    let navigate = useNavigate()
    const {username} = useAuthStore(state => state.auth)
    const [ OTP, setOTP] = useState()
    let [timingCount,setTimingCount] = useState(30)
    const [ btnDisable, setBtnDisable] = useState(false)
    const [expireTime,setExpireTime] =  useState()
    


    // var countDownDate = new Date("Jul 25, 2021 16:37:52").getTime();
//     var myfunc = setInterval(function() {
//         // code goes here
//         }, 1000)
//         var now = new Date().getTime();
// var timeleft = countDownDate - now;
    
// // var days = Math.floor(timeleft / (1000 * 60 * 60 * 24));
// // var hours = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
// var minutes = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
// var seconds = Math.floor((timeleft % (1000 * 60)) / 1000); 

// useEffect(()=>{
    
//     btnRef
//     console.log(btnRef.current.disabled)
//     // downloadTimer()
// },[btnRef])
useEffect(()=>{
  downloadTimer()
},[])
  function downloadTimer() {
    setInterval(() => {
      if (timingCount <= 0) {
        setBtnDisable(false)
        // btnRef.current.disabled = false
        clearInterval(downloadTimer())
        newFunction()
        return

      }

      timingCount -= 1
      setTimingCount(timingCount)
      // btnRef.current.disabled = true 
      if (timingCount > 1) {
        setBtnDisable(true)
      }



      function newFunction() {
        setTimingCount(timingCount)
      }
    }, 1000)
  }
    useEffect(()=>{
        
        generateOTP(username).then((OTP)=>{
            console.log(username,OTP)
            if(OTP) return toast.success('OTP has been send to your email');
            return toast.error('Problem while generating OTP')
        })
        
        
    },[username])

    let handleOtpChangeRecover = (e)=>{
      let currentValueOfInputOtp= e.target.value
        if(currentValueOfInputOtp.length === 6){
          submitBtn.current.disabled = false
          setOTP(currentValueOfInputOtp)
        }

    }
    // console.log(otpInputRef.target.value)
    
    // if(otpInputRef) {
    //     submitBtn.current.disabled = false
    // }
   
    let onSubmit = async(e)=>{
        e.preventDefault();
        try {
            let { status } = await verifyOTP({ username, code : OTP })
            if(status === 201){
              toast.success('Verify Successfully!')
               navigate('/reset')
            }  
          } catch (error) {
             toast.error('Wront OTP! Check email again!')
             otpInputRef.current.value=''
             submitBtn.current.disabled = true
          }
        }
      
    
    //resend otp
    let resendOTP = ()=>{
        let sendPromise = generateOTP(username)

        toast.promise(sendPromise,{
            loading:'Sending..',
            success: <b>OTP has been send to your email</b>,
            error : <b>Could not send it!</b>
        });
        setTimingCount(30)
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
                      <input maxLength={6}  ref={otpInputRef} onChange={(e)=>handleOtpChangeRecover(e)} className='form-control p-2 mt-2 ' type="password" placeholder='OTP' />
                      </div>
                    
                        <div className="textbox form-group d-flex gap-3 justify-content-center ">                        
                        

                        <button disabled={true} ref={submitBtn} className='btn btn-primary p-2 w-100 mt-2' type='submit'>Recover</button>
                        </div> 
                                           
                    </form>
                    <div className="mb-4 d-inline-flex flex-row">
                            <span>Can't get OTP? <button className=' btn rounded btn-danger btn-sm'  ref={btnRef} disabled={btnDisable}  onClick={resendOTP}  >Resend</button><span>{timingCount?`in :${timingCount}`:''}</span></span>
                            
                        </div> 
                        <p>Expire in </p> 
                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default Recovery