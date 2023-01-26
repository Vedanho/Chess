import { Figure } from "./figures/Figure";
import { King } from "./figures/King";
import { Colors } from "./Colors";
import { Cell } from "./Cell";
import { Queen } from "./figures/Queen";
import { Pawn } from "./figures/Pawn";
import { Knight } from "./figures/Knight";
import { Rook } from "./figures/Rook";
import { Bishop } from "./figures/Bishop";

export class Board {
  cells: Cell[][] = [];
  lostBlackFigures: Figure[] = [];
  lostWhiteFigures: Figure[] = [];

  public initCells() {
    for (let i = 0; i < 8; i++) {
      const row: Cell[] = [];
      for (let j = 0; j < 8; j++) {
        if ((i + j) % 2 !== 0) {
          row.push(new Cell(this, j, i, Colors.BLACK, null)); //Черные ячейки
        } else {
          row.push(new Cell(this, j, i, Colors.WHITE, null)); //Белые ячейки
        }
      }
      this.cells.push(row);
    }
  }

  public getCopyBoard(): Board {
    const newBoard = new Board();
    newBoard.cells = this.cells;
    newBoard.lostWhiteFigures = this.lostWhiteFigures;
    newBoard.lostBlackFigures = this.lostBlackFigures;
    return newBoard;
  }

  public highlightCells(selectedCell: Cell | null) {
    for (let i = 0; i < this.cells.length; i++) {
      const row = this.cells[i];
      for (let j = 0; j < this.cells.length; j++) {
        const target = row[j];
        target.available = !!selectedCell?.figure?.canMove(target);
      }
    }
  }

  public getCell(x: number, y: number) {
    return this.cells[y][x];
  }

  private addPawns() {
    for (let i = 0; i < 8; i++) {
      new Pawn(Colors.WHITE, this.getCell(i, 6));
      new Pawn(Colors.BLACK, this.getCell(i, 1));
    }
  }

  private addKings() {
    for (let i = 0; i < 1; i++) {
      new King(Colors.WHITE, this.getCell(4, 7));
      new King(Colors.BLACK, this.getCell(4, 0));
    }
  }

  private addQueens() {
    for (let i = 0; i < 1; i++) {
      new Queen(Colors.WHITE, this.getCell(3, 7));
      new Queen(Colors.BLACK, this.getCell(3, 0));
    }
  }

  private addKnights() {
    for (let i = 0; i < 1; i++) {
      new Knight(Colors.WHITE, this.getCell(1, 7));
      new Knight(Colors.BLACK, this.getCell(1, 0));
      new Knight(Colors.WHITE, this.getCell(6, 7));
      new Knight(Colors.BLACK, this.getCell(6, 0));
    }
  }

  private addRooks() {
    for (let i = 0; i < 1; i++) {
      new Rook(Colors.WHITE, this.getCell(7, 7));
      new Rook(Colors.BLACK, this.getCell(7, 0));
      new Rook(Colors.WHITE, this.getCell(0, 7));
      new Rook(Colors.BLACK, this.getCell(0, 0));
    }
  }

  private addBishops() {
    for (let i = 0; i < 1; i++) {
      new Bishop(Colors.WHITE, this.getCell(2, 7));
      new Bishop(Colors.BLACK, this.getCell(2, 0));
      new Bishop(Colors.WHITE, this.getCell(5, 7));
      new Bishop(Colors.BLACK, this.getCell(5, 0));
    }
  }

  public addFigure() {
    this.addPawns();
    this.addKings();
    this.addQueens();
    this.addKnights();
    this.addRooks();
    this.addBishops();
  }
}
