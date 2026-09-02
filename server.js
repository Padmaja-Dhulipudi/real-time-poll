const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: "*"
    }
});

let votes = {
    Java: 0,
    Python: 0,
    JavaScript: 0
};

io.on("connection", (socket) => {

    socket.emit("voteUpdate", votes);

    socket.on("vote", (option) => {

        if (votes[option] !== undefined) {
            votes[option]++;
        }

        io.emit("voteUpdate", votes);
    });

});

server.listen(5000, () => {
    console.log("Server running on port 5000");
});
