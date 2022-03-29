import React, { ReactElement, useState } from "react";
import Square from "./Square";
import './Board.css';

interface BoardProps {
    squares: Array<string | null>
}

const Board = (props: { squares: Array<string | null>, onClick(val: number): void }) => {
    const renderSquare = (i: number) => (<Square value={props.squares[i]} onClick={() => props.onClick(i)} />);

    return (<div>
        <div className="board-row">
            {renderSquare(0)}
            {renderSquare(1)}
            {renderSquare(2)}
        </div>
        <div className="board-row">
            {renderSquare(3)}
            {renderSquare(4)}
            {renderSquare(5)}
        </div>
        <div className="board-row">
            {renderSquare(6)}
            {renderSquare(7)}
            {renderSquare(8)}
        </div>
    </div>);
}
export default Board;