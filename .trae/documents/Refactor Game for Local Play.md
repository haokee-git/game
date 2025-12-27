The black screen occurs because modern browsers block "ES Modules" (the `import`/`export` syntax) when opening files directly from the hard drive (the `file://` protocol) due to security policies (CORS).

To fix this **without requiring Python or a local server**, I will refactor the code to use standard "classic" scripts. This involves:

1.  **Refactoring JavaScript Files**:
    *   Remove all `import` and `export` statements.
    *   Expose classes (`Game`, `SceneManager`, `Assets`, etc.) globally so they can access each other without imports.
    *   Update `game.js`, `SceneManager.js`, `Assets.js`, `GameLogic.js`, and `PostProcessing.js`.

2.  **Downgrading & Linking Three.js**:
    *   Switch from Three.js r160 (Module version) to r128 (Classic version).
    *   Update `index.html` to load Three.js and its plugins (Bloom, Film Grain) from CDNs that support the classic "global variable" mode.
    *   Load the local scripts in the correct order so dependencies are met.

**Impact**:
*   You will be able to double-click `index.html` to play the game immediately.
*   Internet connection will still be required to load the Three.js library (unless we download it locally, but CDN is standard).

I will proceed with editing the files now.