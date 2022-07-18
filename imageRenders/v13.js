async function v13() {
    const startTime = checktime();

    returnData = {
        timeTook: 13,
        sizeX: 1080,
        sizeY: 1080,
        image: [ ]
    };

    x1=40
    x2=230
    y1=400
    y2=600
    /*
    draw a cube from an equation
        x1=40
        x2=60
        y1=40
        y2=60
        [x1, x2]
        [y1, y2]
    */

    for (let w=x1; w<x2; w++) {
        for (let h=y1; h<y2; h++) {
            r=getColour(colourNumber());
            b=getColour(colourNumber());
            g=getColour(colourNumber());
            returnData.image.push({x: w, y: h, colour: `rgb(${r}, ${g}, ${b})`})
        }
    }

    for (let x=0; x<returnData.sizeX; x++) {
        r=getColour(colourNumber());
        b=getColour(colourNumber());
        
        for (let y=0; y<returnData.sizeY; y++) {
            g=getColour((b/x+y*x+y/r)/4)
            // console.log(`${x1} ${x} ${x2} ${y1} ${y} ${y2}`)
            if (
                x1 < x && 
                x < x2 &&
                y1 < y &&
                y < y2
            ) {
            // if (x1<x<x2 && y1<y<y2) {
                returnData.image.push({x, y, colour: `rgb(23, 245, 114)`})
            }
            else returnData.image.push({x, y, colour: `rgb(${r}, ${g}, ${b})`})
        };
    }

    // console.log(returnData)
    // for (let x=0; x<returnData.sizeX; x++) {
    //     r=getColour(colourNumber());
    //     b=getColour(colourNumber());
        
    //     for (let y=0; y<returnData.sizeY; y++) {
    //         g=getColour((b/x+y*x+y/r)/4)
    //         returnData.image.push({x, y, colour: `rgb(${r}, ${g}, ${b})`})
    //     };
    // };
    
    const finishTime = checktime();
    returnData.timeTook = `${finishTime - startTime}`;
  
    return returnData;

    function getColour(colour) {
        if (colour>255) {
            var newColour = colour/2;
            if (newColour==Infinity) return 0;
            if (newColour>255) return getColour(newColour);
            else return newColour;
        } else return colour;
    };
    
    function colourNumber(){
        return Math.floor(0 + Math.random()*(255 + 1 - 0));
    };
};

module.exports={v13};


function checktime() {
    var d = new Date();
    const timeMS = d.getTime();

    return timeMS;
};