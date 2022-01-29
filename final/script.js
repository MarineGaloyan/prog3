var socket = io();


let side = 20;


// var grassArr = []
// let grassEaterArr = []
// let predatorArr = []
// let predatoreatArr = []

function setup() {
    frameRate(5);
    createCanvas(20* side, 20 * side);
    background('#acacac');
  

}
function mkarel() {

    for (var y = 0; y < matrix.length; y++) {
        for (var x = 0; x < matrix[y].length; x++) {

            if (matrix[y][x] == 1) {
                fill("green");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 0) {
                fill("#acacac");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 2) {
                fill("yellow");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 3) {
                fill("red");
                rect(x * side, y * side, side, side);
            }
            else if (matrix[y][x] == 4) {
                fill("black");
                rect(x * side, y * side, side, side);
            }else if (matrix[y][x] == 5) {
                fill("pink");
                rect(x * side, y * side, side, side);
            }
        }

    }
    setInterval(
        function () {
        socket.on('send matrix', nkarel)
        },1000
    )
    

    // for (var i in grassArr) {
    //     grassArr[i].mul();
    // }
    // for (var i in grassEaterArr) {
    //     grassEaterArr[i].mul()
    //     grassEaterArr[i].eat()
    // }
    // for (var i in predatorArr) {
    //     predatorArr[i].mul()
    //     predatorArr[i].eat()
    // }

    // for (var i in predatoreatArr) {
    //     predatoreatArr[i].mul()
    //     predatoreatArr[i].eat()
    // }

}
