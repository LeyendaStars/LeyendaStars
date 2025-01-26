export class UIManager {
  constructor(game) {
    this.game = game;
  }

  setupEventListeners() {
    document.getElementById('clickButton').addEventListener('click', () => {
      this.game.handleClick();
    });

    document.getElementById('topBtn').addEventListener('click', () => {
      this.toggleLeaderboard();
    });

    document.getElementById('profileBtn').addEventListener('click', () => {
      this.showProfile();
    });

    document.getElementById('settingsBtn').addEventListener('click', () => {
      this.showSettings();
    });

    document.getElementById('saveNameBtn').addEventListener('click', () => {
      this.handleNameChange();
    });

    document.getElementById('addClicksBtn')?.addEventListener('click', () => {
      this.handleAddClicks();
    });

    document.querySelectorAll('.close-modal').forEach(btn => {
      btn.addEventListener('click', () => {
        this.hideModals();
      });
    });
  }

  toggleLeaderboard() {
    const leaderboard = document.getElementById('leaderboard');
    leaderboard.classList.toggle('hidden');
  }

  showProfile() {
    const modal = document.getElementById('profileModal');
    document.getElementById('profileName').textContent = this.game.user.name;
    document.getElementById('timePlayed').textContent = 
      `${Math.floor(this.game.user.timePlayed / 60)}m ${this.game.user.timePlayed % 60}s`;
    modal.classList.remove('hidden');
  }

  showSettings() {
    const modal = document.getElementById('settingsModal');
    modal.classList.remove('hidden');
  }

  hideModals() {
    document.querySelectorAll('.modal').forEach(modal => {
      modal.classList.add('hidden');
    });
    document.getElementById('nameError').classList.add('hidden');
  }

  handleNameChange() {
    const nameInput = document.getElementById('nameInput');
    const errorElement = document.getElementById('nameError');
    
    const result = this.game.user.setName(nameInput.value);
    
    if (result.success) {
      this.game.leaderboard.update();
      nameInput.value = '';
      this.hideModals();
    } else {
      errorElement.textContent = result.message;
      errorElement.classList.remove('hidden');
    }
  }

  handleAddClicks() {
    if (!this.game.user.isAdmin) return;

    const targetUser = document.getElementById('targetUser').value;
    const clicksToAdd = parseInt(document.getElementById('clicksToAdd').value);
    
    if (targetUser && !isNaN(clicksToAdd)) {
      const targetPlayer = this.game.leaderboard.players.find(p => p.name === targetUser);
      if (targetPlayer) {
        targetPlayer.clicks += clicksToAdd;
        this.game.leaderboard.update();
        alert(`Added ${clicksToAdd} clicks to ${targetUser}`);
      } else {
        alert('User not found');
      }
    }
  }
}
