import { Link } from 'react-router-dom';
import './Home.scss';

export function Home(){

    return(
        <>
            <div className="formContainer">
                <form>
                    <h2>Login</h2>

                    <label htmlFor="email">Email</label>
                    <input type="email" placeholder="Email" name="email"></input>

                    <label htmlFor="password">Password</label>
                    <input type="password" placeholder="Password" name="password"></input>

                    <input type="button" value="Login"></input>
                </form>

                <p>Dont have an account?</p>
                <Link to="/signup">Click here to Sign Up</Link>
            </div>
        </>
    );
}