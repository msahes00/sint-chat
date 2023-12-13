const WebSocket = require('ws');

const storage = {
	data: [],
	sockets: []
};

const wss = new WebSocket.Server({ port: 3064 }, () => {
	console.log('WebSocket server is listening on port 3064');
});

wss.on('connection', (ws) => {

	console.log('Client connected');
	storage.sockets.push(ws);

	setTimeout(() => {
		console.log('Sending history (' + storage.data.length + ')');
	
		storage.data.forEach((data) => {
			ws.send(data);
		});
		
		console.log('Client up to date (' + storage.data.length + ')');

		ws.send("You can start sending now!");

		ws.on('message', (message) => {
			console.log(`Message received: ${message}`);
			storage.sockets.forEach((socket) => {
				socket.send(message);
			});
			storage.data.push(message);
		});

	}, 1000);
	
	ws.on('close', () => {
		console.log('Client disconnected');
		storage.sockets = storage.sockets.filter((socket) => socket !== ws);
	});
});
