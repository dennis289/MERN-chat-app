import React from 'react'
import toast from 'react-hot-toast';
import { useAuthContext } from '../Context/AuthContext';



const useSignup = () => {
  const [loading, setLoading] = React.useState(false);

  const {setAuthUser}= useAuthContext()

  const signup= async({fullName,username,password,confirmPassword,gender}) =>{
    const success= handleInputerrors({fullName,username,password,confirmPassword,gender})
    if(!success) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup",{
        method: 'POST',
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ fullName, username, password, confirmPassword, gender}),
      })
      
      const data = await res.json();
      if(data.error){
        throw new Error(data.error);
      }
      //set user to local storage
      localStorage.setItem("chat-user",JSON.stringify(data))
      //update user context
      setAuthUser(data)

    } catch (error) {
      toast.error(error.message)
    }finally{
      setLoading(false);
    }

  }
  return {signup,loading} 
}

export default useSignup

function handleInputerrors({fullName,username,password,confirmPassword,gender}){
  
    if(!fullName || !username || !password || !confirmPassword || !gender)
    {
      toast.error('Please fill in all fields');
      return false;
    }
    if(password !== confirmPassword)
    {
      toast.error('Passwords do not match');
      return false;
    }
    if(password.length < 6)
    {
      toast.error('Password must be at least 6 characters');
      return false;
    } 

  return true;
 }