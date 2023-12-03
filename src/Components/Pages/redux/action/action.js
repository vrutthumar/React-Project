import axios from "axios"
import { getApi } from "../type/type"
const profileData = JSON.parse(localStorage.getItem("loginProfileData"))
    let auth = {
        headers: {
            Authorization: `Bearer ${profileData?.token}`
        }
    }

export const callApi = () =>{
    return (dispatch) =>{
        axios.get('https://iris-api.mycodelibraries.com/api/Profile/GetAllProfile',auth).then(response => {
            dispatch({type : getApi , data : response.data.responseData})
        }).catch(err =>{
            console.log(err)
        })
    }
}
export const postApi = (obj) =>{
    return (dispatch) =>{
        axios.post('https://iris-api.mycodelibraries.com/api/Profile/CreateProfile',obj,auth).then(response => {
            dispatch(callApi())
        })
    }
}
export const editUser = (obj) =>{
    return (dispatch) =>{
        axios.post('https://iris-api.mycodelibraries.com/api/Profile/UpdateProfile',obj,auth).then(response => {
            dispatch(callApi())
        })
    }
}
export const deleteUser = (id) =>{
    
    return (dispatch) =>{
        axios.delete('https://iris-api.mycodelibraries.com/api/Profile/DeleteProfile/'+id,auth).then(response => {
            
            dispatch(callApi())
        })
    }
}