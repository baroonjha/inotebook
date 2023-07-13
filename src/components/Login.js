import React,{useState} from "react";
import {useNavigate } from "react-router-dom";

const Login = (props) => {
  const [credential, setCredential] = useState({email:"",password:""});
   const navigate = useNavigate()

  const handleSubmit = async (e) => {
    let success = true
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email: credential.email, password:credential.password }),
    });
    const json = await response.json();
    console.log(json);
    if(json.success !== false){
        //redirect
        // alert("Login successfully")
        localStorage.setItem('token',json.authtoken)
        navigate("/");
        props.showAlert("Logedin Successfully","success")
    }else {
        props.showAlert("Invalid credential","danger")
    }
  };
  const onChange =(e)=>{
    setCredential({...credential,[e.target.name]:e.target.value})
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email" onChange={onChange} value={credential.email}
          />
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password" value={credential.password} onChange={onChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
