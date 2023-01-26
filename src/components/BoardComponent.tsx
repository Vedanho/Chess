import React, { useState } from "react";
import { Board } from "../models/Board";
import { Cell } from "../models/Cell";
import Player from "../models/Player";
import CellComponent from "./CellComponent";

interface BoardComponentProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: React.FC<BoardComponentProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  const [selected, setSelected] = useState<Cell | null>(null);

  function click(cell: Cell) {
    if (selected && selected !== cell && selected.figure?.canMove(cell)) {
      selected.movieFigure(cell);
      swapPlayer();
      setSelected(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelected(cell);
      }
    }
  }

  React.useEffect(() => {
    highlightCells();
  }, [selected]);

  function highlightCells() {
    board.highlightCells(selected);
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div>
      <h3>Текущий игрок {currentPlayer?.color}</h3>
      <div className="board">
        {board.cells.map((row, index) => (
          <React.Fragment key={index}>
            {row.map((cell) => (
              <CellComponent
                key={cell.id}
                cell={cell}
                selected={cell.x === selected?.x && cell.y === selected?.y}
                click={click}
              />
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default BoardComponent;
