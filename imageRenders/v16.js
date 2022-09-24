async function v16() {
    const startTime = checktime();

    returnData = {
        timeTook: 13,
        sizeX: 261,
        sizeY: 261,
        image: [ ]
    };
  
    var sceneObjects = [
        {
            objType: "circle",
            number: 120, 
            size: 50, 
            cx: 50, 
            cy: 50, 
        }, { 
            objType: "circle",
            number: 600, 
            size: 200, 
            cx: 60, 
        }, {
            objType: "cube",
            x: 2,
            y: 5,
            width: 44,
            height: 65,
            colour: `rgb(19, 209, 31)`
        }, {
            objType: "cube",
            x: 56,
            y: 24,
            width: 53,
            height: 25,
            colour: `rgb(245, 15, 40)`
        }, {
            objType: "cube",
            x: 100,
            y: 20,
            width: 40,
            height: 100,
            style: "outline",
            thickness: 10,
            colour: `rgb(3, 31, 128)`
        }, {
            objType: "cube",
            x: 20,
            y: 60,
            width: 60,
            height: 70,
            style: "outline",
            colour: `rgb(201, 100, 128)`
        }, {
            objType: "light",
            x: 10,
            y: 24,
            radius: 60,
            colour: {
                r: colourNumber(),
                g: colourNumber(),
                b: colourNumber()
            }
        }, {
            objType: "light",
            x: 120,
            y: 300,
            radius: 300,
            colour: {
                r: colourNumber(),
                g: colourNumber(),
                b: colourNumber()
            }
        }
    ];

    var lightingChange = [];
    for (const scnObj of sceneObjects) {
        switch (scnObj.objType) {
            case "circle":
                const circleArr = renderCircle(scnObj);
                returnData.image = returnData.image.concat(circleArr);

                break;
            case "cube":
                const cubeArr = renderCube(scnObj);
                returnData.image = returnData.image.concat(cubeArr);

                break;
            case "light": 
                const lightArr = renderLight(scnObj);
                lightingChange = lightingChange.concat(lightArr);
            default:
                break;
        }
    };
    /*
        image
        lightingChange

        for each lighting change, 
            look in the image for a pixel, 
                if there is, change it
                else add new lighting OR dont do anything

    */

    for (const newLight of lightingChange) {
        // console.log(newLight);
        const addLight = addLighting(newLight, returnData.image);
        if (addLight.found) {
            returnData.image[addLight.pixelIndex].colour= addLight.colour
        }
    }

    const finishTime = checktime();
    returnData.timeTook = `${finishTime - startTime}`;
  
    return returnData;
};

module.exports={v16};

function addLighting(light, image) {
    var change = {
        found: false,
        x: null, 
        y: null, 
        colourRGB: {r: null, g: null, b: null}, 
        colour: null,
        pixelIndex: null, 
        touched: null
    };

    for (let i=0; i<image.length;i++) {
        const cur = image[i];
        if (cur.x==light.x && cur.y==light.y) {
            const pixelColour = seperateColour(cur.colour);
            // console.log(light)
            const newR = pixelColour.r + light.changeColour.r;
            const newG = pixelColour.g + light.changeColour.g;
            const newB = pixelColour.b + light.changeColour.b;
            change = {
                found: true,
                x: cur.x,
                y: cur.y,
                pixelIndex: i,
                touched: true,
                colourRGB: {r: newR, g: newG, b: newB},
                colour: `rgb(${newR}, ${newG}, ${newB})`
            };
            return change;
        };
    };
    return change;
};

function renderCircle({ number, size, cx, cy, r}) {
    if (!number) number = 120*3*4*2;
    if (!size) size = 260;
    if (!cx) cx = size/2;
    if (!cy) cy = size/2;
    if (!r) r = size/2;

    var lastR = colourNumber();
    var lastG = colourNumber();
    var lastB = colourNumber();

    const arr = []
    for (let i=1; i<=number; i++) {
        let ang = i*(Math.PI/(number/2));
        let left = Math.round(cx+(r*Math.cos(ang)));
        let top = Math.round(cy+(r*Math.sin(ang)));

        const newObj = {
            x: left, y: top, colour: `rgb(${newColour(lastR, i)}, ${newColour(lastG, i)}, ${newColour(lastB, i)})`,
            ang, left, top
        };
        arr.push(newObj);
    };
    return arr;
};

function renderCube(obj) {
    // const { x, y, width, height, colou, style, thickness } = obj;
    const arr = [];
    if (obj.style=="outline") {
        for (let w=0; w<obj.width; w++) {
            if (obj.thickness) {
                for (let t=0; t<obj.thickness; t++) {
                    arr.push({x: obj.x+w, y: obj.y+t, colour: obj.colour});
                    arr.push({x: obj.x+w, y: obj.y+obj.height-t, colour: obj.colour});
                };
            } else {
                arr.push({x: obj.x+w, y: obj.y, colour: obj.colour});
                arr.push({x: obj.x+w, y: obj.y+obj.height, colour: obj.colour});
            };
        };
        for (let h=0; h<obj.height; h++) {
            if (obj.thickness) {
                for (let t=0; t<obj.thickness; t++) {
                    arr.push({x: obj.x+t, y: obj.y+h, colour: obj.colour});
                    arr.push({x: obj.x+obj.width-t, y: obj.y+h, colour: obj.colour});
                };
            } else {
                arr.push({x: obj.x, y: obj.y+h, colour: obj.colour});
                returnData.image.push({x: obj.x+obj.width, y: obj.y+h, colour: obj.colour});
            };
        };
    } else {
        for (let w=0; w<obj.width; w++) {
            for (let h=0; h<obj.height; h++) {
                arr.push({x: obj.x+w, y: obj.y+h, colour: obj.colour});
            };
        };
    };
    return arr;
};

function renderLight(light) {
    var currentLightChange = [];
    for (let r=0; r<light.radius; r++) {
        for (let h=0; h<light.radius; h++) {
            currentLightChange.push({ x: light.x+r, y: light.y+h, "changeColour" : { r: light.colour.r, g: light.colour.g, b: light.colour.b }});
        };
    };
    return currentLightChange;
}

function newColour(lastColour, i) {
    const step1 = lastColour*i;
    return colourNumber(step1);
};

function colourNumber(){
    return Math.floor(0 + Math.random()*(255 + 1 - 0));
};

function checktime() {
    var d = new Date();
    const timeMS = d.getTime();

    return timeMS;
};

function seperateColour(colour) {;
    const step1 = colour.replace("rgb", "");
    const step2 = step1.replace("(", "");
    const step3 = step2.replace(")", "");
    const step4 = step3.replace(",", " ").replace(","," ").replace(","," ");
    const args = step4.split(/[ ]+/);

    return { 
        r: parseInt(args[0]), 
        g: parseInt(args[1]), 
        b: parseInt(args[2])
    };
};