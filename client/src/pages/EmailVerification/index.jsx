import React, { useEffect, useState } from 'react'
import "./index.scss"
import "react-router-dom"
import { useParams } from 'react-router-dom'
import axios from 'axios'
import backendURL from '../../config'
const EmailVerification = () => {
    const {token} = useParams()
    const [status, setStatus] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const verifyEmail = async()=>{
        try {
            setStatus(null)
        setLoading(true)
        setError(null)
        const resp = await axios(`${backendURL}/user/verify/${token}`)
        setStatus(resp.data.message)
        setLoading(false)
        } catch (error) {
            setLoading(false)
            setError(error.response.data.error)
            console.log(error);

        }
    }
    useEffect(() => {
      verifyEmail()
    }, [])
    
  return (
    <section id='EmailVerification'>
        <div className="container">
            {loading && "Loading..."}
            <p>{status && status}</p>
            <p className='error'>{error && error}</p>
        </div>
    </section>
  )
}

export default EmailVerification