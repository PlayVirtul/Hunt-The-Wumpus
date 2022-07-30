import GameObject from "./game-object.js";
import Direction from "../direction.js";

export default class MoveableObject extends GameObject {
    constructor(x, y) {
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
}
