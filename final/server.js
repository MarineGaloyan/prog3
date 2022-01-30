var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var fs = require("fs");
const { isBoolean } = require('util');

app.use(express.static("."));

app.get('/', function (req, res) {
    res.redirect('index.html');
});
server.listen(3000, function () {
    console.log("runed on port:3000");
});
grassArr = []
grassEaterArr = []
predatorArr = []
predatoreatArr = []
flowerArr = []
matrix = [];

var n = 50;
const Grass = require("./Grass")
const GrassEater = require("./GrassEater")
const Predator = require("./predator")
const PredatorEat = require("./predatoreat")
const Flower = require("./Flower")





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

// setInterval(ObjectCreator, 300)
setInterval(game, 300);
io.on('connection', function (socket) {
    ObjectCreator(matrix);
})



// function generator(matLen, gr, grEat, pred, prEat, fl) {
//     let matrix = [];
//     for (let i = 0; i < matLen; i++) {
//         matrix[i] = [];
//         for (let j = 0; j < matLen; j++) {
//             matrix[i][j] = 0;
//         }
//     }
//     for (let i = 0; i < gr; i++) {
//         let x = Math.floor(Math.random() * matLen);
//         let y = Math.floor(Math.random() * matLen);
//         if (matrix[x][y] == 0) {
//             matrix[x][y] = 1;
//         }
//     }
//     for (let i = 0; i < grEat; i++) {
//         let x = Math.floor(Math.random() * matLen);
//         let y = Math.floor(Math.random() * matLen);
//         if (matrix[x][y] == 0) {
//             matrix[x][y] = 2;
//         }
//     }
//     for (let i = 0; i < pred; i++) {
//         let x = Math.floor(Math.random() * matLen);
//         let y = Math.floor(Math.random() * matLen);
//         if (matrix[x][y] == 0) {
//             matrix[x][y] = 3;
//         }
//     }
//     for (let i = 0; i < prEat; i++) {
//         let x = Math.floor(Math.random() * matLen);
//         let y = Math.floor(Math.random() * matLen);
//         if (matrix[x][y] == 0) {
//             matrix[x][y] = 4;
//         }
//     }
//     for (let i = 0; i < fl; i++) {
//         let x = Math.floor(Math.random() * matLen);
//         let y = Math.floor(Math.random() * matLen);
//         if (matrix[x][y] == 0) {
//             matrix[x][y] = 5;
//         }
//     }

//     return matrix
// }


// for (let i = 0; i < n; i++) {
//     matrix[i] = [];
//     for (let j = 0; j < n; j++) {
//         matrix[i][j] = Math.floor(rand(0, 6))

//     }
// }


//  io.sockets.emit('send matrix', matrix);


// const Grass = require("./Grass")
// const GrassEater = require("./GrassEater")
// const Predator = require("./Predator")
// const PredatorEat = require("./predatoreat")
// const Flower = require("./Flower")

// function createObject(matrix) {
//     for (var y = 0; y < matrix.length; ++y) {
//         for (var x = 0; x < matrix[y].length; ++x) {
//             if (matrix[y][x] == 1) {
//                 matrix[y][x] = 1;
//                 var gr = new Grass(x, y, 1);
//                 grassArr.push(gr);
//             } else if (matrix[y][x] == 2) {
//                 matrix[y][x] = 2;
//                 var gr = new GrassEater(x, y, 2)
//                 grassEaterArr.push(gr)
//             }
//             else if (matrix[y][x] == 3) {
//                 matrix[y][x] = 3;
//                 var gr = new Predator(x, y, 1)
//                 predatorArr.push(gr);
//             }
//             else if (matrix[y][x] == 4) {
//                 matrix[y][x] = 4;
//                 var gr = new PredatorEat(x, y, 1)
//                 predatoreatArr.push(gr);
//             }

//         }
//     }
// }
// io.sockets.emit('send matrix', matrix)

// function game (){

// for (var i in grassArr) {
//         grassArr[i].mul();
//     }
//     for (var i in grassEaterArr) {
//         grassEaterArr[i].mul()
//         grassEaterArr[i].eat()
//     }
//     for (var i in predatorArr) {
//         predatorArr[i].mul()
//         predatorArr[i].eat()
//     }

//     for (var i in predatoreatArr) {
//         predatoreatArr[i].mul()
//         predatoreatArr[i].eat()
//     }
//     io.sockets.emit("send matrix", matrix);
// }

// setInterval(game, 1000)

// io.on('connection', function () {
//     createObject(matrix)
// })