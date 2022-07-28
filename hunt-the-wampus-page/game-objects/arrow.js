import GameObject from "./game-object.js";

export default class Arrow extends GameObject {
    constructor(x, y) {
        super(x, y);
    }

    render() {
        const element = document.createElement('div');
        element.classList.add('arrow');
        return element;
    }
}