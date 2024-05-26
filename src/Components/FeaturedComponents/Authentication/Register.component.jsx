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

    const [formFields, setFormFields] = useState(defaultFormFields);

    const { firstName, lastName, phoneNum, email, password, confirmPass } = formFields;

    const [showPassword, setShowPassword] = useState(false);

    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const eyeVisi = () => {
        setShowPassword((prevState) => !prevState);
    };

    const eyeConVisi = () => {
        setShowConfirmPassword((prevState) => !prevState);
    };

    const userNavigateAfterSignUp = useNavigate();

    const handleFormData = (event) => {
        console.log(event.target.value);

        setFormFields((prevState) => ({
            ...prevState,

            [event.target.id]: event.target.value,
        }));
    };

    console.log(formFields);



    const submitFormData = async (event) => {
        event.preventDefault();

        const createdAt = new Date();

        try {
            if (password !== confirmPass) {
                return alert("Password Not Matched");
            };

            if (firstName && lastName && email && phoneNum && password && confirmPass) {
                const userCredential = await createUserWithEmailAndPassword(
                    authInitialise,
                    email,
                    password,
                );

                await updateProfile(authInitialise.currentUser, {
                    displayName: `${firstName} ${lastName}`
                });

                const user = userCredential.user;

                const formDataCopy = { ...formFields, createdAt };

                // delete formDataCopy.password;

                // delete formDataCopy.confirmPass;

                await setDoc(doc(database, "Prodify Users", user.uid), {
                    ...formDataCopy,
                });

                alert("You Have Successfully Registered!");

                userNavigateAfterSignUp("/Profile");

            } else {
                return alert("All fields are mandatory");
            };

        } catch (error) {

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