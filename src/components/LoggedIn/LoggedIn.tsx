import axios from 'axios';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoggedIn.scss'

export function LoggedIn(){


    const navigate = useNavigate();


    const [user, setUser] = useState({
        email: '',
        subscription: false
    });

    const [welcome, setWelcome] = useState<any>();






    useEffect(() => {

        axios.post('http://localhost:3000/users/loggedIn', {
            id: localStorage.getItem('userID')!.replace(/['"]+/g, '')
        })
            .then(res => {
                
                setUser({
                    email: res.data.email,
                    subscription: res.data.subscription.replace(/['"]+/g, '')
                });

                setWelcome(<p>Welcome {res.data.email}</p>);

                if(res.data.subscription == 'true' || res.data.subscription == true){
                    setCheckbox(true); //its false as default.
                }

            })
            .catch(err => {
                console.error(err);
                
            });

    },[]);






    const [checkbox, setCheckbox] = useState<boolean>(false); // true/false is backwards for some reason

    function handleChangeCheckbox(){
        setCheckbox(!checkbox);
        setUser({...user, subscription: !checkbox});
    }


    function saveChanges(){
        
        axios.put('http://localhost:3000/users/subscription', {
            email: user.email,
            subscription: user.subscription
        })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.error(err)
            });
    }



    function logout(){
        localStorage.removeItem('userID');
        navigate('/');
    }



    return(
    <>
        <div className="loggedInContainer">
            {welcome}

            <label htmlFor="checkbox" className="checkboxLabel">Subscribe to newsletter</label>
            <input type="checkbox" name="subscription" onChange={handleChangeCheckbox} checked={checkbox}></input>

            <input type="button" value="Save changes" onClick={saveChanges}></input>

            <input type="button" value="Logout" onClick={logout}></input>
        </div>
    </>
    );
}