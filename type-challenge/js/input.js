export class InputHandler {
  constructor(game) {
    this.game = game;
    this.currentInput = '';
  }

  init() {
    window.addEventListener('keydown', (e) => {
      if (this.game.isGameOver) return;

      // Allow restart if game over? Handled by button.

      const key = e.key;

      // Handle Backspace
      if (key === 'Backspace') {
        this.currentInput = this.currentInput.slice(0, -1);
        this.game.updateInput(this.currentInput);
        return;
      }

      // Ignore non-char keys
      if (key.length > 1) return;

      // Append and check
      this.currentInput += key.toLowerCase();
      this.game.handleTyping(this.currentInput);
    });
  }

  clear() {
    this.currentInput = '';
    this.game.updateInput('');
  }
}
