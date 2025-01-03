import React, {useContext, useEffect,useState} from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

const UserProtectWrapper = ({children}) => {

  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [ isloading, setIsLoading ] = useState(true);

  useEffect(() => {
    if(!token){
      navigate('/login');
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(response => {
      if(response.status === 200){
        setUser(response.data.user);
        setIsLoading(false);
      }
    }
    ).catch(err => {
      console.log(err);
      localStorage.removeItem('token');
      navigate('/login');
    });

  }, [token]);

  if(isloading){
    return <h1>Loading...</h1>
  }

  return (
    <>
      {children}
    </>
  )
}

export default UserProtectWrapper