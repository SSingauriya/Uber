import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Captainlogin = () => {
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [captainData, setCaptainData] = useState({});
    const handleSubmit = (e) => {
      e.preventDefault();
      setCaptainData({
        email: email,
        password: password
      })
      setEmail('');
      setPassword('');
    }
  return (
    <div className="p-7 flex justify-between flex-col h-screen">
      <div>
        <img
          className="w-20  mb-3"
          src="https://www.svgrepo.com/show/505031/uber-driver.svg"
          alt=""
        />
        <form onSubmit={(e)=>handleSubmit(e)}> 
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            required
            value={email}
            onChange={(e)=>{
              setEmail(e.target.value)
            }}
            className="bg-[#eeeeee] mb-7 px-4 py-2 w-full rounded text-lg placeholder:text-base"
            type="email"
            placeholder="email@example.com"
          />
          <h3 className="text-lg font-medium mb-2">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-7 px-4 py-2 w-full rounded text-lg placeholder:text-base"
            value={password}
            onChange={(e)=>{
              setPassword(e.target.value)
            }}
            required
            type="password"
            placeholder="password"
          />
          <button
            className="bg-[#111] text-white font-semibold mb-7 px-4 py-2 w-full rounded text-lg placeholder:text-base"
            type="submit"
          >
            Login
          </button>
        </form>
        <p className="text-center">Join a fleet? <Link to='/captain-signup' className="text-blue-600" text-xl>Register as a Captain</Link></p>
      </div>
      <div>
        <Link to = '/login'
        className="bg- bg-orange-600 flex items-center justify-center  text-white font-semibold mb-5 px-4 py-2 w-full rounded text-lg placeholder:text-base"
        type="submit"
        >Sign in as User</Link>
      </div>
    </div>
  )
}

export default Captainlogin