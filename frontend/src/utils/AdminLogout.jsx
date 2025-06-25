import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { AdminDataContext } from '../context/AdminContext'


const AdminLogout = () => {
    const navigate = useNavigate()
    const admintoken = localStorage.getItem("admintoken")
    axios.get(`${import.meta.env.VITE_BASE_URL}/admin/logout`,{
        headers: {
            "Authorization":`Bearer ${admintoken}`
        }
    }).then((response) => {
        if (response.status === 200)  {
            localStorage.removeItem("admintoken")
            navigate('/admin-login')
        }
    })
    return (
    <div>AdminLogout</div>
  )
}

export default AdminLogout