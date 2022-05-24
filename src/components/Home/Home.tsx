import axios from 'axios';
import { ChangeEvent } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ILogin } from '../../models/ILogin';
import './Home.scss';

export function Home(){


    const [post, setPost] = useState<ILogin>({
        email: '',
        password: ''
    });

    function handleChange(e:ChangeEvent<HTMLInputElement>){
        setPost({...post, [e.target.name]: e.target.value});
    }

    const [loginFailed, setLoginFailed] = useState<any>('');

    function login(){
        axios.post('http://localhost:3000/users/login', post)
            .then(res => {
                console.log(res.data);

                //login failed
                if(res.data == 'loginFailed'){
                    setLoginFailed(<p>Wrong email or password.</p>);
                }

                //login successful
                else{
                    localStorage.setItem('userID', JSON.stringify(res.data));
                    
                }
                
                
            })
            .catch(err => {
                console.error(err);
            });
    }

    return(
        <>
            <div className="formContainer">
                <form>
                    <h2>Login</h2>

                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Email" name="email" required onChange={handleChange} value={post.email}></input>

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="••••••••••" name="password" required onChange={handleChange} value={post.password}></input>

                    <input type="button" value="Login" onClick={login}></input>

                    {loginFailed}
                </form>

                <p>Dont have an account?</p>
                <Link to="/signup">Click here to Sign Up</Link>
            </div>
        </>
    );
}

