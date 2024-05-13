import { Link, Outlet } from "react-router-dom";




const NavDemo = () => {
    return (
        <>
            <Link to="/Landing">landing</Link>
            <span></span>
            <Link to="/About">about</Link>
            <Outlet />
        </>
    )
}



export default NavDemo;