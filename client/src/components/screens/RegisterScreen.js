import {useState} from 'react';
import axxios from'axios';
import { Link } from "react-router-dom";
import "./RegisterScreen.css";
import axios from 'axios';

const RegisterScreen=()=>{


const [username, setUserrname]=useState("");
const [email, setEmail] = useState("");
 const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
    
const registerHandler=(e) =>
{
    e.preventDefault();

    const config ={
        header:  {
            "Content-Type": "application/json"
        }
    }


if(password !==confirmPassword){
    setPassword("");
    setConfirmedPassword("");
    setTimeout(() =>
    {
        setError("");


    }, 5000);
    return setError("password do not match");
}
try {
    const {data}= await axios.post(
        "/api/auth/register",
        {
            username,
            email,
            password,
        },
        config
    );
localStorage.setItem("authToken", data.token);

      history.push("/");
    } catch (error) {
      setError(error.response.data.error);
      setTimeout(() => {
        setError("");
      }, 5000);
    }
  };

return( 
<div className="register-screen">
    <form onSubmit = {registerHandler} className="register-screen__form">
        <h3 className="register-screen_title"> Register</h3>
        {error && <span className="error-message">{error}</span>}
        <div className="form-group">
           <label htmlFor="name">Username:</label>
           <input
            type="text"
            required
            id="name"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

<div className="form-group">
    <label htmlfor="email">Email</label>
    <input
    type="email"
    required
    id="email"
    placceholder="Enter email"
    value={email}
    onChange={(e)=> setEmail(e.target.value)}
    />
</div>
 <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            required
            id="password"
            autoComplete="true"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

<div className="form-group">
          <label htmlFor="confirmpassword">Confirm Password:</label>
          <input
            type="password"
            required
            id="confirmpassword"
            autoComplete="true"
            placeholder="Confirm password"
            value={confirmpassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
        Register
        </button>

        <span className="register-screen__subtext">
          Already have an account? <Link to="/login">Login</Link>
        </span>
    </form>
</div>
);
};


export default RegisterScreen;