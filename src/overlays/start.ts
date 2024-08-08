import * as PIXI from "pixi.js";

export const startContainer = async (app: PIXI.Application<PIXI.Renderer>) => {
  const overlayContainer = new PIXI.Container();
  overlayContainer.width = app.renderer.width;
  overlayContainer.height = app.renderer.height;
  app.stage.addChild(overlayContainer);

  // Optional: Add a background shape or sprite
  const background = new PIXI.Graphics();
  background.rect(0, 0, app.renderer.width, app.renderer.height);
  background.fill({ r: 17, g: 29, b: 74 });
  overlayContainer.addChild(background);

  // Add text instructions
  const instructions = new PIXI.Text({
    text: "Click to Start",
    style: {
      fontFamily: "Starjedi",
      fontSize: 36,
      fill: "white",
    },
  });
  instructions.anchor.set(0.5);
  instructions.position.set(
    app.renderer.width / 2,
    app.renderer.height / 2 - 50
  );
  overlayContainer.addChild(instructions);
  overlayContainer.interactive = true;

  return overlayContainer;
};
