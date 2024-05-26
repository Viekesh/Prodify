// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { doc, getDoc, getFirestore, serverTimestamp, setDoc } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD_eI50_FD6GwXu0HUZ7dTJD6UQR1TPDkI",
    authDomain: "prodify-b4880.firebaseapp.com",
    projectId: "prodify-b4880",
    storageBucket: "prodify-b4880.appspot.com",
    messagingSenderId: "814016456665",
    appId: "1:814016456665:web:5af9c7c90477b356bbdbc8",
    measurementId: "G-98K6FSQSWB"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const authInitialise = getAuth(app);

export const analytics = getAnalytics(app);

export const database = getFirestore();



// Authentication
export const createUserDocFromAuth = async (userAuth) => {

    if (!userAuth) return;

    const userDocRef = doc(database, "Prodify Users", userAuth.uid);

    // Check if the user already exists
    const docSnapShot = await getDoc(userDocRef);

    // if user is not exist save user data in the database
    if (!docSnapShot.exists()) {

        const { photoURL, displayName, email, phoneNumber } = userAuth;

        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                photoURL,
                displayName,
                email,
                phoneNumber,
                createdAt,
            });
        } catch (error) {
            console.log("Error Occured While Creating The User", error.message);
        };

        // await setDoc(userDocRef, {
        //     photoUrl: user.photoURL,
        //     name: user.displayName,
        //     email: user.email,
        //     phoneNo: user.phoneNumber,
        //     timestamp: serverTimestamp(),
        // });
    };

    return userDocRef;
}



//.