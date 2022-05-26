import axios from 'axios';
import { useState } from 'react';
import { FormEvent } from 'react';
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
    }





    const [checkbox, setCheckbox] = useState(false);

    function handleChangeCheckbox(){
        setCheckbox(!checkbox);
        
        setPost({...post, subscription: !checkbox});
    }





    function createAccount(e:FormEvent){

        e.preventDefault();

        axios.post<ISignup>('https://node-nyhetsbrev.herokuapp.com/users/add', post)
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
                <form onSubmit={createAccount}>
                    <h2>Create new account</h2>

                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Email" name="email" required onChange={handleChange} value={post.email}></input>

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name="password" required onChange={handleChange} value={post.password}></input>

                    <label htmlFor="checkbox" className="checkboxLabel">Subscribe to newsletter</label>
                    <input type="checkbox" name="subscription" onChange={handleChangeCheckbox}></input>

                    <input type="submit" value="Sign Up" ></input>
                </form>

                {userCreated}
            </div> 
        </>
    );
}