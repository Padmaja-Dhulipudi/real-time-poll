const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
const server = http.createServer(app);

const io = new Server(server);

app.use(express.static(path.join(__dirname, "public")));

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
