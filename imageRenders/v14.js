async function v14() {
    const startTime = checktime();

    returnData = {
        timeTook: 13,
        sizeX: 261,
        sizeY: 261,
        image: [ ]
    };
    
    const newData = renderCircle();
    returnData.image = newData
    const finishTime = checktime();
    returnData.timeTook = `${finishTime - startTime}`;
  
    return returnData;
};

module.exports={v14};

function renderCircle() {
    let number = 120;
    let size = 260;
    let cx = size/2;
    let cy = size/2;
    let r = size/2

    var lastR = colourNumber()
    var lastG = colourNumber()
    var lastB = colourNumber()

    const arr = []
    for (let i=1; i<=number; i++) {
        let ang = i*(Math.PI/(number/2));
        let left = Math.round(cx+(r*Math.cos(ang)));
        let top = Math.round(cy + (r*Math.sin(ang)));

        const newObj = {
            x: left, y: top, colour: `rgb(${newColour(lastR, i)}, ${newColour(lastG, i)}, ${newColour(lastB, i)})`,
            ang, left, top
        }
        arr.push(newObj)
        // if (thickness)
        // console.log(`top: ${top}, left: ${left}`)
    }
    return arr
}

function newColour(lastColour, i) {
    const step1 = lastColour*i
    return colourNumber(step1)
}

function colourNumber(){
    return Math.floor(0 + Math.random()*(255 + 1 - 0));
};

function checktime() {
    var d = new Date();
    const timeMS = d.getTime();

    return timeMS;
};