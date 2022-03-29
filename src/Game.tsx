import { ReactElement, useState } from 'react';
import Board from './Board';
import './Game.css';
const Game = () => {
    const [history, setHistory] = useState([{ squares: Array<string | null>(9).fill(null) }])
    const [current, setCurrent] = useState(Array<string | null>(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [status, setStatus] = useState("Next player: X");
    const [stepNumber, setStepNumber] = useState(0);
    const handleClick = (i: number) => {
       const localHistory = history.slice(0, stepNumber + 1);
        const current = localHistory[localHistory.length - 1];
        const squares = current.squares.slice();
        if (calculateWinner(squares) || squares[i]) {
            return;
        }
        squares[i] = xIsNext ? 'X' : 'O';
        setCurrent(squares);
        setHistory(localHistory.concat([{squares: squares}]));
        setStepNumber(localHistory.length);
        setXIsNext(!xIsNext);
        setStatus(winnerStatus(squares, !xIsNext));
    }

    const winnerStatus = (squares: Array<string | null>, xIsNext: boolean) : string  => {
        const winner = calculateWinner(squares);
        let status;
        if(winner) {
            status = 'Winner: ' + winner;
        }else {
            status = 'Next player: ' + (xIsNext ? 'X' : 'O');
        }
        return status;
    } 

    const jumpToStep = (step : number) => {
        setStepNumber(step);
        const current = history[step];
        const squares = current.squares.slice();
        setCurrent(squares);
        setXIsNext((step % 2) === 0);
        setStatus(winnerStatus(squares, (step % 2) === 0));
    }

    const calculateWinner = (squares: (string | null)[]) => {
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
    return (<div className="game">
        <div className="game-board">
            <Board squares={current} onClick={(i) => handleClick(i) }/>
    </div>
        <div className='game-info'>
            <div>{status}</div>
            <ol>
                {history.map((step, move) => {
                    return ( 
                        <li key={move}><button onClick={()=>jumpToStep(move)}>{ move ? 'Go to move #' + move : 'Go to game start'}</button></li>
                      );
                })}
            </ol>
        </div>
    </div>);
}
export default Game;