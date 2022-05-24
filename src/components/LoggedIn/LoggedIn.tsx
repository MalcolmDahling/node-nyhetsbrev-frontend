import axios from 'axios';
import { useEffect } from 'react';
import './LoggedIn.scss'

export function LoggedIn(){

    useEffect(() => {

        axios.post('http://localhost:3000/users/loggedIn', {
            id: JSON.stringify(localStorage.getItem('userID'))
        })
            .then(res => {
                console.log(res.data);
                
            })
            .catch(err => {
                console.error(err);
                
            });

    },[]);

    return(
    <>
        <div className="loggedInContainer">
            
        </div>
    </>
    );
}