import Direction from "../direction.js";
import Arrow from "./arrow.js";
import MoveableObject from "./moveable-object.js";

export default class Player extends MoveableObject {
    constructor(x, y) {
        super(x, y);

        this.#isAlive = true;
    }

    #isAlive = false;

    get isAlive() {
        return this.#isAlive;
    }

    die() {
        this.#isAlive = false;
    }

    attack(direction) {
        const attackRange = 1;

        let x = 0;
        let y = 0;

        switch (direction) {
            case Direction.up:
                x = this.x;
                y = this.y - attackRange;
                break;

            case Direction.down:
                x = this.x;
                y = this.y + attackRange;
                break;

            case Direction.left:
                x = this.x - attackRange;
                y = this.y;
                break;

            case Direction.right:
                x = this.x + attackRange;
                y = this.y;
                break;
        }

        return new Arrow(x, y);
    }

    render() {
        const element = document.createElement('div');
        element.classList.add('player');

        return element;
    }
}


