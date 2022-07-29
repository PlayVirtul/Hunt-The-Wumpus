import GameObject from "./game-object.js";
import Direction from "../direction.js";

export default class Wumpus extends GameObject {
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

    move(direction) {
        switch (direction) {
            case Direction.up:
                this.y--;
                break;

            case Direction.down:
                this.y++;
                break;

            case Direction.left:
                this.x--;
                break;

            case Direction.right:
                this.x++;
                break;
        }
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
        element.classList.add('wumpus');

        return element;
    }
}