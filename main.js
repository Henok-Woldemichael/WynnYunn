import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { CSS2DRenderer } from 'three/addons/renderers/CSS2DRenderer.js';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';



const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.001, 1000);
camera.position.set(0,70,265);


const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);


var controls = new OrbitControls(camera, renderer.domElement);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();

function onPointerMove( event ) {

	// calculate pointer position in normalized device coordinates
	// (-1 to +1) for both components

	pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

}

function click( event ) {

  raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects(scene.children);

    if (intersects.length > 0) 
    {
      window.location.href = "art/art.html"

    }
}
function render() {

	// update the picking ray with the camera and pointer position
	raycaster.setFromCamera( pointer, camera );

	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects(scene.children);

	for (let i = 0; i < intersects.length; i++) 
  {
    const object = intersects[i].object;

    // Check if the intersected object is a cube (customize this condition based on your cube's characteristics)
    if (isCube(object)) {
        object.material.color.set(0xff0000);
        console.log("click");

	}
}



}
function isCube(object) {
  // Customize this function to define the criteria for identifying a cube mesh
  // For example, you can check for specific geometry, dimensions, or other properties.
  // Return true if it's a cube, false otherwise.

  // Example criteria: Check if the object has a BoxGeometry with specific dimensions
  if (object.geometry instanceof THREE.BoxGeometry) {
      const dimensions = object.scale;
      // Check if the object's dimensions are approximately equal, indicating it's a cube
      return (
          Math.abs(dimensions.x - dimensions.y) < 0.01 &&
          Math.abs(dimensions.x - dimensions.z) < 0.01
      );
  }

  return false; // Return false if it doesn't meet the cube criteria
}
window.addEventListener( 'pointermove', onPointerMove );
window.addEventListener('click',click);


// Load textures
const textureLoader = new THREE.TextureLoader();
const textureCube2 = textureLoader.load('Images/03WynnYunn.png');
const textureCube1 = textureLoader.load('Images/04WynnYunn.png');

const texturePlane = textureLoader.load('Images/06WynnYunn.png');
const backgroundTexture = textureLoader.load('Images/02WynnYunn.png');
let customFont; // Global variable to hold the font data
const fontLoader = new FontLoader();

const ambientLight = new THREE.AmbientLight( 0xffffff, 10 );
scene.add( ambientLight );


// Create cubes with textures
const cubeGeometry = new THREE.BoxGeometry(10,10,5);
const cubeMaterial1 = new THREE.MeshBasicMaterial({ map: textureCube1 });
const cubeMaterial2 = new THREE.MeshBasicMaterial({ map: textureCube2 });
const cube1 = new THREE.Mesh(cubeGeometry, cubeMaterial1);
const cube2 = new THREE.Mesh(cubeGeometry, cubeMaterial2);
camera.add(cube1);
camera.add(cube2);
cube1.position. set(10,65,220);
cube2.position.set(-10,65,220);

// Create a plane with a texture
const planeGeometry = new THREE.PlaneGeometry(160, 400);
const planeMaterial = new THREE.MeshBasicMaterial({ map: texturePlane });
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.rotation.x = -Math.PI / 2;

// Add cubes and plane to the scene
scene.add(cube1);
scene.add(cube2);
scene.add(plane);

// Set up the background
scene.background = backgroundTexture;

fontLoader.load
(
    'cake.json',
    function(font)
    {
       
        const textGeometry = new TextGeometry("\'BIO\'", {
            font: font,
            size: 5,
            height: 2,
           
          });
        
             
          const sunsetPinkColor = new THREE.Color("rgb(255, 130, 196)"); // Define your sunset pink color
          const textMaterial = new THREE.MeshPhongMaterial({ color: sunsetPinkColor }); // Set the material color

        
          const textMesh = new THREE.Mesh
          (
            textGeometry,textMaterial
          );
        
          textMesh.position.set(6,49,220)      
           scene.add(textMesh);

       
    });

    fontLoader.load
(
    'cake.json',
    function(font)
    {
       
        const textGeometry = new TextGeometry("\'ART\'", {
            font: font,
            size: 5,
            height: 2,
           
          })
        
          
          const sunsetGreen = new THREE.Color("rgb(220,109,32)"); // Define your sunset pink color
          const textMaterial = new THREE.MeshBasicMaterial({ map: textureCube2 }); // Set the material color

        
          const textMesh = new THREE.Mesh
          (
            textGeometry,textMaterial
          );
        
          textMesh.position.set(-19,49,220)      
           scene.add(textMesh);

       
    });


// Animation
const animate = () => {
    requestAnimationFrame(animate);

   
    cube1.rotation.x += 0.0025;

    cube2.rotation.x += 0.0025;
    render();
    
    controls.update();

    renderer.render(scene, camera);

 
};


animate();

