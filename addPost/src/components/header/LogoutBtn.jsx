import { useDispatch } from 'react-redux';
import authService from '../../appwrite/auth';
import { logout } from '../features/authSlice.js'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout()) //dispatch helps the state to be updated whenever something(e.g logout) happens
        })
    }
  return (
    <button className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
    onClick={logoutHandler}
    >
      Logout
    </button>
  )
}

export default LogoutBtn