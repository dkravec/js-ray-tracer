async function v3() {
    const startTime = checktime();

    returnData = {
        timeTook: 13,
        sizeX: 1080,
        sizeY: 1080,
        image: [ ]
    };

    for (let x=0; x<returnData.sizeX; x++) {
        for (let y=0; y<returnData.sizeY; y++) {
            const colour = await getColour(x+y)
            const colour2 = await getColour(x*y)
            const colour3 = await getColour(x/y)
            returnData.image.push({x, y, colour: `rgb(${colour}, ${colour2}, ${colour3})`})
        };
    };
    
    const finishTime = checktime();
    returnData.timeTook = `${finishTime - startTime}`;
  
    return returnData;

    async function getColour(colour) {
        // console.log(colour)
        if (colour>255) {
            var newColour = colour/2
            if (newColour==Infinity) return 0
            if (newColour>255) return await getColour(newColour)
            else return newColour
        }
        else return colour
    }
}

module.exports={v3};

function checktime() {
    var d = new Date();
    const timeMS = d.getTime();

    return timeMS;
};