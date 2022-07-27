import Player from "./player.js";
import Room from "./room.js";

export default class GameMap {
    constructor(player, size) {
        if (!player || player instanceof Player == false) {
            throw new Error('argument player connot be null or undefiend')
        }

        this.rooms = [];
        this.size = size;
        for (let y = 0; y < size; y++) {
            this.rooms[y] = [];
            for (let x = 0; x < size; x++) {
                this.rooms[y][x] = new Room();
            }
        }

        this.rooms[player.y][player.x] = new Room(player);
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