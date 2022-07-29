import Direction from "./direction.js";
import GameMap from "./game-objects/game-map.js";
import Player from "./game-objects/player.js";
import Pit from "./game-objects/pit.js";
import Wumpus from "./game-objects/wumpus.js";

class Game {
    run() {
        const size = 5;
        this.player = new Player(3, 2);
        this.wumpus = new Wumpus(1, 1);
        const gameObjects = [];

        gameObjects.push(this.player);
        gameObjects.push(this.wumpus);
        gameObjects.push(new Pit(0, 3));
        gameObjects.push(new Pit(4, 1));

        this.map = new GameMap(gameObjects, size);
        this.#draw();

        const controlsElement = document.getElementById('controls');
        const movementElement = this.#renderMovementControls();
        const attackElement = this.#renderAttackControls();
        controlsElement.prepend(movementElement);
        controlsElement.append(attackElement);
    }

    move(direction) {
        let movable = false;
        switch (direction) {
            case Direction.up:
                movable = this.player.y > 0;
                break;

            case Direction.down:
                movable = this.player.y < (this.map.size - 1);
                break;

            case Direction.left:
                movable = this.player.x > 0;
                break;

            case Direction.right:
                movable = this.player.x < (this.map.size - 1);
                break;
        }

        if (!movable) {
            return;
        }

        let room = this.map.rooms[this.player.y][this.player.x];
        room.remove(this.player);

        this.player.move(direction);

        room = this.map.rooms[this.player.y][this.player.x];
        room.add(this.player);

        const pit = room.getObject(x => x instanceof Pit);

        if (pit) {
            this.player.die();
        }

        this.#update();
    }

    attack(direction) {
        const arrow = this.player.attack(direction);
        const room = this.map.rooms[arrow.y][arrow.x];
        room.add(arrow);

        this.#update();
    }

    #update() {
        const room = this.map.rooms[this.player.y][this.player.x];

        const wumpus = room.getObject(x => x instanceof Wumpus)
        if (wumpus) {
            this.player.die();
        }

        const pit = room.getObject(x => x instanceof Pit);
        if (pit) {
            this.player.die();
        }

        if (!this.player.isAlive) {
            const result = confirm("Ты проиграл! Попробовать ещё раз?");
            console.log(result);
        }

        const isWumpusSleep = Math.round(Math.random());

        if (!isWumpusSleep) {
            let room = this.map.rooms[this.wumpus.y][this.wumpus.x];
            room.remove(this.wumpus);

            this.wumpus.move(Direction.random);

            room = this.map.rooms[this.wumpus.y][this.wumpus.x];
            room.add(this.wumpus);
        }

        this.#clean();
        this.#draw();
    }

    #draw() {
        const gameElement = document.getElementById('game');
        const mapElement = this.map.render();
        gameElement.prepend(mapElement);
    }

    #clean() {
        const mapElement = document.getElementById('map');
        if (mapElement) {
            mapElement.remove();
        }
    }

    #renderMovementControls() {
        const movementElement = document.createElement('div');

        const moveLeftButton = this.#createMovementButton('Left', Direction.left);
        const moveDownButton = this.#createMovementButton('Down', Direction.down);
        const moveUpButton = this.#createMovementButton('Up', Direction.up);
        const moveRightButton = this.#createMovementButton('Right', Direction.right);

        const nameMovementElement = document.createElement('p');
        nameMovementElement.innerText = 'Перемещение';

        movementElement.append(nameMovementElement);
        movementElement.append(moveLeftButton, moveDownButton, moveUpButton, moveRightButton);

        return movementElement;
    }

    #createMovementButton(name, direction) {
        const movementButton = document.createElement('button');
        movementButton.onclick = () => this.move(direction);
        movementButton.innerText = name;
        return movementButton;
    }

    #renderAttackControls() {
        const attackElement = document.createElement('div');

        const attackLeftButton = this.#createAttackButton('Left', Direction.left);
        const attackDownButton = this.#createAttackButton('Down', Direction.down);
        const attackUpButton = this.#createAttackButton('Up', Direction.up);
        const attackRightButton = this.#createAttackButton('Right', Direction.right);

        const nameAttackElement = document.createElement('p');
        nameAttackElement.innerText = 'Стрельба';

        attackElement.append(nameAttackElement);
        attackElement.append(attackLeftButton, attackDownButton, attackUpButton, attackRightButton);

        return attackElement;
    }

    #createAttackButton(name, direction) {
        const attackButton = document.createElement('button');
        attackButton.onclick = () => this.attack(direction);
        attackButton.innerText = name;
        return attackButton;
    }

}

const app = new Game();
app.run();