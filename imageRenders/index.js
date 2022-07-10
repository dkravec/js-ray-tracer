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
            returnData.image.push({x, y, colour: `rgb(${x}, ${y}, ${x})`})
        };
    };
    
    const finishTime = checktime();
    returnData.timeTook = `${finishTime - startTime}`;

    return returnData;
}

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
            var newColour = colour/2
            if (newColour>255) return await getColour(newColour)
            else return newColour
        }
        else return colour
    } 
}

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

async function v4() {
    const startTime = checktime();

    returnData = {
        timeTook: 13,
        sizeX: 1080,
        sizeY: 1080,
        image: [ ]
    };

    for (let x=0; x<returnData.sizeX; x++) {
        r=getColour(colourNumber())
        b=getColour(r+x)

        for (let y=0; y<returnData.sizeY; y++) {
            g=getColour(b+y)
            returnData.image.push({x, y, colour: `rgb(${r}, ${g}, ${b})`})
        };
    };
    
    const finishTime = checktime();
    returnData.timeTook = `${finishTime - startTime}`;
  
    return returnData;

    function getColour(colour) {
        // console.log(colour)
        if (colour>255) {
            var newColour = colour/2
            if (newColour==Infinity) return 0
            if (newColour>255) return getColour(newColour)
            else return newColour
        }
        else return colour
    }

    function pickColour() {
        const r = colourNumber()
        const g = colourNumber()
        const b = colourNumber()
    
        const colour = `rgb(${r}, ${g}, ${b})`
        return colour
    }
    
    function colourNumber(){
        return Math.floor(0 + Math.random()*(255 + 1 - 0))
    } 
}

async function v5() {
    const startTime = checktime();

    returnData = {
        timeTook: 13,
        sizeX: 1080,
        sizeY: 1080,
        image: [ ]
    };

    for (let x=0; x<returnData.sizeX; x++) {
        r=getColour(colourNumber())
        b=getColour(colourNumber())
        for (let y=0; y<returnData.sizeY; y++) {
          
           
            g=getColour((b/x+y*x+y/r)/4)
            returnData.image.push({x, y, colour: `rgb(${r}, ${g}, ${b})`})
        };
    };
    
    const finishTime = checktime();
    returnData.timeTook = `${finishTime - startTime}`;
  
    return returnData;

    function getColour(colour) {
        if (colour>255) {
            var newColour = colour/2
            if (newColour==Infinity) return 0
            if (newColour>255) return getColour(newColour)
            else return newColour
        }
        else return colour
    }

    function pickColour() {
        const r = colourNumber()
        const g = colourNumber()
        const b = colourNumber()
    
        const colour = `rgb(${r}, ${g}, ${b})`
        return colour
    }
    
    function colourNumber(){
        return Math.floor(0 + Math.random()*(255 + 1 - 0))
    }
    
}

async function v6() {
    const startTime = checktime();

    returnData = {
        timeTook: 13,
        sizeX: 1080,
        sizeY: 1080,
        image: [ ]
    };

    for (let x=0; x<returnData.sizeX; x++) {
        r=getColour(colourNumber())
        b=getColour(r*colourNumber())
        
        for (let y=0; y<returnData.sizeY; y++) {
            g=getColour((b/x+y*x+y/r)/4)
            returnData.image.push({x, y, colour: `rgb(${r}, ${g}, ${b})`})
        };
    };
    
    const finishTime = checktime();
    returnData.timeTook = `${finishTime - startTime}`;
  
    return returnData;

    function getColour(colour) {
        if (colour>255) {
            var newColour = colour/colourNumber()
            if (newColour==Infinity) return colourNumber()
            if (newColour>255) return getColour(newColour)
            else return newColour
        }
        else return colour
    }

    function pickColour() {
        const r = colourNumber()
        const g = colourNumber()
        const b = colourNumber()
    
        const colour = `rgb(${r}, ${g}, ${b})`
        return colour
    }
    
    function colourNumber(){
        return Math.floor(0 + Math.random()*(255 + 1 - 0))
    }
    
}
module.exports = { v1, v2, v3, v4, v5, v6};


function checktime() {
    var d = new Date();
    const timeMS = d.getTime();

    return timeMS;
};