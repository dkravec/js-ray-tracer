async function v15() {
    const startTime = checktime();

    returnData = {
        timeTook: 13,
        sizeX: 261,
        sizeY: 261,
        image: [ ]
    };
    
    const Circle1 = renderCircle({
        number: 120, 
        size: 50, 
        cx: 50, 
        cy: 50, 
    });

    returnData.image = returnData.image.concat(Circle1);
    
    const Circle2 = renderCircle({ 
        number: 600, 
        size: 200, 
        cx: 60, 
    });
    
    returnData.image = returnData.image.concat(Circle2);

    var cubeObjects = [
        {
            x: 2,
            y: 5,
            width: 44,
            height: 65,
            colour: `rgb(19, 209, 31)`
        }, {
            x: 56,
            y: 24,
            width: 53,
            height: 25,
            colour: `rgb(245, 15, 40)`
        }, {
            x: 100,
            y: 20,
            width: 40,
            height: 100,
            style: "outline",
            thickness: 10,
            colour: `rgb(3, 31, 128)`
        }, {
            x: 20,
            y: 60,
            width: 60,
            height: 70,
            style: "outline",
            colour: `rgb(201, 100, 128)`
        }
    ];

    for (const cube of cubeObjects) {
        const cubeArr = renderCube(cube);
        returnData.image = returnData.image.concat(cubeArr);
    };

    const finishTime = checktime();
    returnData.timeTook = `${finishTime - startTime}`;
  
    return returnData;
};

module.exports={v15};

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
    const { x, y, width, height, colou, style, thickness } = obj;
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