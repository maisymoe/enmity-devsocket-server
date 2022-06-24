import { WebSocket, WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: parseInt(process.argv[2]) || 4000 });

wss.on("connection", (ws: WebSocket) => {
    console.log("A socket connected");

    ws.on("message", (message: Buffer) => {
        try {
            const data = JSON.parse(message.toString());

            for (let client of wss.clients) {
                if (client !== ws) {
                    if (data.devTool) {
                        client.send(data.content);
                    } else {
                        client.send(JSON.stringify(data));
                    }
                }
            }
        } catch {}
    });
});

console.log(`Listening on ${wss.options.port}`);
