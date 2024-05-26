import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { authInitialise, createUserDocFromAuth } from '../../../FirebaseConfiguration';
import { useLocation, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";



const GoogleSignInButton = () => {

    const navigateAfterSignInWithGoogle = useNavigate();

    const location = useLocation();

    // State to manage errors
    const [authError, setAuthError] = useState(null);

    // use here empty array to run this function once when this function mounts for the first time.
    const handleGoogleSignIn = async () => {

        try {
            const auth = authInitialise;

            const provider = new GoogleAuthProvider();

            const result = await signInWithPopup(auth, provider);

            const { user } = result;

            await createUserDocFromAuth(user);

            // Handle successful authentication
            // const credential = GoogleAuthProvider.credentialFromResult(result);

            // const token = credential.accessToken;

            // console.log("token :", token);

            // const user = result.user;

            // const { user } = result;

            // console.log("user :", user);

            // console.log("user id :", user.uid);

            // Handle potential use cases (e.g., storing token, redirecting)
            // Or use user data for your app
            console.log('Successfully signed in:', user);

            // Redirect after successful sign-in
            navigateAfterSignInWithGoogle("/Profile");

        } catch (error) {
            console.error('Error signing in with Google:', error);

            // Set error state for display
            setAuthError(error.message);
        }
    };

    return (
        <>
            <section className="for_desk">
                {authError && <p>Error: {authError.message}</p>}

                <p>Sign {location.pathname === "/Authenticate" ? "up" : "in"} with </p>

                <button onClick={handleGoogleSignIn} className='log_with_google'>
                    <div className="for_andi x_y_axis_center">
                        <FcGoogle />
                    </div>
                </button>
            </section>
        </>
    );
};



export default GoogleSignInButton;



//.