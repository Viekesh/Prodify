import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../../FirebaseConfiguration";




// const CheckAuthStatus = () => {

//     const [loggedIn, setLoggedIn] = useState(false);

//     const [checkingStatus, setCheckingStatus] = useState(true);

//     useEffect(() => {
//         const authenticate = auth;

//         const unsubscribe = onAuthStateChanged(authenticate, (user) => {
//             if (user) {
//                 setLoggedIn(true);
//             };

//             setCheckingStatus(false);
//         });

//         return () => unsubscribe();
//     }, []);

//     return [loggedIn, checkingStatus];
// };

const CheckAuthStatus = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [checkingStatus, setCheckingStatus] = useState(true);

    useEffect(() => {

        // Get auth instance once
        const authInitialise = auth;

        const unsubscribe = onAuthStateChanged(authInitialise, (user) => {
            // Concise check for user existence
            setIsLoggedIn(!!user);
            setCheckingStatus(false);
        });

        // Cleanup on unmount
        return () => unsubscribe();
    }, []); // Empty dependency array for one-time effect

    return [isLoggedIn, checkingStatus];
};



export default CheckAuthStatus;