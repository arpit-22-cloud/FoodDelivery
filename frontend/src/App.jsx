
import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar.jsx'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home.jsx'
import Cart from './pages/Cart/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder.jsx'
import Footer from './components/Footer/Footer.jsx'
import LoginPopup from './components/LoginPopup/LoginPopup.jsx'
import Verify from './pages/Verify/Verify.jsx'
import MyOrders from './pages/MyOrders/MyOrders.jsx'

const App = () => {

  // State to toggle the login popup visibility
  const [showLogin, setShowLogin] = useState(false)

  return (
    <>
    {/* Conditional rendering for the Login Popup  */}
    {showLogin ? <LoginPopup setShowLogin={setShowLogin} /> : <></>}
      
      <div className='app'>
        {/* Navbar receives the setter function to trigger the popup  */}
        <Navbar setShowLogin={setShowLogin} />
        
        {/* Application Routing  */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={<MyOrders />} />
        </Routes>
      </div>
      
      {/* Footer appears on all pages */}
      <Footer />
    </>
  )
}

export default App