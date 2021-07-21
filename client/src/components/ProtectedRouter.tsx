import React, { useEffect, useState } from 'react'
import {Redirect, Route} from 'react-router-dom';

import axios from 'axios';
import { baseurl } from '../utils/baseurl';



function ProtectedRouter({component: Component, authed,  ...rest}:any) {

    const [isLoaded , setIsLoaded] = useState(false)
    const [isLogin, setLogin] = useState<any>({islogin : null, data : null})

    console.log(isLogin)


    useEffect(()=>{
        (async ()=>{
            await axios.get(`${baseurl}/auth/`,{
              withCredentials : true,
              headers : {
                withCredentials: true,
                crossDomain: true
              }
            }).then((res)=>{
             if(res.data.isLoggedSuccess){
                 setLogin({islogin : true, data :res.data})
             }else{
                 setLogin({islogin : false, data: null})
             }
         })
         setIsLoaded(true)
        })()
     },[])
  

       
    return (
       <>{
           isLoaded?
       <Route 
       {...rest}
       render={(props) => isLogin.islogin ?  <Component {...{props , isLogin}}  />  : 
       <Redirect to ={{pathname : '/' , state:{from:props.location}}} /> } /> 
       : 
          <h1>Loading</h1>
       }
       </>
    )

  
}

export default ProtectedRouter