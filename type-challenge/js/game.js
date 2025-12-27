import { Penguin, IceFloe, Fish, Bullet } from './entities.js';
import { wordList } from './wordList.js';

export class Game {
  constructor(renderer, inputHandler, assets) {
    this.renderer = renderer;
    this.inputHandler = inputHandler;
    this.assets = assets;

    this.penguin = null;
    this.iceFloe = null;
    this.fish = [];
    this.bullets = [];

    this.lastTime = 0;
    this.spawnTimer = 0;
    this.spawnInterval = 2000;
    this.score = 0;
    this.wave = 1;
    this.isGameOver = false;
    this.isPlaying = false;

    this.inputHandler.game = this; // Link back
  }

  start() {
    this.isPlaying = true;
    this.isGameOver = false;
    this.score = 0;
    this.wave = 1;
    this.fish = [];
    this.bullets = [];
    this.spawnInterval = 2000;

    // Setup entities
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight * 0.8;

    this.iceFloe = new IceFloe(cx, cy, this.assets.getImage('ice'));
    this.penguin = new Penguin(cx, cy - 20, this.assets.getImage('penguin'));

    this.inputHandler.clear();
    this.inputHandler.init();

    this.updateUI();

    requestAnimationFrame((ts) => this.loop(ts));
  }

  loop(timestamp) {
    if (!this.isPlaying) return;

    const dt = (timestamp - this.lastTime) / 1000;
    this.lastTime = timestamp;

    if (this.isGameOver) return; // Stop updates but maybe keep drawing?

    this.update(dt);
    this.renderer.draw(this, dt);

    requestAnimationFrame((ts) => this.loop(ts));
  }

  update(dt) {
    // Spawning
    this.spawnTimer += dt * 1000;
    if (this.spawnTimer > this.spawnInterval) {
      this.spawnFish();
      this.spawnTimer = 0;
      // Difficulty curve
      this.spawnInterval = Math.max(500, 2000 - (this.score * 10));
    }

    // Update Entities
    if (this.iceFloe) this.iceFloe.update(dt);
    if (this.penguin) this.penguin.update(dt);

    // Fish
    const penguinY = this.penguin ? this.penguin.y : 0;

    this.fish.forEach(fish => {
      fish.update(dt);

      // Check Collision
      const dist = Math.hypot(fish.x - this.penguin.x, fish.y - this.penguin.y);
      if (dist < 60) { // Simple radius collision
        this.gameOver();
      }
    });

    // Bullets
    this.bullets.forEach(bullet => bullet.update(dt));

    // Remove dead entities
    this.fish = this.fish.filter(f => !f.markedForDeletion);
    this.bullets = this.bullets.filter(b => !b.markedForDeletion);
  }

  spawnFish() {
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    // Random X, Start Y (top -50)
    const x = Math.random() * (window.innerWidth - 100) + 50;
    const y = -50;
    const speed = 50 + (this.score * 2) + Math.random() * 50;

    this.fish.push(new Fish(x, y, word, speed, this.assets.getImage('fish')));
  }

  handleTyping(input) {
    let matchFound = false;
    let killFound = false;

    this.fish.forEach(fish => {
      // Prefix match
      if (fish.text.toLowerCase().startsWith(input)) {
        fish.matchedIndex = input.length;
        matchFound = true;

        // Full match check
        if (input === fish.text.toLowerCase()) {
          this.killFish(fish);
          killFound = true;
        }
      } else {
        fish.matchedIndex = 0; // Reset if broken flow? 
        // Wait, "input matches prefix of ANY fish".
        // If I type "a", fish "and" matches "a". Fish "bee" does not.
        // If I type "ab" (wrong), "and" mismatches. "bee" mismatches.
        // So fish.matchedIndex should reflect if IT matches the CURRENT input.
      }
    });

    // Visual feedback
    this.updateInputUI(input, matchFound);

    if (killFound) {
      this.inputHandler.clear(); // Clear input on kill
    }
  }

  updateInput(input) {
    // Called on backspace or clear needs to re-evaluate highlighting?
    // handleTyping handles logic, but if I simply set input (e.g. backspace), 
    // I should run logic again.
    this.handleTyping(input);
  }

  killFish(fish) {
    fish.markedForDeletion = true;
    this.score++;
    this.gameMultiplier++; // Combo logic?
    this.updateUI();

    // Spawn Bullet from Penguin to Fish
    this.bullets.push(new Bullet(this.penguin.x, this.penguin.y, fish.x, fish.y, this.assets.getImage('bullet')));

    // Play sound?
  }

  gameOver() {
    this.isGameOver = true;
    this.isPlaying = false; // Stop loop
    document.getElementById('game-over-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = this.score;
    document.getElementById('ui-layer').classList.add('hidden');

    // Trigger breakdown animation logic in Renderer potentially
  }

  updateUI() {
    document.getElementById('scoreDisplay').innerText = this.score;
    // document.getElementById('waveDisplay').innerText = ...;
  }

  updateInputUI(input, isValid) {
    const disp = document.getElementById('input-display');
    disp.innerText = input;
    disp.style.color = isValid ? '#facc15' : '#ef4444'; // Yellow or Red
  }
}
