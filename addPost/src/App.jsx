import { useState, useEffect } from 'react';
import { useDispatch } from "react-redux"
import './App.css'
import authService from "./appwrite/auth"
import { login as authLogin , logout as authLogout } from "./features/authSlice"
import { Header, Footer } from "./components/index"
import { Outlet } from 'react-router-dom'

function App() {
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(() => {
    authService.getCurrentUser()
    .then((userData) => {
      if (userData) {
        document.cookie = "a_session_6739a0a600076d4a9c0f=exampleValue; SameSite=None; Secure; Path=/; Domain=.cloud.appwrite.io";
        dispatch(authLogin({userData}))
      } else {
        dispatch(authLogout())
      }
    })
    .finally(() => setLoading(false))
  }, [dispatch])
  
  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
