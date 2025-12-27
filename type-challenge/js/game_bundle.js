// 1. Word List
const wordList = [
  "the", "be", "to", "of", "and", "a", "in", "that", "have", "i", "it", "for", "not", "on", "with", "he", "as", "you", "do", "at",
  "this", "but", "his", "by", "from", "they", "we", "say", "her", "she", "or", "an", "will", "my", "one", "all", "would", "there", "their", "what",
  "so", "up", "out", "if", "about", "who", "get", "which", "go", "me", "when", "make", "can", "like", "time", "no", "just", "him", "know", "take",
  "people", "into", "year", "your", "good", "some", "could", "them", "see", "other", "than", "then", "now", "look", "only", "come", "its", "over", "think", "also",
  "back", "after", "use", "two", "how", "our", "work", "first", "well", "way", "even", "new", "want", "because", "any", "these", "give", "day", "most", "us",
  "apple", "banana", "orange", "grape", "fruit", "house", "table", "chair", "desk", "book", "pen", "pencil", "paper", "phone", "computer", "mouse", "keyboard", "screen", "window", "door",
  "floor", "wall", "ceiling", "light", "dark", "sun", "moon", "star", "sky", "cloud", "rain", "snow", "wind", "storm", "fire", "water", "earth", "tree", "flower", "grass",
  "dog", "cat", "bird", "fish", "horse", "cow", "pig", "sheep", "chicken", "duck", "lion", "tiger", "bear", "elephant", "monkey", "rabbit", "snake", "lizard", "spider", "insect",
  "red", "blue", "green", "yellow", "orange", "purple", "pink", "brown", "black", "white", "gray", "silver", "gold", "metal", "wood", "plastic", "glass", "stone", "rock", "sand",
  "run", "walk", "jump", "swim", "fly", "eat", "drink", "sleep", "wake", "dream", "talk", "listen", "read", "write", "sing", "dance", "play", "fight", "love", "hate",
  "happy", "sad", "angry", "scared", "tired", "hungry", "thirsty", "sick", "healthy", "strong", "weak", "fast", "slow", "smart", "stupid", "rich", "poor", "old", "young", "new",
  "javascript", "html", "css", "code", "program", "developer", "engineer", "software", "hardware", "network", "server", "client", "browser", "internet", "web", "app", "mobile", "desktop", "laptop", "tablet",
  "game", "play", "music", "movie", "art", "design", "draw", "paint", "color", "shape", "form", "space", "time", "dimension", "universe", "galaxy", "planet", "world", "country", "city",
  "friend", "family", "mother", "father", "sister", "brother", "son", "daughter", "wife", "husband", "parent", "child", "baby", "adult", "human", "animal", "plant", "food", "drink", "meal",
  "breakfast", "lunch", "dinner", "snack", "dessert", "cake", "cookie", "candy", "chocolate", "ice", "cream", "sugar", "salt", "pepper", "spice", "herb", "vegetable", "meat", "fish", "fruit",
  "school", "university", "college", "class", "lesson", "teacher", "student", "learn", "study", "test", "exam", "grade", "score", "pass", "fail", "graduate", "degree", "diploma", "job", "work",
  "money", "cash", "bank", "account", "credit", "debit", "card", "pay", "buy", "sell", "trade", "market", "economy", "business", "company", "corporation", "office", "manager", "boss", "employee",
  "doctor", "nurse", "medicine", "health", "hospital", "clinic", "pharmacy", "pill", "drug", "virus", "bacteria", "germ", "disease", "treatment", "cure", "heal", "recover", "life", "death", "die",
  "war", "peace", "fight", "battle", "attack", "defend", "weapon", "gun", "bomb", "sword", "shield", "armor", "helmet", "uniform", "soldier", "army", "navy", "force", "power", "strength",
  "speed", "velocity", "acceleration", "force", "energy", "mass", "weight", "gravity", "friction", "heat", "temperature", "cold", "hot", "warm", "cool", "freeze", "melt", "boil", "evaporate", "condense",
  "solid", "liquid", "gas", "plasma", "matter", "atom", "molecule", "particle", "electron", "proton", "neutron", "nucleus", "orbit", "spin", "charge", "field", "wave", "light", "sound", "noise",
  "voyage", "adventure", "journey", "quest", "mission", "task", "challenge", "problem", "solution", "answer", "question", "ask", "reply", "respond", "speak", "voice", "sound", "hear", "listen", "ear",
  "eye", "sight", "vision", "look", "watch", "see", "blind", "deaf", "mute", "silent", "loud", "quiet", "soft", "hard", "rough", "smooth", "sharp", "dull", "bright", "dark",
  "penguin", "antarctica", "snowball", "blizzard", "glacier", "iceberg", "chilly", "frost", "frozen", "winter", "coldness", "shiver", "puddle", "slide", "slip", "waddle", "beak", "wing", "feather", "flipper"
];

