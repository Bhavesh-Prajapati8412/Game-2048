// utils/gameLogic.js

// Initialize board with 2 random tiles
export const initBoard = (size = 4) => {
  const board = Array(size).fill().map(() => Array(size).fill(0));
  addRandomTile(board);
  addRandomTile(board);
  return board;
};

// Add a random tile (2 or 4) to an empty spot
export const addRandomTile = (board) => {
  if (!board) return board; // safety check

  const emptyCells = [];
  board.forEach((row, i) => {
    row.forEach((cell, j) => {
      if (cell === 0) emptyCells.push([i, j]);
    });
  });

  if (emptyCells.length === 0) return board;

  const [i, j] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[i][j] = Math.random() < 0.9 ? 2 : 4;
  return board;
};

// Slide and merge a single row to the left
export const slideAndMergeRow = (row) => {
  let newRow = row.filter((v) => v !== 0);
  let score = 0;

  for (let i = 0; i < newRow.length - 1; i++) {
    if (newRow[i] === newRow[i + 1]) {
      newRow[i] *= 2;
      score += newRow[i];
      newRow[i + 1] = 0;
    }
  }

  newRow = newRow.filter((v) => v !== 0);
  while (newRow.length < row.length) newRow.push(0);

  return { newRow, score };
};

// Move functions
export const moveLeft = (board) => {
  let totalScore = 0;
  const newBoard = board.map((row) => {
    const { newRow, score } = slideAndMergeRow(row);
    totalScore += score;
    return newRow;
  });
  return { newBoard, totalScore };
};

export const moveRight = (board) => {
  let totalScore = 0;
  const newBoard = board.map((row) => {
    const { newRow, score } = slideAndMergeRow(row.slice().reverse());
    totalScore += score;
    return newRow.slice().reverse();
  });
  return { newBoard, totalScore };
};

// Rotate board 90 degrees clockwise
export const rotateBoard = (board) => {
  const N = board.length;
  const newBoard = Array(N).fill().map(() => Array(N).fill(0));
  for (let i = 0; i < N; i++)
    for (let j = 0; j < N; j++) newBoard[j][N - 1 - i] = board[i][j];
  return newBoard;
};

export const moveUp = (board) => {
  const rotated = rotateBoard(rotateBoard(rotateBoard(board)));
  const { newBoard, totalScore } = moveLeft(rotated);
  return { newBoard: rotateBoard(newBoard), totalScore };
};

export const moveDown = (board) => {
  const rotated = rotateBoard(rotateBoard(rotateBoard(board)));
  const { newBoard, totalScore } = moveRight(rotated);
  return { newBoard: rotateBoard(newBoard), totalScore };
};
