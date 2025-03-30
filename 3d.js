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

    const positions = {
        header: [
            { maxWidth: 1300, minWidth: 1150, position: [4.5, -0.3, -30] },
            { maxWidth: 1150, minWidth: 1024, position: [4, -0.3, -30] },
            { maxWidth: 1024, minWidth: 950, position: [3.5, -0.3, -30] },
            { maxWidth: 950, minWidth: 920, position: [3.5, -0.3, -35] },
            { maxWidth: 920, minWidth: 768, position: [0, -0.3, -35], condition: headerImgVisible },
            { maxWidth: 768, minWidth: 570, position: [0, -0.3, -40], condition: headerImgVisible },
            { maxWidth: 570, minWidth: 440, position: [0, -0.3, -45], condition: headerImgVisible },
            { maxWidth: 440, position: [0, -0.3, -80], condition: headerImgVisible }
        ],
        design: [
            { maxWidth: 1300, minWidth: 1150, position: [-2.5, 0, -25] },
            { maxWidth: 1150, minWidth: 1024, position: [-3, 0, -32] },
            { maxWidth: 1024, minWidth: 950, position: [-2.5, 0, -32] },
            { maxWidth: 950, minWidth: 920, position: [-2.5, 0, -32] },
            { maxWidth: 920, minWidth: 768, position: [-2, 0, -32] },
            { maxWidth: 768, minWidth: 570, position: [-1.5, 0, -32] },
            { maxWidth: 570, minWidth: 440, position: [-1, 0, -32] },
            { maxWidth: 440, position: [-5, 0, -32] }
        ],
        sound: [
            { maxWidth: 1300, minWidth: 1150, position: [3, 0, -30] },
            { maxWidth: 1150, minWidth: 1024, position: [3, 0, -35] },
            { maxWidth: 1024, minWidth: 950, position: [2.5, 0, -35] },
            { maxWidth: 950, minWidth: 920, position: [2.5, 0, -40] },
            { maxWidth: 920, minWidth: 768, position: [2, 0, -40] },
            { maxWidth: 768, minWidth: 700, position: [1.5, 0, -45] },
            { maxWidth: 700, minWidth: 570, position: [1.5, 0, -30], condition: soundImgVisible },
            { maxWidth: 570, minWidth: 440, position: [1.5, 0, -35], condition: soundImgVisible },
            { maxWidth: 440, position: [1.5, 0, -80], condition: soundImgVisible }
        ],
        comfort: [
            { maxWidth: 1300, minWidth: 1150, position: [6.6, 1.6, -50] },
            { maxWidth: 1150, minWidth: 1024, position: [7.2, 1.7, -60] },
            { maxWidth: 1024, minWidth: 950, position: [7.2, 1.7, -60] },
            { maxWidth: 950, minWidth: 920, position: [7.3, 1.7, -60] },
            { maxWidth: 920, minWidth: 768, position: [6.5, 1.7, -60] },
            { maxWidth: 768, minWidth: 700, position: [6.7, 1.7, -75] },
            { maxWidth: 700, minWidth: 570, position: [5.7, 1.7, -75] },
            { maxWidth: 570, minWidth: 375, position: [0.7, 1.7, -100], condition: confortImgsVisible, rotation: [3.12] },
            { maxWidth: 375, minWidth: 320, position: [0.7, 1.7, -100], condition: confortImgsVisible, rotation: [3.12] },
            { maxWidth: 320, position: [1, 1.7, -130], condition: confortImgsVisible, rotation: [3.12] }
        ],
        battery: [
            { maxWidth: 1300, minWidth: 1150, position: [-3.2, 0, -25] },
            { maxWidth: 1150, minWidth: 1024, position: [-3.2, 0, -30] },
            { maxWidth: 1024, minWidth: 950, position: [-2.7, 0, -30] },
            { maxWidth: 950, minWidth: 920, position: [-2.7, 0, -30] },
            { maxWidth: 920, minWidth: 768, position: [-2.5, 0, -30] },
            { maxWidth: 768, minWidth: 700, position: [-2, 0, -35] },
            { maxWidth: 700, minWidth: 440, position: [-2, 0, -35], condition: batteryImgsVisible },
            { maxWidth: 440, minWidth: 375, position: [-1, 0, -70], condition: batteryImgsVisible },
            { maxWidth: 375, minWidth: 320, position: [-1, 0, -55], condition: batteryImgsVisible },
            { maxWidth: 320, position: [-1, 0, -60], condition: batteryImgsVisible }
        ]
    };

    const adjustPosition = (obj, category) => {
        positions[category].forEach(range => {
            if (width <= range.maxWidth && width > (range.minWidth || -Infinity)) {
                if (!range.condition || range.condition) {
                    obj.position.set(...range.position);
                    if (range.rotation) obj.rotation.y = range.rotation[0];
                }
            }
        });
    };

    arrPosition.forEach(obj => {
        switch (obj.id) {
            case "header":
                adjustPosition(obj, "header");
                break;
            case "design":
                adjustPosition(obj, "design");
                break;
            case "sound":
                adjustPosition(obj, "sound");
                break;
            case "comfort":
                adjustPosition(obj, "comfort");
                break;
            case "battery":
                adjustPosition(obj, "battery");
                break;
            default:
                console.error("An error happened", error);
        }
    });
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