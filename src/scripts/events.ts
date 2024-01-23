import { getScoreboard } from "cobys-epic-ecs/scoreboard";
import signal from "cobys-epic-engine/signal";
import { clamp } from "cobys-epic-engine/cobys-utils";
import { Controller } from "./scoreboards";


const keys: Record<string, boolean> = {}

window.onkeydown = ({ key })=>{
    keys[key.toLowerCase()] = true;

    signal.emit("KeyEvent", keys);
}

window.onkeyup = ({ key })=>{
    keys[key.toLowerCase()] = false;

    signal.emit("KeyEvent", keys);
}

signal.listen("KeyEvent", (keys)=>{
    let horz = 0;
    let vert = 0;

    if (keys.a) horz -= 1;
    if (keys.d) horz += 1;
    if (keys.w) vert -= 1;
    if (keys.s) vert += 1;

    const controller = getScoreboard(Controller) as Controller;
    controller.horz = clamp(-1, horz, 1);
    controller.vert = clamp(-1, vert, 1);
});