import * as THREE from 'three';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';
import { CubeReflectionMapping } from 'three';


function main() {w
  const canvas = document.querySelector('#c');
  const renderer = new THREE.WebGL1Renderer({ canvas });
  renderer.outputEncoding = THREE.sRGBEncoding;

  const fov = 45;
  const aspect = 2;
  const near = 0.1;
  const far = 100;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 20, 40);

  const controls = new OrbitControls(camera, canvas);
  controls.target.set(0, 5, 0);
  controls.update();

  const scene = new THREE.Scene();

  // DirectionalLight
  // function addLight(...pos) {
  //     const color = 0xFFFFFF;
  //     const intensity = 0.8;
  //     const light = new THREE.DirectionalLight(color, intensity);
  //     light.position.set(...pos);
  //     scene.add(light);
  //     scene.add(light.target);
  //   }
  //   addLight(5, 5, 2);
  //   addLight(-5, 5, 5);
  const color = 0xFFFFFF;
  const intensity = 1;
  const light = new THREE.AmbientLight(color, intensity);
  scene.add(light);

  const boxWidth = 4;
  const boxHeight = 1;
  const boxDepth = 4;
  const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);

  const loader = new THREE.TextureLoader();
  const textures = [
    new THREE.MeshBasicMaterial({ map: loader.load('img.png') }), //right side
        new THREE.MeshBasicMaterial({ map: loader.load('img.png')}), //left side
        new THREE.MeshBasicMaterial({ map: loader.load('img.png')}), //top side
        new THREE.MeshBasicMaterial({ map: loader.load('img.png')}), //bottom side
        new THREE.MeshBasicMaterial({ map: loader.load('img.png')}), //front side
        new THREE.MeshBasicMaterial({ map: loader.load('img.png')}), //back side
  ]

  function makeInstance(geometry, texture, x, z) {
    // const material = new THREE.MeshPhongMaterial({ color });
    
    const material = texture;
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    cube.position.x = x;
    cube.position.z = z;

    return cube;
  }

  const cubes = [
    makeInstance(geometry, textures, 0, 0),
    makeInstance(geometry, textures, 4, 0),
    makeInstance(geometry, textures, -4, 0),

    makeInstance(geometry, textures, 0, 4),
    makeInstance(geometry, textures, 4, 4),
    makeInstance(geometry, textures, -4, 4),

    makeInstance(geometry, textures, 0, -4),
    makeInstance(geometry, textures, 4, -4),
    makeInstance(geometry, textures, -4, -4),
  ];


  // Movement values
  const xSpeed = 1;
  const ySpeed = 1;

  // Movement
  //   document.addEventListener("keydown", onDocumentKeyDown, false);
  //   function onDocumentKeyDown(event){
  //       var keyCode = event.which;
  //       //up
  //       if(keyCode == 87){
  //           cube.position.y += ySpeed;
  //       }
  //       //down
  //       else if(keyCode == 83){
  //           cube.position.y -= ySpeed;
  //       }
  //       // left
  //       else if(keyCode == 65){
  //           cube.position.x -= xSpeed;
  //       }
  //       // right
  //       else if(keyCode == 68){
  //           cube.position.x += xSpeed;
  //       }
  //       // space
  //       else if(keyCode == 32){
  //           cube.position.x = 0.0;
  //           cube.position.y = 0.0;
  //       }
  //   }

  function resizeRendererToDisplaySize(renderer) {
    const canvas = renderer.domElement;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const needResize = canvas.width !== width || canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false);
    }
    return needResize;
  }

  function render(time) {
    time *= 0.001;  // convert time to seconds



    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    // cubes.forEach((cube) =>{
    //     cube.rotation.x = time;
    //     cube.rotation.y = time;
    // });

    renderer.render(scene, camera);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}


main();