import React, { useState, useEffect } from 'react';
import { authInitialise } from '../../../FirebaseConfiguration';
import { GoogleAuthProvider, getRedirectResult, signInWithRedirect } from 'firebase/auth';



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
        <div>
            {authState ? (
                // User is signed in
                <div>
                    Welcome, {authState.displayName}!
                </div>
            ) : (
                // User is not signed in
                <button onClick={handleSignIn}>Sign in with Google</button>
            )}
        </div>
    );
}

export default GAuthMob;
