import { Position, RigidBody } from "cobys-epic-ecs/component";
import { addSystem } from "cobys-epic-ecs/system";
import { time } from "cobys-epic-engine/runner";
import { Box, Collider, Player } from "./components";
import { queryEntities } from "cobys-epic-ecs/entity";
import { getScoreboard } from "cobys-epic-ecs/scoreboard";
import { Controller } from "./scoreboards";

addSystem([Position, Box], (pos: Position, box: Box)=>{
    box.draw(pos);
});

addSystem([Position, RigidBody], (pos: Position, rb: RigidBody)=>{
    rb.movePosition(pos, time.delta);
    rb.addGravity();

    if (pos.y > 2000) {
        pos.x = 500;
        pos.y = 500;
    }
});

addSystem([Position, Box, Collider], (pos1: Position, box1: Box, c)=>{
    const bodies = queryEntities(Position, Box, RigidBody);

    for (let i = 0; i < bodies[0].length; i++) {
        const [pos2, box2, rb2] = [bodies[0][i], bodies[1][i], bodies[2][i]] as [Position, Box, RigidBody];
        
        if (box1.boxCollision(pos1, pos2, box2)) {
            const right = Math.abs((pos1.x) - (pos2.x + box2.w));
            const left = Math.abs((pos1.x + + box1.w) - (pos2.x));
            const top = Math.abs((pos2.y + box2.h) - pos1.y);
            const bottom = Math.abs((pos1.y + box1.h) - pos2.y);

            // Side in which the entity (with RB) is closest to;
            const closest = Math.min(left, right, top, bottom);

            if (closest == top) {
                rb2.vy = 0;
                pos2.y = pos1.y - box2.h;
            }
            else if (closest == bottom) {
                rb2.vy = 0;
                pos2.y = pos1.y + box1.h;
            }
            else if (closest == left) {
                rb2.vx = 0;
                pos2.x = pos1.x + box1.w;
            }
            else if (closest == right) {
                rb2.vx = 0;
                pos2.x = pos1.x - box2.w;
            }
        }
    }
});

addSystem([RigidBody, Player], (rb: RigidBody, player)=>{
    const { horz, vert } = getScoreboard(Controller) as Controller;

    rb.vx += horz * 0.1;

    if (rb.vy == 0 && vert < 0) rb.vy -= 2;

});