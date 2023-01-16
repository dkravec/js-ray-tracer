const { v4: uuidv4 } = require('uuid');
// started jan 12 2023
// aimed to start with 3d objects

async function v20(data, ws) {
    var wsenabled = false
    if (ws) wsenabled = true;
    returnData = {
        timeTook: 13,
        sizeX: 400,
        sizeY: 400,
        image: [ ],
        imageNew: {}
    };
    const startTime = checktime();

    const scene = new Scene({resolutionX: 400, resolutionY: 400});
    const camera = new Camera({ x:40, y: 4, z: 6, xLength: 400, yLength: 400 });

    const cube = await scene.newObject({type: "cube", options: {x: 20, y: 30, z: 6, xLength: 30, yLength: 30}});
    const cubePixels = await cube.renderCube();
     
    for (const pixel of cubePixels) {
        await camera.isInScene(pixel);
    }

    returnData.image = camera.scnArr;
    console.log(camera.scnArr.length)

    const finishTime = checktime();
  
    returnData.timeTook = `${finishTime - startTime}`;
    if (wsenabled) ws.send(JSON.stringify({
        sendType: "final",
        imageData: returnData
    }));

    return returnData;
};

async function renderCube({ x, y, z, size, colour}) {
    const arr = [];
    const r = size / 2;
    
    // top
    const top = await renderCubeLine({r, x, y, z});
    // console.log(top)
    arr.concat(top);
    return arr;        
};

async function renderCubeLine({r: r, x, y, z}) {
    const lineArr = []
    for (let i = 0; i< r; i++) {
        lineArr.push({
            x: i,
            y: y,
            colour: "black"
        });
    }
    return lineArr;
};

// make a function that will make a 3d cube
/*
function cube(x, y, z, size, colour) {
    x, y, z is the center of cube
    size is how far out / 2
    | - - - - - - - - - - - - - - - - | 
    |             (size/2)            |
    |               ^                 |
    |               |                 |
    | (size/2)<- (center) -> (size/2) |
    |             (size/2)            |
    |               ^                 |
    |               |                 |
    | - - - - - - - - - - - - - - - - | 

};
*/

function checktime() {
    var d = new Date();
    const timeMS = d.getTime();

    return timeMS;
};

class Scene {
    constructor({resolutionX, resolutionY}) {
        if (resolutionX) this.resolutionX = resolutionX
        else this.resolutionX = 100;

        if (resolutionY) this.resolutionY = resolutionY
        else this.resolutionY = 100;

        this.objects = [];
    };

    async addObject(object) {
        this.objects.push(object);
    };

    async renderScene() {
        // render all objects
    };

    async newObject({type, options}) {
        if (type == "cube") {
            const cube = new Cube(options);
            this.objects.push(cube);
            return cube;
        };
    };
}

class Camera {
    constructor({
        // position (center)
        x, y, z,

        // size
        xLength,
        yLength,
        // rotation
        // xRot, yRot, zRot
    }) {
        // super({resolutionX: xLength, resolutionY: yLength});
        if (x) this.x = x
        else this.x = 3;

        if (y) this.y = y
        else this.y = 3;

        if (z) this.z = z
        else this.z = 3;

        if (xLength) this.xLength = xLength
        else this.xLength = 100;

        if (yLength) this.yLength = yLength
        else this.yLength = 100;

        this.topY = y + yLength / 2;
        this.bottomY = y - yLength / 2;
        this.leftX = x - xLength / 2;
        this.rightX = x + xLength / 2;
        this.scnArr = []
    };

    printInfo() {
        console.log(this);
    };

    async isInScene({ x, y, z, colour}) {
        if (x < this.leftX) return false;
        else if (x > this.rightX) return false;
        else if (y > this.topY) return false;
        else if (y < this.bottomY) return false;
        else {
            this.scnArr.push({ x, y, z, colour})
            return true
        };
    };
};

class Cube {
    constructor({
        // position
        x, y, z,
        // size
        xLength,
        yLength,
        zLength
    }) {
        this.id = uuidv4();
        if (x) this.x = x
        else this.x = 3;

        if (y) this.y = y
        else this.y = 3;

        if (z) this.z = z
        else this.z = 3;

        if (xLength) this.xLength = xLength;
        else this.xLength = 100;

        if (yLength) this.yLength = yLength;
        else this.yLength = 100;

        if (zLength) this.zLength = zLength;
        else this.zLength = 100;
        console.log("11")
        console.log(this)
    };

    setXLength(xLength) {
        this.xLength = xLength;
    };

    async renderCube() {
        // this.pixels = [];
        // const pixels = {};
        const arr= [];
        const radiusX = this.xLength / 2;
        const radiusY = this.yLength / 2;
        const radiusZ = this.zLength / 2;

        var colour = "rgb(12, 123, 145)"; //[12, 123, 145];
        // light blue

        // front and back (x and y)
        for (let ix = (this.x-radiusX); ix < (this.x+radiusX); ix++) {
            for (let iy = (this.y-radiusY); iy < (this.y+radiusY); iy++) {
                const zF = this.z-radiusZ;
                const zB = this.z+radiusZ;
                // front
                arr.push({
                    x: ix, y: iy, z: zF,
                    colour
                });
                // back
                arr.push({
                    x: ix, y: iy, z: zB,
                    colour
                });
            };
        };

        var colour = "rgb(42, 123, 24)"; //[12, 123, 145];
        // green

        // top bottom (x and z)
        for (let ix = (this.x-radiusX); ix < (this.x+radiusX)+1; ix++) {
            for (let iz = (this.y-radiusZ); iz < (this.z+radiusZ); iz++) {
                const yB = this.y-radiusY;
                const yT = this.y+radiusY;
                //  bottom
                arr.push({
                    x: ix, y: yB, z: iz,
                    colour
                });

                // top
                arr.push({
                    x: ix, y: yT, z: iz,
                    colour
                });
            };
        };
        
        var colour = "rgb(25, 62, 214)" //[12, 123, 145];
        // dark blue

        // left and right  (y and z)
        for (let iy = (this.y-radiusY); iy < (this.y+radiusY); iy++) {
            for (let iz = (this.y-radiusZ); iz < (this.z+radiusZ); iz++) {
                const xL = this.x-radiusX;
                const xR = this.x+radiusX;
                // left
                arr.push({
                    x: xL, y: iy, z: iz,
                    colour
                });

                // right
                arr.push({
                    x: xR, y: iy, z: iz,
                    colour
                });
            };
        };

        this.arr = arr;
        return arr;
    };

    async renderCubeLine() {
        
    };
};

const options = {

}

const websocket = false;
module.exports={v20, options, websocket};