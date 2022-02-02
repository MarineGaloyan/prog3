let LivingCreature = require('./LivingCreature')

module.exports = class Flower extends LivingCreature {
        constructor(x, y) {
            
            super(x,y)
          
        
        }
    
        mul() {
            this.multiply++;
            var emptyCells = this.chooseCell(0);
            var newCell = random(emptyCells);
    
            // console.log(emptyCells);
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


