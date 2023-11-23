/**API Request */
import axios from 'axios'

import { jwtDecode } from "jwt-decode";
// import {jwt_decode} from 'jwt-decode'


let URL = import.meta.env.VITE_SERVER_DOMIN


axios.defaults.baseURL = URL
/** To get username from token => to decode token package = mpn i jwt-decode */

/* authenticate function */
export async function getUsername(){
    const token = localStorage.getItem('token')
    console.log(token)
    if(!token) return Promise.reject("Cannot find Token");
    let decode = jwtDecode(token)
    return decode;
}

let authenticate = async(username)=>{

   
    try {
        return await axios.post('/api/authenticate',{username})
        
        
    } catch (error) {
        console.log(error)
        return { error : "username doesn't exist"}
    }
}
/** get user details */

const getUser = async({username})=>{
    try {
        const {data} = await axios.get(`api/user/${username}`)
        return {data}
    } catch (error) {

         return { error : "Password doesn't match"}
    }
}

/** register user function */

export  async function registerUser(Credentials){
    
    try {
        const { data : { msg }, status } = await axios.post(`/api/register`, Credentials);

        let { username, email } = Credentials;

        /** send email */
        if(status === 201){
            await axios.post('/api/registerMail', { username, userEmail : email, text : msg})
        }

        return Promise.resolve(msg)
    } catch (error) {
        console.log(error)
        return Promise.reject({ error })
    }
}

/** login function */
export async function verifyPassword({username,password}){
    try {
        if(username){
            console.log(username)
           const data =  await axios.post('api/login',{username,password})
            return Promise.resolve({data})
            
        }
        
    } catch (error) {
        return Promise.reject({error : "Password doesn't match"})
    }
}

/**update function */

export async function updateUser(Response){
    console.log(Response,localStorage)
    try {
        
        const token = await localStorage.getItem('token')
        console.log(token)
        const data =await axios.put(`/api/updateuser`,Response,{headers : {"Authorization": `Bearer ${token}`}})
        console.log(data)
        return Promise.resolve(data)
    } catch (error) {
        return Promise.reject({error : "couldn't update profile"})
    }
}
/**generate otp */
export async function generateOTP(username){
    try {
        
        
        
        const {data : { code }, status } = await axios.get('/api/generateOTP', { params : { username }});
        
        // send mail with the OTP
        if(status === 201){
            let usereemail = await getUser({ username });
            let { data : { email }} = await getUser({ username });
            console.log(usereemail.data.user.email)
            let text = `Your Password Recovery OTP is ${code}. Verify and recover your password.`;
            await axios.post('/api/registerMail', { username, userEmail: usereemail.data.user.email, text, subject : "Password Recovery OTP"})
        }
        return Promise.resolve(code);
    } catch (error) {
        
        console.log(error)
        return Promise.reject({ error });
    }
    
}

/** verify otp*/
export async function verifyOTP({ username, code }){
    
    console.log(username, code)

    try {
       const { data, status } = await axios.get('/api/verifyOTP', { params : { username, code }})
       return { data, status }
       
    } catch (error) {
        console.log(error)
        return Promise.reject(error);
    }
}

/** reset password */
export async function resetPassword({ username, password }){
    try {
        const { data, status } = await axios.put('/api/resetPassword', { username, password });
        return Promise.resolve({ data, status})
    } catch (error) {
        return Promise.reject({ error })
    }
}


export default {
    authenticate,
    getUser,
  
    updateUser,
   
   
    
    
}