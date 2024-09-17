import { useState } from "react";
import "./Auth.style.scss";
import GoogleSignInButton from "./GAuth";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { authInitialise, database } from "../../../FirebaseConfiguration";
import { doc, setDoc } from "firebase/firestore";
import TopNav from "../Navigation/TopNav.component";
import GAuthMob from "./GAuthMob";



const defaultFormFields = {
    firstName: "",
    lastName: "",
    phoneNum: "",
    email: "",
    password: "",
    confirmPass: "",
};



const Register = () => {

    // Creates a state variable named formFields that holds the current user input for each registration field.
    const [formFields, setFormFields] = useState(defaultFormFields);

    // Destructuring the formFields object to access individual fields (firstName, lastName, etc.)
    const { firstName, lastName, phoneNum, email, password, confirmPass } = formFields;

    // showPassword and showConfirmPassword to control the visibility of passwords when the user types.
    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const eyeVisi = () => {
        setShowPassword((prevState) => !prevState);
    };

    const eyeConVisi = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    const userNavigateAfterSignUp = useNavigate();

    // Updates the formFields state with the user's input whenever they change any form field.
    const handleFormData = (event) => {
        console.log(event.target.value);

        // It uses the event object to access the target field's ID and value.
        setFormFields((prevState) => ({
            ...prevState,

            [event.target.id]: event.target.value,
        }));
    };

    console.log(formFields);



    // "submitFormData" handles form submission when the "Register" button is clicked.
    const submitFormData = async (event) => {
        event.preventDefault();

        // Creates a createdAt timestamp for the user record.
        const createdAt = new Date();

        try {

            // Validates password match.
            if (password !== confirmPass) {
                return alert("Password Not Matched");
            };

            // Checks if all fields are filled and uses "createUserWithEmailAndPassword"
            // to create a new user with email and password.
            if (firstName && lastName && email && phoneNum && password && confirmPass) {
                const userCredential = await createUserWithEmailAndPassword(
                    authInitialise,
                    email,
                    password,
                );

                // Updates the user's profile with their full name using updateProfile
                await updateProfile(authInitialise.currentUser, {
                    displayName: `${firstName} ${lastName}`
                });

                const user = userCredential.user;

                const formDataCopy = { ...formFields, createdAt };

                // delete formDataCopy.password;

                // delete formDataCopy.confirmPass;

                // Creates a new Firestore document for the user in the "Prodify Users" collection with their 
                // form data and the timestamp. Optionally removes password and confirm password fields before 
                // saving.
                await setDoc(doc(database, "Prodify Users", user.uid), {
                    ...formDataCopy,
                });

                alert("You Have Successfully Registered!");

                userNavigateAfterSignUp("/Authenticate");

            } else {
                return alert("All fields are mandatory");
            };

        } catch (error) {

            // Handles potential errors during user creation, such as weak password, invalid email, or email
            // already in use and Displays an alert message based on the success or failure of the registration.
            if (error.message === "Firebase: Password should be at least 6 characters (auth/weak-password).") {
                alert("Password should be atleast 6 characters.");
            };

            if (error.message === "Firebase: Error (auth/invalid-email).") {
                alert("Invalid Email Address.");
            };

            if (error.message === "Firebase: Error (auth/email-already-in-use).") {
                alert("Email Address Already In Use.");
            };

            console.log(error.message);

        };
    };



    return (
        <>
            <TopNav />
            <section className="authenticate">

                <div className="form_fields">
                    <form onSubmit={submitFormData}>
                        <div className="form_elements y_axis_center">
                            <input
                                type="text"
                                id="firstName"
                                value={firstName}
                                name="firstName"

                                className="input_field"
                                placeholder="Enter Firstname"
                                onChange={handleFormData}
                            />
                        </div>

                        <div className="form_elements y_axis_center">
                            <input
                                type="text"
                                id="lastName"
                                value={lastName}
                                name="lastName"

                                className="input_field"
                                placeholder="Enter Lastname"
                                onChange={handleFormData}
                            />
                        </div>

                        <div className="form_elements y_axis_center">
                            <input
                                type="number"
                                id="phoneNum"
                                value={phoneNum}
                                name="phoneNum"

                                className="input_field"
                                placeholder="Enter Mobile Number"
                                onChange={handleFormData}
                            />
                        </div>

                        <div className="form_elements y_axis_center">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                name="email"

                                className="input_field"
                                placeholder="Enter Email"
                                onChange={handleFormData}
                            />
                        </div>

                        <div className="form_elements y_axis_center">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                value={password}
                                name="password"

                                className="input_field"
                                placeholder="Enter Password"
                                onChange={handleFormData}
                            />

                            {
                                showPassword ?
                                    <AiFillEye
                                        className="eye"
                                        onClick={eyeVisi}
                                    /> :
                                    <AiFillEyeInvisible
                                        className="eye"
                                        onClick={eyeVisi}
                                    />
                            }
                        </div>

                        <div className="form_elements y_axis_center">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPass"
                                value={confirmPass}
                                name="confirmPass"

                                className="input_field"
                                placeholder="Confirm Password"
                                onChange={handleFormData}
                            />

                            {
                                showConfirmPassword ?
                                    <AiFillEye
                                        className="eye"
                                        onClick={eyeConVisi}
                                    /> :
                                    <AiFillEyeInvisible
                                        className="eye"
                                        onClick={eyeConVisi}
                                    />
                            }
                        </div>

                        <button type="submit" className="form_sub_btn">Register</button>

                    </form>
                    <p>sign in with other methods</p>
                </div>

                <GoogleSignInButton />
                <GAuthMob />
            </section>
        </>
    );
};



export default Register;



// This component provides a registration form for users to create new accounts with email and password. It
// validates user input, interacts with Firebase Authentication and Firestore for user creation and data storage,
// and handles potential errors during the registration process. It also offers the option to integrate Google
// Sign -in for additional sign - up methods.