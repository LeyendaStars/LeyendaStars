export class LeaderboardManager {
  constructor() {
    this.players = [
      { name: 'JonathanGIZ', clicks: 9999, isAdmin: true },
      { name: 'David', clicks: 300 },
      { name: 'Angie', clicks: 600 }
    ];
  }

  update() {
    this.sortPlayers();
    this.updateDisplay();
  }

  sortPlayers() {
    this.players.sort((a, b) => b.clicks - a.clicks);
  }

  updateScore(user) {
    const playerIndex = this.players.findIndex(p => p.name === user.name);
    if (playerIndex === -1) {
      this.players.push({ name: user.name, clicks: user.clicks, isAdmin: user.isAdmin });
    } else {
      this.players[playerIndex].clicks = user.clicks;
    }
    this.update();
  }

  updateDisplay() {
    const leaderboardList = document.getElementById('leaderboardList');
    leaderboardList.innerHTML = '';

    this.players.slice(0, 100).forEach((player, index) => {
      const item = document.createElement('div');
      item.className = 'leaderboard-item';
      
      const nameSpan = document.createElement('span');
      if (player.isAdmin) {
        nameSpan.className = 'admin-name';
      }
      nameSpan.textContent = player.name;

      const scoreSpan = document.createElement('span');
      scoreSpan.textContent = `${player.clicks} clicks`;

      item.appendChild(nameSpan);
      item.appendChild(scoreSpan);
      leaderboardList.appendChild(item);
    });
  }
}
