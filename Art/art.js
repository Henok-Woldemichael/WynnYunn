    import * as THREE from 'three';

			//Scene
    const scene = new THREE.Scene();

    //Camera
    const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 10000);
    camera.position.set(0,0,800);

    scene.add(camera);

    
    //Renderer
    
    const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
const canvas = document.getElementById("c");
renderer.domElement.appendChild(canvas);
document.body.appendChild( renderer.domElement );

    
   


    
    // $(document).on('mouseover click', 'img', function (event) {
    //     if (event.type === "mouseover") {
    //         // Mouse-Over code here
    //     } else if (event.type === "click") {
    //         // Click code 
    //     }
    // });
    const textureLoader = new THREE.TextureLoader();
    const texturePlane = textureLoader.load('/./Images/04WynnYunn.png');
    const planeGeometry = new THREE.PlaneGeometry(1000, 1000);
    const planeMaterial = new THREE.MeshBasicMaterial({ map: texturePlane });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.rotation.x = -Math.PI / 2;
    scene.add(plane);

    scene.background = texturePlane;
    

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
        scene.add(cube);
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

        renderer.render(scene, camera);
    };
    animate();