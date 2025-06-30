import {  useState } from 'react';

function Square({ value, onSquareClick }: { value?: string; onSquareClick: () => void }) {

  return(
    <button
      className="rounded-lg border-2 border-gray-400 shadow-md p-3 m-2 text-3xl font-bold h-20 w-20 bg-gradient-to-br from-white to-gray-200 hover:from-gray-100 hover:to-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
      onClick={onSquareClick}
    >
      {value}
    </button>
  )

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
  for(let i =0; i<lines.length; i++) {
    const [a, b, c] = lines[i];
    if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function Board({ X, square, onPlay }: { X: boolean; square: string[]; onPlay: (nextSquare: string[]) => void }) {
  const handleClick = (i:number) => {
    if(square[i] || calculateWinner(square)) {
      return;
    }
    const nextSquare = square.slice();
    if(X) {
      nextSquare[i] = 'X'
    } else {
      nextSquare[i] = 'O'
    } 
    onPlay(nextSquare);
  };
  
  const winner = calculateWinner(square);
  let status;
  if(winner) {
    status = `Winner: ${winner}`;
  } else if(square.every((value) => value)) {
    status = "It's a draw!";
  } else if(square.every((value) => value === null)) {
    status = 'Lets Start the Game!';
  } else{
    status = `Next player: ${X ? 'X' : 'O'}`;
  }
  return(
    <>
    <div className="flex justify-center flex-col items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      {status}
      <div className="flex flex-col items-center bg-white bg-opacity-90 border-4 border-purple-300 rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h1 className="text-4xl font-extrabold text-purple-700 mb-8 tracking-wide drop-shadow-lg">Tic Tac Toe</h1>
        <div className="flex flex-row justify-between">
          <Square value={square[0]} onSquareClick = {() => handleClick(0)}/>
          <Square value={square[1]} onSquareClick = {() => handleClick(1)}/>
          <Square value={square[2]} onSquareClick = {() => handleClick(2)}/>
        </div>
        <div className="flex flex-row justify-between">
          <Square value={square[3]} onSquareClick = {() => handleClick(3)}/>
          <Square value={square[4]} onSquareClick = {() => handleClick(4)}/>
          <Square value={square[5]} onSquareClick = {() => handleClick(5)}/>
        </div>
        <div className="flex flex-row justify-between">
          <Square value={square[6]} onSquareClick = {() => handleClick(6)}/>
          <Square value={square[7]} onSquareClick = {() => handleClick(7)}/>
          <Square value={square[8]} onSquareClick = {() => handleClick(8)}/>
        </div>
      </div>
    </div>
    </>
  )
}
export default function App() {
  const [history , setHistory] = useState<string[][]>([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState<number>(0);
  const X = currentMove % 2 === 0;
  const currSquare = history[currentMove];

  function handleplay(nextSquare: string[]){
    const nextHistory = [...history.slice(0, currentMove+1),nextSquare];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);

  }

  function jump(nextMove: number) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((square, move) =>{
    let description;
    if(move > 0){
      description = 'Move ' + move;
    }else {
      description = 'GO TO START';
    }
    return (
      <li key={move} className="mb-2">
        <button className="text-blue-500 hover:underline" onClick={() => jump(move)}>
          {description}
        </button>
      </li>
    )
  });

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-200">
      <Board X = {X} square={currSquare} onPlay = {handleplay} />
      <div className='flex m-10 h-[50%] flex-col' >
        <h2 className="text-2xl font-bold text-purple-700 mb-4">Game History</h2>
        <li  className="list-disc flex flex-col p-5">
          <ol>{moves}</ol>
        </li>
      </div>
    </div>
  );
}
