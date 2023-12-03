import React, { useContext, useState } from 'react'
import { BiLogoFacebook, BiLogoGoogle } from 'react-icons/bi'
import { Form } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { loginContext } from '../../App'
import Swal from 'sweetalert2'
import axios from 'axios'


function Login() {
    let login = useContext(loginContext)
    let [obj, setobj] = useState({})
    const loginData = (e) => {
        obj[e.target.name] = e.target.value
        setobj({ ...obj })
    }


    const loginAccount = () => {
        axios.post("https://iris-api.mycodelibraries.com/api/User/LoginAuthenticate", obj).then(response => {
            if (response.data.isSuccess) {
                localStorage.setItem("loginProfileData", JSON.stringify(response.data.responseData))
                localStorage.setItem('isLogin', true)
                login.setLogin(true)
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Logged in Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
            else{
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Email or Password is Incorrect',
                })
            }
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'User Not Found',
            })
        })


    }



    return (
        <>
            <div className="login">
                <div className='form'>
                    <Form className=' px-3 '>
                        <legend className='h3  text-center'>User Login</legend>

                        <Form.Label className='fw-bold  mt-3'>Email</Form.Label>
                        <Form.Control type="email" name='email' className='bg-transparent border' onChange={loginData} />

                        <Form.Label className='d-block fw-bold  mt-3'>Password</Form.Label>
                        <Form.Control type="password" name='password' className='bg-transparent border' onChange={loginData} />

                        <div className='d-flex justify-content-between align-items-center mt-3'>
                            <Form.Check inline label="Remember Me" className="user-select-none" />
                            <p className='text-primary m-0 forgot'>Forgot Password?</p>
                        </div>

                        <button className='secondry-btn mt-4 w-100 rounded' type='button' onClick={loginAccount}> Login</button>
                        <p className='text-center  mt-2'>Don't have an account?<NavLink to='/register'><span className='ms-2 text-primary'>Register</span></NavLink></p>

                    </Form>
                </div>

            </div>

        </>
    )
}

export default Login