async function v7() {
    const startTime = checktime();

    returnData = {
        timeTook: 13,
        sizeX: 1080,
        sizeY: 1080,
        image: [ ]
    };

    for (let x=0; x<returnData.sizeX; x++) {
        const Line = x + 4;
        const lineLength=100;

        r=getColour(colourNumber());
        b=getColour(r*colourNumber());
        
        // r=x
        // g=x
        // b=x

        for (let y=0; y<returnData.sizeY; y++) {
            g=getColour((b/x+y*x+y/r)/4)

            for (let i=1; i<lineLength; i++) {
                if (Line*i==y) {
                    // console.log(`${y}, ${x}`)
                    // console.log('ok')
                    returnData.image.push({x, y, colour: `rgb(${r}, ${g}, ${b})`});
                };
            };
        };
    };
    
    const finishTime = checktime();
    returnData.timeTook = `${finishTime - startTime}`;
  
    return returnData;
};

module.exports={v7};

function getColour(colour) {
    if (colour>255) {
        var newColour = colour/colourNumber();
        if (newColour==Infinity) return colourNumber();
        if (newColour>255) return getColour(newColour);
        else return newColour;
    } else return colour;
};

function colourNumber(){
    return Math.floor(0 + Math.random()*(255 + 1 - 0));
};

function checktime() {
    var d = new Date();
    const timeMS = d.getTime();

    return timeMS;
};