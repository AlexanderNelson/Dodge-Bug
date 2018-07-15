leftRight = 101;
upDown = 83;


const variator = function() {
    return Math.floor(Math.random() * 2) + 1;
}

random = variator();
// function variator(min, max) {
//   min = Math.ceil(min);
//   max = Math.floor();
//   return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
// }
// Enemies our player must avoid
var Enemy = function(x, y, mph) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y + 63;
    this.mph = mph;
    this.sprite = 'images/enemy-bug.png';
    this.move = leftRight;
    this.pathEnd = leftRight * 5;
    this.pathStart = -leftRight;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if(this.x < this.pathEnd) {
        this.x += this.mph * dt;
    }
    else {
        this.x = this.pathStart;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Hero {
    constructor() {
        this.upDown = 83;
        this.leftRight = 101;
        this.sprite = 'images/char-boy.png';
        this.x = 101 * 2;
        this.y = 83 * 5 - 25;

    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    //player movement
    handleInput(input) {
        switch(input) {
            case 'left':
                this.x -= 101;
                break;
            case 'right':
                this.x += 101;
                break;
            case 'up':
                this.y -= 83;
                break;
            case 'down':
                this.y += 83;
                break;
        }
    }
};
const player = new Hero();
const volkswagen = new Enemy(-101, 0, 200 * variator());
const audi = new Enemy(-101, 83*random, 300 * variator());
const warranty = new Enemy(-101*random, 166, 172 * variator());
const everyThingAwful = [];
console.log(everyThingAwful);
everyThingAwful.push(volkswagen, audi, warranty);
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
