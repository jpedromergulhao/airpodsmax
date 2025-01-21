import React, { useState, useEffect, createContext } from "react";
import "./Checkout.css";
import Nav from "../../Components/Nav2/Nav2";
import ZipCode from "../../Components/ZipCode/ZipCode";

export const CheckoutContext = createContext();

function Checkout() {
    const [total, setTotal] = useState(() => {
        // Initial state will be the value that is in the local storage or it will be null
        return localStorage.getItem("total") || "";
    });

    const [cartItems, setCartItems] = useState(() => {
        return JSON.parse(localStorage.getItem("cartItems")) || [];
    });

    // Update both total and cart items from localStorage
    useEffect(() => {
        const grant = localStorage.getItem("total");
        if (grant !== null) {
            setTotal(grant);
        }

        const items = localStorage.getItem("cartItems");
        if (items !== null) {
            setCartItems(JSON.parse(items)); // Parse JSON if the items are stored as a stringified array
        }
    }, []);

    return (
        <div className="content">
            <Nav />
            <CheckoutContext.Provider value={{ total, cartItems }}>
                <div className="summary">
                    <h2>Grand Total</h2>
                    <span className="price">{total}</span>
                </div>
                <ZipCode />
            </CheckoutContext.Provider>
        </div>
    );
}

export default Checkout;
