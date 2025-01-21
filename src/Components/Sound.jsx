import React, { forwardRef } from "react";
import noiseCancel from '../assets/contrast_2_group.png';
import spatialAudio from '../assets/spatialaudio.png';
import smartCase from '../assets/airpodsmax_case.png';

const Sound = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="sound section" id="sound">
            <div className="soundText" data-aos="fade-right" data-aos-duration="1200">
                <h3>Immersive Sound Experience</h3>
                <p>
                    High-fidelity sound. Exhilarating audio with deep bass, expansive mids, and crisp highs.
                </p>
                <p>
                    Pro-level Active Noise Cancellation. Removes unwanted noise so you can immerse yourself in the music.
                </p>
            </div>
            <div className="soundImgs" data-aos="fade-left" data-aos-duration="1200">
                <div className="soundImgsContent">
                    <img src={noiseCancel} alt="Noise Cancellation with Transparency mode" className="soundIcons" />
                    <span>Pro‑level Active Noise Cancellation with Transparency Mode</span>
                </div>
                <div className="soundImgsContent">
                    <img src={spatialAudio} alt="Spatial Audio" className="soundIcons" />
                    <span>Personalized Spatial Audio with Dynamic Head Tracking</span>
                </div>
                <div className="soundImgsContent">
                    <img src={smartCase} alt="Smart Case" className="smartCaseIcon" />
                    <span>Smart Case</span>
                </div>
            </div>
        </section>
    );
});

export default Sound;
