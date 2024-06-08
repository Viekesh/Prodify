import { Route, Routes } from "react-router-dom";
import Landing from "../Components/Landing/Landing";
import Authenticate from "../Components/FeaturedComponents/Authentication/Authenticate.component";
import Register from "../Components/FeaturedComponents/Authentication/Register.component";
import Profile from "../Components/FeaturedComponents/Authentication/Profile";
import ProtectedRoutes from "./ProtectedRoutes";



const ReactRoutes = () => {
    return (
        <>
            <Routes>
                <Route exact path="/" element={<Landing />}></Route>

                {/* Authentcate */}
                <Route path="/Register" element={<Register />}></Route>
                <Route path="/Authenticate" element={<Authenticate />}></Route>

                <Route exact path="/Profile" element={<ProtectedRoutes />}>
                    <Route exact path="/Profile" element={<Profile />}></Route>
                </Route>
            </Routes>
        </>
    );
};



export default ReactRoutes;