import { useState } from "react";
import "./Auth.style.scss";
import GoogleSignInButton from "./GAuth";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { signUpWithEmailAndPass } from "../../../FirebaseConfiguration";


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
        // console.log(event.target.value);

        // setFormFields((prevState) => ({
        //     ...prevState,

        //     [event.target.id]: event.target.value,
        // }));

        const { name, value } = event.target;

        setFormFields({ ...formFields, [name]: value });
    };

    console.log(formFields);

    // const submitFormData = async (event) => {
    //     event.preventDefault();

    //     try {
    //         if (password !== confirmPass) {
    //             return alert("Password Not Matched");
    //         };

    //         if (firstName, lastName, email, phoneNum, password, confirmPass) {
    //             const userCredential = await createUserWithEmailAndPassword(
    //                 authInitialise,
    //                 email,
    //                 password,
    //             );
    //             await updateProfile(authInitialise.currentUser, {
    //                 displayName: `${firstName} ${lastName}`
    //             });

    //             const user = userCredential.user;

    //             const formDataCopy = { ...formFields };

    //             delete formDataCopy.password;

    //             delete formDataCopy.confirmPass;

    //             await setDoc(doc(database, "Prodify Users", user.uid), {
    //                 ...formDataCopy,
    //             });

    //             alert("You Have Successfully Registered!");

    //             userNavigateAfterSignUp("/Authenticate");
    //         } else {
    //             return alert("All fields are mandatory");
    //         };

    //     } catch (error) {

    //         console.log(error.message);

    //     };
    // };

    const submitFormData = async () => {

        if (password !== confirmPass) {
            alert("Password do not match");
        };

        try {
            const response = await signUpWithEmailAndPass(email, password);

            console.log(response);
        } catch (error) {

            console.log(error.message);

        }
    };

    return (
        <>
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

                        <div className="form_elements form_sub_button">
                            <button type="submit" className="input_field">Register</button>
                        </div>
                    </form>
                </div>

                <GoogleSignInButton />
            </section>
        </>
    );
};



export default Register;