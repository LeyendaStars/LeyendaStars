import { GameState } from './gameState.js';
import { User } from './user.js';
import { LeaderboardManager } from './leaderboard.js';
import { UIManager } from './ui.js';

class Game {
  constructor() {
    this.gameState = new GameState();
    this.user = new User();
    this.leaderboard = new LeaderboardManager();
    this.ui = new UIManager(this);
    
    this.initialize();
  }

  initialize() {
    this.ui.setupEventListeners();
    this.startGameLoop();
    this.updateClickDisplay();
  }

  startGameLoop() {
    setInterval(() => {
      this.user.updateTimePlayed();
      this.leaderboard.update();
      this.updateClickDisplay();
    }, 1000);
  }

  handleClick() {
    if (this.gameState.maintenance) {
      document.getElementById('maintenanceMsg').classList.remove('hidden');
      return;
    }
    
    document.getElementById('maintenanceMsg').classList.add('hidden');
    this.user.addClick();
    this.leaderboard.updateScore(this.user);
    this.updateClickDisplay();
  }

  updateClickDisplay() {
    document.getElementById('clickCount').textContent = this.user.clicks;
  }
}

window.game = new Game();
