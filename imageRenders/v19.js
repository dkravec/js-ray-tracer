async function v19(data, ws) {
    var wsenabled = false
    if (ws) wsenabled = true;
    const startTime = checktime();

    returnData = {
        timeTook: 13,
        sizeX: 261,
        sizeY: 261,
        image: [ ],
        imageNew: {}
    };

    if (ws) ws.send(JSON.stringify({
        sizeX: returnData.sizeX,
        sizeY: returnData.sizeY,
        sendType: "init"
    }));
  
    var sceneObjects = [
        {
            objType: "circle",
            number: 120, 
            size: 50, 
            x: random({ min: 25, max: returnData.sizeX - 25}),
            y: random({ min: 25, max: returnData.sizeY - 25}),
        }, { 
            objType: "circle",
            number: 600, 
            size: 200, 
            x: random({ max: returnData.sizeX - 200}),
        }, { 
            objType: "circle",
            number: 200,
            size: 30,
            x: random({ max: returnData.sizeX - 30}),
            y: random({ max: returnData.sizeY - 30}),
        }, {
            objType: "cube",
            x: random({max: returnData.sizeX - 44}),
            y: random({max: returnData.sizeY - 65}),
            width: 44,
            height: 65,
            colour: `rgb(19, 209, 31)`
        }, {
            objType: "cube",
            x: random({max: returnData.sizeX - 53}),
            y: random({max: returnData.sizeY - 25}),
            width: 53,
            height: 25,
            colour: `rgb(245, 15, 40)`
        }, {
            objType: "cube",
            x: random({max: returnData.sizeX - 40}),
            y: random({max: returnData.sizeY - 100}),
            width: 40,
            height: 100,
            style: "outline",
            thickness: 10,
            colour: `rgb(3, 31, 128)`
        }, {
            objType: "cube",
            x: random({max: returnData.sizeX - 40}),
            y: random({max: returnData.sizeY - 60}),
            width: 40,
            height: 60,
            // thickness: 1,
            style: "outline",
            colour: `rgb(201, 100, 128)`
        }, {
            objType: "light",
            x: random({max: returnData.sizeX - 100}),
            y: random({max: returnData.sizeY - 100}),
            radius: 100,
            colour: {
                r: colourNumber(),
                g: colourNumber(),
                b: colourNumber()
            }
        }, {
            objType: "light",
            x: random({max: returnData.sizeX - 60}),
            y: random({max: returnData.sizeY - 60}),
            radius: 60,
            colour: {
                r: colourNumber(),
                g: colourNumber(),
                b: colourNumber()
            }
        }, {
            objType: "light",
            x: random({max: returnData.sizeX - 100}),
            y: random({max: returnData.sizeY - 100}),
            radius: 100,
            colour: {
                r: colourNumber(),
                g: colourNumber(),
                b: colourNumber()
            }
        }, {
            objType: "background",
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
                for (const pix of circleArr) {
                    returnData.imageNew[`${pix.x}_${pix.y}`] = pix
                    if (wsenabled) ws.send(JSON.stringify(pix))
                }
                break;
            case "cube":
                const cubeArr = renderCube(scnObj);
                returnData.image = returnData.image.concat(cubeArr);
                for (const pix of cubeArr) {
                    returnData.imageNew[`${pix.x}_${pix.y}`] = pix
                    if (wsenabled) ws.send(JSON.stringify(pix))
                }
                break;
            case "background":
                const backgroundArr = renderBackground(scnObj, returnData);
                returnData.image = returnData.image.concat(backgroundArr);
                for (const pix of backgroundArr) {
                    returnData.imageNew[`${pix.x}_${pix.y}`] = pix
                }
                break;
            case "light": 
                const lightArr = renderLight(scnObj);
                lightingChange = lightingChange.concat(lightArr);
                break;
            default:
                break;
        };
    };
    
    /*
        image
        lightingChange

        for each lighting change, 
            look in the image for a pixel, 
                if there is, change it
                else add new lighting OR dont do anything

    */

    // console.log(image)
    for (const newLight of lightingChange) {
        const addLight = addLighting(newLight, returnData.imageNew);
        if (addLight.found) {
            returnData.imageNew[addLight.pixelIndex].colour = addLight.colour;
            if (wsenabled) ws.send(JSON.stringify(returnData.imageNew[addLight.pixelIndex]))
        };
    };

    returnData.imageNew = {};
    const finishTime = checktime();
    returnData.timeTook = `${finishTime - startTime}`;

    if (wsenabled) ws.send(JSON.stringify({
        sendType: "final",
        imageData: returnData
    }));

    return returnData;
};

