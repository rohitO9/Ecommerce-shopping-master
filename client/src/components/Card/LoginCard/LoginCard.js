import { Link, useNavigate } from 'react-router-dom';
import './LoginCard.css';
import { useState } from 'react';
import axios from 'axios';

const LoginCard = () => {
    const[email, setemail] = useState("");
    const[password, setpassword] = useState("");
    const[message, setMessage] = useState("");
    
    
    // Function to handle login
    const handlelogin = async (e) =>{
        e.preventDefault();
        try{
            const response = await axios.post("http://localhost:5000/account/login", {
                email,
                password,

            });
            setMessage(response.data.message);
    
        }
        catch(err){
            console.log("regestration failed", err.response.data.msg);
            setMessage("Registration Failed! Please Try ")

        }
    }
    return ( 
        <div className="login__card__container">
            <div className="login__card">
                <div className="login__header">
                    <h1>Login</h1>
                </div>
                <div className="login__inputs">
                    <div className="email__input__container input__container">
                        <label className="email__label input__label">Email</label>
                        <input type="email" value={email} onChange={(e) =>{setemail(e.target.value)}} required className="email__input login__input" placeholder='example@gmail.com' />
                    </div>
                    <div className="password__input__container input__container">
                        <label className="password__label input__label" >Password</label>
                        <input type="password"  value={password} onChange={(e) =>{setpassword(e.target.value)}} required className="password__input login__input" placeholder='**********'/>
                    </div>
                    <div className="login__button__container">
                        <button className="login__button" onClick={handlelogin} >LOGIN</button>
                    </div>
                    {message && <p>{message}</p>}
                </div>
                <br></br>
                <div className="login__other__actions">
                    <div className="login__forgot__password">Forgot password?</div>
                    <div className="login__new__account">Don't have account? <Link to="/account/register">Create account</Link> </div>
                </div>
            </div>
        </div>
     );
}
 
export default LoginCard;