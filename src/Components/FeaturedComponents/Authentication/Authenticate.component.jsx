import { NavLink } from "react-router-dom";
import "./Auth.style.scss";
import GoogleSignInButton from "./GAuth";



const Authenticate = () => {

    return (
        <>
            <section className="authenticate">
                <GoogleSignInButton />

                <div className="sign_in">
                    <form>
                        <input type="text" />
                        <input type="text" />
                        <button>Submit</button>
                    </form>
                </div>

                <h3>
                    not register yet!
                    <NavLink to="/Register">click here</NavLink>
                </h3>
            </section>
        </>
    );
};



export default Authenticate;