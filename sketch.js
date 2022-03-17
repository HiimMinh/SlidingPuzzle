import * as THREE from 'three';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';



class Tile {
    constructor(index, xTile, yTile, zTile, material, xPos, zPos) {
        this.index = index;
        this.xPos = xPos;
        this.zPos = zPos;

        this.xTile = xTile;
        this.zTile = zTile;
        this.yTile = yTile;
        this.material = material;

        // this.xOrigin = xOrigin;
        // this.zOrigin = zOrigin;
        // this.xCurrent = xCurrent;
        // this.zCurrent = zCurrent;
        // this.geometry = geometry;
        // this.texture = texture;
    }



    createMesh() {
        // const loader = new THREE.TextureLoader();

        let geometry = new THREE.BoxGeometry(this.xTile, this.yTile, this.zTile);
        // let mat = new THREE.MeshPhongMaterial({
        //     map: loader.load(this.material),
        // });

        let tile = new THREE.Mesh(geometry, this.material);


        this.setPosition(tile);
        return tile;
    }

    setPosition(tile) {
        tile.position.x = this.xPos;
        tile.position.z = this.zPos;
    }


}


function main() {

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
    controls.minDistance = 20;
    controls.maxDistance = 50;
    // controls.maxPolarAngle = Math.PI / 2;
    controls.update();

    const scene = new THREE.Scene();

    const color = 0xFFFFFF;
    const intensity = 0.5;
    const light = new THREE.AmbientLight(color, intensity);
    scene.add(light);

    // DirectionalLight
    function addLight(...pos) {
        const color = 0xFFFFFF;
        const intensity = 0.8;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(...pos);
        scene.add(light);
        scene.add(light.target);
    }
    addLight(5, 5, 2);
    // addLight(-5, 5, 5);


    //Set up
    let tiles = [];
    let boards = [];

    // Array stored original position of tiles
    let plane = [];
    //No of colums and rows
    let cols = 4;
    let rows = 4;


    // Create imaginary canvas with width and height
    let wCanvas = 20;
    let hCanvas = 20;

    let xTile = wCanvas / cols;
    let zTile = hCanvas / rows;
    let yTile = 1;
    // let colorTile = new THREE.Color(0x00FF22);
    // const loader = new THREE.TextureLoader();

    // const material = new THREE.MeshBasicMaterial({
    //     map: loader.load('img.png'),
    // });





    const loader = new THREE.TextureLoader();


    // const materials = [
    //     new THREE.MeshBasicMaterial({color:0x00FF22 }),
    //     new THREE.MeshBasicMaterial({color:0x00FF22 }),
    //     new THREE.MeshBasicMaterial({map: loader.load('img.png')}),
    //     new THREE.MeshBasicMaterial({map: loader.load('img.png')}),
    //     new THREE.MeshBasicMaterial({color:0x00FF22 }),
    //     new THREE.MeshBasicMaterial({color:0x00FF22 }),
    //   ];


    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {

            let x = i * xTile - 5;
            let z = j * zTile - 5;

            let index = i + j * cols;
            boards.push(index);

            let materials = [
                new THREE.MeshBasicMaterial({ color: 0x00FF22 }),
                new THREE.MeshBasicMaterial({ color: 0x00FF22 }),
                new THREE.MeshBasicMaterial({ map: loader.load('/img/' + index + '.jpg') }),
                new THREE.MeshBasicMaterial({ map: loader.load('/img/rotation/m_' + index + '.jpg') }),
                new THREE.MeshBasicMaterial({ color: 0x00FF22 }),
                new THREE.MeshBasicMaterial({ color: 0x00FF22 }),
            ];


            let tile = new Tile(index, xTile - 0.5, yTile, zTile - 0.5, materials, x, z);
            tiles.push(tile);

        }


    }

    // shuffle(tiles);
    shuffleArray(tiles);
    console.log(tiles)
    console.log(boards)


    // Bubble sort
    function swap(arr, xp, yp) {
        var temp = arr[xp];
        arr[xp] = arr[yp];
        arr[yp] = temp;
    }

    // An optimized version of Bubble Sort
    function bubbleSort(arr, n) {
        var i, j;
        for (i = 0; i < n - 1; i++) {
            for (j = 0; j < n - i - 1; j++) {
                if (arr[j] > arr[j + 1]) {
                    swap(arr, j, j + 1);
                }
            }

        }
    }

    // bubbleSort(boards, 16);
    // tiles.sort((a,b) => {
    //     return a.index - b.index;
    // })

    function swapxPos(i, j, arr) {
        // let temp = arr[i].xPos;
        // let temp1 = arr[j].xPos;
        // arr[i].xPos = temp1;
        // arr[j].xPos = temp;
        let temp1 = arr[i].xPos;
        let temp2 = arr[j].xPos;
        [temp1, temp2] = [temp2, temp1];
    }

    function swapzPos(i, j, arr) {
        let temp1 = arr[i].zPos;
        let temp2 = arr[j].zPos;
        [temp1, temp2] = [temp2, temp1];
    }
    function swapIndex(i, j, arr) {
        let temp1 = arr[i].index;
        let temp2 = arr[j].index;
        [temp1, temp2] = [temp2, temp1];
    }

    function swapMaterial(i, j, arr) {
        let temp1 = arr[i].material;
        let temp2 = arr[j].material;
        [temp1, temp2] = [temp2, temp1];
    }



    function shuffle(array) {
        let m = array.length, t, i;

        // While there remain elements to shuffle
        while (m) {
            i = Math.floor(Math.random() * m--)

            // And swap it with the current element
            // t = array[m];
            // array[m] = array[i];
            // array[i] = t;

            // swapxPos(m, i, array);
            // swapzPos(m, i, array);
            swapIndex(m, i, array);
            swapMaterial(m, i, array);
            swapxPos(m, i, array);
            swapzPos(m, i, array);
        }

        return array;
    }

    function shuffleArray(array) {
        let curId = array.length;
        // There remain elements to shuffle
        while (0 !== curId) {
            // Pick a remaining element
            let randId = Math.floor(Math.random() * curId);
            curId -= 1;
            // Swap it with the current element.
            //   let tmp = array[curId];
            //   array[curId] = array[randId];
            //   array[randId] = tmp;
            swapIndex(curId, randId, array);
            swapMaterial(curId, randId, array);
            swapxPos(curId, randId, array);
            swapzPos(curId, randId, array);
        }
        return array;
    }
    // const geometry = new THREE.BoxGeometry(xTile, yTile, zTile);
    // const material = new THREE.MeshBasicMaterial(colorTile);

    // const tile = new THREE.Mesh(geometry, material);

    // scene.add(tile);

    // let tile = new Tile(xTile, yTile, zTile, colorTile);

    // let cube = tile.createMesh()
    // scene.add(cube);


    tiles.forEach((tile) => {
        scene.add(tile.createMesh());
    });

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