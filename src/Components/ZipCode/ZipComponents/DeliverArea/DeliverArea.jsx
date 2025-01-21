import React, { useEffect, useState, useContext } from "react";
import "./DeliverArea.css";
import { CheckoutContext } from "../../../../Pages/Checkout/Checkout";

function DeliverArea() {

    const [city, setCity] = useState({})
    const locationString = localStorage.getItem("location");
    const cartItems = useContext(CheckoutContext);

    useEffect(() => {
        if (locationString) {
            const address = JSON.parse(locationString);
            setCity(address.city);
        }
    }, [])

    return (
        <div className="deliverArea">
            <h2 className="stock">In stock and ready to ship.</h2>
                {city === "" ? (
                    <span>Put a valid zip code</span>
                ) : (
                    <span>Delivers to: {city}</span>
                )}
            <ul className="productsContainer">
                {cartItems.length === 0 ? ( // Check if the cart is empty
                    <li className="emptyCart">There is no products</li>
                ) : (
                    cartItems.map((item) => (
                        <li className="product">
                            <img
                                className="img"
                                src={`../assets/${item.image2}`}
                                alt={item.name}
                            />
                            <div className="productInfo">
                                <h6 className="productName">{item.name}</h6>
                                <span>Quantity: {item.quantity}</span>
                            </div>
                        </li>
                    )
                    )
                )
                }
            </ul>
            <div className="deliverMethod">
                <h3>Select your delivery method:</h3>
                <div className="deliveryInfo">
                    <div className="method" tabIndex="0">
                        <div className="date">
                            <h3>Delivers Mon, Dec 2</h3>
                            <h6>Express Delivery</h6>
                        </div>
                        <span>FREE</span>
                    </div>
                    <div className="info">
                        <span>Keep this in mind about your selection:</span>
                        <ul>
                            <li>The carrier may require a signature upon delivery.</li>
                            <li>
                                In-Transit Options: Once your order has been shipped, you can use your tracking link to redirect
                                your shipment to a pickup point, hold it at a secure location, or fill out a signature waiver or
                                shipment release.
                            </li>
                        </ul>
                        <a
                            href="https://www.apple.com/shop/help/shipping_delivery"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Apple Shipping Policy
                        </a>
                    </div>
                </div>
                <button className="deliveryBtn">Continue to Shipping Address</button>
            </div>
        </div>
    );
}

export default DeliverArea;
