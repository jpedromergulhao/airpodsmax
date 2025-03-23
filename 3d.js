import * as THREE from 'https://cdn.skypack.dev/three@0.129.0/build/three.module.js';
import { GLTFLoader } from 'https://cdn.skypack.dev/three@0.129.0/examples/jsm/loaders/GLTFLoader.js';
import { gsap } from 'https://cdn.skypack.dev/gsap';

const width = window.innerWidth, height = window.innerHeight;
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(width, height);
document.getElementsByClassName("container3d")[0].appendChild(renderer.domElement);
const camera = new THREE.PerspectiveCamera(10, width / height, 0.1, 1000);
camera.position.z = 13;
const scene = new THREE.Scene();
let airPod;
let is3DModelLoaded = false;
const buySection = document.getElementById('buy');
const buySectionPosition = buySection.offsetTop - window.innerHeight * 0.5;
const batterySection = document.getElementById('battery');
const batterySectionPosition = batterySection.offsetTop - window.innerHeight * 0.1;

//Checks if the 3d model has already been loaded 
const loadElement = document.querySelector(".loadingScreen");
function checkModelLoaded() {
    if (is3DModelLoaded) {
        document.getElementById("container3d").style.display = "block";
        loadElement.style.display = "none";
    }
}

//AirPod position and rotation for each section
let arrPosition = [
    { id: "header", position: { x: 3.6, y: -0.4, z: -30 }, rotation: { x: 0, y: 3.8, z: 0 } },
    { id: "design", position: { x: -2.5, y: 0, z: -30 }, rotation: { x: 0, y: 3.2, z: 0 } },
    { id: "sound", position: { x: 3, y: 0, z: -40 }, rotation: { x: 0, y: 1.5, z: 0 } },
    { id: "comfort", position: { x: 6.5, y: 0.9, z: -55 }, rotation: { x: -0.02, y: 3.05, z: 0.2 } },
    { id: "battery", position: { x: -3, y: 0, z: -30 }, rotation: { x: 0, y: 2.5, z: 0 } },
];

const loader = new GLTFLoader();
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

const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
scene.add(ambientLight);
const topLight = new THREE.DirectionalLight(0xffffff, 1);
topLight.position.set(500, 500, 500);
scene.add(topLight);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;
    renderer.setSize(newWidth, newHeight);
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    adjustModelPosition();
});

