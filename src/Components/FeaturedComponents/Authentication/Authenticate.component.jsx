import { NavLink } from "react-router-dom";
import "./Auth.style.scss";
import GoogleSignInButton from "./GAuth";
import GAuthMob from "./GAuthMob";



const Authenticate = () => {

    return (
        <>
            <section className="authenticate">

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

                <GoogleSignInButton />
                <GAuthMob />
            </section>
        </>
    );
};



export default Authenticate;