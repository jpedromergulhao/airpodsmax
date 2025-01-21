import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; 
import AOS from "aos";
import "aos/dist/aos.css";
import Home from "./Pages/Home/Home";
import Footer from "./Components/Footer/Footer";
import Checkout from "./Pages/Checkout/Checkout";

function App() {
    useEffect(() => { // useEffect to start the AOS
        AOS.init();
    }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/checkout" element={<Checkout />} />
                <Route path="*" element={<div>Page not found</div>} />
            </Routes>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
