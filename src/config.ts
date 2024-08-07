export const config = {
  resolution: {
    width: 1280,
    height: 720,
  },

  size: {
    player: 100,
    asteroid: 120,
  },

  amount: { asteroid: 10, playerBullets: 10 },

  step: {
    player: 40,
    asteroid: 1.2,
    bullet: 5,
    asteroidRotation: 0.01,
  },

  keyBindings: {
    left: "ArrowLeft",
    right: "ArrowRight",
    shoot: " ",
  },
};
