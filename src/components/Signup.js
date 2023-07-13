import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Signup = (props) => {
  const [credential, setCredential] = useState({name:"",email:"",password:"",cpassword:""});

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name,email,password} = credential;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name,email,password }),
    });
    const json = await response.json();
    console.log(json);
        //redirect
       if(json.success){
         //save the auth token and redirect
         localStorage.setItem('token',json.authtoken)
         navigate("/");
         props.showAlert("Account created Successfully","success")
       }else {
        props.showAlert("Account not created","danger")
       } 
  };
  const onChange =(e)=>{
    setCredential({...credential,[e.target.name]:e.target.value})
  }
  return (
    <div>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" onChange={onChange} name="name" minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onChange} aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" minLength={5} required onChange={onChange}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" onChange={onChange}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}

export default Signup;