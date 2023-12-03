import React, { useEffect, useState } from 'react'
import { HOC } from '../DashBoard/HOC'
import { Form, Table } from 'react-bootstrap'
import axios from 'axios'
import { BsPersonCircle } from "react-icons/bs"
import Swal from 'sweetalert2'
import validationData from "../DashBoard/Validation.json"


function MyProfile() {
    let [updateProfileObj, setupdateProfileObj] = useState({ fullName: "", email: "", mobileNumber: "", roleId: "", userRole: [], profileImageBase64: "" })

    let [updatePasswordObj, setupdatePasswordObj] = useState({})
    let [blankobj, setblankobj] = useState({})
    let [profileObj, setprofileObj] = useState({})
    const profileData = JSON.parse(localStorage.getItem("loginProfileData"))
    let auth = {
        headers: {
            Authorization: `Bearer ${profileData.token}`
        }
    }


    let updatePassword = (e) => {

        updatePasswordObj[e.target.name] = e.target.value;
        setupdatePasswordObj({ ...updatePasswordObj })

    }
    const savePassword = () => {
        updatePasswordObj['id'] = profileData.id
        setupdatePasswordObj({ ...updatePasswordObj })
        axios.post('https://iris-api.mycodelibraries.com/api/User/ChangePassword', updatePasswordObj, auth).then(response => {
            if (response.data.isSuccess) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Password Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })
                setupdatePasswordObj({ ...blankobj })
            }
            else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: "Password Not Valid",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        }).catch(err => {
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: 'Oops...',
                text: "Something Went Wrong",
                showConfirmButton: false,
                timer: 1500
            })
        })
    }
    useEffect(() => {
        profile();
    }, [])
    useEffect(() => {
        profileObj['roleId'] = profileObj.role?.id
        setupdateProfileObj({ ...profileObj })

    }, [profileObj])

    const profile = () => {
        axios.get("https://iris-api.mycodelibraries.com/api/User/GetUser/" + profileData.id, auth).then((res) => {
            setprofileObj({ ...res.data.responseData })

        })
    }
    let updateProfile = async (e) => {
        if (e.target.type == "file") {
            updateProfileObj[e.target.name] = await toBase64(e.target.files[0])
            blankobj[e.target.name] = ""

        }
        else if (e.target.type == "radio") {
            updateProfileObj[e.target.name] = e.target.value
            updateProfileObj.role.id = e.target.value
        }
        else {
            updateProfileObj[e.target.name] = e.target.value

        }
        setupdateProfileObj({ ...updateProfileObj })

    }
    const toBase64 = (file) => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
    });


    const update = async () => {

        updateProfileObj['id'] = profileData.id

        updateProfileObj['userRole'] = [
            {
                "userRoleId": 0,
                "userId": 0,
                "roleType": 1
            }
        ]
        setupdateProfileObj({ ...updateProfileObj })



        axios.post("https://iris-api.mycodelibraries.com/api/User/UpdateUser", updateProfileObj, auth).then(res => {
            if (res.data.isSuccess) {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Profile Updated Successfully',
                    showConfirmButton: false,
                    timer: 1500
                })

                profile();
            }
            else {
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: 'Oops...',
                    text: "Something Went Wrong",
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        })
    }

    // }
    const tabView = (index) => {

        let tab = document.querySelectorAll(".tab")
        let tabBtn = document.querySelectorAll(".tabBtn")
        tab.forEach((x, i) => {
            x.classList.add("d-none");
            tabBtn[i].classList.remove("active-tab");
        })
        tab[index].classList.remove("d-none");
        tabBtn[index].classList.add("active-tab");
    }
    return (
        <>
            <section className='w-100 mx-auto bg-white px-5 py-4   gap-5    '>
                <div className='d-flex  gap-3 align-self-center'>
                    <button className=' secondry-btn tabBtn px-5 py-2 rounded w-100 active-tab ' onClick={(e) => { tabView(0) }}>My Profile</button>
                    <button className=' secondry-btn tabBtn px-5 py-2 rounded w-100 ms-auto' onClick={(e) => { tabView(1) }}>Update Profile</button>
                    <button className=' secondry-btn tabBtn px-5 py-2 rounded w-100 ' onClick={(e) => { tabView(2) }}>Change Password</button>
                </div>
                <div className='position-relative'>
                    <div className="tab d-flex align-items-center p-5 ">
                        <div className='w-25 d-flex justify-content-center flex-column align-items-center'>
                            <BsPersonCircle size={100} color="#5C61EF" />
                            <p className='h3 mt-3'>{profileObj.fullName}</p>
                            <p className='h6'>{profileObj.role?.name}</p>
                        </div>
                        <div className='w-75'>
                            <div className=' rounded-4 overflow-hidden'>
                                <table className='table mb-0 profile-table '>
                                    <tr>
                                        <td className='d-flex justify-content-between'><span className='text-white bg-transparent'>Full Name</span><span className='text-white bg-transparent'>:</span></td>
                                        <td className='text-white'>{profileObj.fullName}</td>
                                    </tr>
                                    <tr>
                                        <td className='d-flex justify-content-between'><span className='text-white bg-transparent'>Email</span><span className='text-white bg-transparent'>:</span></td>
                                        <td className='text-white'>{profileObj.email}</td>
                                    </tr>
                                    <tr>
                                        <td className='d-flex justify-content-between'><span className='text-white bg-transparent'>Contact</span><span className='text-white bg-transparent'>:</span></td>
                                        <td className='text-white'>{profileObj.mobileNumber}</td>
                                    </tr>
                                    <tr>
                                        <td className='d-flex justify-content-between'><span className='text-white bg-transparent'>Role</span><span className='text-white bg-transparent'>:</span></td>
                                        <td className='text-white'>{profileObj.role?.name}</td>
                                    </tr>

                                    <tr>
                                        <td className='d-flex justify-content-between'><span className='text-white bg-transparent'>Status</span><span className='text-white bg-transparent'>:</span></td>
                                        <td className='text-white'>Active</td>
                                    </tr>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="tab  d-none   ">
                        <Form className=' py-3 '>
                            <Form.Label className='fw-bold '>Full Name</Form.Label>
                            <Form.Control type="text" name='fullName' className='bg-transparent border ' onChange={updateProfile} value={updateProfileObj.fullName ?? ""} />

                            <Form.Label className='fw-bold  mt-3'>Email</Form.Label>
                            <Form.Control type="email" name='email' className='bg-transparent border ' onChange={updateProfile} value={updateProfileObj.email ?? ""} />



                            <Form.Label className='d-block fw-bold  mt-3'>Mobile No</Form.Label>
                            <Form.Control type="tel" name='mobileNumber' className='bg-transparent border ' onChange={updateProfile} value={updateProfileObj.mobileNumber ?? ""} />



                            <div className='d-flex align-items-center'>
                                <label htmlFor="" className=' fw-bold w-25'>Select Role</label>
                                <input type="radio" name='roleId' value='1' className='me-1' checked={updateProfileObj.role?.id == '1'} onChange={updateProfile} /><span className='fw-bold'>Administrator</span>
                                <input type="radio" name='roleId' value='2' className='me-1 ms-2' checked={updateProfileObj.role?.id == '2'} onChange={updateProfile} /><span className='fw-bold'>Client</span>
                            </div>

                            {/* <div class="my-3">
                            <Form.Label className=' fw-bold  mt-3 w-25'>Profile</Form.Label>
                            <label for="profile" class="form-label primary-btn rounded px-3 py-2" type='button'>Choose file</label>
                            <input type="file" class="form-control d-none" name="profileImageBase64" id='profile' onChange={updateProfile}/>
                            <span className='text-danger mt-1 error'>{error?.profileImageBase64}</span>
                        </div> */}



                            <button className='primary-btn  w-100 rounded mt-4' type='button' onClick={update}>Update Profile</button>
                        </Form>
                    </div>
                    <div className="tab  d-none  ">
                        <Form className=' px-3 mt-3'>
                            <legend className='h3  text-center'>Update Password</legend>

                            <Form.Label className='fw-bold  mt-3'>Current Password</Form.Label>
                            <Form.Control type="text" name='currentPassword' className='bg-transparent border' onChange={updatePassword} value={updatePasswordObj.currentPassword ?? ""} />

                            <Form.Label className='d-block fw-bold  mt-3'>New Password</Form.Label>
                            <Form.Control type="password" name='password' className='bg-transparent border' onChange={updatePassword} value={updatePasswordObj.password ?? ""} />



                            <button className='primary-btn mt-4 w-100 rounded' type='button' onClick={savePassword}> Save Password</button>

                        </Form>
                    </div>

                </div>
            </section>
        </>
    )
}

export default HOC(MyProfile)