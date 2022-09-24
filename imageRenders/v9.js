async function v9() {
    const startTime = checktime();

    returnData = {
        timeTook: 13,
        sizeX: 1080,
        sizeY: 1080,
        sizeZ: 200,//-100 - 100
        image: [ ]
    };


    /*

        x
      x   x
    x       x
      x   x
        x

        place dot at 2,5
    */

    var objects = [
        {
            x: 2,
            y: 5,
            width: 44,
            height: 65,
            colour: `rgb(19, 209, 31)`
        },
        {
            x: 56,
            y: 24,
            width: 53,
            height: 25,
            colour: `rgb(245, 15, 40)`
        },
        {
            x: 100,
            y: 20,
            width: 40,
            height: 100,
            style: "outline",
            thickness: 10,
            colour: `rgb(3, 31, 128)`
        },
        {
            x: 20,
            y: 60,
            width: 60,
            height: 70,
            style: "outline",
            colour: `rgb(201, 100, 128)`
        }
    ]

    for (const obj of objects) {
        if (obj.style=="outline") {
            for (let w=0; w<obj.width; w++) {
                if (obj.thickness) {
                    for (let t=0; t<obj.thickness; t++) {
                        /*
                            w
                            t
                            - - - - - - -
                            -
                            -
                            -

                        */
                        returnData.image.push({x: obj.x+w, y: obj.y+t, colour: obj.colour});
                        returnData.image.push({x: obj.x+w, y: obj.y+obj.height-t, colour: obj.colour});
                    }
                } else {
                    returnData.image.push({x: obj.x+w, y: obj.y, colour: obj.colour});
                    returnData.image.push({x: obj.x+w, y: obj.y+obj.height, colour: obj.colour});
                }
            }
            for (let h=0; h<obj.height; h++) {
                if (obj.thickness) {
                    for (let t=0; t<obj.thickness; t++) {
                        returnData.image.push({x: obj.x+t, y: obj.y+h, colour: obj.colour});
                        returnData.image.push({x: obj.x+obj.width-t, y: obj.y+h, colour: obj.colour});
                    }
                } else {
                    returnData.image.push({x: obj.x, y: obj.y+h, colour: obj.colour});
                    returnData.image.push({x: obj.x+obj.width, y: obj.y+h, colour: obj.colour});
                }
            }
        } else {
            for (let w=0; w<obj.width; w++) {
                for (let h=0; h<obj.height; h++) {
                    returnData.image.push({x: obj.x+w, y: obj.y+h, colour: obj.colour});
                }
            }
        }
    }


    // for (let x=0; x<returnData.sizeX; x++) {
    //     for (let y=0; y<returnData.sizeY; y++) {
    //         for (let z=0; z<returnData.sizeZ; z++) {
    //             // returnData.image.push({x, y, colour: `rgb(${r}, ${g}, ${b})`});

    //         }
    //     }
    // };
    
    const finishTime = checktime();
    returnData.timeTook = `${finishTime - startTime}`;
  
    return returnData;
};

module.exports={v9};

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