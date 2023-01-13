// started jan 12 2023
// aimed to start with 3d objects

async function v20(data, ws) {
    var wsenabled = false
    if (ws) wsenabled = true;
    let returnData = {
        timeTook: 13,
        sizeX: 261,
        sizeY: 261,
        image: [ ],
        imageNew: {}
    };
    const startTime = checktime();

    const camera = new Camera({ x: 2, y: 4, z: 6, xLength: 10, yLength: 10, zLength: 10 });
    camera.printInfo();
    const cube1 = await renderCube({x: 20, y: 20, z: 20, size: 20, colour: "black"})
    console.log(cube1)

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
    console.log(top)
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

class Camera {
    constructor({
        // position (center)
        x, y, z,

        // size
        xLength,
        yLength,
        zLength
        // rotation
        // xRot, yRot, zRot
    }) {
        this.x = x;
        this.y = y;
        this.z = z;

        this.xLength = xLength;
        this.yLength = yLength;
        this.zLength = zLength;

        this.topLeft = x - xLength / 2;
        this.topRight = x + xLength / 2
        this.bottomLeft = y - yLength / 2;
        this.bottomRight = y + yLength / 2;
    };

    printInfo() {
        console.log(this);
    };

    async isInScene({ x, y, z }) {
        // check top
        if (x < this.topLeft || x > this.topRight) return false;
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

    }
    async renderCube() {

    }
    async renderCubeLine() {
        
    }
};

const options = {

}
const websocket = false;
module.exports={v20, options, websocket};