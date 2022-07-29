export default class GameObject {
    constructor(x, y) {
        this.#checkValueIsPositiveNumber(x);
        this.#checkValueIsPositiveNumber(y);

        this.x = x;
        this.y = y;
    }

    #checkValueIsPositiveNumber(value) {
        if (isNaN(value) || value < 0) {
            throw new Error('value cannot be less than zero');
        }
    }

    render() { }
}
