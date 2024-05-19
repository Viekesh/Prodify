import React, { useState } from 'react';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { authInitialise, createUserDocFromAuth, database } from '../../../FirebaseConfiguration';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useLocation, useNavigate } from 'react-router-dom';



const GoogleSignInButton = () => {

    const navigateAfterSignInWithGoogle = useNavigate();
    const location = useLocation();

    // State to manage errors
    const [authError, setAuthError] = useState(null);

    const handleGoogleSignIn = async () => {

        try {
            const auth = authInitialise;
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);

            const { user } = result;

            const userDocRef = await createUserDocFromAuth(user);

            // Handle successful authentication
            const credential = GoogleAuthProvider.credentialFromResult(result);

            const token = credential.accessToken;

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
            {authError && <p>Error: {authError.message}</p>}

            <p>Sign {location.pathname === "/Authenticate" ? "up" : "in"} with </p>

            <button onClick={handleGoogleSignIn} className='for_desk log_with_google'>
                Sign in with Google
            </button>
        </>
    );
};



export default GoogleSignInButton;





// setting up user's documents
// const createUserDocFromAuth = async (userAuth) => {
//     const userDocRef = doc(database, "Prodify Users", userAuth.uid);

//     console.log(userDocRef);

//     const userSnapShot = await getDoc(userDocRef);

//     console.log("user snapshot : ", userSnapShot);
// };

// const docReference = createUserDocFromAuth(user);

// console.log("docReference :", docReference);

// console.log("docReference :", docReference.exist());