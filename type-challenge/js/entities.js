export class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.markedForDeletion = false;
  }

  update(dt) { }
  draw(ctx) { }
}

export class Penguin extends Entity {
  constructor(x, y, image) {
    super(x, y);
    this.image = image;
    this.width = 64;
    this.height = 64;
    this.angle = 0;
    this.targetAngle = 0;
  }

  update(dt) {
    // Subtle floating animation or rotation
    // Visually face the target fish? For now just idle wobble
    this.angle = Math.sin(Date.now() / 500) * 0.05;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    if (this.image) {
      // Draw centered
      ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
    } else {
      ctx.fillStyle = 'purple';
      ctx.fillRect(-20, -20, 40, 40);
    }
    ctx.restore();
  }
}

export class IceFloe extends Entity {
  constructor(x, y, image) {
    super(x, y);
    this.image = image;
    this.width = 120;
    this.height = 100;
    this.wobblePhase = 0;
  }

  update(dt) {
    this.wobblePhase += dt * 2;
  }

  draw(ctx) {
    ctx.save();
    const wobbleX = Math.sin(this.wobblePhase) * 5;
    const wobbleY = Math.cos(this.wobblePhase * 0.7) * 3;
    ctx.translate(this.x + wobbleX, this.y + wobbleY);
    // Slight rotation for whirlpool effect
    ctx.rotate(Math.sin(this.wobblePhase * 0.3) * 0.02);

    if (this.image) {
      ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
    } else {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(0, 0, 50, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();
  }
}

export class Fish extends Entity {
  constructor(x, y, text, speed, image) {
    super(x, y);
    this.text = text;
    this.speed = speed;
    this.image = image;
    this.width = 40;
    this.height = 30; // Aspect ratio check needed
    this.matchedIndex = 0; // How many chars matched
    this.isTargeted = false; // Is this fish currently being typed?
  }

  update(dt, targetY) {
    this.y += this.speed * dt;
    // Move slightly towards center target (penguin) if needed, 
    // but user said "Spawn top (fish swim from sea)", penguin is at center/bottom?
    // Let's assume penguin is at center of screen, fish spawn from top (off screen).
    // They should swim towards the center point (Penguin).

    const dx = (window.innerWidth / 2) - this.x;
    const dy = (window.innerHeight / 2) - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    // Normalize and move
    if (dist > 0) {
      this.x += (dx / dist) * (this.speed * 0.3) * dt; // Slight x movement
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    // Rotation to face movement direction (roughly down/center)
    // Calculate angle towards center
    const dx = (window.innerWidth / 2) - this.x;
    const dy = (window.innerHeight / 2) - this.y;
    const angle = Math.atan2(dy, dx);
    ctx.rotate(angle);

    if (this.image) {
      ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
    } else {
      ctx.fillStyle = 'blue';
      ctx.fillRect(-20, -10, 40, 20);
    }
    ctx.restore();

    // Draw Text Label
    // Reset transform for text to keep it upright or follow fish? 
    // Usually text is upright for readability.
    ctx.save();
    ctx.translate(this.x, this.y - 30); // Above fish
    ctx.font = "bold 20px Outfit, sans-serif";
    ctx.textAlign = "center";

    // Measure text
    const totalWidth = ctx.measureText(this.text).width;

    // Background for text
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    ctx.roundRect(-totalWidth / 2 - 4, -20, totalWidth + 8, 24, 4);
    ctx.fill();

    // Draw Matched Part (Green/Yellow)
    const matchedStr = this.text.substring(0, this.matchedIndex);
    const remainingStr = this.text.substring(this.matchedIndex);

    const matchWidth = ctx.measureText(matchedStr).width;
    const remWidth = ctx.measureText(remainingStr).width;

    const startX = - (matchWidth + remWidth) / 2;

    if (this.matchedIndex > 0) {
      ctx.fillStyle = '#facc15'; // Yellow-400
      ctx.fillText(matchedStr, startX + matchWidth / 2, 0);
    }

    ctx.fillStyle = 'white';
    // Draw remaining, offset by matched width
    ctx.fillText(remainingStr, startX + matchWidth + remWidth / 2, 0);

    ctx.restore();
  }
}

export class Bullet extends Entity {
  constructor(x, y, targetX, targetY, image) {
    super(x, y);
    this.targetX = targetX;
    this.targetY = targetY;
    this.speed = 1000;
    this.image = image;

    const dx = targetX - x;
    const dy = targetY - y;
    this.angle = Math.atan2(dy, dx);
    this.vx = Math.cos(this.angle) * this.speed;
    this.vy = Math.sin(this.angle) * this.speed;
  }

  update(dt) {
    this.x += this.vx * dt;
    this.y += this.vy * dt;

    // Check if reached target (simple distance check)
    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    if (Math.hypot(dx, dy) < 20) {
      this.markedForDeletion = true; // Hit
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    if (this.image) {
      ctx.drawImage(this.image, -10, -5, 20, 10);
    } else {
      ctx.fillStyle = 'gold';
      ctx.fillRect(-10, -2, 20, 4);
    }
    ctx.restore();
  }
}
