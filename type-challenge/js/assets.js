export class AssetLoader {
  constructor() {
    this.images = {};
    this.assets = [
      { key: 'penguin', src: 'assets/penguin.png' },
      { key: 'fish', src: 'assets/fish.png' },
      { key: 'ice', src: 'assets/ice_floe.png' },
      { key: 'bg', src: 'assets/water_bg.png' },
      { key: 'bullet', src: 'assets/bullet.png' } // Simple generated or drawn bullets
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
          // Fallback to placeholder/error logic if needed
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
