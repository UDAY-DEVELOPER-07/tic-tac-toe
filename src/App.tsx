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
    <div className="flex flex-col items-center w-[200%] md:w-[100%] lg:w-[80%] xl:w-[60%] 2xl:w-[50%] p-4">
      <div className="mb-4 text-xl font-semibold text-white drop-shadow-lg bg-purple-500 bg-opacity-70 px-6 py-2 rounded-full shadow">
        {status}
      </div>
      <div className="flex flex-col items-center bg-white bg-opacity-90 border-4 border-purple-300 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-[200%] font-extrabold text-purple-700 mb-8 tracking-wide drop-shadow-lg font-mono">
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
    <div className="flex flex-col md:flex-row justify-center items-center min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-800 md:bg-gradient-to-br md:from-gray-950 md:via-gray-900 md:to-gray-800 bg-gray-950 p-2 gap-5">
      {/* Game Board */}
      <div className="flex justify-center items-center w-full md:w-1/2">
      <Board X={X} square={currSquare} onPlay={handleplay} />
      </div>

      {/* History Panel for desktop/tablet (right side) */}
      <div className="hidden md:flex w-full md:w-[18%] bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 bg-opacity-90 rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 transition-all duration-300 border border-gray-700 text-gray-100 flex-col items-center">
      <button
        className="w-full mb-4 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-purple-700 text-white font-bold shadow-xl hover:bg-purple-800 transition-all duration-200 text-base sm:text-lg"
        onClick={() => setShowHistory((prev) => !prev)}
      >
        {showHistory ? 'Hide Game History' : 'Show Game History'}
      </button>

      {showHistory && (
        <>
        <h2 className="text-lg sm:text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 mb-4 font-mono text-center">
          Game History
        </h2>
        <ul className="list-disc list-inside space-y-2 overflow-y-auto max-h-[200px] sm:max-h-[250px] md:max-h-[300px] pr-1 sm:pr-2 text-gray-300 w-full text-sm sm:text-base">
          {moves}
        </ul>
        </>
      )}
      </div>

      {/* History Panel for mobile/tablet (below board) */}
      <div className="flex md:hidden w-full bg-gradient-to-br from-gray-800 via-gray-700 to-gray-600 bg-opacity-90 rounded-3xl shadow-2xl p-4 sm:p-6 transition-all duration-300 border border-gray-700 text-gray-100 flex-col items-center mt-4">
      <button
        className="w-full mb-4 px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-purple-700 text-white font-bold shadow-xl hover:bg-purple-800 transition-all duration-200 text-base sm:text-lg"
        onClick={() => setShowHistory((prev) => !prev)}
      >
        {showHistory ? 'Hide Game History' : 'Show Game History'}
      </button>

      {showHistory && (
        <>
        <h2 className="text-lg sm:text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 mb-4 font-mono text-center">
          Game History
        </h2>
        <ul className="list-disc list-inside space-y-2 overflow-y-auto max-h-[200px] sm:max-h-[250px] pr-1 sm:pr-2 text-gray-300 w-full text-sm sm:text-base">
          {moves}
        </ul>
        </>
      )}
      </div>
    </div>
    );
}
