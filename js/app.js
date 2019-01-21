// enemies/bugs the player needs to avoid
var Enemy = function(x, y, speed) {
    // x position
    this.x = x;
    // y position // 55 will center it on the y axis
    this.y = y + 55;
    // speed property
    this.speed = speed;
    // the image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
    this.step = 101;
    this.boundary = this.step * 5
    this.resetPos = -this.step;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    // if enemy is not past boundary
    if(this.x < this.boundary) {
      // move forward
      // increment x by speed * dt
      this.x += this.speed * dt;
    }
    else
      // reset pos to start
      this.x = this.resetPos;
};

// draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


// hero class
class Hero {
  // constructor
  constructor () {
    // sprite img
    this.sprite = 'images/char-cat-girl.png';
    // steps - this distance between one block to another from the x axis
    // jumps - this distance between blocks on the y axis
    this.step = 101;
    this.jump = 83;
    // adding start specific location property
    // 2 blocks to the right
    // 5 blocks down from the top row
    this.startX = this.step * 2;
    this.startY = (this.jump * 4) + 55;
    // x pos, y pos
    this.x = this.startX;
    this.y = this.startY;
    this.victory = false;
  }
  // render and draw hero sprite on current x and y coordinate pos
  render () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }

  // update player's x and y properties
  update () {
    // check if enemy & player collide
    for(let enemy of allEnemies) {
      // did player x and y collide with enemy?
      if (this.y === enemy.y && (enemy.x + enemy.step/2 > this.x && enemy.x < this.x + this.step/2 ) ) {
        this.reset();
      }
    }
    if (this.y === 55) {
      this.victory = true;
    }
  }
    //  @param {string} input - Direction to travel
    // keeps player within boundaries of the game board
  handleInput(input) {
    switch(input) {
      case 'left':
        // can't move past 0 pos on the left
        if (this.x > 0) {
          this.x -= this.step;
        }
        break;
      case 'up':
        // top boundary - can't move past 0 pos
        if (this.y > this.jump) {
          this.y -= this.jump;
        }
        break;
      case 'right':
        // after 4 steps right, stop
        if (this.x < this.step * 4) {
          this.x += this.step;
        }
        break;
      case 'down':
        // bottom boundary - 4 jumps
        if (this.y < this.jump * 4) {
          this.y += this.jump;
        }
        break;
    }
  }
  reset() {
    // set x and y to starting x and y
    this.y = this.startY;
    this.x = this.startX;
  }
}
// initialize new object - player variable
const player = new Hero();
// new objects - enemies/bugs starting positions and speeds
const bug1 = new Enemy(-101, 0, 300);
const bug2 = new Enemy(-101, 83, 300);
const bug3 = new Enemy((-101*2.5), 83, 200);
const bug4 = new Enemy (-101, 0, 400);
const bug5 = new Enemy (-101, 166, 200);
const bug6 = new Enemy (-101, 249, 250);
const allEnemies = [];
// all enemies get stored in array
allEnemies.push(bug1, bug2, bug3, bug4, bug5, bug6);


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
