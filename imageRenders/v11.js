async function v11() {
    const startTime = checktime();

    returnData = {
        timeTook: 13,
        sizeX: 1080,
        sizeY: 1080,
        sizeZ: 200,//-100 - 100
        image: [ ]
    };

    var lights = [
        {
            x: 10,
            y: 24,
            radius: 60,
            colour: {
                r: colourNumber(),
                g: colourNumber(),
                b: colourNumber()
            }
        }, {
            x: 120,
            y: 300,
            radius: 300,
            colour: {
                r: colourNumber(),
                g: colourNumber(),
                b: colourNumber()
            }
        }
    ]

    var lightingChange = [
        /*
        {
            x,
            y,
            colourChange: {
                r, g, b
            }
        }
        */
    ]

    for (const light of lights) {
        // const r=0

        for (let r=0; r<light.radius; r++) {
            // for (let w=0; w<light.x; w++) {
                for (let h=0; h<light.radius; h++) {
                    // console.log(h)
                lightingChange.push({ x: light.x+r, y: light.y+h, "changeColour" : { r: light.colour.r, g: light.colour.g, b: light.colour.b }})
                }

                // lightingChange.push({ x: light.x-r+w, y: light.y-r, "changeColour" : { r: light.colour.r, g: light.colour.g, b: light.colour.b }})
        }
            // x+r
            // x-r
            
            /*
            for (let w=0; w<light.x; w++) {
                // x=light.x+r
                for (let h=0; h<light.y; h++) {
                    // x=light.x+r
                    console.log(`${light.x+w} - ${light.y+h}`)

                    lightingChange.push({ x: light.x+w, y: light.y+h, "changeColour" : { r: light.colour.r, g: light.colour.g, b: light.colour.b }})
                }
                // lightingChange.push({ x: light.x+w, y: light.y, "changeColour" : { r: light.colour.r, g: light.colour.g, b: light.colour.b }})
            }
            // for (let h=0; h<light.y; h++) {
                // x=light.x+r
                // lightingChange.push({ x: light.x, y: light.y+h, "changeColour" : { r: light.colour.r, g: light.colour.g, b: light.colour.b }})
            // }
            // lightingChange.push({ x, y, "changeColour" : { r, g, b }})
            */
        // }
    }


    for (let x=0; x<returnData.sizeX; x++) {
        r=getColour(colourNumber());
        b=getColour(colourNumber());
        
        for (let y=0; y<returnData.sizeY; y++) {
            g=getColour((b/x+y*x+y/r)/4)
            pushdata({x, y, colour: {r, g, b}})
        };
    };
    
    // // const finishTime = checktime();
    // // returnData.timeTook = `${finishTime - startTime}`;
  
    // // return returnData;
    // for (const obj of objects) {
    //     // var colour = `rgb(${obj.colour.r}, ${obj.colour.g}, ${obj.colour.b})`
    //     if (obj.style=="outline") {
    //         for (let w=0; w<obj.width; w++) {
    //             if (obj.thickness) {
    //                 for (let t=0; t<obj.thickness; t++) {
    //                     pushdata({x: obj.x+w, y: obj.y+t, colour: {r: obj.colour.r, g: obj.colour.g, b: obj.colour.b }});
    //                     pushdata({x: obj.x+w, y: obj.y+obj.height-t, colour: {r: obj.colour.r, g: obj.colour.g, b: obj.colour.b }});
    //                 }
    //             } else {
    //                 pushdata({x: obj.x+w, y: obj.y, colour: {r: obj.colour.r, g: obj.colour.g, b: obj.colour.b }});
    //                 pushdata({x: obj.x+w, y: obj.y+obj.height, colour: {r: obj.colour.r, g: obj.colour.g, b: obj.colour.b }});
    //             }
    //         }
    //         for (let h=0; h<obj.height; h++) {
    //             if (obj.thickness) {
    //                 for (let t=0; t<obj.thickness; t++) {
    //                     pushdata({x: obj.x+t, y: obj.y+h, colour: {r: obj.colour.r, g: obj.colour.g, b: obj.colour.b }});
    //                     pushdata({x: obj.x+obj.width-t, y: obj.y+h, colour: {r: obj.colour.r, g: obj.colour.g, b: obj.colour.b }});
    //                 }
    //             } else {
    //                 pushdata({x: obj.x, y: obj.y+h, colour: {r: obj.colour.r, g: obj.colour.g, b: obj.colour.b }});
    //                 pushdata({x: obj.x+obj.width, y: obj.y+h, colour: {r: obj.colour.r, g: obj.colour.g, b: obj.colour.b }});
    //             }
    //         }
    //     }
    //     else {
    //         for (let w=0; w<obj.width; w++) {
    //             for (let h=0; h<obj.height; h++) {
    //                 pushdata({x: obj.x+w, y: obj.y+h, colour: {r: obj.colour.r, g: obj.colour.g, b: obj.colour.b } });
    //             }
    //         }
    //     }
    // }

    function pushdata(obj) {
        var pushObj = {
            x: obj.x,
            y: obj.y,
        }
        /*
            x, y, colour: { r, g, b }
        */

        // console.log(obj.colour.r)

        var newColour = {
            r: obj.colour.r,
            g: obj.colour.g,
            b: obj.colour.b
        }
        // console.log(newColour)

        for (const lightObj of lightingChange) {
            if (obj.x==lightObj.x && obj.y==lightObj.y) {
                // console.log(`--1`)

                // console.log(lightObj.changeColour)
                // console.log(obj.colour)
        
                newColour.r = lowerNumber(newColour.r+lightObj.changeColour.r)
                newColour.b = lowerNumber(newColour.b+lightObj.changeColour.b)
                newColour.g = lowerNumber(newColour.g+lightObj.changeColour.g)

                // console.log(`--2`)
                // console.log(newColour)
            }
        }
        pushObj.colour = `rgb(${newColour.r}, ${newColour.g}, ${newColour.b})`
        // console.log(pushObj)
        returnData.image.push(pushObj)
        return true
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

module.exports={v11};

function getColour(colour) {
    if (colour>255) {
        var newColour = colour/colourNumber();
        if (newColour==Infinity) return colourNumber();
        if (newColour>255) return getColour(newColour);
        else return newColour;
    } else return colour;
};

function lowerNumber(colourNum) {
    if (colourNum>255) return 255
    else if (colourNum<0) return 0
    else return colourNum
}

function colourNumber(){
    return Math.floor(0 + Math.random()*(255 + 1 - 0));
};

function checktime() {
    var d = new Date();
    const timeMS = d.getTime();

    return timeMS;
};