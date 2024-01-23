import Component, { Position } from "cobys-epic-ecs/component";
import { fillRect } from "cobys-epic-engine/draw";


/** Requires: Position. Draws a box. */
export class Box extends Component {
    constructor(
        public w: number,
        public h: number,
        public color: string = "#FF0000"
    ) {
        super();
    }

    draw(pos: Position) {
        fillRect(
            pos.x, pos.y,
            this.w, this.h,
            this.color
        );
    }
}

/** Requires: Position, Box. Tells engine that this is a Collider */
export class Collider extends Component {
    constructor() {
        super();
    }

    boxCollision(pos1: Position, box1: Box, pos2: Position, box2: Box): boolean {
        // Don't you just love ChatGPT?
        // Sure, I could've pretty easily done this, but... eh.

        // Calculate the boundaries of the two boxes
        const left1 = pos1.x;
        const right1 = pos1.x + box1.w;
        const top1 = pos1.y;
        const bottom1 = pos1.y + box1.h;
    
        const left2 = pos2.x;
        const right2 = pos2.x + box2.w;
        const top2 = pos2.y;
        const bottom2 = pos2.y + box2.h;
    
        // Check for collision
        if (
            left1 < right2 &&
            right1 > left2 &&
            top1 < bottom2 &&
            bottom1 > top2
        ) {
            // Collision occurred
            return true;
        }
    
        // No collision
        return false;
    }
}

/** Tells engine this is a Player (also, allows you to name your character, I guess lol) */
export class Player extends Component {
    constructor(
        // Just for fun
        public name: string
    ) {
        super();
    }
}

/** Creates a value that moves between 0 and 1, then back to 0, in the time given (in milliseconds) */
export class Animation extends Component {
    constructor(
        public max_time: number,
        public time = 0,
        private increasing = true,
    ) {
        super();
    }

    addTime(delta_time: number) {
        if (this.increasing) {
            this.time += delta_time;

            if (this.time >= this.max_time) {
                this.time = this.max_time;
                this.increasing = false;
            }
        } else {
            this.time -= delta_time;

            if (this.time <= 0) {
                this.time = 0;
                this.increasing = true;
            }
        }
    }

    /** Gets the percentage of the time moving back and forth from 0 and max_time */
    get fullPercentage() {
        return this.time / this.max_time;
    }

    /** Gets percentage of time only moving forward */
    get halfPercentage() {
        if (this.increasing) {
            return this.fullPercentage;
        }
        return 1 - this.fullPercentage;
    }
}