// 2. Asset Loader
class AssetLoader {
  constructor() {
    this.images = {};
    this.assets = [
      { key: 'penguin', src: 'assets/penguin.png' },
      { key: 'fish', src: 'assets/fish.png' },
      { key: 'ice', src: 'assets/ice_floe.png' },
      { key: 'bg', src: 'assets/water_bg.png' },
      { key: 'bullet', src: 'assets/bullet.png' }
    ];
    this.loadedCount = 0;
  }

  async loadAll() {
    console.log("Loading assets...");
    const promises = this.assets.map(asset => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = asset.src;
        img.onload = () => {
          this.images[asset.key] = img;
          this.loadedCount++;
          console.log(`Loaded ${asset.key}`);
          resolve();
        };
        img.onerror = () => {
          console.error(`Failed to load asset: ${asset.key}`);
          // Ensure we resolve even on error so game starts
          resolve();
        }
      });
    });

    await Promise.all(promises);
    console.log("All assets loaded.");
    return this.images;
  }

  getImage(key) {
    return this.images[key];
  }
}

// 3. Entities
class Entity {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.markedForDeletion = false;
  }

  update(dt) { }
  draw(ctx) { }
}

class Penguin extends Entity {
  constructor(x, y, image) {
    super(x, y);
    this.image = image;
    this.width = 64;
    this.height = 64;
    this.angle = 0;
    this.targetAngle = 0;
  }

  update(dt) {
    this.angle = Math.sin(Date.now() / 500) * 0.05;
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    if (this.image) {
      ctx.drawImage(this.image, -this.width / 2, -this.height / 2, this.width, this.height);
    } else {
      ctx.fillStyle = 'purple';
      ctx.fillRect(-20, -20, 40, 40);
    }
    ctx.restore();
  }
}

class IceFloe extends Entity {
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

class Fish extends Entity {
  constructor(x, y, text, speed, image) {
    super(x, y);
    this.text = text;
    this.speed = speed;
    this.image = image;
    this.width = 40;
    this.height = 30;
    this.matchedIndex = 0;
    this.isTargeted = false;
  }

  update(dt, targetY) {
    this.y += this.speed * dt;

    const dx = (window.innerWidth / 2) - this.x;
    const dy = (window.innerHeight / 2) - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist > 0) {
      this.x += (dx / dist) * (this.speed * 0.3) * dt;
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

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
    ctx.save();
    ctx.translate(this.x, this.y - 30);
    ctx.font = "bold 20px Outfit, sans-serif";
    ctx.textAlign = "center";

    const totalWidth = ctx.measureText(this.text).width;

    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.beginPath();
    // roundRect check
    if (ctx.roundRect) {
      ctx.roundRect(-totalWidth / 2 - 4, -20, totalWidth + 8, 24, 4);
    } else {
      ctx.rect(-totalWidth / 2 - 4, -20, totalWidth + 8, 24);
    }
    ctx.fill();

    const matchedStr = this.text.substring(0, this.matchedIndex);
    const remainingStr = this.text.substring(this.matchedIndex);

    const matchWidth = ctx.measureText(matchedStr).width;
    const remWidth = ctx.measureText(remainingStr).width;

    const startX = - (matchWidth + remWidth) / 2;

    if (this.matchedIndex > 0) {
      ctx.fillStyle = '#facc15';
      ctx.fillText(matchedStr, startX + matchWidth / 2, 0);
    }

    ctx.fillStyle = 'white';
    ctx.fillText(remainingStr, startX + matchWidth + remWidth / 2, 0);

    ctx.restore();
  }
}

class Bullet extends Entity {
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

