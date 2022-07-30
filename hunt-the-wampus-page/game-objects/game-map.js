import GameObject from "./game-object.js";
import Room from "./room.js";
import Direction from "../direction.js";

export default class GameMap {
    constructor(gameObjects, size) {
        if (!gameObjects && gameObjects.length == 0) {
            throw new Error('argument player connot be null or undefiend')
        }

        for (const gameObject of gameObjects) {
            if (gameObject instanceof GameObject == false) {
                throw new Error('argument player cannot be null undefiend');
            }
        }

        this.rooms = [];
        this.size = size;

        for (let y = 0; y < size; y++) {
            this.rooms[y] = [];
            for (let x = 0; x < size; x++) {
                this.rooms[y][x] = new Room();
            }
        }

        for (const gameObject of gameObjects) {
            const room = this.rooms[gameObject.y][gameObject.x];
            room.add(gameObject);
        }
    }

    isValidDirection(gameObject, direction) {
        if (!gameObject || !gameObject instanceof GameObject) {
            throw new Error('gameObject should be instance of GameObject');
        }

        switch (direction) {
            case Direction.up:
                return gameObject.y > 0;

            case Direction.down:
                return gameObject.y < (this.size - 1);

            case Direction.left:
                return gameObject.x > 0;

            case Direction.right:
                return gameObject.x < (this.size - 1);

            default:
                return false;
        }
    }

    render() {
        const mapElement = document.createElement('div');
        mapElement.id = 'map';

        for (const row of this.rooms) {
            const rowElement = document.createElement('div');
            rowElement.className = 'row';

            for (const room of row) {
                const roomElement = room.render();
                rowElement.append(roomElement);
            }

            mapElement.append(rowElement);
        }

        return mapElement;
    }
}