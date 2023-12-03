import React, { useEffect, useState } from 'react'
import { HOC } from '../DashBoard/HOC'
import { Table } from 'react-bootstrap'
import axios from 'axios'

function AllProject() {
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
    const [albums, setalbums] = useState([])
    const [singles, setsingles] = useState([])
    const profileData = JSON.parse(localStorage.getItem("loginProfileData"))
    let auth = {
        headers: {
            Authorization: `Bearer ${profileData?.token}`
        }
    }
    useEffect(() => {
        axios.get("https://iris-api.mycodelibraries.com/api/Admin/GetAllProjects", auth).then((res) => {
            setalbums([...res.data.responseData.albumsResponses])
            setsingles([...res.data.responseData.singlesResponses])

        }).catch(err => {
            console.log(err)
        })
    })
    return (
        <>
            <section className='w-100 mx-auto bg-white px-5 py-4   gap-5   '>
                <div className='d-flex  gap-3 align-self-center'>
                    <button className='secondry-btn tabBtn px-5 py-2 rounded w-100 active-tab' onClick={(e) => { tabView(0) }}>Albums Responses</button>
                    <button className='secondry-btn tabBtn px-5 py-2 rounded w-100' onClick={(e) => { tabView(1) }}>Singles Responses</button>
                </div>
                <div className='position-relative '>
                    <div className="tab  position-absolute w-100 ">
                        <Table className='border border-3 text-center recent-act w-100 mt-3'>
                            <thead>
                                <tr>
                                    <th className='border border-3  active-tab'>Album Id</th>
                                    <th className='border border-3  active-tab'>Album Name</th>
                                    <th className='border border-3  active-tab'>Artwork Url</th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    albums?.map((x, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className='border border-3'>{x.albumId ? x.albumId : "-"}</td>
                                                <td className='border border-3'>{x.albumName ? x.albumName : "-"}</td>
                                                <td className='border border-3'>{x.artworkUrl ? x.artworkUrl : "-"}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>

                    </div>
                    <div className="tab  position-absolute  d-none w-100 ">
                        <Table className='border border-3 text-center recent-act w-100 mt-3'>
                            <thead>
                                <tr>
                                    <th className='border border-3 active-tab'>Single Id</th>
                                    <th className='border border-3 active-tab'>Song Title</th>
                                    <th className='border border-3 active-tab'>Artwork Url</th>


                                </tr>
                            </thead>
                            <tbody>
                                {
                                    singles?.map((x, i) => {
                                        return (
                                            <tr key={i}>
                                                <td className='border border-3'>{x.singleId ? x.singleId : "-"}</td>
                                                <td className='border border-3'>{x.songTitle ? x.songTitle : "-"}</td>
                                                <td className='border border-3'>{x.artworkUrl ? x.artworkUrl : "-"}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </div>
                </div>
            </section>
        </>
    )
}

export default HOC(AllProject)