import React, { useContext, useEffect } from 'react'
import './Verify.css'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { StoreContext } from '../../context/StoreContext.jsx';
import axios from 'axios';

const Verify = () => {

  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");  // ✅ FIX
  const orderId = searchParams.get("orderId"); 
  const { url } = useContext(StoreContext);
  const navigate = useNavigate();

  const verifyPayment = async () => {
    try {
      const response = await axios.post(url + "/api/order/verify", { sessionId, orderId }); // ✅ FIX
      
      if (response.data.success) {
        navigate("/myorders");
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
      navigate("/");
    }
  }

  useEffect(() => { 
    if (sessionId && orderId) {
      verifyPayment(); 
    }
  }, [sessionId, orderId])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify;