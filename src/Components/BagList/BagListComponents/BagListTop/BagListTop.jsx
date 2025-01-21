import React, { useEffect } from "react";
import "./BagListTop.css";

function BagListTop({ bagListRef }) {

    useEffect(() => { // useEffect to close the bagList
        const close = document.querySelector('.close');

        const handleClick = () => {
            if (bagListRef.current) {
                bagListRef.current.style.transform = "translateX(100%)";
            }
        };

        close.addEventListener("click", handleClick);

        return () => {
            close.removeEventListener("click", handleClick);
        };
    }, [bagListRef]);

    return (
        <div className="bagListTop">
            <h5>Order Summary</h5>
            <button className="close">&gt;</button>
        </div>
    );
}

export default BagListTop;