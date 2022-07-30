import Direction from "./direction.js";
import GameMap from "./game-objects/game-map.js";
import Player from "./game-objects/player.js";
import Pit from "./game-objects/pit.js";
import Bats from "./game-objects/bats.js";
import Wumpus from "./game-objects/wumpus.js";
import MoveableObject from "./game-objects/moveable-object.js";

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
        gameObjects.push(new Bats(3, 0));
        gameObjects.push(new Bats(2, 3));

        this.map = new GameMap(gameObjects, size);
        this.#draw();

        const controlsElement = document.getElementById('controls');
        const movementElement = this.#renderMovementControls();
        const attackElement = this.#renderAttackControls();
        controlsElement.prepend(movementElement);
        controlsElement.append(attackElement);
    }

    move(direction) {
        this.#moveGameObject(this.player, direction);

        this.#update();
        this.#redraw();
    }

    attack(direction) {
        const arrow = this.player.attack(direction);
        const room = this.map.rooms[arrow.y][arrow.x];
        room.add(arrow);

        this.#update();
        this.#redraw();
    }

    #moveGameObject(moveableObject, direction) {
        if (!moveableObject || !moveableObject instanceof MoveableObject) {
            throw new Error('only MoveableObject can be moved by Game.moveableObject');
        }

        let canMove = false;
        switch (direction) {
            case Direction.up:
                canMove = moveableObject.y > 0;
                break;

            case Direction.down:
                canMove = moveableObject.y < (this.map.size - 1);
                break;

            case Direction.left:
                canMove = moveableObject.x > 0;
                break;

            case Direction.right:
                canMove = moveableObject.x < (this.map.size - 1);
                break;
        }

        if (!canMove) {
            return;
        }

        let room = this.map.rooms[moveableObject.y][moveableObject.x];
        room.remove(moveableObject);

        moveableObject.move(direction);

        room = this.map.rooms[moveableObject.y][moveableObject.x];
        room.add(moveableObject);

        const pit = room.getObject(x => x instanceof Pit);

        if (pit) {
            moveableObject.die();
        }
    }

    #update() {
        const room = this.map.rooms[this.player.y][this.player.x];

        const wumpus = room.getObject(x => x instanceof Wumpus)
        const pit = room.getObject(x => x instanceof Pit);
        const bats = room.getObject(x => x instanceof Bats);

        if (wumpus) {
            this.player.die();
        } else if (pit) {
            this.player.die();
        } else if (bats) {
            const x = Math.floor(Math.random() * this.map.size);
            const y = Math.floor(Math.random() * this.map.size);

            let room = this.map.rooms[this.player.y][this.player.x];
            room.remove(this.player);

            this.player.x = x;
            this.player.y = y;

            room = this.map.rooms[this.player.y][this.player.x];
            room.add(this.player);

            this.#update();
        }

        const isWumpusSleep = Math.round(Math.random());

        if (!isWumpusSleep) {
            this.#moveGameObject(this.wumpus, Direction.random);

            const room = this.map.rooms[this.wumpus.y][this.wumpus.x];
            const player = room.getObject(x => x instanceof Player);

            if (player) {
                this.player.die();
            }
        }

        if (!this.player.isAlive) {
            const result = confirm("Ты проиграл! Попробовать ещё раз?");
            console.log(result);
        }

        if (!this.wumpus.isAlive) {
            const result = confirm("Ты победил! Попробовать ещё раз?");
            console.log(result);
        }
    }

    #draw() {
        const gameElement = document.getElementById('game');
        const mapElement = this.map.render();
        gameElement.prepend(mapElement);
    }

    #redraw() {
        this.#clean();
        this.#draw();
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