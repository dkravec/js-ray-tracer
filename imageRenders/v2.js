async function v2() {
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
            returnData.image.push({x, y, colour: `rgb(${colour}, ${colour}, ${colour})`})
        };
    };
    
    const finishTime = checktime();
    returnData.timeTook = `${finishTime - startTime}`;
  
    return returnData;

    async function getColour(colour) {
        if (colour>255) {
            var newColour = colour/2;
            if (newColour>255) return await getColour(newColour);
            else return newColour;
        } else return colour;
    };
};

module.exports = {v2};

function checktime() {
    var d = new Date();
    const timeMS = d.getTime();

    return timeMS;
};