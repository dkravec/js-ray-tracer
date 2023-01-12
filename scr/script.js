var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var canvasBig = document.getElementById('canvasBig');
var ctxBig = canvasBig.getContext('2d');
const resizevar = 80;
var currentOption = "v11";
var websocketOn = true;
var renders = {};
onLoad();

var options = {
    "objects" : [
        "objType",
        "colourSelectType",
            "indivual",
            "merged",
            "hex",
        "colour",
        "style",
            "outline",
            "thickness",
                "outline",
        "height",
        "width",
        "x",
        "y",
        "size"
    ],
    "canvas_y" : 1080,
    "canvas_x" : 1080
}

async function onLoad(){
    await getOptions();
};

async function getOptions() {
    const renderReponse = await fetch(`/options`, { method: 'GET'});
    const responseData = await renderReponse.json();

    drawOptions(responseData)
    currentOption = responseData.options[responseData.options.length-1].name 
    for (const option of responseData.options) {
        renders[option.name] = option;
    }
}

function drawOptions(response) {
    var ele = `
        <h3>Options</h3>
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

function addOptions() {
    document.getElementById("extraOptions")=`
        <div>
            <p>Current options</p>
            <p>add</p>
            <select onchange="AddNew">
            
            </select>
        </div>
    `
}
function removeFunctions() {
    document.getElementById("extraOptions")=``
}

async function collectRender() {
    if (websocketOn && renders[currentOption].websocket==true) {
        const wsURL = location.href.substring(location.protocol.length + 2);
        console.log(wsURL);
        const ws = new WebSocket(`ws${location.protocol.startsWith("https")?"s":""}://${wsURL}${wsURL.endsWith('/')?"":"/"}render/${currentOption}`);

        ws.onmessage = function (event) {
            const data = JSON.parse(event.data);
            if (data.sendType=="init") {
                canvas.width=data.sizeX;
                canvas.height=data.sizeY;
                ctx = canvas.getContext('2d');
            }
            if (data.sendType=="final") {
                imageRender(data.imageData);
                console.log('fetched image');
                if (data?.imageData?.timeTook) document.getElementById('time').innerText=`${data.imageData.timeTook}ms`
            } else {
                draw(data.x, data.y, data.colour);
                console.log('fetching image');
            }
        };
    }
    else {
        const renderReponse = await fetch(`/render/${currentOption}`, { method: 'POST'});
        const responseData = await renderReponse.json();
        imageRender(responseData);
    
        if (responseData?.timeTook) document.getElementById('time').innerText=`${responseData.timeTook}ms`
        return console.log('fetched image');
    }
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