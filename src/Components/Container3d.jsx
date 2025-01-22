import React, { forwardRef, useCallback, useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { gsap } from 'gsap';
import airPodsGlb from '../assets/airpods_max_clone.glb';

// Function to combine both the external and internal refs, ensuring that both have access to the same DOM elements
const mergeRefs = (...refs) => {
    return (element) => {
        refs.forEach((ref) => {
            if (ref && typeof ref === "function") {
                ref(element);
            } else if (ref && typeof ref === "object") {
                ref.current = element;
            }
        });
    };
};

const debounce = (func, delay) => {
    let timer;
    return (...args) => {
        clearTimeout(timer); // Cancel the previous timer
        timer = setTimeout(() => func(...args), delay); // Define a new timer
    };
};


const Container3d = forwardRef(({ headerRef, designRef, soundRef, comfortRef, batteryRef, buyRef }, ref) => {

    const container3dRef = useRef(null);
    const [airPod, setAirPod] = useState(null);
    const [is3DModelLoaded, setIs3dModelLoaded] = useState(false);
    const rendererRef = useRef(new THREE.WebGLRenderer({ alpha: true }));
    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [screenHeight, setScreenHeight] = useState(window.innerHeight);
    const cameraRef = useRef(null);
    const sceneRef = useRef(new THREE.Scene());
    const loadRef = useRef(new GLTFLoader());
    const [sectionPositions, setSectionPositions] = useState([]);

    const arrPosition = Object.freeze([ //AirPod position and rotation for each section
        { id: "header", position: { x: 3.6, y: -0.4, z: -30 }, rotation: { x: 0, y: 3.8, z: 0 } },
        { id: "design", position: { x: -2.5, y: 0, z: -30 }, rotation: { x: 0, y: 3.2, z: 0 } },
        { id: "sound", position: { x: 3, y: 0, z: -40 }, rotation: { x: 0, y: 1.5, z: 0 } },
        { id: "comfort", position: { x: 6.5, y: 0.9, z: -55 }, rotation: { x: -0.02, y: 3.05, z: 0.2 } },
        { id: "battery", position: { x: -3, y: 0, z: -30 }, rotation: { x: 0, y: 2.5, z: 0 } },
    ]);

    const [dynamicArrPosition, setDynamicArrPosition] = useState(...arrPosition);

    // The light of the 3d mockup
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(500, 500, 500);
    sceneRef.current.add(ambientLight);
    sceneRef.current.add(topLight);

    const updateSectionPositions = () => {
        const positions = [
            designRef.current.getBoundingClientRect(),
            soundRef.current.getBoundingClientRect(),
            comfortRef.current.getBoundingClientRect(),
            batteryRef.current.getBoundingClientRect(),
            buyRef.current.getBoundingClientRect()
        ];
        setSectionPositions(positions);
    };

    const handleResize = debounce(() => {
        setScreenWidth(window.innerWidth);
        setScreenHeight(window.innerHeight);
        updateSectionPositions();
    }, 300);

    const moveModel = useCallback(
        (screenHeight, arrPosition, airPod, sections) => {
            let currentSection = null;

            // finde the current section
            for (const section of sections) {
                const rect = section.position;
                if (rect.top <= screenHeight / 3 && rect.bottom >= 0) {
                    currentSection = section.id;
                    break;
                }
            }

            const positionActive = arrPosition.findIndex(obj => obj.id === currentSection);
            if (positionActive !== -1 && airPod) {
                const newCoordinates = arrPosition[positionActive];
                gsap.to(airPod.position, {
                    x: newCoordinates.position.x,
                    y: newCoordinates.position.y,
                    z: newCoordinates.position.z,
                    duration: 2,
                    ease: "power1.out",
                });
                gsap.to(airPod.rotation, {
                    x: newCoordinates.rotation.x,
                    y: newCoordinates.rotation.y,
                    z: newCoordinates.rotation.z,
                    duration: 2,
                    ease: "power1.out",
                });
            }
        },
        []
    );

    const handleScroll = useCallback(
        (screenHeight, arrPosition, airPod, sections, buySectionPosition, batterySectionPosition) => {
            if (!airPod) return;
            const scrollPosition = window.scrollY;

            //Hide the AirPod 3D model for the buy section
            if (scrollPosition >= buySectionPosition && airPod) {
                if (airPod.visible) {
                    gsap.to(airPod, {
                        duration: 0.1,
                        opacity: 0,
                        onComplete: () => { airPod.visible = false; }
                    });
                }
            }

            //Return to show the AirPod 3d model in the battery section
            if (scrollPosition < batterySectionPosition && airPod && !airPod.visible) {
                if (!airPod.visible) {
                    gsap.to(airPod, {
                        duration: 0.1,
                        opacity: 1,
                        onComplete: () => { airPod.visible = true; }
                    });
                }
            }

            //Mode the AirPod based in the section
            moveModel(screenHeight, arrPosition, airPod, sections);

        }, [moveModel]);

    useEffect(() => {
        rendererRef.current.setSize(screenWidth, screenHeight);
        if (rendererRef.current.domElement && !container3dRef.current.contains(rendererRef.current.domElement)) {
            container3dRef.current.appendChild(rendererRef.current.domElement);
        }
        cameraRef.current = new THREE.PerspectiveCamera(10, screenWidth / screenHeight, 0.1, 1000);
        cameraRef.current.position.z = 13;
        cameraRef.current.updateProjectionMatrix();
        const batterySectionPosition = batteryRef.current.offsetTop - screenHeight * 0.5;
        const buySectionPosition = buyRef.current.offsetTop - screenHeight * 0.1;
        const sections = [
            {
                id: designRef.id,
                position: sectionPositions[0]
            },
            {
                id: soundRef.id,
                position: sectionPositions[1]
            },
            {
                id: comfortRef.id,
                position: sectionPositions[2]
            },
            {
                id: batteryRef.id,
                position: sectionPositions[3]
            },
            {
                id: buyRef.id,
                position: sectionPositions[4]
            },
        ];

        // Checks if the 3d model has already been loaded
        const checkModelLoaded = () => {
            if (is3DModelLoaded && container3dRef.current.style.display === "none") {
                container3dRef.current.style.display = "block";
            }
        }

        const animate = () => {
            requestAnimationFrame(animate);
            if (!is3DModelLoaded) {
                return;
            }
            rendererRef.current.render(sceneRef.current, cameraRef.current);
        }
        animate();

        const adjustModelPosition = () => {
            if (!is3DModelLoaded || !airPod) return;

            const elements = {
                headerImg: headerRef.current.querySelector(".soundWave"),
                soundImgs: soundRef.current.querySelector(".soundImgs"),
                batteryImgs: batteryRef.current.querySelector(".batteryImgs"),
                comfortImgs: comfortRef.current.querySelector(".comfortImgs"),
            };

            const visibility = {
                headerImgVisible: isVisible(elements.headerImg),
                soundImgVisible: isVisible(elements.soundImgs),
                batteryImgVisible: isVisible(elements.batteryImgs),
                comfortImgVisible: isVisible(elements.comfortImgs),
            };

            setAirPodPosition(visibility);
            updateArrPositions(visibility, screenWidth, airPod);
        }

        const isVisible = (element) => element?.getBoundingClientRect()?.bottom > 0;

        const setAirPodPosition = (visibility) => {
            const positions = [
                { min: 1150, max: 1300, x: 4.5, y: -0.3, z: -30 },
                { min: 1024, max: 1150, x: 4, y: -0.3, z: -30 },
                { min: 950, max: 1024, x: 3.5, y: -0.3, z: -30 },
                { min: 920, max: 950, x: 3.5, y: -0.3, z: -35 },
                { min: 768, max: 920, x: 0, y: -0.3, z: -35, condition: "headerImgVisible" },
                { min: 570, max: 768, x: 0, y: -0.3, z: -40, condition: "headerImgVisible" },
                { min: 440, max: 570, x: 0, y: -0.3, z: -45, condition: "headerImgVisible" },
                { min: 375, max: 440, x: 0, y: -0.3, z: -80, condition: "headerImgVisible" },
            ];

            applyPosition(positions, airPod, screenWidth, visibility);
        }

        const updateArrPositions = (visibility, screenWidth, airPod) => {
            // Create a new matrix with updated positions
            const updatedPositions = dynamicArrPosition.map((section) => {
                const positionsMap = {
                    header: [
                        { min: 1150, max: 1300, x: 4.5, y: -0.3, z: -30 },
                        { min: 1024, max: 1150, x: 4, y: -0.3, z: -30 },
                        { min: 950, max: 1024, x: 3.5, y: -0.3, z: -30 },
                        { min: 920, max: 950, x: 3.5, y: -0.3, z: -35 },
                        { min: 768, max: 920, x: 0, y: -0.3, z: -35, condition: "headerImgVisible" },
                        { min: 570, max: 768, x: 0, y: -0.3, z: -40, condition: "headerImgVisible" },
                        { min: 440, max: 570, x: 0, y: -0.3, z: -45, condition: "headerImgVisible" },
                        { min: 375, max: 440, x: 0, y: -0.3, z: -80, condition: "headerImgVisible" },
                    ],
                    design: [
                        { min: 1150, max: 1300, x: -2.5, y: 0, z: -25 },
                        { min: 1024, max: 1150, x: -3, y: 0, z: -32 },
                        { min: 950, max: 1024, x: -2.5, y: 0, z: -32 },
                        { min: 768, max: 920, x: -2, y: 0, z: -32 },
                        { min: 570, max: 768, x: -1.5, y: 0, z: -32 },
                        { min: 440, max: 570, x: -1, y: 0, z: -32 },
                        { max: 440, x: -5, y: 0, z: -32 },
                    ],
                    sound: [
                        { min: 1150, max: 1300, x: 3, y: 0, z: -30 },
                        { min: 1024, max: 1150, x: 3, y: 0, z: -35 },
                        { min: 950, max: 1024, x: 2.5, y: 0, z: -35 },
                        { min: 920, max: 950, x: 2.5, y: 0, z: -40 },
                        { min: 700, max: 768, x: 1.5, y: 0, z: -45 },
                        { min: 570, max: 700, x: 1.5, y: 0, z: -30, condition: "soundImgVisible" },
                        { min: 440, max: 570, x: 1.5, y: 0, z: -35, condition: "soundImgVisible" },
                        { max: 440, x: 1.5, y: 0, z: -80, condition: "soundImgVisible" },
                    ],
                    comfort: [
                        { min: 1150, max: 1300, x: 6.6, y: 1.6, z: -50 },
                        { min: 1024, max: 1150, x: 7.2, y: 1.7, z: -60 },
                        { min: 950, max: 1024, x: 7.2, y: 1.7, z: -60 },
                        { min: 920, max: 950, x: 7.3, y: 1.7, z: -60 },
                        { min: 768, max: 920, x: 6.5, y: 1.7, z: -60 },
                        { min: 700, max: 768, x: 6.7, y: 1.7, z: -75 },
                        { min: 570, max: 700, x: 5.7, y: 1.7, z: -75 },
                        { min: 375, max: 570, x: 0.7, y: 1.7, z: -100, rotationY: 3.12, condition: "comfortImgsVisible" },
                        { min: 320, max: 375, x: 0.7, y: 1.7, z: -100, rotationY: 3.12, condition: "comfortImgsVisible" },
                        { max: 320, x: 1, y: 1.7, z: -130, rotationY: 3.12, condition: "comfortImgsVisible" },
                    ],
                    battery: [
                        { min: 1150, max: 1300, x: -3.2, y: 0, z: -25 },
                        { min: 1024, max: 1150, x: -3.2, y: 0, z: -30 },
                        { min: 950, max: 1024, x: -2.7, y: 0, z: -30 },
                        { min: 920, max: 950, x: -2.7, y: 0, z: -30 },
                        { min: 768, max: 920, x: -2.5, y: 0, z: -30 },
                        { min: 700, max: 768, x: -2, y: 0, z: -35 },
                        { min: 440, max: 700, x: -2, y: 0, z: -35, condition: "batteryImgsVisible" },
                        { min: 375, max: 440, x: -1, y: 0, z: -70, condition: "batteryImgsVisible" },
                        { min: 320, max: 375, x: -1, y: 0, z: -55, condition: "batteryImgsVisible" },
                        { max: 320, x: -1, y: 0, z: -60, condition: "batteryImgsVisible" },
                    ],
                };
        
                const positionUpdates = positionsMap[section.id] || [];
                let newPosition = { ...section.position }; 
        
                // Apply the section rule
                positionUpdates.some((rule) => {
                    if (
                        screenWidth <= rule.max &&
                        screenWidth > rule.min &&
                        (!rule.condition || visibility[rule.condition])
                    ) {
                        newPosition = { x: rule.x, y: rule.y, z: rule.z };
                        return true; 
                    }
                    return false;
                });
        
                return {
                    ...section,
                    position: newPosition,
                };
            });
        
            setDynamicArrPosition(updatedPositions);
        
            updatedPositions.forEach((section) => {
                applyPosition([section.position], airPod, screenWidth, visibility);
            });
        };

        const applyPosition = (positions, airPod, screenWidth, visibility) => {
            positions.some(pos => {
                if (screenWidth <= pos.max && screenWidth > pos.min && (!pos.condition || visibility[pos.condition])) {
                    airPod.position.set(pos.x, pos.y, pos.z);
        
                    if (pos.rotationY !== undefined) {
                        airPod.rotation.y = pos.rotationY;
                    }

                    return true;
                }
                return false;
            });
        };

        if (loadRef.current && !airPod) {
            loadRef.current.load(
                airPodsGlb,
                (gltf) => {
                    const model = gltf.scene;
    
                    if (!model.position.equals(new THREE.Vector3(3.6, -0.4, -30))) {
                        model.position.set(3.6, -0.4, -30);
                    }
                    if (!model.rotation.equals(new THREE.Euler(0, 3.8, 0))) {
                        model.rotation.set(0, 3.8, 0);
                    }
                    if (model.visible !== true) {
                        model.visible = true;
                    }
    
                    sceneRef.current.add(model);
    
                    if (!airPod) {
                        setAirPod(model);
                    }

                    if (airPod && !is3DModelLoaded) {
                        setIs3dModelLoaded(true);
                        checkModelLoaded();
                        adjustModelPosition();
                    }
                }
            );
        } else if (airPod && is3DModelLoaded) {
            checkModelLoaded();
            adjustModelPosition();
        }

        const onScroll = () => {
            handleScroll(screenHeight, arrPosition, airPod, sections, buySectionPosition, batterySectionPosition);
        }

        window.addEventListener('resize', handleResize);
        window.addEventListener("scroll", onScroll);
        rendererRef.current.domElement.addEventListener('webglcontextlost', (event) => {
            event.preventDefault();
            console.warn('WebGL context lost');
        });
        rendererRef.current.domElement.addEventListener('webglcontextrestored', () => {
            console.log('WebGL context restored');
        })

        return () => {
            // Remove event listeners
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', onScroll);
        
            // Clean up the AirPod model
            if (airPod) {
                sceneRef.current.remove(airPod);
                airPod.traverse((child) => {
                    if (child.isMesh) {
                        child.geometry.dispose();
                        if (Array.isArray(child.material)) {
                            // Clean up multi-materials
                            child.material.forEach((material) => {
                                if (material.isMaterial) material.dispose();
                            });
                        } else if (child.material?.isMaterial) {
                            child.material.dispose();
                        }
                    }
                });
            }
        
            // Dispose of the renderer
            if (rendererRef.current) {
                rendererRef.current.dispose();
            }
        
            // Clear the scene
            if (sceneRef.current) {
                while (sceneRef.current.children.length > 0) {
                    const child = sceneRef.current.children[0];
                    sceneRef.current.remove(child);
                    if (child.isMesh) {
                        child.geometry.dispose();
                        if (Array.isArray(child.material)) {
                            child.material.forEach((material) => {
                                if (material.isMaterial) material.dispose();
                            });
                        } else if (child.material?.isMaterial) {
                            child.material.dispose();
                        }
                    }
                }
            }
        };
        

    }, [
        is3DModelLoaded,
        airPod,
        rendererRef,
        screenWidth,
        screenHeight,
        cameraRef,
        sceneRef,
        loadRef,
        arrPosition,
        dynamicArrPosition,
        handleScroll,
        headerRef,
        designRef,
        soundRef,
        comfortRef,
        batteryRef,
        buyRef
    ])

    return (
        <div
            ref={mergeRefs(ref, container3dRef)}
            id="container3d"
            className="container3d"
            style={{ display: "none" }}>
        </div>
    )
})

export default Container3d;