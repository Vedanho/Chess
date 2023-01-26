import { Colors } from "./Colors";
import React from "react";

export class Player {
  color: Colors;

  constructor(color: Colors) {
    this.color = color;
  }
}

export default Player;
