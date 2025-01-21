import React, { forwardRef, useState } from "react";
import airpodsBlack from '../assets/airpods-black.png';
import airpodsWhite from '../assets/airpods-white.png';
import airpodsGreen from '../assets/airpods-green.png';
import airpodsBlue from '../assets/airpods-blue.png';
import airpodsPink from '../assets/airpods-pink.png';

const Buy = forwardRef((props, ref) => {
    const [selectedColor, setSelectedColor] = useState(null);
    const price = 549;

    const handleColorSelect = (color) => {
        setSelectedColor(color);
    };

    const handleAddToBag = () => {
        if (!selectedColor) {
            alert("Please select a color before adding to bag.");
            return;
        }
        const event = new CustomEvent('addToBag', {
            detail: {
                color: selectedColor,
                price: price,
            },
        });
        window.dispatchEvent(event);
    };

    return (
        <section ref={ref} className="buy section" id="buy">
            <div className="buyLeft" data-aos="fade-right" data-aos-duration="1200">
                <h3>Your AirPods Max Awaits</h3>
                <p>
                    AirPods Max deliver high-fidelity sound with deep bass, clear mids, and crisp highs. Featuring
                    Active Noise Cancellation, memory foam cushions for all-day comfort, and up to 20 hours of battery
                    life with quick charging.
                </p>
                <h4>${price.toFixed(2)}</h4>
            </div>
            <div className="buyRight" data-aos="fade-left" data-aos-duration="1200">
                <div className="buyImgs">
                    <img
                        className={`airpod-img black ${selectedColor === "black" ? "buy-img-active" : ""}`}
                        src={airpodsBlack}
                        alt="AirPods Max"
                    />
                    <img
                        className={`airpod-img white ${selectedColor === "white" ? "buy-img-active" : ""}`}
                        src={airpodsWhite}
                        alt="AirPods Max"
                    />
                    <img
                        className={`airpod-img green ${selectedColor === "green" ? "buy-img-active" : ""}`}
                        src={airpodsGreen}
                        alt="AirPods Max"
                    />
                    <img
                        className={`airpod-img blue ${selectedColor === "blue" ? "buy-img-active" : ""}`}
                        src={airpodsBlue}
                        alt="AirPods Max"
                    />
                    <img
                        className={`airpod-img pink ${selectedColor === "pink" ? "buy-img-active" : ""}`}
                        src={airpodsPink}
                        alt="AirPods Max"
                    />
                </div>
                <div className="btns">
                    <ul className="imgsBtn">
                        {["black", "white", "green", "blue", "pink"].map((color) => (
                            <li
                                key={color}
                                className={`btn ${color}Btn ${selectedColor === color ? "selected" : ""}`}
                                data-color={color}
                                onClick={() => handleColorSelect(color)}
                            ></li>
                        ))}
                    </ul>
                    <button className="addBtn" onClick={handleAddToBag}>
                        Add to Bag
                    </button>
                </div>
            </div>
        </section>
    );
});

export default Buy;
