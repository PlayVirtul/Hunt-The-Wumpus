import GameMap from "./game-objects/game-map.js";

class Application {
    run() {
        this.map = new GameMap();
    }
}

let app = new Application();
app.run();