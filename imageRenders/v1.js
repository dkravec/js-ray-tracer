async function v1() {
    const startTime = checktime();

    returnData = {
        timeTook: 13,
        sizeX: 255,
        sizeY: 255,
        image: []
    };

    for (let x=0; x<returnData.sizeX; x++) {
        for (let y=0; y<returnData.sizeY; y++) {
            returnData.image.push({x, y, colour: `rgb(${x}, ${y}, ${x})`});
        };
    };
    
    const finishTime = checktime();
    returnData.timeTook = `${finishTime - startTime}`;

    return returnData;
};

module.exports = {v1};

function checktime() {
    var d = new Date();
    const timeMS = d.getTime();

    return timeMS;
};