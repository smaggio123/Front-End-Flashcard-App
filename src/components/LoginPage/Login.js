import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Login.css"
import UserService from "../services/UserService"

function Login () {
    let navigate = useNavigate();
    const [username,setUsername]=useState("");
    const [password,setPassword]=useState("");
    async function log_in(){
        if(username!=="" && password !==""){
            var verifyingUser = await UserService.getUserByUsername(username);
            if(verifyingUser.length>0){
                // console.log(verifyingUser);
                // console.log(verifyingUser[0].username)
                if(verifyingUser[0].username===username&&verifyingUser[0].password===password){
                    navigate("/books")
                }
            }
            else{
                // console.log(verifyingUser.length)
            }
        }
    }
  return (
    
    <>
        <div id="login_solid">
            <form>
                <h1 id='login_login'>Login</h1>
                <label id='login_label1'>Username</label><br/>
                <input type='text' id='login_input1' value={username} onChange={(e)=>setUsername(e.target.value)}/><br/>
                <label id='login_label2'>Password</label><br/>
                <input type='password' id='login_input2' value={password} onChange={(e)=>setPassword(e.target.value)}/><br/>
                <button id='login_button'  type="button" onClick={log_in} style={{background: (username.length>0)&&(password.length>0)?'white':'rgb(136, 136, 136)'}}>Login</button>
                <a id='login_signup' href='/signup'>Sign up</a>
            </form>
        </div>
    </>
  )
}


export default Login