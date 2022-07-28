import Direction from "../direction.js";
import Arrow from "./arrow.js";
import GameObject from "./game-object.js";

export default class Player extends GameObject {
    constructor(x, y) {
        if (!x || x < 0) {
            throw new Error('player\'s x cannot be less than zero');
        }

        if (!y || y < 0) {
            throw new Error('player\'s y cannot be less than zero')
        }
        super(x, y);
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
        element.classList.add('player');

        return element;
    }
}


