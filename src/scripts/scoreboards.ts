import { setScoreboard } from "cobys-epic-ecs/scoreboard";

export class Controller {
    constructor(
        public horz = 0,
        public vert = 0,
    ) { }
}

setScoreboard(new Controller());