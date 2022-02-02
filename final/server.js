var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");


app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("runed on port3000");
});


grassArr = []
grassEaterArr = []
predatorArr = []
predatoreatArr = []
flowerArr = []
matrix = [];

var n = 50;
 Grass = require("./Grass")
 GrassEater = require("./GrassEater")
 Predator = require("./Predator")
 PredatorEat = require("./PredatorEat")
 Flower = require("./Flower")





function rand(min, max) {
    return Math.random() * (max - min) + min;
}

for (let i = 0; i < n; i++) {
    matrix[i] = [];
    for (let j = 0; j < n; j++) {
        matrix[i][j] = Math.floor(rand(0, 6))
    }
}
console.log(matrix);

io.sockets.emit("send matrix", matrix);




function ObjectCreator(matrix) {
    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] == 1) {
                matrix[y][x] = 1;
                let gr = new Grass(x, y, 1);
                grassArr.push(gr);
            }
            else if (matrix[y][x] == 2) {
                matrix[y][x] = 2;
                let great = new GrassEater(x, y, 2);
                grassEaterArr.push(great);
            }
            else if (matrix[y][x] == 3) {
                matrix[y][x] = 3;
                var gr = new Predator(x, y, 1)
                predatorArr.push(gr);
            }
            else if (matrix[y][x] == 4) {
                matrix[y][x] = 4;
                var gr = new PredatorEat(x, y, 1)
                predatoreatArr.push(gr);
            }
        }
    }
    io.sockets.emit('send matrix', matrix);
}

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

setInterval(game, 300);
io.on('connection', function (socket) {
    ObjectCreator(matrix);
})


