import React, { useState } from "react";
import bagIcon from "../assets/bag-icon.png";

function Nav() {
    const [menuOpen, setMenuOpen] = useState(false);

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <nav data-aos="fade-down" data-aos-duration="1200">
            <a href="#" className="logo" aria-label="Logo">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(0, 0, 0, 1)" }}
                >
                    <path d="M19.665 16.811a10.316 10.316 0 0 1-1.021 1.837c..." />
                </svg>
            </a>
            <div className="rightContent">
                <div className="bag">
                    <img src={bagIcon} alt="Bag icon" />
                    <span className="quantity">0</span>
                </div>
                <ul className={`menu ${menuOpen ? "open" : ""}`}>
                    <li><a href="#design">Design</a></li>
                    <li><a href="#sound">Sound</a></li>
                    <li><a href="#comfort">Comfort</a></li>
                    <li><a href="#battery">Battery</a></li>
                    <li><a href="#buy" className="navBtn">Buy</a></li>
                </ul>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    style={{ fill: "rgba(0, 0, 0, 1)", cursor: "pointer" }}
                    onClick={handleMenuToggle}
                >
                    <path d="M4 6h16v2H4zm0 5h16v2H4zm0 5h16v2H4z" />
                </svg>
            </div>
        </nav>
    );
}

export default Nav;
