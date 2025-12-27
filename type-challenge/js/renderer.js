export class Renderer {
  constructor(canvas, assets) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.assets = assets;
    this.width = canvas.width;
    this.height = canvas.height;
    this.bgOffsetY = 0;

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.width = this.canvas.width;
    this.height = this.canvas.height;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }

  draw(gameState, dt) {
    this.clear();

    // Draw Background
    this.drawBackground(dt);

    // Draw entities
    // Ice Floe (below penguin)
    if (gameState.iceFloe) gameState.iceFloe.draw(this.ctx);

    // Penguin
    if (gameState.penguin) gameState.penguin.draw(this.ctx);

    // Fish (behind text? NO, draw fish then text. Entity draw handles it)
    gameState.fish.forEach(fish => fish.draw(this.ctx));

    // Bullets
    gameState.bullets.forEach(bullet => bullet.draw(this.ctx));

    // Particles?
  }

  drawBackground(dt) {
    // Simple scrolling water effect
    this.bgOffsetY += 50 * dt;
    if (this.bgOffsetY > this.height) this.bgOffsetY = 0;

    const bgImg = this.assets.getImage('bg');
    if (bgImg) {
      // Tile the background?
      // Assuming bgImg is tileable.
      const ptrn = this.ctx.createPattern(bgImg, 'repeat');
      this.ctx.fillStyle = ptrn;

      this.ctx.save();
      this.ctx.translate(0, this.bgOffsetY);
      this.ctx.fillRect(0, -this.bgOffsetY, this.width, this.height + this.bgOffsetY); // Fill slightly more to cover scroll?
      // Actually createPattern + translate might be tricky.
      // Simpler: Draw image twice.
      // Pattern approach:
    } else {
      // Fallback gradient
      const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);
      grad.addColorStop(0, '#0f172a'); // Slate 900
      grad.addColorStop(1, '#1e3a8a'); // Blue 900
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }

    // Draw grid or moving lines to simulate infinite sea backward motion
    this.ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    this.ctx.lineWidth = 2;
    const spacing = 100;
    const offset = this.bgOffsetY % spacing;

    for (let y = offset - spacing; y < this.height; y += spacing) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(this.width, y);
      this.ctx.stroke();
    }
  }
}
