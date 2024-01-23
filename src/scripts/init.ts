import { runner, startGame } from "cobys-epic-engine/runner";
import { clearCanvas, createCanvas } from "cobys-epic-engine/draw";
import { runAllSystems } from "cobys-epic-ecs/system";
import { Position, RigidBody } from "cobys-epic-ecs/component";
import { Box, Collider, Player, Animation } from "./components";
import { fetchCompileCeon } from "cobys-epic-ecs/ceon";

// Import other scripts
import "./systems";
import "./components";
import "./events";

// Create canvas
createCanvas(
    // Width, Height
    1000, 800, 
    // Attach to the body
    document.body
);

// Clear the canvas every frame
runner.add(clearCanvas);
// Run all ECS systems every frame
runner.add(runAllSystems);
// Start the game
startGame();


// Set of components used in .ceon files
const used_components = {
    Position, RigidBody, Collider, Box, Player, Animation
};

// Use CEON (Coby's Epic (ECS) Object Notation) to load entities
fetchCompileCeon(used_components, "./ceon/entities.ceon");
// Find file at /public/ceon/entities.ceon
