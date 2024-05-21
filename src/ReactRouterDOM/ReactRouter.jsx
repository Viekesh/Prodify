import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "../Components/Landing/Landing";
import LandingDemo from "../Components/DemoComponents/LandingDemo/LandingDemo";
import TopNav from "../Components/FeaturedComponents/Navigation/TopNav.component";
import Authenticate from "../Components/FeaturedComponents/Authentication/Authenticate.component";
import Profile from "../Components/FeaturedComponents/Authentication/Profile";
import Register from "../Components/FeaturedComponents/Authentication/Register.component";




const ReactRouterDOM = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <TopNav />,
            children: [
                {
                    path: "/Authenticate",
                    element: <Authenticate />,
                }
            ]
        },
        {
            path: "/Profile",
            element: <Profile />,
        },
        {
            path: "/Register",
            element: <Register />
        },
        {
            path: "/LandingDemo",
            element: <LandingDemo />
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}



export default ReactRouterDOM;