import { useState } from 'react';

function Square({ value, onSquareClick }: { value?: string; onSquareClick: () => void }) {
  return (
    <button
      className="rounded-xl border-2 border-purple-300 shadow-lg p-3 m-2 text-4xl font-extrabold h-20 w-20 bg-gradient-to-br from-white via-purple-100 to-purple-200 hover:from-purple-50 hover:to-purple-300 transition-colors duration-200 focus:outline-none focus:ring-4 focus:ring-purple-400 text-purple-700"
      onClick={onSquareClick}
    >
      {value}
    </button>
  );
}

function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ X, square, onPlay }: { X: boolean; square: string[]; onPlay: (nextSquare: string[]) => void }) {
  const handleClick = (i: number) => {
    if (square[i] || calculateWinner(square)) {
      return;
    }
    const nextSquare = square.slice();
    nextSquare[i] = X ? 'X' : 'O';
    onPlay(nextSquare);
  };

  const winner = calculateWinner(square);
  let status;
  if (winner) {
    status = `🏆 Winner: ${winner}`;
  } else if (square.every((value) => value)) {
    status = "🤝 It's a draw!";
    alert(status);
  } else if (square.every((value) => value === null)) {
    status = 'Let’s Start the Game!';
  } else {
    status = `Next player: ${X ? '❌ ' : '⭕ '}`;
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-xl font-semibold text-white drop-shadow-lg bg-purple-500 bg-opacity-70 px-6 py-2 rounded-full shadow">
        {status}
      </div>
      <div className="flex flex-col items-center bg-white bg-opacity-90 border-4 border-purple-300 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-500 to-blue-500 mb-8 tracking-wide drop-shadow-lg font-mono">
          Tic Tac Toe
        </h1>
        <div className="flex flex-row justify-between">
          <Square value={square[0]} onSquareClick={() => handleClick(0)} />
          <Square value={square[1]} onSquareClick={() => handleClick(1)} />
          <Square value={square[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="flex flex-row justify-between">
          <Square value={square[3]} onSquareClick={() => handleClick(3)} />
          <Square value={square[4]} onSquareClick={() => handleClick(4)} />
          <Square value={square[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="flex flex-row justify-between">
          <Square value={square[6]} onSquareClick={() => handleClick(6)} />
          <Square value={square[7]} onSquareClick={() => handleClick(7)} />
          <Square value={square[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [history, setHistory] = useState<string[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const X = currentMove % 2 === 0;
  const currSquare = history[currentMove];
  const [showHistory, setShowHistory] = useState<boolean>(false); // Add state for toggling

  function handleplay(nextSquare: string[]) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jump(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((_, move) => {
    let description;
    if (move > 0) {
      description = 'Move ' + move;
    } else {
      description = 'Go to Start';
    }
    return (
      <li key={move} className="mb-2">
        <button
          className="text-lg font-semibold text-purple-600 hover:text-white hover:bg-purple-500 transition px-4 py-2 rounded-lg shadow"
          onClick={() => jump(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-400 via-pink-300 to-blue-200">
      <Board X={X} square={currSquare} onPlay={handleplay} />
      <div className="flex m-10 h-[50%] flex-col bg-white bg-opacity-80 rounded-2xl shadow-xl p-8">
        <button
          className="mb-4 px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-400 to-blue-400 text-white font-bold shadow-lg hover:scale-105 transition"
          onClick={() => setShowHistory((prev) => !prev)}
        >
          {showHistory ? 'Hide Game History' : 'Show Game History'}
        </button>
        {showHistory && (
          <>
            <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-500 to-blue-500 mb-4 font-mono">
              Game History
            </h2>
            <ul className="list-disc flex flex-col p-2">{moves}</ul>
          </>
        )}
      </div>
    </div>
  );
}
