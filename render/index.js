const router = require('express').Router();
const renderModels = require('../imageRenders/getRenders.js')
var WebSocketServer = require("ws").Server;

router.get('/:type', async (req, res) => {
    wsserver = req.socket.server;

    var wss = new WebSocketServer({server:wsserver});
    
    wss.on('connection', async function connection(ws, request) {
        console.log("Total Number of clients",wss.clients.size);

        const { type } = req.params;

        var data;
        const Info = renderModels();
        console.log('loading: ' + type)
    
        var isBody = false
    
        if (req.body) isBody = true;
    
        for (const option of Info) {
            if (option.name == type){
                if (isBody) data = await option.func(req.body, ws);
                else data = await option.func({}, ws);
            };
        };
       
        if (!data) ws.send('unkonwn');

        ws.close();
   });
});

router.post('/:type', async (req, res) => {
    const { type } = req.params;

    var data;
    const Info = renderModels();
    console.log('loading: ' + type)

    var isBody = false

    if (req.body) isBody = true;

    for (const option of Info) {
        if (option.name == type){
            if (isBody) data = await option.func(req.body);
            else data = await option.func();
        };
    };
   
    if (!data) res.status(404).send({ 'error' : `Unknown render type ${type}.`})
    return res.status(200).send(data);
});

module.exports = router;
