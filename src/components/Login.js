import React,{useState} from 'react'

import { useNavigate } from "react-router-dom";



function Login(props) {
  const navigate = useNavigate ();
  
  const [Traditional, setTraditional] = useState({email : "",password : ""})
  
  const handleSubmit =async (e)=>{
    e.preventDefault()
    const response = await fetch("http://localhost:4000/api/auth/login",{
      method : "POST",
      headers : {
        'Content-Type':'application/json',
      },
      body: JSON.stringify({ email : Traditional.email,password : Traditional.password }),
    })
    const json = await response.json()
    console.log(json) 
    if(json.success){
      localStorage.setItem('token',json.authtoken)
      props.showAlert('    Logged in','success')
      navigate("/");

      }
      else{
     props.showAlert('     Invalid Creditional','danger')
      
      }
    }
    const onChange = (e) => {
      setTraditional({...Traditional, [e.target.name]: e.target.value})
  };
  return (
 <>
 <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={Traditional.email} onChange={onChange}  id="email" name='email' aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>

  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" name='password' value={Traditional.password} onChange={onChange} className="form-control" id="password"/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
 
 </>
  )
}

export default Login