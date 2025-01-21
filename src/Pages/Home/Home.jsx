import React, { useRef } from "react";
import Nav from "../../Components/Nav";
import BagList from "../../Components/BagList/BagList";
import Header from "../../Components/Header";
import Design from "../../Components/Design";
import Sound from "../../Components/Sound";
import Comfort from "../../Components/Comfort";
import Battery from "../../Components/Battery";
import Buy from "../../Components/Buy";
import Loader from "../../Components/Loader";
import Container3d from "../../Components/Container3d";

function Home() {

    const container3dRef = useRef(null);
    const headerRef = useRef(null);
    const designRef = useRef(null);
    const soundRef = useRef(null);
    const comfortRef = useRef(null);
    const batteryRef = useRef(null);
    const buyRef = useRef(null);

    return (
        <>
            <Loader containerRef={container3dRef} />
            <Nav />
            <BagList />
            <Header ref={headerRef} />
            <main>
                <Design ref={designRef} />
                <Sound ref={soundRef} />
                <Comfort ref={comfortRef} />
                <Battery ref={batteryRef} />
                <Buy ref={buyRef} />
            </main>
            <Container3d
                ref={container3dRef}
                headerRef={headerRef}
                designRef={designRef}
                soundRef={soundRef}
                comfortRef={comfortRef}
                batteryRef={batteryRef}
                buyRef={buyRef}
            />
        </>
    )
}

export default Home;