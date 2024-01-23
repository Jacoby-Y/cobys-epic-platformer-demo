import Component, { Position } from "cobys-epic-ecs/component";
import { fillRect } from "cobys-epic-engine/draw";


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

    boxCollision(pos1: Position, pos2: Position, box2: Box): boolean {
        // Don't you just love ChatGPT?
        // Sure, I could've pretty easily done this, but... eh.

        // Calculate the boundaries of the two boxes
        const left1 = pos1.x;
        const right1 = pos1.x + this.w;
        const top1 = pos1.y;
        const bottom1 = pos1.y + this.h;
    
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

export class Collider extends Component {
    constructor() {
        super();
    }
}

export class Player extends Component {
    constructor(
        // Just for fun
        public name: string
    ) {
        super();
    }
}

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
