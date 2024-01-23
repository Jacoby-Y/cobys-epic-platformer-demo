import { setScoreboard } from "cobys-epic-ecs/scoreboard";


/** Save the move directions based on the keys pressed */
export class Controller {
    constructor(
        public horz = 0,
        public vert = 0,
    ) { }
}

// Just used for an easy, more proper feeling, way to get/set a "global" state
setScoreboard(new Controller());
