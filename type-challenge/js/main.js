import { AssetLoader } from './assets.js';
import { Renderer } from './renderer.js';
import { InputHandler } from './input.js';
import { Game } from './game.js';

async function init() {
  const canvas = document.getElementById('gameCanvas');
  const assets = new AssetLoader();

  // Load assets
  await assets.loadAll();

  const renderer = new Renderer(canvas, assets);
  const game = new Game(renderer, new InputHandler(null), assets); // InputHandler set game later or pass
  // Actually Game constuctor sets itself to inputhandler.

  // Hide Start Screen on button click
  const startBtn = document.getElementById('start-btn');
  startBtn.addEventListener('click', () => {
    document.getElementById('start-screen').classList.add('hidden');
    game.start();
  });
}

// Start
init();
