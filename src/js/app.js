import { Field } from "./field/field";

import "./app.css";

const game = new Field();

document.addEventListener("DOMContentLoaded", () => {
  game.init();
});
