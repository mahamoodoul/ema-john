import React from 'react';
import Auth from './useAuth';


const Login = () => {
    const auth=Auth();
    console.log(auth);

    const handleSignIn= () =>{
        auth.signInWithGoogle()
        .then(res =>{
            console.log('redirected now');
            window.location.pathname='/review';
        })
    }

    const handleSignOut=() =>{
        auth.signOut()
        .then(res =>{
           
            window.location.pathname='/';
        })
    }
    return (
        <div>
            <h1> join the party</h1>
            { 
                auth.user ? <button onClick={handleSignOut}>Sign Out</button> :
            <button onClick={handleSignIn}>Sign in with google.</button>}
        </div>
    );
};

export default Login;