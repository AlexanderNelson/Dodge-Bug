let hitCounter = 0;
leftRight = 101;
upDown = 83;
const variator = function() {
  return Math.floor(Math.random() * 2) + 1;
}
random = variator(); //this will be used to create greater variations using math
// Enemies our player must avoid
var Enemy = function(x, y, mph) {
  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.x = x;
  this.y = y + 55;
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
  if (this.x < this.pathEnd) {
    this.x += this.mph * dt;
  } else {
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
    this.y = 83 * 4 + 55;
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  //will return player to starting row. Any block on bottom row
  backToBottom() {
    this.y = 83 * 4 + 55;
  }
  //Detect bug/player incident
  update() {
    for (let awfulness of everyThingAwful) {
      if ((this.y <= awfulness.y + 19) && (this.y >= awfulness.y - 19) && (this.x <= awfulness.x + 55) && (this.x >= awfulness.x - 55)) {
        this.backToBottom();
        hitCounter++;
      }
    }
  }
  //player movement
  handleInput(input) {
    switch (input) {
      case 'up':
        if (this.y > 0) {
          this.y -= this.upDown;
        }
        break;
      case 'down':
        if (this.y < this.upDown * 4) {
          this.y += this.upDown;
        }
        break;
      case 'right':
        if (this.x < this.leftRight * 4) {
          this.x += this.leftRight;
        }
        break;
      case 'left':
        if (this.x > this.leftRight * 0) {
          this.x -= this.leftRight;
        }
        break;
    }
    if (this.y < 55) {
      launchPlayerStats();
      setTimeout(() => {
        this.backToBottom();
      }, 3000);
      hitCounter = 0;
    }
  }
};
const player = new Hero();
const volkswagen = new Enemy(-101, 0, 200 * variator());
const audi = new Enemy(-101, 83 * random, 300 * variator());
const warranty = new Enemy(-101 * random, 166, 172 * variator());
const everyThingAwful = [];
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
//make stats buttons work
const toggleStats = () => {
  const statsBackground = document.querySelector('.stats-background');
  statsBackground.classList.toggle('hide');
};
document.querySelector('.stats-play-btn').addEventListener('click', () => {
  toggleStats();
});
const launchPlayerStats = () => {
  const hitList = document.querySelector('.hit-list');
  const hits = hitCounter;
  hitList.innerHTML = `Number of Hits:   ${hits}`
  const endMessage = document.querySelector('.stats-title');
  endMessage.innerHTML = 'WOAH! That was INSANE.'
  setTimeout(() => {
    toggleStats();
  }, 1500);
};