import axios from 'axios';
import { useState } from 'react';
import { ChangeEvent } from 'react';
import { ISignup } from '../../models/ISignup';
import './Signup.scss';

export function Signup(){





    const [post, setPost] = useState<ISignup>({
        email: '',
        password: '',
        subscription: false
    });





    function handleChange(e:ChangeEvent<HTMLInputElement>){

        setPost({...post, [e.target.name]: e.target.value});
        
        console.log(post);
    }





    const [checkbox, setCheckbox] = useState(false);

    function handleChangeCheckbox(){
        setCheckbox(!checkbox);
        
        setPost({...post, subscription: !checkbox});

        console.log(post);
    }





    function createAccount(){

        axios.post<ISignup>('http://localhost:3000/users', post)
            .then(res => {
                console.log(res);

                setPost({...post, email: '', password: ''});
                setUserCreated(<p>User created!</p>);
            })
            .catch(err => {
                console.error(err);
                
            });

    }

    const [userCreated, setUserCreated] = useState<any>();





    return(
        <>
            <div className="formContainer">
                <form>
                    <h2>Create new account</h2>

                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Email" name="email" required onChange={handleChange} value={post.email}></input>

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name="password" required onChange={handleChange} value={post.password}></input>

                    <label htmlFor="checkbox" className="checkboxLabel">Subscribe to newsletter</label>
                    <input type="checkbox" name="subscription" onChange={handleChangeCheckbox}></input>

                    <input type="button" value="Sign Up" onClick={createAccount}></input>
                </form>

                {userCreated}
            </div> 
        </>
    );
}