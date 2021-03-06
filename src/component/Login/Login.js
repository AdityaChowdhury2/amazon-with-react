import './login.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import { handleCreateUserWithEmailAndPassword, handleFbLogin, handleGoogleSignIn, handleSignInWithEmailAndPassword, handleSignOut, initializeLoginFramework, resetPassword } from './loginManager';
import GoogleLogin from 'react-google-login';

function Login() {
    initializeLoginFramework();
    const [newUser, setNewUser] = useState(false);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const location = useLocation();
    const navigate = useNavigate();
    const from = location.state?.from?.pathname;
    const [userInfo, setUserInfo] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        password: '',
        photo: '',
        error: '',
        success: false
    })
    const responseGoogle = (res) => {
        console.log(res);
        const { email, name, imageUrl } = res.profileObj;
        const signedInUser = {
            isSignedIn: true,
            name: name,
            email: email,
            photo: imageUrl,
            success: true
        }
        // console.log(signedInUser);
        handleResponse(signedInUser, true);
    }
    const handleResponse = (res, redirect) => {
        setUserInfo(res);
        setLoggedInUser(res);
        redirect && navigate(from, { replace: true });

    }
    const googleSignIn = () => {
        handleGoogleSignIn()
            .then(res => {
                handleResponse(res, true)
                // navigate(from, { replace: true });
            })
    }
    const signOut = () => {
        handleSignOut()
            .then(res => {
                handleResponse(res, false)
                // setUserInfo(res);
                // setLoggedInUser(res);
            })
    }
    const fbLogin = () => {
        handleFbLogin()
            .then(res => {
                handleResponse(res, true)
                // setUserInfo(res);
                // setLoggedInUser(res);
                // navigate(from, { replace: true });
            })

    }
    const handleBlur = (event) => {
        let isFieldValid = true;
        if (event.target.name === 'email') {
            isFieldValid = /\S+@\S+\.\S+/.test(event.target.value);
            console.log(isFieldValid)
        }
        if (event.target.name === 'password') {
            isFieldValid = event.target.value.length > 6 && /\d/.test(event.target.value);
            console.log(isFieldValid)
        }
        if (isFieldValid) {
            const newUserInfo = { ...userInfo };
            newUserInfo[event.target.name] = event.target.value;
            setUserInfo(newUserInfo);
        }
    }
    const handleSubmit = (e) => {

        // console.log(user.email, user.password)
        if (newUser && userInfo.email && userInfo.password) {
            handleCreateUserWithEmailAndPassword(userInfo.name, userInfo.email, userInfo.password)
                .then(res => {
                    handleResponse(res, true)
                    // setUserInfo(res);
                    // setLoggedInUser(res);
                    // navigate(from, { replace: true });
                })

        }
        if (!newUser && userInfo.email && userInfo.password) {
            handleSignInWithEmailAndPassword(userInfo.email, userInfo.password)
                .then(res => {
                    handleResponse(res, true)
                    // setUserInfo(res);
                    // setLoggedInUser(res);
                    // navigate(from, { replace: true });
                })
        }
        e.preventDefault();
    }
    return (
        <div className="login">
            {
                userInfo.isSignedIn ? <button onClick={signOut}>Sign Out</button> :
                    <GoogleLogin
                        clientId="293203140537-2i4gt32cso61ro3v3s49rdctbjvd53qq.apps.googleusercontent.com"
                        buttonText="Sign in with Google"
                        onSuccess={responseGoogle}
                        onFailure={responseGoogle}
                        cookiePolicy={'single_host_origin'}
                    />

                // <button onClick={googleSignIn}>Sign In</button>
            }
            <br />
            <button style={{ marginTop: '10px' }} onClick={fbLogin}>???Sign in using Facebook???</button>
            {/* <p>to {from}</p> */}
            {/* {
                userInfo.isSignedIn ? <div>
                    <p>Welcome, {userInfo.name}</p>
                    <p>Your email address : {userInfo.email}</p>
                    <img src={userInfo.photo} alt={userInfo.name} />
                </div>
                    : <p>Please sign in</p>
            } */}
            <h1>Our Own Authentication</h1>
            <input type="checkbox" name="newUser" onChange={() => { setNewUser(!newUser) }} id="" />
            <label>New User Sign Up</label>
            <form onSubmit={handleSubmit}>
                {newUser && <input type="text" name="name" onBlur={handleBlur} placeholder='Your Name' />}
                <br />
                <input type="text" name="email" onBlur={handleBlur} placeholder='Your Email Address' required />
                <br />
                <input type="password" name="password" onBlur={handleBlur} placeholder="Your Password" required />
                <br />
                <input type="submit" value={newUser ? 'Sign Up' : 'Log in'} />
            </form>
            <button onClick={() => resetPassword(userInfo.email)}>Forget Password</button>
            <p style={{ color: 'red' }}>{userInfo.error}</p>
            {userInfo.success && <p style={{ color: 'green' }}> User {newUser ? 'Created' : `Logged in`} Successfully</p>}
            { }
        </div >
    );
}

export default Login;
