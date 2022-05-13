const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/status', (request, response) => response.json({ clients: clients.length }));

const PORT = 3001;

let clients = [];
let messages = [];

function eventsHandler(request, response, next) {
    const headers = {
        'Content-Type': 'text/event-stream',
        'Connection': 'keep-alive',
        'Cache-Control': 'no-cache'
    };
    response.writeHead(200, headers);

    const data = `data: ${JSON.stringify(messages)}\n\n`;

    response.write(data);

    const clientId = Date.now();

    const newClient = {
        id: clientId,
        response
    };

    clients.push(newClient);

    request.on('close', () => {
        console.log(`${clientId} Connection closed`);
        clients = clients.filter(client => client.id !== clientId);
    });
}

app.get('/events', eventsHandler);


function sendEventsToAll(message) {
    clients.forEach(client => client.response.write(`data: ${JSON.stringify(message)}\n\n`))
}

async function addMessage(request, response, next) {
    const newMessage = request.body;
    messages.push(newMessage);
    response.json(newMessage)
    return sendEventsToAll(newMessage);
}
app.post('/message', addMessage);

app.listen(PORT, () => {
    console.log(`Message Events service listening at http://localhost:${PORT}`)
})