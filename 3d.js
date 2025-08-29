import * as THREE from './libraries/three/three.module.js';
import { GLTFLoader } from './libraries/three/GLTFLoader.js';

document.addEventListener('DOMContentLoaded', () => {

    // Get window dimensions  
    const width = window.innerWidth, height = window.innerHeight;

    // Create the WebGL renderer with transparency enabled  
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    document.getElementsByClassName("container3d")[0].appendChild(renderer.domElement);

    // Set up the perspective camera  
    const camera = new THREE.PerspectiveCamera(10, width / height, 0.1, 1000);
    camera.position.z = 13;

    // Create the scene  
    const scene = new THREE.Scene();

    // 3D model variables  
    let airPod;
    let is3DModelLoaded = false;

    // Get sections and their respective positions for interaction  
    const buySection = document.getElementById('buy');
    const buySectionPosition = buySection.offsetTop - window.innerHeight * 0.5;

    const batterySection = document.getElementById('battery');
    const batterySectionPosition = batterySection.offsetTop - window.innerHeight * 0.1;

    // Load 3D model  
    const loader = new GLTFLoader();

    // Add ambient light to the scene  
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);

    // Add directional light from the top  
    const topLight = new THREE.DirectionalLight(0xffffff, 1);
    topLight.position.set(500, 500, 500);
    scene.add(topLight);

    //Checks if the 3d model has already been loaded 
    const loadElement = document.querySelector(".loadingScreen");
    function checkModelLoaded() {
        if (is3DModelLoaded) {
            document.getElementById("container3d").style.display = "block";
            loadElement.style.display = "none";
        }
    }

    // Initial AirPod position and rotation for each section
    let arrPosition = [
        { id: "header", position: { x: 3.6, y: -0.4, z: -30 }, rotation: { x: 0, y: 3.8, z: 0 } },
        { id: "design", position: { x: -2.5, y: 0, z: -30 }, rotation: { x: 0, y: 3.2, z: 0 } },
        { id: "sound", position: { x: 3, y: 0, z: -40 }, rotation: { x: 0, y: 1.5, z: 0 } },
        { id: "comfort", position: { x: 6, y: 0.9, z: -55 }, rotation: { x: -0.02, y: 3.05, z: 0.2 } },
        { id: "battery", position: { x: -3, y: 0, z: -30 }, rotation: { x: 0, y: 2.5, z: 0 } },
    ];

    loader.load("./assets/airpods_max_clone.glb",
        function (gltf) {
            airPod = gltf.scene;
            scene.add(airPod);
            airPod.position.set(3.6, -0.4, -30);
            airPod.rotation.set(0, 3.8, 0);
            airPod.visible = true;
            is3DModelLoaded = true;
            checkModelLoaded();
            adjustModelPosition();
        },
        function (xhr) {
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        function (error) {
            console.error('An error happened', error);
        }
    );

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    //3d model responsiveness
    function adjustModelPosition() {

        // 3d model inital position when the user enters in the website
        if (width >= 1150) {
            airPod.position.set(3.6, -0.4, -30);
        } else if (width >= 950) {
            airPod.position.set(3.5, -0.3, -35);
        } else if (width >= 570) {
            airPod.position.set(10, -0.3, -40);
        } else if (width >= 320) {
            airPod.position.set(10, -0.3, -60);
        }

        // Responsivness of the 3d model when the user goes to the other sections
        arrPosition.forEach(obj => {
            switch (obj.id) {
                case "header":
                    obj.position = width >= 1150 ? { x: 3.6, y: -0.4, z: -30 } :
                        width >= 950 ? { x: 3.5, y: -0.3, z: -35 } :
                            width >= 570 ? { x: 0, y: -0.3, z: -40 } :
                                width >= 320 ? { x: 0, y: -0.3, z: -60 } :
                                    obj.position;

                    break;

                case "design":
                    obj.position = width >= 1150 ? { x: -2.5, y: 0, z: -30 } :
                        width >= 1024 ? { x: -2.5, y: 0, z: -35 } :
                            width >= 950 ? { x: -2.5, y: 0, z: -40 } :
                                width >= 920 ? { x: -2, y: 0, z: -35 } :
                                    width >= 768 ? { x: -1.5, y: 0, z: -35 } :
                                        width >= 570 ? { x: -1.2, y: 0, z: -35 } :
                                            width >= 320 ? { x: 10, y: 0, z: -35 } : obj.position;

                    break;

                case "sound":
                    obj.position = width >= 1150 ? { x: 3, y: 0, z: -40 } :
                        width >= 1024 ? { x: 2.5, y: 0, z: -40 } :
                            width >= 920 ? { x: 2, y: 0, z: -50 } :
                                width >= 768 ? { x: 2, y: 0, z: -60 } :
                                    width >= 700 ? { x: 1.5, y: 0, z: -45 } :
                                        width >= 570 ? { x: 1.5, y: 0, z: -45 } :
                                            width >= 320 ? { x: 1.5, y: 0, z: -70 } : obj.position;

                    break;

                case "comfort":
                    obj.position = width >= 1150 ? { x: 6, y: 0.9, z: -55 } :
                        width >= 950 ? { x: 7.7, y: 1.6, z: -75 } :
                            width >= 920 ? { x: 6.9, y: 1.6, z: -75 } :
                                width >= 768 ? { x: 6.8, y: 1.6, z: -85 } :
                                    width >= 700 ? { x: 5.5, y: 1.6, z: -85 } :
                                        width >= 375 ? { x: 0.5, y: 1.6, z: -105 } :
                                            width >= 320 ? { x: 1, y: 1.6, z: -125 } : obj.position;

                    obj.rotation.y = width <= 570 ? 3.12 : 3.05;

                    break;

                case "battery":
                    obj.position = width >= 1150 ? { x: -3, y: 0, z: -30 } :
                        width >= 1024 ? { x: -2.5, y: 0, z: -35 } :
                            width >= 920 ? { x: -3, y: 0, z: -40 } :
                                width >= 768 ? { x: -2.3, y: 0, z: -40 } :
                                    width >= 440 ? { x: -1, y: 0, z: -40 } :
                                        width >= 320 ? { x: -1, y: 0, z: -60 } :
                                           obj.position;

                    break;

                default:
                    console.error("An error happened", obj.id);
            }
        });
    }

    const moveModel = () => {
        const sections = document.getElementsByClassName("section");
        let currentSection;
    
        // Get the current section
        Array.from(sections).forEach((section) => {
            const rect = section.getBoundingClientRect();
            if (rect.top <= window.innerHeight / 3 && rect.bottom >= 0) {
                currentSection = section.id;
            }
        });
    
        let positionActive = arrPosition.find(obj => obj.id === currentSection);
        if (!positionActive || !airPod) return;
    
        let newCoordinates = positionActive;
    
        const headerImg = document.querySelector(".soundWave");
    
        // Verify if the element is visible
        const isElementVisible = (element) => {
            if (!element) return false;
            const rect = element.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight;
        };
    
        // Determine the visibility of the element
        const headerImgVisible = isElementVisible(headerImg);
    
        let x, y, z;
    
        if (newCoordinates.id === "header") {
            if (width >= 570 && width < 950) {
                x = headerImgVisible ? 0 : 10;
                y = -0.3;
                z = -40;
            } else if (width <= 570) {
                x = headerImgVisible ? 0 : 10;
                y = -0.3;
                z = -60;
            } else {
                ({ x, y, z } = newCoordinates.position);
            }
        } else {
            ({ x, y, z } = newCoordinates.position);
        }
    
        gsap.to(airPod.position, { x, y, z, duration: 2, ease: "power1.out" });
    
        gsap.to(airPod.rotation, {
            x: newCoordinates.rotation ? newCoordinates.rotation.x : 0,
            y: newCoordinates.rotation ? newCoordinates.rotation.y : 0,
            z: newCoordinates.rotation ? newCoordinates.rotation.z : 0,
            duration: 2,
            ease: "power1.out"
        });
    };

    // Events
    window.addEventListener('resize', () => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
        camera.updateProjectionMatrix();
        adjustModelPosition();
    });

    window.addEventListener('resize', adjustModelPosition);

    window.addEventListener("scroll", () => {
        const scrollPosition = window.scrollY;
        if (scrollPosition >= buySectionPosition && airPod) {
            gsap.to(airPod, { duration: 0.1, opacity: 0, onComplete: () => airPod.visible = false });
        }
        if (scrollPosition < batterySectionPosition && airPod && !airPod.visible) {
            airPod.visible = true;
            gsap.to(airPod, { duration: 1, opacity: 1 });
        }
        if (airPod) {
            moveModel();
        }
    });

});