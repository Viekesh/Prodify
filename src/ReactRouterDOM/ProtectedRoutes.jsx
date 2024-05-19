import { Navigate, Outlet } from "react-router-dom";
import CheckAuthStatus from "../Components/FeaturedComponents/Authentication/CustomHook/CheckAuthStatus.component";
import Spinner from "../Components/CommonModules/Spinner/Spinner";




const ProtectedRoutes = () => {

    const [loggedIn, checkingStatus] = CheckAuthStatus();

    if (checkingStatus) {
        return <div className="private_routes"><Spinner /></div>
    };

    return loggedIn ? <Outlet /> : <Navigate to="/Authenticate" />
};



export default ProtectedRoutes;