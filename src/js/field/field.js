import Image from "../../img/goblin.png";

import "./field.css";

export class Field {
  constructor() {
    this.columns = [];
    this.currentElement = null;
    this.image = null;
    this.field = null;
    this.btnsRestart = null;

    this.intervalId = null;

    this.score = 0;
    this.miss = 0;

    this.scoreElement = null;
    this.missElement = null;

    this.hasClick = false;

    this.modal = null;
  }

  init() {
    this.createField();
    this.setEvents();
    this.runGame();
  }

  createField() {
    document.body.insertAdjacentHTML(
      "beforeend",
      `
      <div class="container">
        <div>
          <span>Points: </span><span class="score">0</span>
        </div>
        <div>
          <span>Miss: </span><span class="miss">0</span>
        </div>
        <table class="field">
            <tbody>
                <tr class="row">
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                </tr>
                <tr class="row">
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                </tr>
                <tr class="row">
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                </tr>
                <tr class="row">
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                    <td class="column"></td>
                </tr>
            </tbody>
        </table>
        <button class="btn-restart">Начать заново</button>
        <div class="modal hidden">
          <div class="modal-container">
            <span class="modal-text">Game over</span>
            <div>
              <span>Итоговый счет: </span>
              <span class="final-score">0</span>
            </div>
            <button class="modal-btn btn-restart">Начать заново</button>
          </div>
        </div>
      </div>
    `
    );
    this.field = document.querySelector(".field");
    this.columns = document.querySelectorAll(".column");
    this.btnsRestart = document.querySelectorAll(".btn-restart");
    this.scoreElement = document.querySelector(".score");
    this.missElement = document.querySelector(".miss");

    this.modal = document.querySelector(".modal");
    this.finalScore = document.querySelector(".final-score");
  }

  setEvents() {
    this.field.addEventListener("click", (e) => {
      if (e.target.classList.contains("img")) {
        this.hasClick = true;

        this.updateScore();

        this.image.remove();

        this.currentElement = null;
        this.image = null;
      }
    });

    [...this.btnsRestart].map((btn) =>
      btn.addEventListener("click", () => {
        this.runGame();
      })
    );
  }

  createImage() {
    const image = document.createElement("img");
    image.classList.add("img");
    image.setAttribute("src", Image);

    this.image = image;
  }

  insertImage(element) {
    this.currentElement = element;

    if (!this.image) {
      this.createImage();
    }
    element.appendChild(this.image);
  }

  runGame() {
    clearInterval(this.intervalId);
    this.updateScore(0);
    this.updateMiss(0);
    this.modal.classList.add("hidden");

    const run = () => {
      if (this.miss >= 5) {
        clearInterval(this.intervalId);
        this.updateFinalScore();
        this.modal.classList.remove("hidden");
        return;
      }

      this.insertImage(this.getRandomElement());
    };

    run();
    this.intervalId = setInterval(() => {
      if (!this.hasClick) {
        this.updateMiss();
      }

      this.hasClick = false;
      run();
    }, 1000);
  }

  updateScore(value) {
    if (value === undefined) {
      this.score += 1;
    } else {
      this.score = value;
    }
    this.scoreElement.textContent = this.score;
  }

  updateMiss(value) {
    if (value === undefined) {
      this.miss += 1;
    } else {
      this.miss = value;
    }
    this.missElement.textContent = this.miss;
  }

  updateFinalScore() {
    this.finalScore.textContent = this.score;
  }

  getRandomElement(currentElement) {
    const index = this.getRandomElementIndex();
    const element = this.columns[index];
    if (currentElement === element) {
      return this.getRandomElement(currentElement);
    }
    return element;
  }

  getRandomElementIndex() {
    return Math.floor(Math.random() * this.columns.length);
  }
}
