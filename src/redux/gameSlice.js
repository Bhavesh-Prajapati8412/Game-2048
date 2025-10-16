// redux/gameSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { initBoard, moveLeft, moveRight, moveUp, moveDown, addRandomTile } from '../utils/gameLogic';

const initialState = {
  board: initBoard(),
  score: 0,
  gameOver: false, // false, 'won', or 'lost'
};

const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    resetGame: (state) => {
      state.board = initBoard();
      state.score = 0;
      state.gameOver = false;
    },
    move: (state, action) => {
      if (state.gameOver) return; // No moves if game is over

      const direction = action.payload;
      let result;

      switch (direction) {
        case 'left':
          result = moveLeft(state.board);
          break;
        case 'right':
          result = moveRight(state.board);
          break;
        case 'up':
          result = moveUp(state.board);
          break;
        case 'down':
          result = moveDown(state.board);
          break;
        default:
          return;
      }

      // Only update board if it changed
      const boardChanged = JSON.stringify(result.newBoard) !== JSON.stringify(state.board);
      if (boardChanged) {
        state.board = addRandomTile(result.newBoard);
        state.score += result.totalScore;
      }

      // Check win
      if (state.board.flat().includes(2048)) {
        state.gameOver = 'won';
        return;
      }

      // Check if any moves are possible
      const canMove = (b) => {
        // Check for empty cells
        if (b.some(row => row.includes(0))) return true;

        // Horizontal merges
        for (let y = 0; y < b.length; y++) {
          for (let x = 0; x < b[y].length - 1; x++) {
            if (b[y][x] === b[y][x + 1]) return true;
          }
        }

        // Vertical merges
        for (let x = 0; x < b[0].length; x++) {
          for (let y = 0; y < b.length - 1; y++) {
            if (b[y][x] === b[y + 1][x]) return true;
          }
        }

        return false;
      };

      if (!canMove(state.board)) state.gameOver = 'lost';
    },
  },
});

export const { resetGame, move } = gameSlice.actions;
export default gameSlice.reducer;
