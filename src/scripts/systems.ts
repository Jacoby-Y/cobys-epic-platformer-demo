import { Position, RigidBody } from "cobys-epic-ecs/component";
import { addSystem } from "cobys-epic-ecs/system";
import { time } from "cobys-epic-engine/runner";
import { Animation, Box, Collider, Player } from "./components";
import { queryEntities } from "cobys-epic-ecs/entity";
import { getScoreboard } from "cobys-epic-ecs/scoreboard";
import { Controller } from "./scoreboards";
import { fillRect, fillText } from "cobys-epic-engine/draw";

/// Drawing boxes
addSystem([Position, Box], (pos: Position, box: Box)=>{
    box.draw(pos);
});

// Drawing player nametags (for fun)
addSystem([Position, Box, Player], (pos: Position, box: Box, player: Player)=>{
    fillText(
        player.name,
        pos.x + box.w / 2,
        pos.y - 35,
        "#FFFFFF",
        20
    );
});

// Moving positions with rigidbodies
addSystem([Position, RigidBody], (pos: Position, rb: RigidBody)=>{
    rb.movePosition(pos, time.delta);
    rb.addGravity();

    if (pos.y > 2000) {
        pos.x = 500;
        pos.y = 500;
    }
});

// Colliding rigidbodies with static colliders
addSystem([Position, Box, Collider], (pos1: Position, box1: Box, col: Collider)=>{
    const bodies = queryEntities(Position, Box, RigidBody);

    for (let i = 0; i < bodies[0].length; i++) {
        const [pos2, box2, rb2] = [bodies[0][i], bodies[1][i], bodies[2][i]] as [Position, Box, RigidBody];
        
        if (col.boxCollision(pos1, box1, pos2, box2)) {
            const right = Math.abs((pos1.x) - (pos2.x + box2.w));
            const left = Math.abs((pos1.x + + box1.w) - (pos2.x));
            const top = Math.abs((pos2.y + box2.h) - pos1.y);
            const bottom = Math.abs((pos1.y + box1.h) - pos2.y);

            // Side in which the entity (with RB) is relative to collider
            const closest = Math.min(left, right, top, bottom);

            if (closest == top) {
                rb2.vy = 0;
                pos2.y = pos1.y - box2.h;
            }
            else if (closest == bottom) {
                rb2.vy = 0.001;
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

// Move player's rigidbody using controller
addSystem([RigidBody, Player], (rb: RigidBody, _player)=>{
    const { horz, vert } = getScoreboard(Controller) as Controller;

    rb.vx += horz * 0.1;

    if (rb.vy == 0 && vert < 0) rb.vy -= 2;

});

// Animate player's little boxes (for fun)
addSystem([Position, Box, Player, Animation], (pos: Position, box: Box, _p, anim: Animation)=>{
    fillRect(
        pos.x + ((box.w-10) * anim.fullPercentage),
        pos.y - 15,
        10, 10,
        box.color
    );

    fillRect(
        pos.x + ((box.w-10) * anim.halfPercentage),
        pos.y - 30,
        10, 10,
        box.color
    );
});

// Update animations
addSystem([Animation], (anim: Animation)=>{
    anim.addTime(time.delta);
});
