var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvasBig = document.getElementById('canvasBig');
var ctxBig = canvasBig.getContext('2d');
const resizevar = 80;

document.getElementById('main').innerHTML = 'hello'

async function collectRender() {
    const renderReponse = await fetch(`/render/v2`, { method: 'GET'});
    const responseData = await renderReponse.json();
    imageRender(responseData);

    console.log(responseData);

    if (responseData?.timeTook) document.getElementById('time').innerText=`${responseData.timeTook}ms`
    return console.log('fetched image')
}



function imageRender(responseData) {
    canvas.width=responseData.sizeX;
    canvas.height=responseData.sizeY;
    ctx = canvas.getContext('2d');

    // canvasBig.width=responseData.sizeX*resizevar;
    // canvasBig.height=responseData.sizeY*resizevar;
    // ctxBig = canvasBig.getContext('2d');

    for (const pixel of responseData.image) {
        draw(pixel.x, pixel.y, pixel.colour);
    }
}

function draw(xCoord, yCoord, ColourRGB) {
    ctx.fillStyle = ColourRGB;
    ctx.fillRect(xCoord, yCoord, 1, 1);

    // ctxBig.fillStyle = ColourRGB
    // ctxBig.fillRect(xCoord*resizevar, yCoord*resizevar, 1*resizevar, 1*resizevar);
}
