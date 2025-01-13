import React, { useState, useEffect, createContext } from "react";
import "./Checkout.css";
import Nav from "./Components2/Nav/Nav";
import ZipCode from "./Components2/ZipCode/ZipCode";
import Footer from "./Components2/Footer/Footer";

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

    const CheckoutContext = createContext();

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
            <Footer/>
        </div>
    );
}

export default Checkout;
