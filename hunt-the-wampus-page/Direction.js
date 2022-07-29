export default class Direction {
    static get up() { return 0; };
    static get down() { return 1; };
    static get right() { return 2; };
    static get left() { return 3; };

    static get random() {
        return Math.floor(Math.random() * 4);
    }
}
