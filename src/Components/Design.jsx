import React, { forwardRef } from "react";
import airpodsWhiteSide from '../assets/airpods-white-side.png';

const Design = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="design section" id="design">
            <img
                src={airpodsWhiteSide}
                alt="White AirPods Max"
                data-aos="zoom-in"
                data-aos-duration="1200"
                data-aos-delay="200"
            />
            <div className="designText" data-aos="fade-left" data-aos-duration="1200">
                <h3>Premium, Iconic Design</h3>
                <p>
                    From cushion to canopy, AirPods Max are designed for an uncompromising fit with unequalled comfort
                    that creates the optimal acoustic seal for many different head shapes — fully immersing you in every
                    sound.
                </p>
            </div>
        </section>
    );
});

export default Design;
