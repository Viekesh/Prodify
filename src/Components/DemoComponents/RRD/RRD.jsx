import { BrowserRouter, Route, Routes } from "react-router-dom";
import NavDemo from "../NavigationDemo/NavDemo";
import LandingDemo from "../LandingDemo/LandingDemo";
import AboutDemo from "../AboutDemo/AboutDemo";




const RRD = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<NavDemo />}>
                        <Route path="/Landing" element={<LandingDemo />} />
                        <Route path="/About" element={<AboutDemo />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    )
}



export default RRD;