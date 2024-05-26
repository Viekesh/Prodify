import React, { useState, useEffect } from 'react';
import { authInitialise } from '../../../FirebaseConfiguration';
import { GoogleAuthProvider, getRedirectResult, signInWithRedirect } from 'firebase/auth';
import { FcGoogle } from "react-icons/fc";



const GAuthMob = () => {

    const [authState, setAuthState] = useState(null); // Track authentication state

    const auth = authInitialise; // Initialize Firebase Auth instance

    useEffect(() => {
        const handleRedirectResult = async () => {
            try {
                const userCredential = await getRedirectResult(auth);
                if (userCredential) {
                    // User successfully signed in
                    setAuthState(userCredential.user);
                } else {
                    // No redirect result, user might not be signed in
                    setAuthState(null);
                }
            } catch (error) {
                console.error('Error retrieving redirect result:', error);
            }
        };

        handleRedirectResult(); // Call the function on component mount

    }, [auth]); // Re-run useEffect only when auth changes

    const handleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try {
            await signInWithRedirect(auth, provider);
        } catch (error) {
            console.error('Error signing in:', error);
        }
    };

    return (
        <>
            {authState ? (
                // User is signed in
                <div>
                    Welcome, {authState.displayName}!
                </div>
            ) : (
                // if user is not signed in
                <>
                    <div onClick={handleSignIn} className='sign_in_methods'>
                        <span className="g_auth x_y_axis_center">
                            <FcGoogle />
                        </span>
                    </div>
                </>
            )}
        </>
    );
}

export default GAuthMob;
