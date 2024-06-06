import { NavLink } from "react-router-dom";
import "./Auth.style.scss";
import GoogleSignInButton from "./GAuth";
import GAuthMob from "./GAuthMob";
import TopNav from "../Navigation/TopNav.component";
import { AiFillEyeInvisible, AiFillEye } from "react-icons/ai";
import { useState } from "react";



const Authenticate = () => {

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
    }

    return (
        <>
            <TopNav />
            <section className="authenticate">

                <div className="sign_in">
                    <form>
                        <div className="form_elements y_axis_center">
                            <input
                                type="text"
                                id="firstName"
                                value={email}
                                name="firstName"

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
                    </form>
                </div>

                <h3>
                    not register yet!
                    <NavLink to="/Register">click here</NavLink>
                </h3>

                <GoogleSignInButton />
                <GAuthMob />
            </section>
        </>
    );
};



export default Authenticate;