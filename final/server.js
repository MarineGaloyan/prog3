var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000);

function generator(matLen, gr, grEat, pred, prEat, fl) {
    let matrix = [];
    for (let i = 0; i < matLen; i++) {
        matrix[i] = [];
        for (let j = 0; j < matLen; j++) {
            matrix[i][j] = 0;
        }
    }
    for (let i = 0; i < gr; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 1;
        }
    }
    for (let i = 0; i < grEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 2;
        }
    }
    for (let i = 0; i < pred; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 3;
        }
    }
    for (let i = 0; i < prEat; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 4;
        }
    }
    for (let i = 0; i < fl; i++) {
        let x = Math.floor(Math.random() * matLen);
        let y = Math.floor(Math.random() * matLen);
        if (matrix[x][y] == 0) {
            matrix[x][y] = 5;
        }
    }
    return matrix
}

let matrix = generator(20, 25, 5, 5, 5, 5);
io.sockets.emit('send matrix', matrix);


grassArr = []
grassEaterArr = []
predatorArr = []
predatoreatArr = []

Grass = require("./grass")
GrassEater = require("./grasseater")
Predator = require("./predator")
PreadatorEat = require("./Predatoreat")
Flower = require("./flower")

function createObject(matrix) {
    for (var y = 0; y < matrix.length; ++y) {
        for (var x = 0; x < matrix[y].length; ++x) {
            if (matrix[y][x] == 1) {
                var gr = new Grass(x, y, 1);
                grassArr.push(gr);
            } else if (matrix[y][x] == 2) {
                var gr = new GrassEater(x, y, 2)
                grassEaterArr.push(gr)
            }
            else if (matrix[y][x] == 3) {
                var gr = new Predator(x, y, 1)
                predatorArr.push(gr);
            }
            else if (matrix[y][x] == 4) {
                var gr = new Predatoreat(x, y, 1)
                predatoreatArr.push(gr);
            }
            else if (matrix[y][x] == 8) {

            }
        }
    }
}
io.sockets.emit('send matrix', matrix)

function game (){

for (var i in grassArr) {
        grassArr[i].mul();
    }
    for (var i in grassEaterArr) {
        grassEaterArr[i].mul()
        grassEaterArr[i].eat()
    }
    for (var i in predatorArr) {
        predatorArr[i].mul()
        predatorArr[i].eat()
    }

    for (var i in predatoreatArr) {
        predatoreatArr[i].mul()
        predatoreatArr[i].eat()
    }
    io.sockets.emit("send matrix", matrix);
}

setInterval(game, 1000)

io.on('connection', function () {
    createObject(matrix)
})