    const dx = this.targetX - this.x;
    const dy = this.targetY - this.y;
    if (Math.hypot(dx, dy) < 20) {
      this.markedForDeletion = true;
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

// 4. Renderer
class Renderer {
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
    this.drawBackground(dt);

    if (gameState.iceFloe) gameState.iceFloe.draw(this.ctx);
    if (gameState.penguin) gameState.penguin.draw(this.ctx);
    gameState.fish.forEach(fish => fish.draw(this.ctx));
    gameState.bullets.forEach(bullet => bullet.draw(this.ctx));
  }

  drawBackground(dt) {
    this.bgOffsetY += 50 * dt;
    if (this.bgOffsetY > this.height) this.bgOffsetY = 0;

    const bgImg = this.assets.getImage('bg');
    if (bgImg) {
      // Simple fallback drawing logic for now
      this.ctx.drawImage(bgImg, 0, 0, this.width, this.height);
    } else {
      const grad = this.ctx.createLinearGradient(0, 0, 0, this.height);
      grad.addColorStop(0, '#0f172a');
      grad.addColorStop(1, '#1e3a8a');
      this.ctx.fillStyle = grad;
      this.ctx.fillRect(0, 0, this.width, this.height);
    }

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

// 5. Input Handler
class InputHandler {
  constructor(game) {
    this.game = game;
    this.currentInput = '';
  }

  init() {
    window.addEventListener('keydown', (e) => {
      if (this.game.isGameOver) {
        // Maybe R to restart?
        return;
      }

      const key = e.key;

      if (key === 'Backspace') {
        this.currentInput = this.currentInput.slice(0, -1);
        this.game.updateInput(this.currentInput);
        return;
      }

      if (key.length > 1) return;
      // Only letters
      if (!/^[a-zA-Z]$/.test(key)) return;

      this.currentInput += key.toLowerCase();
      this.game.handleTyping(this.currentInput);
    });
  }

  clear() {
    this.currentInput = '';
    this.game.updateInput('');
  }
}

// 6. Game Core
class Game {
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

    this.inputHandler.game = this;
  }

  start() {
    this.isPlaying = true;
    this.isGameOver = false;
    this.score = 0;
    this.wave = 1;
    this.fish = [];
    this.bullets = [];
    this.spawnInterval = 2000;

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

    const dt = (timestamp - this.lastTime) / 1000 || 0.016;
    this.lastTime = timestamp;

    if (this.isGameOver) return;

    this.update(dt);
    this.renderer.draw(this, dt);

    requestAnimationFrame((ts) => this.loop(ts));
  }

  update(dt) {
    this.spawnTimer += dt * 1000;
    if (this.spawnTimer > this.spawnInterval) {
      this.spawnFish();
      this.spawnTimer = 0;
      this.spawnInterval = Math.max(500, 2000 - (this.score * 10));
    }

    if (this.iceFloe) this.iceFloe.update(dt);
    if (this.penguin) this.penguin.update(dt);

    this.fish.forEach(fish => {
      fish.update(dt);

      const dist = Math.hypot(fish.x - this.penguin.x, fish.y - this.penguin.y);
      if (dist < 60) {
        this.gameOver();
      }
    });

    this.bullets.forEach(bullet => bullet.update(dt));

    this.fish = this.fish.filter(f => !f.markedForDeletion);
    this.bullets = this.bullets.filter(b => !b.markedForDeletion);
  }

  spawnFish() {
    if (wordList.length === 0) return;
    const word = wordList[Math.floor(Math.random() * wordList.length)];
    const x = Math.random() * (window.innerWidth - 100) + 50;
    const y = -50;
    const speed = 50 + (this.score * 2) + Math.random() * 50;

    this.fish.push(new Fish(x, y, word, speed, this.assets.getImage('fish')));
  }

  handleTyping(input) {
    let matchFound = false;
    let killFound = false;

    this.fish.forEach(fish => {
      if (fish.text.toLowerCase().startsWith(input)) {
        fish.matchedIndex = input.length;
        matchFound = true;

        if (input === fish.text.toLowerCase()) {
          this.killFish(fish);
          killFound = true;
        }
      } else {
        fish.matchedIndex = 0;
      }
    });

    this.updateInputUI(input, matchFound);

    if (killFound) {
      this.inputHandler.clear();
    }
  }

  updateInput(input) {
    this.handleTyping(input);
  }

  killFish(fish) {
    fish.markedForDeletion = true;
    this.score++;
    this.updateUI();

    this.bullets.push(new Bullet(this.penguin.x, this.penguin.y, fish.x, fish.y, this.assets.getImage('bullet')));
  }

  gameOver() {
    this.isGameOver = true;
    this.isPlaying = false;
    document.getElementById('game-over-screen').classList.remove('hidden');
    document.getElementById('final-score').innerText = this.score;
    document.getElementById('ui-layer').classList.add('hidden');
  }

  updateUI() {
    const scoreEl = document.getElementById('scoreDisplay');
    if (scoreEl) scoreEl.innerText = this.score;
  }

  updateInputUI(input, isValid) {
    const disp = document.getElementById('input-display');
    if (disp) {
      disp.innerText = input;
      disp.style.color = isValid ? '#facc15' : '#ef4444';
    }
  }
}

// 7. Init
async function init() {
  const canvas = document.getElementById('gameCanvas');
  const assets = new AssetLoader();

  await assets.loadAll();

  const renderer = new Renderer(canvas, assets);
  const game = new Game(renderer, new InputHandler(null), assets);

  // Hide Start Screen on button click
  const startBtn = document.getElementById('start-btn');
  startBtn.addEventListener('click', () => {
    document.getElementById('start-screen').classList.add('hidden');
    game.start();
  });
}

// Start
init();
