const express = require("express");
const app = express();
const http = require("http");
const WebSocket = require("ws");
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });
wss.on("connection", function connection(ws) {
    console.log("a user connected :D");
    ws.on("message", function incoming(message, isBinary) {
        console.log(message.toString(), isBinary);
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
});
app.get("/", (req, res) => {
  res.send("Hello World!");
});
server.listen(3000, () => {
  console.log("Listening to port 3000");
});
