import './Home.scss';
import axios from "axios";
import { ChangeEvent } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ILogin } from "../../models/ILogin";
import { useEffect } from 'react';

export function Home(){

    const navigate = useNavigate();



    //check if already logged in.
    useEffect(() => {

        if(localStorage.getItem('userID') != null){
            navigate('/loggedIn');
        }

    }, []);




    const [post, setPost] = useState<ILogin>({
        email: '',
        password: ''
    });


    function handleChange(e:ChangeEvent<HTMLInputElement>){
        setPost({...post, [e.target.name]: e.target.value});
    }


    function login(){
        axios.post('https://node-nyhetsbrev.herokuapp.com/users/login', post)
            .then(res => {

                //login failed
                if(res.data == 'loginFailed'){
                    setLoginFailed(<p>Wrong email or password.</p>);
                }

                //login successful
                else{
                    localStorage.setItem('userID', JSON.stringify(res.data));
                    navigate('/loggedIn');
                }
                
                
            })
            .catch(err => {
                console.error(err);
            });
    }


    const [loginFailed, setLoginFailed] = useState<any>('');



    return(
        <>
            <div className="loginContainer">
                <form>
                    <h2>Login</h2>

                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Email" name="email" required onChange={handleChange} value={post.email}></input>

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="•••••" name="password" required onChange={handleChange} value={post.password}></input>

                    <input type="button" value="Login" onClick={login}></input>

                    {loginFailed}
                </form>

                <p>Dont have an account?</p>
                <Link to="/signup">Click here to Sign Up</Link>
            </div>
        </>
    );
}

