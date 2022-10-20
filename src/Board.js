import * as React from 'react';
import { useState } from 'react';
import Square from './Square';

export default function Board(props) {
  const [player, setPlayer] = useState(1);
  const [squares, setSquares] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const handleClick = (x, y) => {
    if (squares[y][x]) return;
    let squaresTemp = [];
    for (let i = 0; i < squares.length; i++) {
      squaresTemp[i] = squares[i].slice();
    }
    squaresTemp[y][x] = player;
    setSquares(squaresTemp);
    if (checkFull()) {
      reset();
    }
    if (checkForWin(x, y)) {
      alert(`Player ${player == 1 ? 'X' : 'O'} won!`);
      reset();
    }
    setPlayer(player == 2 ? 1 : 2);
  };

  const checkFull = () => {
    // count starts at 1 because the current turn is not yet recorded in the state
    let count = 1;
    for (let i = 0; i < squares.length; i++) {
      for (let j = 0; j < squares[i].length; j++) {
        if (squares[i][j]) count += 1;
      }
    }
    return count == squares.length * squares[0].length;
  };

  const checkForWin = (column, row) => {
    // count starts at 1 because the current turn is not yet recorded in the state
    // check row
    let count = 1;
    for (let i = 0; i < 3; i++) if (squares[row][i] == player) count += 1;
    if (count == 3) return true;

    // check column
    count = 1;
    for (let i = 0; i < 3; i++) if (squares[i][column] == player) count += 1;
    if (count == 3) return true;

    // check diagonal
    count = 1;
    if (row == column)
      for (let i = 0; i < 3; i++) if (squares[i][i] == player) count += 1;
    if (count == 3) return true;

    // check reverse diagonal
    count = 1;
    if (row + column == 2)
      for (let i = 0; i < 3; i++) if (squares[i][2 - i] == player) count += 1;
    if (count == 3) return true;
  };

  const reset = () => {
    setSquares([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  };

  let row_i = -1;
  let col_i = -1;
  return (
    <div className="board">
      <h2>Player {player == 1 ? 'X' : 'O'}</h2>
      <table>
        <tbody>
          {squares.map((row) => {
            row_i += 1;
            col_i = -1;
            return (
              <tr>
                {row.map((square) => {
                  col_i += 1;
                  return (
                    <td>
                      <Square
                        x={col_i}
                        y={row_i}
                        onClick={handleClick}
                        player={squares[row_i][col_i]}
                      />
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
