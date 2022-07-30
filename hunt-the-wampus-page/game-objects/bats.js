import GameObject from "./game-object.js";

export default class Bats extends GameObject {
    constructor(x, y) {
        super(x, y);
    }

    render() {
        const element = document.createElement('div');
        element.classList.add('bats');

        return element;
    }
}