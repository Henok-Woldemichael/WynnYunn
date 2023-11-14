import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


//Scene
const scene = new THREE.Scene();



//Camera
const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 45, 30000);
camera.position.set(-180,1000,3000);
scene.add(camera);

//Renderer

const renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize( window.innerWidth, window.innerHeight );
const canvas = document.getElementById("c");
renderer.domElement.appendChild(canvas);
document.body.appendChild( renderer.domElement );

let controls = new OrbitControls(camera,renderer.domElement);

// $(document).on('mouseover click', 'img', function (event) {
//     if (event.type === "mouseover") {
//         // Mouse-Over code here
//     } else if (event.type === "click") {
//         // Click code here
//     }
// });

let multiArray = [];

let ft = new THREE.TextureLoader().load("Cmaps/10nz.png");
let bck = new THREE.TextureLoader().load("Cmaps/10pz.png");
let top = new THREE.TextureLoader().load("Cmaps/10py.png");
let btm = new THREE.TextureLoader().load("Cmaps/10ny.png");
let rt = new THREE.TextureLoader().load("Cmaps/10nx.png");
let lt =new THREE.TextureLoader().load("Cmaps/10px.png");


multiArray.push(new THREE.MeshBasicMaterial({map:ft}));
multiArray.push(new THREE.MeshBasicMaterial({map:bck}));
multiArray.push(new THREE.MeshBasicMaterial({map:top}));
multiArray.push(new THREE.MeshBasicMaterial({map:btm}));
multiArray.push(new THREE.MeshBasicMaterial({map:lt}));
multiArray.push(new THREE.MeshBasicMaterial({map:rt}));
for(let i = 0; i < 6; i++)
{
    multiArray[i].side = THREE.BackSide;
}

let skyBoxGEO = new THREE.BoxGeometry(10000,10000,10000);
let skyBox = new THREE.Mesh(skyBoxGEO,multiArray);

scene.add(skyBox);

 

const textureLoader = new THREE.TextureLoader();
const texturePlane = textureLoader.load('/./Images/01WynnYunn.png');
const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
const planeMaterial = new THREE.MeshBasicMaterial({ map: texturePlane });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;
// scene.add(plane);

scene.background = new THREE.Color(0X33BDFF);


//Shape1
const cubeCount = 20;
const cubeArr = [];

for (let i = 0; i < cubeCount; i++) {
const geometry = new THREE.BoxGeometry(100, 100, 50); // Adjust the size as needed
const material = new THREE.MeshBasicMaterial({ map: texturePlane }); // Yellow color

const cube = new THREE.Mesh(geometry, material);

// Set the positions of the cubes to spread them out
cube.position.x = Math.random() * 2000 - 1000; // Random X position between -1000 and 1000
cube.position.y = Math.random() * 2000 - 1000; // Random Y position between -1000 and 1000
cube.position.z = 400;  // Random Z position between -1000 and 1000
cubeArr.push(cube);
// scene.add(cube);
}
    
    
    
//Light
// const light = new THREE.DirectionalLight(0x404040);
// scene.add(light);
const ambientLight = new THREE.AmbientLight(0xffffff,100);
scene.add(ambientLight);
//Animation function
function animate() {
cubeArr.forEach((cube) => {
// Rotate each cube on the X-axis
// cube.rotation.x += 0.9; 
cube.rotation.z += 0.3; // Adjust the rotation speed as needed
cube.rotation.x += 0.04;
});

requestAnimationFrame(animate);

// cube.rotation.x += 0.008;


// cube2.rotation.z -= 0.8;
// cube2.rotation.y -= 0.01;

// cube3.rotation.x += 0.01;
// cube3.rotation.z += 0.01;
controls.update();
renderer.render(scene, camera);

};
animate();