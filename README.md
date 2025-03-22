# Snake-Buster
A simple Snake game for the command line, built using JavaScript and the blessed library.

## Features

- Classic Snake gameplay in the terminal
- Smooth controls with arrow keys
- Game over screen with restart option
- Randomly spawning food
- Adjustable speed

## Installation

### Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)

### Steps

1. Clone the repository:
 ```sh
   git clone https://github.com/shashwath1278/Snake-Buster.git
   cd cli-snake-game
   ```
   Install dependencies:

2. npm install and blessed install
 ```sh
  npm install
  npm install blessed
   ```
3. Run the game:
```sh
  node snake.js
   ```

## Controls

- Arrow Keys → Move the snake

- R → Restart after game over

- Q → Quit the game

## How to Play

- The snake moves continuously in the chosen direction.

- Eat the food (X) to grow longer.

- Avoid hitting the walls or yourself.

- If you collide with yourself or the boundary, the game ends.