const options = {
    mainOptions: [
        {
            name: "sizeX",
            type: "number",
        }, {
            name: "sizeY",
            type: "number",
        }
    ],
    sceneObjects: [
        {
            "objType": "circle",
            "options" : [
                {
                    "name": "number",
                    "type": "number",
                }, {
                    "name": "size",
                    "type": "number",
                }, {
                    "name": "x",
                    "type": "number",
                }, {
                    "name": "y",
                    "type": "number",

                }, {
                    "name": "r",
                    "type": "number",
                }, {
                    "name": "colour",
                    "type": "colourType",
                }, {
                    "name": "colourType",
                    "type": "string",
                    "options": [
                        {
                            "name" : "RGB_Merged",
                            "type" : "string",
                            "example" : "rgb(255, 255, 255)"
                        }, {
                            "name" : "RGB_Separate",
                            "type" : "obj",
                            "example" : {
                                "r": 255,
                                "g": 255,
                                "b": 255
                            },
                            "options" : [
                                {
                                    "name" : "r",
                                    "type" : "number",
                                    "min_value" : 0,
                                    "max_value" : 255,
                                }, {
                                    "name" : "g",
                                    "type" : "number",
                                    "min_value" : 0,
                                    "max_value" : 255,
                                }, {
                                    "name" : "b",
                                    "type" : "number",
                                    "min_value" : 0,
                                    "max_value" : 255,
                                }
                            ]
                        }, {
                            "name" : "HEX",
                            "type" : "string",
                            "example" : "#FFFFFF"
                        }
                    ]
                }
            ]
        }, {
            "objType": "cube",
            "options" : [
                {
                    "name": "x",
                    "type": "number",
                }, {
                    "name": "y",
                    "type": "number",
                }, {
                    "name": "width",
                    "type": "number",
                }, {
                    "name": "height",
                    "type": "number",
                }, {
                    "name": "colour",
                    "type": "RGB_merged",
                }, {
                    "name": "style",
                    "type": "string",
                    "possible": [
                        "fill",
                        "outline"
                    ]
                }, {
                    "name": "thickness",
                    "type": "number",
                }
            ]
        }, {
            "objType": "light",
            "options" : [
                {
                    "name": "x",
                    "type": "number",
                }, {
                    "name": "y",
                    "type": "number",
                }, {
                    "name": "radius",
                    "type": "number",
                }, {
                    "name": "colour",
                    "type": "RGB_merged",
                }
            ]
        }
    ]
}
const websocket = true;

module.exports={v19, options, websocket};

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

    const cur = image[`${light.x}_${light.y}`];
    if (!cur) return change
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
            pixelIndex: `${cur.x}_${cur.y}`,
            touched: true,
            colourRGB: {r: newR, g: newG, b: newB},
            colour: `rgb(${newR}, ${newG}, ${newB})`
        };

        return change;
    };
    return change;
};

function renderCircle({ number, size, x, y, r}) {
    if (!number) number = 120*3*4*2;
    if (!size) size = 260;
    if (!x) x = size/2;
    if (!y) y = size/2;
    if (!r) r = size/2;

    var lastR = colourNumber();
    var lastG = colourNumber();
    var lastB = colourNumber();

    const arr = []
    for (let i=1; i<=number; i++) {
        let ang = i*(Math.PI/(number/2));
        let left = Math.round(x+(r*Math.cos(ang)));
        let top = Math.round(y+(r*Math.sin(ang)));

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
                    arr.push({
                        x: obj.x+w, 
                        y: obj.y+t, 
                        colour: obj.colour
                    });
                    arr.push({
                        x: obj.x+w, 
                        y: obj.y+obj.height-t,
                         colour: obj.colour
                    });
                };
            } else {
                // top row
                arr.push({
                    x: obj.x+w, 
                    y: obj.y, 
                    colour: obj.colour
                });
                // bottom row
                arr.push({
                    x: obj.x+w, 
                    y: obj.y+obj.height, 
                    colour: obj.colour
                });
            };
        };
        for (let h=0; h<obj.height+1; h++) {
            if (obj.thickness) {
                for (let t=0; t<obj.thickness; t++) {
                    arr.push({
                        x: obj.x+t, 
                        y: obj.y+h, colour: obj.colour
                    });
                    arr.push({
                        x: obj.x+obj.width-t, 
                        y: obj.y+h, colour: obj.colour
                    });
                };
            } else {
                arr.push({
                    x: obj.x, 
                    y: obj.y+h, 
                    colour: obj.colour
                });
                arr.push({
                    x: obj.x+obj.width, 
                    y: obj.y+h, 
                    colour: obj.colour
                });
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

function renderBackground(background, image) {
    var backgroundArr = [];
    const sizeX = image.sizeX
    const sizeY = image.sizeY
    for (let x=0; x<sizeX; x++) {
        for (let y=0; y<sizeY; y++) {
            if (!image.imageNew[`${x}_${y}`]) backgroundArr.push({
                x, y,
                colour: `rgb(${background.colour.r}, ${background.colour.g}, ${background.colour.b})`
            });
        };
    }
    return backgroundArr;
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

function random({min, max}) {
    if (!min) min = 0;
    if (!max) max = 255;

    return Math.floor(Math.random() * max) + min;
}