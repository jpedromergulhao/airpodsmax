import React, { useEffect } from "react";
import "./BagListBottom.css";
import { Link } from "react-router-dom";

function BagLisBottom({ total, bagListRef, cartItems }) {

    useEffect(() => { // useEffect to return to the shopping page
        const shopping = document.querySelector('.shoppingCta');

        const handleClick = () => {
            if (bagListRef.current) {
                bagListRef.current.style.transform = "translateX(100%)";
            }
        };

        shopping.addEventListener("click", handleClick);

        return () => {
            shopping.removeEventListener("click", handleClick);
        };
    }, [bagListRef]);

    const handleCheckout = () => {
        //Save the items and the total price in the local storage
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        localStorage.setItem("totalPrice", total);
    }

    return (
        <div className="bagListBottom">
            <div className="total">
                <span>Grand Total:</span>
                <span>{total}</span> 
            </div>
            <div className="bagCtas">
                <button className="ctaBtn shoppingCta">Continue Shopping</button>
                <Link to={"/checkout"} className="ctaBtn buyBtn" onClick={handleCheckout}>Proceed to Checkout</Link>
            </div>
        </div>
    );
}

export default BagLisBottom;
