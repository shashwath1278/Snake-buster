const blessed = require('blessed');
const screen = blessed.screen({ smartCSR: true });

const gridSize = 25;
let snake, direction, food, gameOver, nextDirection;

function initializeGame() {
  snake = [{ x: 5, y: 5 }];
  direction = 'right';
  nextDirection = direction;
  food = spawnFood();
  gameOver = false;
  popupBox.hidden = true;
  gameLoop();
}
const name='SNAKE GAME'
const titleBox = blessed.box({
  top: 0,  
  left: 'center',
  width: 'shrink',  
  height: 3, 
  content: name,  
  style: {
    fg: 'green',  
    bg: 'black',  
  },
  align: 'center', 
  valign: 'middle',
});

screen.append(titleBox);

const box = blessed.box({
  top: 'center',
  left: 'center',
  width: gridSize + 2,  
  height: gridSize + 2 , 
  border: {
    type: 'line',
  },
  style: {
    border: {
      fg: 'blue', 
    },
    fg: 'white', 
    bg: 'black', 
  },
});

screen.append(box);

const popupBox = blessed.box({
  top: 'center',
  left: 'center',
  width: 30,
  height: 6,
  content: 'Game Over! Press R to restart or Q to exit.',
  border: { type: 'line' },
  style: { 
    border: { fg: 'red' }, 
    fg: 'red',  
    bg: 'black', 
  },
  hidden: true,  
});

screen.append(popupBox);

screen.key(['up', 'down', 'left', 'right', 'q', 'r'], (ch, key) => {
  if (key.name === 'q') return process.exit(0);
  if (key.name === 'r' && gameOver) {
    initializeGame();
    return;
  }
  if ((key.name === 'up' && direction !== 'down') ||
      (key.name === 'down' && direction !== 'up') ||
      (key.name === 'left' && direction !== 'right') ||
      (key.name === 'right' && direction !== 'left')) {
    nextDirection = key.name;
  }
});

function gameLoop() {
  if (gameOver) {
    popupBox.hidden = false;
    screen.render();
    return;
  }
  direction = nextDirection;
  moveSnake();
  render();
  setTimeout(gameLoop, 170); 
}

function moveSnake() {
  let head = { ...snake[0] };
  if (direction === 'up') head.y -= 1;
  if (direction === 'down') head.y += 1;
  if (direction === 'left') head.x -= 1;
  if (direction === 'right') head.x += 1;

  if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize || snake.some(s => s.x === head.x && s.y === head.y)) {
    gameOver = true;
    popupBox.setContent('Game Over! Press R to restart or Q to exit.');
    screen.render();
    return;
  }

  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) {
    food = spawnFood();
  } else {
    snake.pop();
  }
}

function render() {
  let output = '';
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      if (snake.some(s => s.x === x && s.y === y)) {
        output += 'O'; 
      } else if (food.x === x && food.y === y) {
        output += 'X';  
      } else {
        output += '.';  
      }
    }
    output += '\n';
  }
  box.setContent(output);
  screen.render();
}

function spawnFood() {
  let emptySpaces = [];
  for (let x = 0; x < gridSize; x++) {
    for (let y = 0; y < gridSize; y++) {
      if (!snake.some(s => s.x === x && s.y === y)) {
        emptySpaces.push({ x, y });
      }
    }
  }
  return emptySpaces.length > 0 ? emptySpaces[Math.floor(Math.random() * emptySpaces.length)] : { x: 0, y: 0 };
}

initializeGame();
