import {GET_USER} from "../../constants/Home/LoginConstants";
import Cookies from "../../../../node_modules/js-cookie/src/js.cookie";
var jwtDecode = require('jwt-decode');



export const getUser=()=>{
   return (dispatch)=>{
    var token=Cookies.get("Token")
    console.log("token",token)
    if(token===undefined){
     console.log("Please SignIn")
   //  dispatch({
     //  type:GET_USER,
     //  user:undefined
    // })
     console.log("if ici")
    }
    else{
    var decoded = jwtDecode(token);
    console.log(decoded)
    var user={
      email:decoded.email,
      userId:decoded.UserId
    }
    console.log("user",user)
    dispatch({
      type:GET_USER,
      email:decoded.email,
      userId:decoded.UserId,
      isLogin:true
    })
    console.log("else ici")
   // const action={
       // type:GET_USER,
     //   payload:user,
      //  isLogin:true
        
   // }
  //  return action
    }
  }
  
    
  

}