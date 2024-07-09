// const express = require('express');
// const app = express();
// const path = require("path")

// const http = require("http")

// const socketio = require("socket.io")
// const server = http.createServer(app);
// const io = socketio(server);


// app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));

// io.on("connection", function(socket){
//     socket.on("send-location", function (data){
//         io.emit("receive-location",{id: socket.id, ...data});
//     });
//     console.log("connected");
// })



// app.get("/",function(req, res){
// res.render("index");
// });
// server.listen(3000)

const express = require('express');
const app = express();
const path = require("path");
const http = require("http");
const socketio = require("socket.io");
const server = http.createServer(app);
const io = socketio(server);

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));

io.on("connection", function(socket) {
    console.log("Client connected:", socket.id);
    socket.on("send-location", function(data) {
        console.log(`Received location from ${socket.id}:`, data);
        io.emit("receive-location", { id: socket.id, ...data });
    });
});

app.get("/", function(req, res) {
    res.render("index");
});

server.listen(3000, () => {
    console.log('Server is running on port 3000');
});