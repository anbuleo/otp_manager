
import toast from 'react-hot-toast'
/** user name validate */
export async function userNameValidate(values) {
    const errors =userNameVerify({},values)


  return errors
}

let userNameVerify = (error = {},values)=>{
    if(!values.username){
        error.username = toast.error('UserName Required..!')
    }
    else if(values.username.includes(" ")){
        error.username = toast.error('Invalid username..!')
    }
    return error;
}
/** validate password */


let passwordVerify = (error = {},values)=>{
    let sepcialChars = /[-!$%^&*()_+|~=`{}\[\]:\/;<>?,.@#]/
    if(!values.password){
        error.password = toast.error('password Required..!')
    }
    else if(values.password.includes(" ")){
        error.password = toast.error('Invalid password..!')
    }
    else if(values.password.length < 4){
        error.password = toast.error("Password must be more than 4 characters")
    }
    else if(!sepcialChars.test(values.password)){
        error.password = toast.error("Password must have special characters")
    }
    return error;
}
export async function passwordValidate(values) {
    const errors =passwordVerify({},values)


  return errors
}
/** validate reset password  */
export async function resetPasswordValidation(values){
    const errors = passwordVerify({},values)
    if(values.password !== values.confirm_pwd){
        errors.exist = toast.error("Password not match...!")
    }
    return errors
}
/**Email validate */
let emailVerify=(error={},values)=>{
    if(!values.email){
        error.email =toast.error("Email Required")
    }
    else if(values.email.includes(" ")){
        error.email =toast.error("Wrong Email")
    }
    else if(!/^[A-Z0-9._%+-]+@[A-Z0-9._]+\.[A-Z]{2,4}$/i.test(values.email)){
        error.eamil = toast.error("Invalid email Address")

    }
    return error
}
/**validate register */
export default function registerValidation(values){
    const errors = userNameVerify({},values)
    passwordVerify(errors,values)
    emailVerify(errors,values)

    return errors
}