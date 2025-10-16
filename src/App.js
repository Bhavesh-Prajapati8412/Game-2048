import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { move, resetGame } from './redux/gameSlice';
import Tile from './components/Tile';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const { board, score, gameOver } = useSelector((state) => state.game);

  useEffect(() => {
    const handleKey = (e) => {
      switch (e.key) {
        case 'ArrowLeft': dispatch(move('left')); break;
        case 'ArrowRight': dispatch(move('right')); break;
        case 'ArrowUp': dispatch(move('up')); break;
        case 'ArrowDown': dispatch(move('down')); break;
        default: break;
      }
    };

    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [dispatch]);

  return (
    <div className="container">
      <h1>2048 Game</h1>
      <div className="score">Score: {score}</div>
      {gameOver && (
        <div className="game-over">{gameOver === 'won' ? 'You Win!' : 'Game Over'}</div>
      )}
      <button className="restart" onClick={() => dispatch(resetGame())}>
        Restart
      </button>

      <div className="board">
        {board.map((row, y) =>
          row.map((value, x) => <Tile key={`${x}-${y}`} value={value} />)
        )}
      </div>
    </div>
  );
}

export default App;
