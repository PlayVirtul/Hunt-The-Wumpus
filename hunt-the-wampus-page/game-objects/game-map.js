import Hole from "./room.js";

export default class GameMap {
    constructor() {
        const size = 10;
        this.rooms = [size, size];
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                this.room[i, j] = new Hole();
            }            
        }
    }
}