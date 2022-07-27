import Direction from "../Direction.js";

export default class Player {
    constructor(x, y) {
        if (!x || x < 0) {
            throw new Error('player\'s x cannot be less than zero');
        }

        if (!y || y < 0) {
            throw new Error('player\'s y cannot be less than zero')
        }

        this.x = x;
        this.y = y;
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
}