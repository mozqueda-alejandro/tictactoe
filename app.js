// Created by Rubi Dionisio and Alejandro Mozqueda
// Date: 02/24/2024

class TicTacToe {
  constructor() {
    this.state = [['', '', ''], ['', '', ''], ['', '', '']];
    this.currentPlayer = (Math.random > 0.5) ? 'X' : 'O';
    this.firstMove = true;
  }

  makeMove(row, col) {
    if (this.state[row][col] !== '') {
      return false;
    }

    this.state[row][col] = this.currentPlayer;

    // First player can move twice
    if (this.firstMove) {
      this.firstMove = false;
    } else {
      this.updatePlayer();
    }
    return true;
  }

  updatePlayer() {
    this.currentPlayer = this.currentPlayer === 'O' ? 'X' : 'O';
  }

  getCurrentPlayer() {
    return this.currentPlayer;
  }

  checkWinner() {
    for (let i = 0; i < 3; i++) {
      // Row check
      if (this.state[i][0] === this.state[i][1] && this.state[i][1] === this.state[i][2] && this.state[i][0] !== '') {
        return this.state[i][0];
      }

      // Column check
      if (this.state[0][i] === this.state[1][i] && this.state[1][i] === this.state[2][i] && this.state[0][i] !== '') {
        return this.state[0][i];
      }
    }

    // Diagonal check
    if (this.state[0][0] === this.state[1][1] && this.state[1][1] === this.state[2][2] && this.state[0][0] !== '') {
      return this.state[0][0];
    }

    // Other diagonal
    if (this.state[0][2] === this.state[1][1] && this.state[1][1] === this.state[2][0] && this.state[0][2] !== '') {
      return this.state[0][2];
    }

    return null;
  }

}

var plays = 0;

