import { NavLink } from "react-router-dom"
import { IoLogoReact } from "react-icons/io5"
import { AiOutlineSearch } from "react-icons/ai"
import { BsPersonCircle } from "react-icons/bs"
import { FaUsers } from "react-icons/fa6";
import { MdSpaceDashboard } from "react-icons/md";
import { FaProjectDiagram } from "react-icons/fa";
import { TbActivity } from "react-icons/tb";
import { IoMdSettings } from "react-icons/io";
import { loginContext } from "../../App"
import { useContext, useEffect, useState } from "react"
import Swal from "sweetalert2"
import axios from "axios"


export const HOC = (Component) => {
  const NewComponent = () => {
    let [profileObj, setprofileObj] = useState({})
    const [profileData, setprofileData] = useState(JSON.parse(localStorage.getItem("loginProfileData")))
    let auth = {
      headers: {
        Authorization: `Bearer ${profileData.token}`
      }
    }
    const profile = async () => {
      axios.get("https://iris-api.mycodelibraries.com/api/User/GetUser/" + profileData.id, auth).then((res) => {
        setprofileObj({ ...res.data.responseData })

      })
    }
    useEffect(() => {
      profile();
    }, [profileObj])

    let login = useContext(loginContext)
    const logoutAccount = () => {

      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-outline-success me-2',
          cancelButton: 'btn btn-outline-danger'
        },
        buttonsStyling: false
      })


      swalWithBootstrapButtons.fire({
        title: 'Are you sure?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, Log Out',
        cancelButtonText: 'No, cancel!',
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Logged Out Successfully',
            showConfirmButton: false,
            timer: 1500
          })
          localStorage.setItem('isLogin', false)
          login.setLogin(false)
        }

      })


    }

    return <div className="hoc">
      <div className='d-flex rounded-2 p-2 '>
        <div className='sidebar position-relative' style={{ height: "90vh", width: "200px" }}>
          <div className="text-center fs-1">
            <IoLogoReact className="logo" color="#5C61EF" />
          </div>
          <div className="d-flex flex-column">
            <NavLink to="/dashboard" className="text-decoration-none "><div className="rounded-3  nav-bar fs-5 mt-2 px-2 py-3"><MdSpaceDashboard className="me-2"/>Dashboard</div></NavLink>
            <NavLink to="/AllProfiles" className="text-decoration-none "><div className="rounded-3  nav-bar fs-5 mt-2 px-2 py-3"><FaUsers className="me-2" />All Profiles</div></NavLink>
            <NavLink to="/AllProject" className="text-decoration-none "><div className="rounded-3  nav-bar fs-5 mt-2 px-2 py-3"><FaProjectDiagram className="me-2" />Projects</div></NavLink>
            <NavLink to="/RecentActivities" className="text-decoration-none "><div className="rounded-3  nav-bar fs-5 mt-2 px-2 py-3"><TbActivity  className="me-2"  />Recent Activities</div></NavLink>
            <NavLink to="/myProfile" className="text-decoration-none justify-self-end "><div className="rounded-3  nav-bar fs-5 mt-2 px-2 py-3 w-100 "><IoMdSettings className="me-2"/>Setting</div></NavLink>
          </div>
        </div>
        <div className="header p-2 h-100">
          <div className=' d-flex justify-content-between  align-items-center '>
            <div>
              <input type="text" placeholder='Search.....' className='rounded p-2 me-2 ' />
              <AiOutlineSearch size={30} />

            </div>
            <div className="d-flex align-items-center justify-content-between">
              <NavLink to="/myProfile" className="text-decoration-none" >
                <span className="h5 mb-0 me-2">Hello {profileObj?.fullName}</span>
                <BsPersonCircle size={30} color="#5C61EF" />
              </NavLink>
              <button className='logout-btn rounded-3 ms-3' onClick={logoutAccount}>Log Out</button>

            </div>

          </div>
          <div className="w-100  content-div overflow-auto p-2">
            <div className="">
              <Component />
            </div>
          </div>
        </div>
      </div>
    </div>
  }
  return NewComponent
}