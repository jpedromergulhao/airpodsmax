import React, { useState } from "react";
import "./ZipCodeArea.css";

function ZipCodeArea() {
    const [location, setLocation] = useState({});
    const [zipCode, setZipCode] = useState("");

    const fetchAddress = async (zipCode) => {
        //API for generate the location usind the zip code
        const API_KEY = process.env.REACT_APP_OPENCAGE_API_KEY;
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${zipCode}&key=${API_KEY}&language=en&limit=1`;

        try {
            const response = await fetch(url);
            const data = await response.json();

            if (data.results.length > 0) {
                const address = data.results[0].components;
                updateLocation(address);
                return true;
            } else {
                console.error("Address not find");
                return false;
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const updateLocation = (address) => {
        const newLocation = {
            postcode: address.postcode,
            city: address.city,
            state: address.state,
            country: address.country,
        };

        setLocation(newLocation);

        // Salve in localStorage after state update
        localStorage.setItem("location", JSON.stringify(location));
    };

    const handleSubmit = (event) => {
        event.preventDefault(); 
        if (zipCode.trim() !== "") {
            fetchAddress(zipCode);
            return true;
        } else {
            console.error("Please, provide a valid zip code");
            return false;
        }
    };

    return (
        <div className="zipCode">
            <div className="zipCodeContainer">
                <h1>Here are your delivery details.</h1>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="zipCode">Enter a ZIP code to see delivery options.</label>
                    <div className="zipCodeArea">
                        <div className="inputWrapper">
                            <input
                                className="zipCodeInput"
                                type="text"
                                id="zipCode"
                                name="zipCode"
                                placeholder="ZIP Code"
                                maxLength="8"
                                required
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                            />
                            <button type="submit" className="applyButton">
                                Apply
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ZipCodeArea;
