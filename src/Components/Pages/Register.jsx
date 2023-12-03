import React, { useState } from 'react'
import { BiLogoFacebook, BiLogoGoogle } from 'react-icons/bi'
import { Form } from 'react-bootstrap'
import { NavLink, useNavigate } from 'react-router-dom'
import validationData from "../DashBoard/Validation.json"
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios'
import Swal from 'sweetalert2'


function Register() {
    let [obj, setobj] = useState({ fullName: "", email: "", password: "", mobileNumber: "", roleId: "",userRole : [] })
    let [blank, setblank] = useState({})
    let [error, seterror] = useState({})
    // const state = useSelector(state => state.api)
    // const dispatch = useDispatch()

    let registerData = async (e) => {
        if(e.target.type == "file")
        {
            obj[e.target.name] =await toBase64(e.target.files[0])
            blank[e.target.name] = ""
            
        }
        else{
            obj[e.target.name] = e.target.value
            blank[e.target.name] = ""

        }
            setobj({ ...obj })
            setblank({ ...blank })

        validateForm(e.target.name)
    }
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });

    const navigate = useNavigate();

    const save = async () => {
        obj['userRole'] =  [
            {
              "userRoleId": 0,
              "userId": 0,
              "roleType": 1
            }
          ]
          setobj({ ...obj })
          Object.keys(obj).forEach((x) => validateForm(x))
        if (Object.keys(error).length == 0) {
            axios.post("https://iris-api.mycodelibraries.com/api/User/CreateUser",obj).then((res) =>{
                if(res.data.isSuccess){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Registered  Successfully',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    navigate("/login");

                }else{
                    Swal.fire({
                        position: 'center',
                        icon: 'error',
                        title: res.data.errorMessage,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
        }

    }
    const validateForm = (name) => {
        let validationObj = validationData.find((x) => x.name == name)
        let condition = validationObj.condition.find(x => eval(x.condition))
        if (condition) {
            error[name] = condition.error

        }
        else {
            delete error[name];
        }

        seterror({ ...error })
    }
    return (
        <>
            <div className='register'>
                <div className='form'>
                    <Form className=' px-3 '>
                        <legend className='h3  text-center'>Register Form</legend>
                        <Form.Label className='fw-bold '>Full Name</Form.Label>
                        <Form.Control type="text" name='fullName' className='bg-transparent border ' onChange={registerData} value={obj.fullName ?? ""} />
                        <p className='text-danger mt-1 error mb-0'>{error?.fullName}</p>

                        <Form.Label className='fw-bold  mt-3'>Email</Form.Label>
                        <Form.Control type="email" name='email' className='bg-transparent border ' onChange={registerData} value={obj.email ?? ""} />
                        <p className='text-danger mt-1 error'>{error?.email}</p>

                        <Form.Label className='d-block fw-bold  mt-3'>Create Password</Form.Label>
                        <Form.Control type="password" name='password' className='bg-transparent border ' onChange={registerData} value={obj.password ?? ""} />
                        <p className=' text-danger mt-1 error'>{error?.password}</p>

                        <Form.Label className='d-block fw-bold  mt-3'>Mobile No</Form.Label>
                        <Form.Control type="tel" name='mobileNumber' className='bg-transparent border ' onChange={registerData} value={obj.mobileNumber ?? ""} />
                        <p className=' text-danger mt-1 error'>{error?.mobileNumber}</p>

                        <div className='d-flex align-items-center'>
                            <label htmlFor="" className=' fw-bold w-25'>Select Role</label>
                            <input type="radio" name='roleId' value='1' className='me-1' checked={obj.roleId === '1'} onChange={registerData} /><span className='fw-bold'>Administrator</span>
                            <input type="radio" name='roleId' value='2' className='me-1 ms-2' checked={obj.roleId === '2'} onChange={registerData} /><span className='fw-bold'>Client</span>
                        </div>
                        <span className='text-danger mt-1 error'>{error?.roleId}</span>

                        {/* <div class="my-3">
                            <Form.Label className=' fw-bold  mt-3 w-25'>Profile</Form.Label>
                            <label for="profile" class="form-label primary-btn rounded px-3 py-2" type='button'>Choose file</label>
                            <input type="file" class="form-control d-none" name="profileImageBase64" id='profile' onChange={registerData}/>
                            <span className='text-danger mt-1 error'>{error?.profileImageBase64}</span>
                        </div> */}
                        
                        <button className='primary-btn  w-100 rounded mt-4' type='button' onClick={save}> Register</button>
                        <p className='text-center  mt-2'>Already have an account?<NavLink to='/login'><span className='ms-2 text-primary'>Login</span></NavLink></p>

                    </Form>
                    <div className='mt-2 px-3'>
                        <p className='or text-center fw-bold '>OR</p>
                        <div className='btn btn-outline-primary w-100 d-flex align-items-center'><BiLogoFacebook /><span className='mx-auto'>Continue With Facebook</span></div>
                        <div className='btn btn-outline-danger w-100 d-flex align-items-center mt-2'><BiLogoGoogle /><span className='mx-auto'>Continue With Google</span></div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Register