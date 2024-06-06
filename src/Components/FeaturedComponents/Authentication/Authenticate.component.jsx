import { NavLink, useNavigate } from "react-router-dom";
import "./Auth.style.scss";
import GoogleSignInButton from "./GAuth";
import GAuthMob from "./GAuthMob";
import TopNav from "../Navigation/TopNav.component";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { authInitialise } from "../../../FirebaseConfiguration";



const Authenticate = () => {

    const userNavigateAfterSignIn = useNavigate();

    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const { email, password } = formData;

    const [showPassword, setShowPassword] = useState(false);

    const eyeVisi = () => {
        setShowPassword((prevState) => !prevState);
    };

    const handleFormData = (event) => {
        console.log(event.target.value);

        setFormData((previousState) => ({
            ...previousState,
            [event.target.id]: event.target.value,
        }));
    };

    const submitFormData = async (event) => {
        event.preventDefault();

        setLoading(true);

        try {
            if (email && password) {
                const userCred = await signInWithEmailAndPassword(
                    authInitialise,
                    email,
                    password
                );

                setLoading(false);

                if (userCred.user) {
                    alert("Your Are Successfully Signed In");
                    console.log(userCred.user);
                    userNavigateAfterSignIn("/Profile");
                };
            };
        } catch (error) {
            alert(error.message);
            console.log(error.message);
        }
    };

    return (
        <>
            <TopNav />
            <section className="authenticate">

                <div className="form_fields">
                    <form onSubmit={submitFormData}>
                        <div className="form_elements y_axis_center">
                            <input
                                type="email"
                                id="email"
                                value={email}
                                name="email"

                                className="input_field"
                                placeholder="Enter Firstname"
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

                        <button type="submit" className="form_sub_btn">Sign In</button>
                    </form>

                    <h3>
                        not register yet!
                        <span> </span>
                        <NavLink to="/Register">click here</NavLink>
                        <br />
                        <br />
                        sign in with other methods
                    </h3>

                    <GoogleSignInButton />
                    <GAuthMob />
                </div>

            </section>
        </>
    );
};



export default Authenticate;