import React, { forwardRef } from "react";

const Battery = forwardRef((props, ref) => {
    return (
        <section ref={ref} className="battery section" id="battery">
            <div className="batteryImgs" data-aos="fade-right" data-aos-duration="1200">
                <div className="batteryDiv">
                    <svg className="batterySvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "rgba(0, 0, 0, 1)", transform: "msFilter" }}>
                        <path d="M4 18h14c1.103 0 2-.897 2-2v-2h2v-4h-2V8c0-1.103-.897-2-2-2H4c-1.103 0-2 .897-2 2v8c0 1.103.897 2 2 2zM4 8h14l.002 8H4V8z" />
                    </svg>
                    <p className="batteryImgsP">20hr</p>
                </div>
                <div className="batteryDiv">
                    <svg className="batterySvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "rgba(0, 0, 0, 1)", transform: "msFilter" }}>
                        <path d="M20 10V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2h2v-4h-2zM9 17l2-3.89L7 12l6-5-1 3.89L16 12l-7 5z" />
                    </svg>
                    <p className="batteryImgsP">Quick charge</p>
                </div>
                <div className="batteryDiv">
                    <svg className="batterySvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "rgba(0, 0, 0, 1)", transform: "msFilter" }}>
                        <path d="M16 10h1v2h-4V6h2l-3-4-3 4h2v8H7v-2.277c.596-.347 1-.985 1-1.723a2 2 0 0 0-4 0c0 .738.404 1.376 1 1.723V14c0 1.103.897 2 2 2h4v2.277A1.99 1.99 0 0 0 10 20a2 2 0 0 0 4 0c0-.738-.404-1.376-1-1.723V14h4c1.103 0 2-.897 2-2v-2h1V6h-4v4z" />
                    </svg>
                    <p className="batteryImgsP">USB-C</p>
                </div>
                <div className="batteryDiv">
                    <svg className="batterySvg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" style={{ fill: "rgba(0, 0, 0, 1)", transform: "msFilter" }}>
                        <path d="M12 16c2.206 0 4-1.794 4-4V6c0-2.217-1.785-4.021-3.979-4.021a.933.933 0 0 0-.209.025A4.006 4.006 0 0 0 8 6v6c0 2.206 1.794 4 4 4z" />
                        <path d="M11 19.931V22h2v-2.069c3.939-.495 7-3.858 7-7.931h-2c0 3.309-2.691 6-6 6s-6-2.691-6-6H4c0 4.072 3.061 7.436 7 7.931z" />
                    </svg>
                    <p className="batteryImgsP">Hey Siri</p>
                </div>
            </div>
            <div className="batteryText" data-aos="fade-left" data-aos-duration="1200">
                <h3>Seamless Connection & Long Battery</h3>
                <p>
                    Up to 20 hours of listening, movie watching, or talk time — with pro-level Active Noise Cancellation
                    and Spatial Audio enabled. A quick 5‑minute charge delivers around 1.5 hours of listening.
                </p>
            </div>
        </section>
    );
});

export default Battery;
