import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { RiLockPasswordLine, RiMailLine } from "react-icons/ri";
import loginPic from "../../src/Components/Images/Login/login.png"

function Login() {


  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: ""
  })
  const [error, setErrors] = useState({
    email: "",
    password: ""
  })
  const [dbMessage, setdbMessage] = useState({
    email: "",
    password: ""
  })
  const [forceRender, setForceRender] = useState(false)
  const [check, setCheck] = useState(true)
  const [validataion, setValidation] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value
    })
    dbMessage.email = ""
    dbMessage.password = ""
  }

  if (check === true) {
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (data.email === "" || data.email === undefined) {
      error.email = "Enter the Email"
    } else if (!regex.test(data.email)) {
      error.email = "vaild email required"
    } else {
      error.email = true
    }

    if (data.password === "" || data.password === undefined) {
      error.password = "Enter the Password"
    } else {
      error.password = true
    }
  }


  useEffect(() => {
    // sessionStorage.setItem("role", null);
    // sessionStorage.setItem("auth", null);

  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if (error.email === true && error.password === true) {
      axios.post('http://localhost:4000/api/user/login', data)
        .then((res) => {
          // alert("Hello")
          console.log(res.data)
          const token = res.data.token
          const role = res.data.role
          sessionStorage.setItem("auth", token)
          sessionStorage.setItem("role", role)

          navigate('/dashboard')
          window.location.href = '/dashboard';
          dbMessage.password = ""

          // setData({
          //   email: "",
          //   password: ""
          // }) 
        })
        .catch((err) => {
          console.log(err)
          setForceRender(!forceRender)
          dbMessage.email = err?.response?.data?.message_email;
          dbMessage.password = err?.response?.data?.message_password;
          if (dbMessage.email === undefined) {
            dbMessage.email = ""
          }
          if (dbMessage.password === undefined) {
            dbMessage.password = ""
          }
          console.log(dbMessage?.password.length > 0)
          // setdbMessage(err.response.data.message_email)
        })
    }
    setValidation(true)
  }
  return (
    <div><div className="p-16 h-[100vh] sm:p-4 background  bg-secondary">
      <div className=" grid grid-cols-3 smmd:grid-cols-1 sm:grid-cols-1 sm:flex sm:justify-center sm:items-center sm:h-full">
        <div>
        </div>
        <div className="p-8 sm:p-2 ">
          <div className=" bg-white rounded-lg">
            <img src={loginPic} className="w-full h-[30vh] object-cover" />
            <div className="px-4 pb-4 pt-4">
              <div className="pb-2 ">
                <div className=" myPoppinsFont text-secondary  tracking-wide text-dashboard text-[20px] font-semibold">
                  Portfolio
                  <span className="mx-1  tracking-wide text-dashboard myPoppinsFont text-[20px] font-semibold">Login</span>
                </div>
              </div>

              <div className="relative group">
                <div className="absolute top-1 left-1">
                  <div className="h-[30px] file: w-[30px] bg-[#b3d6f4] rounded-[4px] flex justify-center items-center">
                    <RiMailLine className="text-secondary " />
                  </div>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  placeholder="User Email ID"
                  value={data.email}
                  onChange={(e) => handleChange(e)}
                  className={` ${dbMessage?.email.length > 0 ? "border-error" : "border-[#ccc]"} ${error.email.length > 0 && validataion ? "border-error" : "border-[#ccc]"} border placeholder:text-[#9a9a9a] myPoppinsFont duration-300  text-sm rounded-[4px] p-3 pl-10 py-2 text-[#9195a1] w-[100%]`} />
              </div>
              {validataion ? <span className='text-error text-tiny'>{error.email}</span> : null}
              {error.email.length > 0 ? null : <span className='text-error text-tiny'>{dbMessage?.email}</span>}


              <div className="relative mt-3 mb-3 group">
                <div className="absolute top-1 left-1">
                  <div className="h-[30px] file: w-[30px] bg-[#b3d6f4] rounded-[4px] flex justify-center items-center">
                    <RiLockPasswordLine className="text-secondary  " />
                  </div>
                </div>
                <input
                  placeholder="Password"
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  value={data.password}
                  onChange={(e) => handleChange(e)}
                  className={` ${dbMessage?.password.length > 0 ? "border-error" : "border-[#ccc]"} ${error.password.length > 0 && validataion ? "border-error" : "border-[#ccc]"} border placeholder:text-[#9a9a9a] myPoppinsFont duration-300 border-[#ccc] text-sm rounded-[4px] p-3 pl-10 py-2 text-[#9195a1]  w-[100%]`} />
                {validataion ? <span className='text-error text-tiny'>{error.password}  </span> : null}
                {error.password.length > 0 ? null : <span className='text-error text-tiny'>{dbMessage?.password}</span>}

              </div>


              <div className="flex justify-center mb-0 ">
                <button
                  type="submit"
                  onClick={(e) => handleSubmit(e)}
                  className="py-2 myPoppinsFont bg-secondary text-[18px] duration-300 tracking-wider hover:bg-dashboard-hover w-full bg-dashboard text-white rounded-[4px]">
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
        <div>
        </div>
      </div>
    </div></div>
  )
}

export default Login
