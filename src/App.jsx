import { useState } from 'react'
import './App.css'

function App() {

  return (
    <div className='container'>
      <header>
        <img src="/img/tictactoelogo.svg" alt="" />
        <button className='turn'> <img src="/img/turn.svg" alt="" /> Turn</button>
        <button className='backItUp'> <img src="/img/Redo.svg" alt="" /> </button>
      </header>
     <Board />

    </div>
  )
}

function Square({value, onSquareClick}) {
  const className = `square ${value === 'O' ? 'O' : value === 'X' ? 'X' : ''}`;

  return (
    <button className={className} onClick={onSquareClick}>
      {value}
    </button>
  );
  }
  
  function Board() {
    //o olma durumu
    const [xIsNext, setXIsNext] = useState(true);
    const [squares, setSquares] = useState(Array(9).fill(null));
    //bunun yerine normal sabit bir dizide oluşturabilirdik
    //bir dizi 9 elemanlı değiişkneleri null her karenin başlangıçta boş olma durumu
    console.log(squares);

    const winner = calculateWinner(squares);

    function handleClick(i) {
      //birden fazla aynı karenin değişmesini engellemek için
      if (squares[i]  || calculateWinner(squares)) {
        return;
      }
      // onunla aynı değerlere sahip yeni bir dizi
      // doğrudan değiştirmek yerine kopyasını alıp üzerinde oynuyoruz == slice
      const nextSquares = squares.slice();
      if (xIsNext) {
        nextSquares[i] = "X";
      } else {
        nextSquares[i] = "O";
      }

      setSquares(nextSquares);
      setXIsNext(!xIsNext);
    
    }

    
    return (
      <div className='board'>
    <div className="board-row">
      <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
      {/* onSquareClick={handleClick} çalışmamasının nedeni hemen çağırıyor oluşumuz re-render hatası veriyor */}
      <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
      <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
    </div>
    <div className="board-row">
      <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
      <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
      <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
    </div>
    <div className="board-row">
      <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
      <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
      <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
    </div>
      <CalculateWinnerRender winner={winner} xIsNext={xIsNext}/>
  </div>
  )

}

function Game() {
  const [xIsNext, setXIsNext] = useState(true);
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const currentSquares = history[history.length - 1];
  
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
      <div className="game-info">
        <ol>{/*TODO*/}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  // bu dizide kazananın bir satırın sütun veya çapraz olup olmadığını kontrol ediyor kazanan oyuncunun sembolünü ("X" veya "O") döndürüp yoksa null döner.
  const lines = [
    //kazanmanın tüm olasılıkları
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

function CalculateWinnerRender({ winner, xIsNext }) {
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  return <div className="status">{status}</div>;
}

export default App
