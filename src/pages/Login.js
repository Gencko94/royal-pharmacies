import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
export default function Login() {
  const [credentials,setCredentials] = React.useState({
    email:'',
    password:''
  })
  const [activeLabel,setActiveLabel] = React.useState({
    email:false,
    password:false
  })
   
  
  
  const checkEmptyInput = (type)=>{
    if (credentials[type] === ''){
      setActiveLabel({...activeLabel,[type]:false})
    }
  }
  const handleInputChange =(e,type)=>{
    setCredentials({
      ...credentials,
      [type]:e.target.value
    })
  }
  return (
    <div className="font-body antialiased text-gray-900 flex justify-center items-center   h-screen relative">
      <div className=" rounded z-2  max-w-screen-xs w-5/6 pb-1  shadow-2xl   overflow-hidden">
        <div className="flex items-center flex-col p-4 pb-1 ">
          <Link to="/">
            <img
              src={logo}
              alt="logo"
              className="rounded-full   shadow-2xl mb-3"
              style={{ width: '125px', height: '125px' }}
            />
          </Link>
          <h2 className="text-2xl text-center text-gray-900">
            Login to Al AttiahMall
          </h2>
        </div>
        <hr />
        {/* inputs */}
        <div className="flex flex-col items-center px-4 py-2  ">
          {/* input  */}
          <div className="w-full mb-4 relative  ">
            <span  className={`${activeLabel.email ? 'form__label-active' : 'form__label'} text-md font-semibold text-gray-700`}>Email</span>
            <input
            onBlur={()=>checkEmptyInput('email')}
              className=" mt-1 w-full rounded border-b   p-2 pt-5"
              type="text"
              value={credentials.email}
              onClick={()=>setActiveLabel({...activeLabel,email:true})}
              onFocus={()=>setActiveLabel({...activeLabel,email:true})}
              onChange={(e)=>handleInputChange(e,'email')}
            />
          </div>
          {/* input */}
          <div className="relative w-full mb-0 ">
           
            <span  className={`${activeLabel.password ? 'form__label-active' : 'form__label'} text-md font-semibold text-gray-700`}>Password</span>

            <input
              className=" mt-1 w-full rounded border-b  p-2 pt-5 "
              type="password"
              onBlur={()=>checkEmptyInput('password')}
              value={credentials.password}
              onClick={()=>setActiveLabel({...activeLabel,password:true})}
              onFocus={()=>setActiveLabel({...activeLabel,password:true})}
              onChange={(e)=>handleInputChange(e,'password')}
            />
          </div>
        </div>

        <div className="px-4 py-1">
          <button className={`w-full rounded text-second-nav-text-light bg-second-nav-light p-2 font-semibold hover:bg-red-800 transition duration-150 `}>
            Log in
          </button>
        </div>
        <div className="px-4 py-2">
          <h1 className="text-sm">
            Are you new to the family ?{' '}
            <Link className="text-second-nav-light" to="/app/register">
              Join us here
            </Link>
          </h1>
          <button className=" text-sm text-second-nav-light">
                Forgot Password ?
              </button>
        </div>
      </div>
    </div>
  );
}
