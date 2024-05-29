import { BrowserRouter, RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "../Components/Landing/Landing";
import LandingDemo from "../Components/DemoComponents/LandingDemo/LandingDemo";
import TopNav from "../Components/FeaturedComponents/Navigation/TopNav.component";
import Authenticate from "../Components/FeaturedComponents/Authentication/Authenticate.component";
import Profile from "../Components/FeaturedComponents/Authentication/Profile";
import Register from "../Components/FeaturedComponents/Authentication/Register.component";
import ReactRoutes from "./ReactRoutes";



const ReactRouterDOM = () => {
    return (
        <>
            <BrowserRouter>
                <ReactRoutes />
            </BrowserRouter>
        </>
    )
}



export default ReactRouterDOM;