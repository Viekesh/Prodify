import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import "./Navigation.css";
import { NavigationLinks } from "../../../ServiceDB/NavigationData";



const TopNav = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleNavElements = () => {
        setIsMenuOpen(!isMenuOpen);
    }

    const handleOverlayClick = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    }

    return (
        <>
            <section className="navigation_top">
                <div className="navigation_elements y_axis_center">
                    <div className="logo_menu y_axis_center">
                        <div className="menu_button x_y_axis_center">
                            <button
                                onClick={handleNavElements}
                            >
                                menu
                            </button>
                        </div>

                        <div className="logo y_axis_center">
                            <img src="https://www.instacart.com/assets/beetstrap/brand/2022/instacart-logo-color-6678cb82d531f8910d5ba270a11a7e9b56fc261371bda42ea7a5abeff3492e1c.svg" alt="" />
                        </div>
                    </div>
                </div>
            </section>

            <nav className={`navigation_links x_y_axis_center ${isMenuOpen === true ? "navigation_overlay" : ""}`}>
                <div className="nav_link">
                    <div className="links_conatainer">
                        {
                            NavigationLinks.map((data) => {
                                return (
                                    <>
                                        <div className="nav_link_options" key={data.id}>
                                            <NavLink to={data.navlink} key={data.id} onClick={handleOverlayClick}>{data.name}</NavLink>
                                        </div>
                                    </>
                                )
                            })
                        }
                    </div>
                </div>
                <div className="box_overlay" onClick={handleOverlayClick}></div>
            </nav>

            <Outlet />
        </>
    )
}



export default TopNav;