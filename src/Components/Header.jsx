import React, { forwardRef } from "react";
import soundWave from '../assets/Sound-Wave.png';

const Header = forwardRef((props, ref) => {
    return (
        <header ref={ref}>
            <div className="headerText section" id="header" data-aos="fade-right" data-aos-duration="1200">
                <h1>AirPods Max</h1>
                <p>
                    AirPods Max deliver stunningly detailed, high-fidelity audio for an unparalleled listening
                    experience. Each part of the custom-built driver works to produce sound with ultra-low distortion
                    across the audible range — so you’ll hear every note with a new sense of clarity.
                </p>
                <a href="#buy" className="headerBtn">Buy</a>
            </div>
            <img
                className="soundWave"
                src={soundWave}
                alt="Sound wave"
                data-aos="zoom-in"
                data-aos-duration="1200"
                data-aos-delay="200"
            />
        </header>
    );
});

export default Header;
