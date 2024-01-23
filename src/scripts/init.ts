import { runner, startGame } from "cobys-epic-engine/runner";
import { clearCanvas, createCanvas } from "cobys-epic-engine/draw";
import { runAllSystems } from "cobys-epic-ecs/system";
import { addEntity, getEntity, queryEntities } from "cobys-epic-ecs/entity";
import { Position, RigidBody } from "cobys-epic-ecs/component";
import { Box, Collider, Player } from "./components";
import { fetchCompileCeon } from "cobys-epic-ecs/ceon";

import "./systems";
import "./components";
import "./events";

createCanvas(1000, 800, document.body);

runner.add(clearCanvas);
runner.add(runAllSystems);

startGame();


const used_components = {
    Position, RigidBody, Collider, Box, Player
};

// Use CEON (Coby's Epic (ECS) Object Notation) to load entities
fetchCompileCeon(used_components, "./ceon/entities.ceon");
