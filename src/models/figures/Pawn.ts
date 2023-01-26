import { Figure, FiguresName } from "./Figure";
import { Cell } from "./../Cell";
import { Colors } from "../Colors";

import whiteLogo from "../../assets/white-pawn.png";
import blackLogo from "../../assets/black-pawn.png";

export class Pawn extends Figure {
  isFirstStep: boolean = true;

  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FiguresName.PAWN;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    const direction = this.cell.figure?.color === Colors.BLACK ? 1 : -1;
    const firstStepDirection =
      this.cell.figure?.color === Colors.BLACK ? 2 : -2;

    if (
      (target.y === this.cell.y + direction ||
        (this.isFirstStep && target.y === this.cell.y + firstStepDirection)) &&
      target.x === this.cell.x &&
      this.cell.board.getCell(target.x, target.y).isEmpty()
    ) {
      return true;
    }
    if (
      target.y === this.cell.y + direction &&
      (target.x === this.cell.x + 1 || target.x === this.cell.x - 1) && this.cell.isEnemy(target) 
    ) {
      return true
    }
      return false;
  }

  movieFigure(target: Cell): void {
    super.movieFigure(target);
    this.isFirstStep = false;
  }
}
