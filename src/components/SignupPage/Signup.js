import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Signup.css"

function Signup () {
    let navigate = useNavigate();
    const [name,setName]=useState("");
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    const [repassword,setRePassword]=useState("");
    function sign_up(){

        
        if(name!=="" && username!=="" && password !=="" && repassword!=="" && password===repassword){
            navigate("/books")
        }
    }
  return (
    
    <>
        <div id="signup_solid">
            <form>
                <h1 id='signup_welcome'>Welcome!</h1>
                <label id='signup_label1'>Name</label>
                <input type='text' id='signup_input1' value={name} onChange={(e)=>setName(e.target.value)}/>
                <label id='signup_label2'>Username</label><br/>
                <input type='text' id='signup_input2' value={username} onChange={(e)=>setUsername(e.target.value)}/><br/>
                <label id='signup_label3'>Password</label><br/>
                <input type='password' id='signup_input3' value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
                <label id='signup_label4'>Re-type Password</label><br/>
                <input type='password' id='signup_input4' value={repassword} onChange={(e)=>setRePassword(e.target.value)}/><br/>
                <button id='signup_button' type="button" onClick={sign_up} style={{background: (name.length>0)&&(username.length>0)&&(password.length>0)&&(password===repassword)?'white':'rgb(136, 136, 136)'}}>Sign up</button>
                <a id='signup_signup' href='/login'>Log in</a>
            </form>
        </div>
    </>
  )
}

export default Signup