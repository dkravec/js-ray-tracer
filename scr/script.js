var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvasBig = document.getElementById('canvasBig');
var ctxBig = canvasBig.getContext('2d');
const resizevar = 80;
var currentOption = "v11"

onLoad();

async function onLoad(){
    await getOptions();
};

async function getOptions() {
    const renderReponse = await fetch(`/options`, { method: 'GET'});
    const responseData = await renderReponse.json();

    drawOptions(responseData)
    currentOption = responseData.options[responseData.options.length-1].name 
}

function drawOptions(response) {
    var ele = `
        <h1>Options</h1>
        <select onchange="changeCurrent()" id="select_version_form">
    `;

    for (const option of response.options) {
        ele+=`<option onchange="changeCurrent('${option.name}')">${option.name}</option>`
    };

    ele+='</select>';

    document.getElementById("version_selector").innerHTML = ele;
};

function changeCurrent() {
    const input = document.getElementById("select_version_form").value;
    currentOption = input;
    document.getElementById("rendering").innerText=input;
};

async function collectRender() {
    const renderReponse = await fetch(`/render/${currentOption}`, { method: 'GET'});
    const responseData = await renderReponse.json();
    imageRender(responseData);

    console.log(responseData);

    if (responseData?.timeTook) document.getElementById('time').innerText=`${responseData.timeTook}ms`
    return console.log('fetched image');
};

function imageRender(responseData) {
    canvas.width=responseData.sizeX;
    canvas.height=responseData.sizeY;
    ctx = canvas.getContext('2d');

    for (const pixel of responseData.image) {
        draw(pixel.x, pixel.y, pixel.colour);
    };
};

function draw(xCoord, yCoord, ColourRGB) {

    ctx.fillStyle = ColourRGB;
    ctx.fillRect(xCoord, yCoord, 1, 1);
};


// SAVE YOUR CANVAS
function saveCanvas() {
    var canvas = document.getElementById('canvas');
    var dataURL = canvas.toDataURL();

    var win = window.open();
    win.document.write(`<iframe src="${dataURL}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
};