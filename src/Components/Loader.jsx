import React, { useEffect, useRef } from "react";

function Loader({ container3dRef }) {

    const loadingScreenRef = useRef(null);

    useEffect(() => { // useEffect to handle the loading screen when the 3D model is fully rendered
        const handleLoad = () => {
            if (container3dRef?.current && loadingScreenRef?.current) {
                const displayStyle = getComputedStyle(container3dRef.current).display;
                if (displayStyle === "block") {
                    loadingScreenRef.current.style.display = "none";
                }
            }
        }

        window.addEventListener("load", handleLoad)

        return () => {
            window.removeEventListener("load", handleLoad);
        }
    }, [container3dRef])

    return (
        <div ref={loadingScreenRef} className="loadingScreen">
            <div className="spinner"></div>
        </div>
    )
};

export default Loader;