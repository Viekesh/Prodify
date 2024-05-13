import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Landing from "../Components/Landing/Landing";




const ReactRouterDOM = () => {

    const router = createBrowserRouter([
        {
            path: "/",
            element: <Landing />
        },
    ]);

    return (
        <>
            <RouterProvider router={router} />
        </>
    )
}



export default ReactRouterDOM;