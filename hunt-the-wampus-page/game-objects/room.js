import Player from "./player.js";

export default class Room {
    constructor(gameObject) {
        this.gameObject = gameObject;
    }

    gameObject = null;

    render() {
        const roomElement = document.createElement('div');
        roomElement.classList.add('room');

        if (!this.gameObject === false) {
            if (this.gameObject instanceof Player) {
                roomElement.classList.add('player');
            }
        }

        return roomElement;
    }
}