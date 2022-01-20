class Flower extends LivingCreature {
        constructor(x, y, index) {
            
            super(x,y,index)
            this.index = index;
            this.multiply = 0;
           
           
        }
        chooseCell(character) {
            var found = []
            for (var i in this.directions) {
                var x = this.directions[i][0];
                var y = this.directions[i][1];
                if (x >= 0 && x < matrix[0].length && y >= 0 && y < matrix.length) {
                    if (matrix[y][x] == character) {
                        found.push(this.directions[i]);
                    }
                }
            }
            return found
        }
        mul() {
            this.multiply++;
            var emptyCells = this.chooseCell(0);
            var newCell = random(emptyCells);
    
            console.log(emptyCells);
            if (newCell && this.multiply >= 8) {
                var newX = newCell[0];
                var newY = newCell[1];
                matrix[newY][newX] = 5;
    
                var newGrass = new Flower (newX, newY, 5);
                grassArr.push(newFlower);
                this.multiply = 0;
            }
        }
    
    
    
    
    }


