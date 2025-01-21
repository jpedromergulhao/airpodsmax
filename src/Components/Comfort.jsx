import React, { forwardRef } from "react";
import circSoundWave from '../assets/circular-sound-wave.png';
import manSmiling from '../assets/black-smiling-man-profile.png';

const Comfort = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="comfort section" id="comfort">
            <div className="comfortText" data-aos="fade-right" data-aos-duration="1200">
                <h3>Comfort with Easy Controls</h3>
                <p>
                    Designed for all-day comfort, AirPods Max features breathable knit mesh and memory foam ear cushions,
                    ensuring a snug fit that minimizes fatigue for extended listening sessions, whether at home or on the go.
                </p>
            </div>
            <div className="comfortImgs" data-aos="zoom-in" data-aos-duration="1200">
                <img src={circSoundWave} alt="Circular sound wave" className="circular-sound-wave" />
                <img src={manSmiling} alt="A man smiling" className="person" />
            </div>
        </section>
    );
});

export default Comfort;
