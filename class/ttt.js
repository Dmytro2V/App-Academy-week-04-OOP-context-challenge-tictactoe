const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {
    this.textColor = 'magenta' // black  red    green    yellow    blue    cyan    white    magenta

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);    

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('t', 'test command (remove)', TTT.testCommand);

    Screen.addCommand('up', 'command up', this.cursor.up);
    Screen.addCommand('down', 'command down', this.cursor.down);
    Screen.addCommand('left', 'command left', this.cursor.left);
    Screen.addCommand('right', 'command right', this.cursor.right);
    
    Screen.addCommand('x', 'command X', this.pressedX);    
    Screen.addCommand('o', 'command O', this.pressedO);    
    
    this.cursor.setBackgroundColor()
    Screen.render();
    
  }

  // Remove this
  static testCommand() {
    console.log("TEST COMMAND");
  }



  pressedX = () => {
    this.pressedXO('X')
  }
  pressedO = () => this.pressedXO('O')
  
  pressedXO = (char) => {
    //console.log(ttt,ttt.grid, ttt.grid[this.row][this.col]);
    
    if (this.playerTurn === char) {
      console.log('not this char');
    } else if (this.grid[this.cursor.row][this.cursor.col] !== ' ') {
      console.log('position busy');
    } else {
      this.grid[this.cursor.row][this.cursor.col] = char;
      Screen.setGrid(this.cursor.row, this.cursor.col, char)
      this.setTextColor();
      this.playerTurn = char; 
      if (TTT.checkWin(this.grid)) TTT.endGame(char);
    }   
   
  }
  setTextColor = () => {
    Screen.setTextColor(this.cursor.row, this.cursor.col, this.textColor)
    Screen.render()
  }

  static checkWin(grid) {    
    // Return 'X' if player X wins
    if (this.horizontalIncludes(grid, ['X', 'X', 'X'])) return 'X';
    if (this.verticalIncludes(grid, ['X', 'X', 'X'])) return 'X';
    if (this.diagonalIncludes(grid, ['X', 'X', 'X'])) return 'X';
    // Return 'O' if player O wins
    if (this.horizontalIncludes(grid, ['O', 'O', 'O'])) return 'O';
    if (this.verticalIncludes(grid,['O', 'O', 'O'])) return 'O';
    if (this.diagonalIncludes(grid,['O', 'O', 'O'])) return 'O';
    // Return 'T' if the game is a tie
    if (this.gridFull(grid)) return 'T';

    // Return false if the game has not ended
      return false;
    
  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

  static arraysEqual(arr1,arr2) {
    if (arr1.join() === arr2.join()) return true;
    return false;
  }
  static horizontalIncludes(grid, arr3) {
    const symbol = arr3[0] // X or Y 
    if (grid.filter((row) => row.join() === arr3.join()).length > 0)
      return true;    
  }

  static verticalIncludes(grid, arr3) {
    const symbol = arr3[0] // X or Y 
    for (let col = 0; col < 3; col++) { // on every horisontal pos

      let probably = true; // checking column

      for (let row = 0; row < 3; row++) { 
        if (grid[row][col] !== symbol) probably = false;
      }
      if (probably === true) return true; // here it is vert line
    }
  
  };

  static diagonalIncludes(grid, arr3) {
    const symbol = arr3[0] // X or Y 
    if (grid[0][0] + grid[1][1] + grid[2][2]  === symbol.repeat(3) ||
      grid[0][2] + grid[1][1] + grid[2][0]  === symbol.repeat(3)) 
      return true;    
  };

  static gridFull(grid) {
    if (grid.filter((row) => row.includes(' ')).length === 0)
      return true;    
  }
}

module.exports = TTT;
