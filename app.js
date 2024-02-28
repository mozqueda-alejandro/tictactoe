// Created by Rubi Dionisio and Alejandro Mozqueda
// Date: 02/24/2024


const getDefaultResult = () => {
    return {
        TIE: 0,
        UNDETERMINED: 1,
        WIN_STATE: []
    };
};

let Result = getDefaultResult();

class TicTacToe {
    constructor() {
        this.state = [['', '', ''], ['', '', ''], ['', '', '']];
        this.currentPlayer = (Math.random() > 0.5) ? 'X' : 'O';
        this.isPlayerTurn = Math.random() > 0.5;
        this.firstMove = true;
        this.moveCount = 0;
        this.gameOver = false;
        Result = getDefaultResult();
    }

    isGameOver() {
        return this.gameOver;
    }

    isValidMove(row, col) {
        console.assert(this.state[row][col] === '');
        return this.state[row][col] === '';
    }

    makeMove(row, col) {
        if (!this.isValidMove(row, col)) {
            return false;
        }
        console.log('Making move: ' + row + ', ' + col);
        this.state[row][col] = this.currentPlayer;
        this.moveCount++;

        // First player can move twice
        if (this.firstMove) {
            this.firstMove = false;
        } else {
            this.updatePlayer();
        }
        return true;
    }

    generateRandomMove() {
        let randomX, randomY;
        for (let i = 0; i < 30; i++) {
            const min = 0, max = 2;
            randomX = Math.floor(Math.random() * (max - min + 1)) + min;
            randomY = Math.floor(Math.random() * (max - min + 1)) + min;
            if (this.isValidMove(randomX, randomY)) {
                break;
            }
        }
        const moveId = randomX * 3 + randomY;
        console.log('Making random move: ' + randomX + ', ' + randomY);
        console.log('Move ID: ' + moveId);
        return moveId;
    }

    updatePlayer() {
        if (this.currentPlayer === 'X') {
            this.currentPlayer = 'O';
        } else if (this.currentPlayer === 'O') {
            this.currentPlayer = 'X';
        }

        this.isPlayerTurn = !this.isPlayerTurn;
    }

    getCurrentPlayer() {
        return this.currentPlayer;
    }

    getIsPlayerTurn() {
        return this.isPlayerTurn;
    }

    checkWinner() {
        let horizontalWin = [0, 1, 2];
        let verticalWin = [0, 3, 6];
        for (let i = 0; i < 3; i++) {
            // Row check
            if (this.state[i][0] === this.state[i][1] && this.state[i][1] === this.state[i][2] && this.state[i][0] !== '') {
                Result.WIN_STATE = horizontalWin.map(cell => cell + (i * 3));
                this.gameOver = true;
                return Result.WIN_STATE;
            }

            // Column check
            if (this.state[0][i] === this.state[1][i] && this.state[1][i] === this.state[2][i] && this.state[0][i] !== '') {
                Result.WIN_STATE = verticalWin.map(cell => cell + i);
                this.gameOver = true;
                return Result.WIN_STATE;
            }
        }

        // Diagonal checks
        if (this.state[0][0] === this.state[1][1] && this.state[1][1] === this.state[2][2] && this.state[0][0] !== '') {
            Result.WIN_STATE = [0, 4, 8];
            this.gameOver = true;
            return Result.WIN_STATE;

        } else if (this.state[0][2] === this.state[1][1] && this.state[1][1] === this.state[2][0] && this.state[0][2] !== '') {
            Result.WIN_STATE = [2, 4, 6];
            this.gameOver = true;
            return Result.WIN_STATE;
        }

        if (this.moveCount === 9) {
            this.gameOver = true;
            return Result.TIE;
        }

        return Result.UNDETERMINED;
    }

    printBoard() {
        console.log(this.state[0]);
        console.log(this.state[1]);
        console.log(this.state[2]);
    }
}