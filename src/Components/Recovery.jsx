import React from 'react'

import { Toaster } from 'react-hot-toast'

function Recovery() {

  
  return (
    
    <div className="container fluid ">
        <Toaster position='top-center' reverseOrder={false}></Toaster>
        <div className=" text-center mt-5  col d-flex justify-content-center">
            <div className=' card cardSetup bg-secondary shadow p-3 mb-5 bg-white rounded ' style={{"max-width": "30rem"}}>
                <div className="">
                    <h4 className=''>Recovery</h4>
                    <p>Enter OTP to recover password</p>
                </div>
                <div className="card-body">
                    <form  className='p-5' >
                      <div className="input text-center">
                      <span className='text-muted '><small>Enter 6 digit OTP Sent to your E-mail address</small></span>
                      <input className='form-control p-2 mt-2 ' type="password" placeholder='OTP' />
                      </div>
                    
                        <div className="textbox form-group d-flex gap-3 justify-content-center ">                        
                        

                        <button className='btn btn-primary p-2 w-100 mt-2' type='submit'>Recover</button>
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