import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Table } from 'react-bootstrap'
import { HOC } from '../DashBoard/HOC'
import moment from 'moment/moment'

function RecentActivities() {
    const [actvities, setactvities] = useState([])
    const [profileData, setprofileData] = useState(JSON.parse(localStorage.getItem("loginProfileData")))
    let auth = {
        headers: {
            Authorization: `Bearer ${profileData.token}`
        }
    }
    useEffect(() => {
        axios.get("https://iris-api.mycodelibraries.com/api/Admin/GetAllRecentActivites", auth).then((res)  => {
            setactvities([ ...res.data.responseData.recentActivity ])

        })
        // console.log(actvities)
    }, [])
   

    
    
  return (
    <Table className='border border-3 text-center recent-act'>
                <thead>
                    <tr>
                        <th className='border border-3 active-tab'>Id</th>
                        <th className='border border-3 active-tab'>Title</th>
                        <th className='border border-3 active-tab'>Created Date</th>
                        <th className='border border-3 active-tab'>Updated Date</th>
                        <th className='border border-3 active-tab'>Type</th>
                        
                    </tr>
                </thead>
                <tbody>
                    {
                        actvities?.map((x, i) => {
                            return (
                                <tr key={i}>
                                    <td className='border border-3'>{x.id}</td>
                                    <td className='border border-3'>{x.title}</td>
                                    <td className='border border-3'>{moment(x.createdDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    <td className='border border-3'>{moment(x.updatedDate).format('MMMM Do YYYY, h:mm:ss a')}</td>
                                    <td className='border border-3'>{x.type}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
  )
}

export default HOC(RecentActivities)