//3d model responsiveness
function adjustModelPosition() {
    const headerImg = document.querySelector(".soundWave");
    const soundImgs = document.querySelector(".soundImgs");
    const batteryImgs = document.querySelector(".batteryImgs");
    const confortImgs = document.querySelector(".comfortImgs");

    const headerImgVisible = headerImg.getBoundingClientRect().bottom > 0;
    const soundImgVisible = soundImgs.getBoundingClientRect().bottom > 0;
    const confortImgsVisible = confortImgs.getBoundingClientRect().bottom > 0;
    const batteryImgsVisible = batteryImgs.getBoundingClientRect().bottom > 0;

    if (width <= 1300 && width > 1150) {
        airPod.position.set(4.5, -0.3, -30);
    } else if (width <= 1150 && width > 1024) {
        airPod.position.set(4, -0.3, -30);
    } else if (width <= 1024 && width > 950) {
        airPod.position.set(3.5, -0.3, -30);
    } else if (width <= 950 && width > 920) {
        airPod.position.set(3.5, -0.3, -35);
    } else if (width <= 920 && width > 768) {
        if (headerImgVisible) airPod.position.set(0, -0.3, -35);
    } else if (width <= 768 && width > 570) {
        if (headerImgVisible) airPod.position.set(0, -0.3, -40);
    } else if (width <= 570 && width > 440) {
        if (headerImgVisible) airPod.position.set(0, -0.3, -45);
    } else if (width <= 440 && width > 375) {
        if (headerImgVisible) airPod.position.set(0, -0.3, -80);
    }

    arrPosition.forEach(obj => {
        if (obj.id === "header") {
            if (width <= 1300 && width > 1150) {
                obj.position.x = 4.5;
                obj.position.y = -0.3;
                obj.position.z = -30;
            } else if (width <= 1150 && width > 1024) {
                obj.position.x = 4;
                obj.position.y = -0.3;
                obj.position.z = -30;
            } else if (width <= 1024 && width > 950) {
                obj.position.x = 3.5;
                obj.position.y = -0.3;
                obj.position.z = -30;
            } else if (width <= 950 && width > 920) {
                obj.position.x = 3.5;
                obj.position.y = -0.3;
                obj.position.z = -35;
            } else if (width <= 920 && width > 768) { //ajustar o condicional
                if (headerImgVisible) {
                    obj.position.x = 0;
                    obj.position.y = -0.3;
                    obj.position.z = -35;
                } 
            } else if (width <= 768 && width > 570) { //ajustar o condicional
                if (headerImgVisible) {
                    obj.position.x = 0;
                    obj.position.y = -0.3;
                    obj.position.z = -40;
                } 
            } else if (width <= 570 && width > 440) { //ajustar o condicional
                if (headerImgVisible) {
                    obj.position.x = 0;
                    obj.position.y = -0.3;
                    obj.position.z = -45;
                } 
            } else if (width <= 440) { //ajustar o condicional
                if (headerImgVisible) {
                    obj.position.x = 0;
                    obj.position.y = -0.3;
                    obj.position.z = -80;
                } 
            } 
        } else if (obj.id === "design") {
            if (width <= 1300 && width > 1150) {
                obj.position.x = -2.5;
                obj.position.y = 0;
                obj.position.z = -25;
            } else if (width <= 1150 && width > 1024) {
                obj.position.x = -3;
                obj.position.y = -0;
                obj.position.z = -32;
            } else if (width <= 1024 && width > 950) {
                obj.position.x = -2.5;
                obj.position.y = 0;
                obj.position.z = -32;
            } else if (width <= 950 && width > 920) {
                obj.position.x = -2.5; 
                obj.position.y = 0;
                obj.position.z = -32;
            } else if (width <= 920 && width > 768) {
                obj.position.x = -2;
                obj.position.y = 0;
                obj.position.z = -32;
            } else if (width <= 768 && width > 570) {
                obj.position.x = -1.5;
                obj.position.y = 0;
                obj.position.z = -32;
            } else if (width <= 570 && width > 440) {
                obj.position.x = -1;
                obj.position.y = 0;
                obj.position.z = -32;
            } else if (width <= 440) { 
                obj.position.x = -5;
                obj.position.y = 0;
                obj.position.z = -32;
            } 
        } else if (obj.id === "sound") {
            if (width <= 1300 && width > 1150) {
                obj.position.x = 3;
                obj.position.y = 0;
                obj.position.z = -30;
            } else if (width <= 1150 && width > 1024) {
                obj.position.x = 3;
                obj.position.y = 0;
                obj.position.z = -35;
            } else if (width <= 1024 && width > 950) {
                obj.position.x = 2.5;
                obj.position.y = 0;
                obj.position.z = -35;
            } else if (width <= 950 && width > 920) {
                obj.position.x = 2.5;
                obj.position.y = 0;
                obj.position.z = -40;
            } else if (width <= 920 && width > 768) {
                obj.position.x = 2;
                obj.position.y = 0;
                obj.position.z = -40;
            } else if (width <= 768 && width > 700) {
                obj.position.x = 1.5;
                obj.position.y = 0;
                obj.position.z = -45;
            } else if (width <= 700 && width > 570) { //ajustar o condicional
                if (soundImgVisible) {
                    obj.position.x = 1.5;
                    obj.position.y = 0;
                    obj.position.z = -30;
                }
            } else if (width <= 570 && width > 440) { //ajustar o condicional
                if (soundImgVisible) {
                    obj.position.x = 1.5;
                    obj.position.y = 0;
                    obj.position.z = -35;
                } 
            } else if (width <= 440) { //ajustar o condicional
                if (soundImgVisible) {
                    obj.position.x = 1.5;
                    obj.position.y = 0;
                    obj.position.z = -80;
                } 
            } 
        } else if (obj.id === "comfort") {
            if (width <= 1300 && width > 1150) {
                obj.position.x = 6.6;
                obj.position.y = 1.6;
                obj.position.z = -50;
            } else if (width <= 1150 && width > 1024) {
                obj.position.x = 7.2;
                obj.position.y = 1.7;
                obj.position.z = -60;
            } else if (width <= 1024 && width > 950) {
                obj.position.x = 7.2;
                obj.position.y = 1.7;
                obj.position.z = -60;
            } else if (width <= 950 && width > 920) {
                obj.position.x = 7.3;
                obj.position.y = 1.7;
                obj.position.z = -60;
            } else if (width <= 920 && width > 768) {
                obj.position.x = 6.5;
                obj.position.y = 1.7;
                obj.position.z = -60;
            } else if (width <= 768 && width > 700) {
                obj.position.x = 6.7;
                obj.position.y = 1.7;
                obj.position.z = -75;
            } else if (width <= 700 && width > 570) {
                obj.position.x = 5.7;
                obj.position.y = 1.7;
                obj.position.z = -75;
            } else if(width <= 570 && width > 375){ //ajustar o condicional
                if (confortImgsVisible) {
                    obj.position.x = 0.7;
                    obj.position.y = 1.7;
                    obj.position.z = -100;
                    obj.rotation.y = 3.12;
                } 
            } else if(width <= 375 && width > 320){ //ajustar o condicional
                if (confortImgsVisible) {
                    obj.position.x = 0.7;
                    obj.position.y = 1.7;
                    obj.position.z = -100;
                    obj.rotation.y = 3.12;
                }
            } else if (width <= 320) { //ajustar o condicional
                if (confortImgsVisible) {
                    obj.position.x = 1;
                    obj.position.y = 1.7;
                    obj.position.z = -130;
                    obj.rotation.y = 3.12;
                } 
            } 
        } else if (obj.id === "battery") {
            if (width <= 1300 && width > 1150) {
                obj.position.x = -3.2;
                obj.position.y = 0;
                obj.position.z = -25;
            } else if (width <= 1150 && width > 1024) {
                obj.position.x = -3.2;
                obj.position.y = 0;
                obj.position.z = -30;
            } else if (width <= 1024 && width > 950) {
                obj.position.x = -2.7;
                obj.position.y = 0;
                obj.position.z = -30;
            } else if (width <= 950 && width > 920) {
                obj.position.x = -2.7;
                obj.position.y = 0;
                obj.position.z = -30;
            } else if (width <= 920 && width > 768) {
                obj.position.x = -2.5;
                obj.position.y = 0;
                obj.position.z = -30;
            } else if (width <= 768 && width > 700) {
                obj.position.x = -2;
                obj.position.y = 0;
                obj.position.z = -35;
            } else if (width <= 700 && width > 440) { //ajustar o condicional
                if (batteryImgsVisible) {
                    obj.position.x = -2;
                    obj.position.y = 0;
                    obj.position.z = -35;
                } 
            }  else if (width <= 440 && width > 375) { //ajustar o condicional
                if (batteryImgsVisible) {
                    obj.position.x = -1;
                    obj.position.y = 0;
                    obj.position.z = -70;
                } 
            } else if (width <= 375 && width > 320) { //ajustar o condicional
                if (batteryImgsVisible) {
                    obj.position.x = -1;
                    obj.position.y = 0;
                    obj.position.z = -55;
                } 
            } else if (width <= 320) { //ajustar o condicional
                if (batteryImgsVisible) {
                    obj.position.x = -1;
                    obj.position.y = 0;
                    obj.position.z = -60;
                } 
            } 
        } else {
            console.error("An error happened", error);
        }
    })
}

window.addEventListener('resize', adjustModelPosition);
const moveModel = () => {
    const sections = document.getElementsByClassName("section");
    let currentSection;
    Array.from(sections).forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= window.innerHeight / 3 && rect.bottom >= 0) {
            currentSection = section.id;
        }
    });
    let positionActive = arrPosition.findIndex(obj => obj.id === currentSection);
    if (positionActive !== -1 && airPod) {
        let newCoordinates = arrPosition[positionActive];
        gsap.to(airPod.position, {
            x: newCoordinates.position.x,
            y: newCoordinates.position.y,
            z: newCoordinates.position.z,
            duration: 2,
            ease: "power1.out"
        });
        gsap.to(airPod.rotation, {
            x: newCoordinates.rotation.x,
            y: newCoordinates.rotation.y,
            z: newCoordinates.rotation.z,
            duration: 2,
            ease: "power1.out"
        });
    }
};

//Hide the AirPod 3D model for the buy section
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