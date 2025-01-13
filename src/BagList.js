import React, { useEffect, useRef, useState, useMemo, useCallback } from "react";
import "./BagList.css";
import ProductsContainer from './Components/ProductsContainer/ProductsContainer';
import BagListTop from './Components/BagListTop/BagListTop';
import BagLisBottom from './Components/BagListBottom/BagListBottom';

function BagList() {
    const bagListRef = useRef(null);
    const [cartItems, setCartItems] = useState([]);

    const availableProducts = useMemo(() => [
        { id: 1, name: "AirPod Max Black", image1: "airpods-black.png", image2: "airpods_max_black_payment_page.png", price: 549, quantity: 0 },
        { id: 2, name: "AirPod Max White", image1: "airpods-white.png", image2: "airpods_max_white_payment_page.png", price: 549, quantity: 0 },
        { id: 3, name: "AirPod Max Green", image1: "airpods-green.png", image2: "airpods_max_green_payment_page.png", price: 549, quantity: 0 },
        { id: 4, name: "AirPod Max Blue", image1: "airpods-blue.png", image2: "airpods_max_blue_payment_page.png", price: 549, quantity: 0 },
        { id: 5, name: "AirPod Max Pink", image1: "airpods-pink.png", image2: "airpods_max_pink_payment_page.png", price: 549, quantity: 0 },
    ], []); // availableProducts is computed only during the initial render and memoized, 
    // meaning it will not be recalculated on subsequent renders, because there are no dependencies.

    const calculateTotalQuantity = useCallback(() => { // Quantity of items in the bag
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    }, [cartItems]);

    useEffect(() => { // useEffect to update the quantity of items displayed in the navigation bag icon
        const bagElement = document.querySelector('.bag');
        bagElement.addEventListener("click", () => {
            bagListRef.current.style.transform = "translateX(0%)";
        });

        const quantityElement = document.querySelector('.bag .quantity');
        quantityElement.textContent = calculateTotalQuantity();

        localStorage.setItem("totalQuantity", calculateTotalQuantity());

    }, [cartItems, calculateTotalQuantity]);

    useEffect(() => { // useEffect to manage products in the cart
        const handleAddToBag = (event) => {
            const { color } = event.detail;
            const productToAdd = availableProducts.find(item => item.name.includes(color.charAt(0).toUpperCase() + color.slice(1)));
            // Find the respective color of the item

            if (productToAdd) {
                const updatedCartItems = cartItems.map(item => {
                    if (item.id === productToAdd.id) { // If the product is already in the cart, simply increase its quantity
                        return { ...item, quantity: item.quantity + 1 };
                    }
                    return item;
                });

                if (!updatedCartItems.find(item => item.id === productToAdd.id)) { // If the product is not in the cart, add it to the cart
                    updatedCartItems.push({ ...productToAdd, quantity: 1 });
                }

                setCartItems(updatedCartItems);
            }
        };

        window.addEventListener('addToBag', handleAddToBag);
        // The custom addToBag event is triggered in the script.js file and listened for in this component.

        return () => {
            window.removeEventListener('addToBag', handleAddToBag);
        };

    }, [cartItems, availableProducts]);

    const calculateTotalPrice = () => {
        return cartItems.reduce((total, item) => {
            return total + item.price * item.quantity;
        }, 0);
    };

    const formatPrice = (price) => {
        return price.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
        });
    };

    const handleIncrement = (itemId) => {
        setCartItems(prevItems => prevItems.map(item =>
            item.id === itemId ? { ...item, quantity: item.quantity + 1 } : item
        ));
    };

    const handleDecrement = (itemId) => {
        setCartItems(prevItems => {
            return prevItems.map(item =>
                item.id === itemId
                    ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
                    : item
            ).filter(item => item.quantity > 0);
        });
    };

    const handleRemove = (itemId) => {
        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    };

    return (
        <div className="bagList" ref={bagListRef}>
            <BagListTop bagListRef={bagListRef} />
            <ProductsContainer
                cartItems={cartItems}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
                handleRemove={handleRemove}
            />
            <BagLisBottom
                total={formatPrice(calculateTotalPrice())}
                bagListRef={bagListRef}
                cartItems={cartItems}
            />
        </div>
    );
}

export default BagList;
