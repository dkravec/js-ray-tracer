const express = require('express');
const expressWs = require('express-ws')

const http = require('http');
const cors = require('cors');
const PORT = 3005;
const app = express();
expressWs(app);

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use(cors({
    origin: [ 
        'http://localhost:3005', 
    ],
    credentials: true
}));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/scr/index.html');
});

app.get('/script.js', (req, res) => {
    res.sendFile(__dirname + '/scr/script.js')
})
app.get('/style.css', (req, res) => {
    res.sendFile(__dirname + '/scr/style.css')
})

const render = require('./render')
const options = require('./options')

app.use('/render', render);
app.use('/options', options);

const server = http.createServer(app);

server.listen(PORT, () => console.log(`Server started on port ${PORT}!`));