import { Figure, FiguresName } from "./Figure";
import { Cell } from "./../Cell";
import { Colors } from "../Colors";

import whiteLogo from "../../assets/white-bishop.png";
import blackLogo from "../../assets/black-bishop.png";

export class Bishop extends Figure {
  constructor(color: Colors, cell: Cell) {
    super(color, cell);
    this.logo = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FiguresName.BISHOP;
  }

  canMove(target: Cell): boolean {
    if (!super.canMove(target)) {
      return false;
    }
    if (this.cell.isEmptyDiagonal(target)) {
      return true;
    }
    return false;
  }
}
