export class User {
  constructor() {
    this.id = this.generateUserId();
    this.name = `user${this.id}`;
    this.clicks = 0;
    this.isAdmin = false;
    this.startTime = Date.now();
    this.timePlayed = 0;
  }

  generateUserId() {
    return Math.floor(Math.random() * 1000000);
  }

  addClick(amount = 1) {
    this.clicks += amount;
  }

  updateTimePlayed() {
    this.timePlayed = Math.floor((Date.now() - this.startTime) / 1000);
  }

  setName(newName) {
    if (newName.toLowerCase() === 'null07') {
      this.activateAdmin();
      return { success: true, message: 'Admin mode activated' };
    }

    if (!this.isNameValid(newName)) {
      return { success: false, message: 'Invalid name. Cannot contain "Null" or "Giz"' };
    }

    this.name = newName;
    return { success: true, message: 'Name updated successfully' };
  }

  isNameValid(name) {
    const invalidWords = ['Null', 'Giz'];
    return !invalidWords.some(word => 
      name.toLowerCase().includes(word.toLowerCase()) && 
      name.toLowerCase() !== 'null07'
    );
  }

  activateAdmin() {
    this.isAdmin = true;
    document.getElementById('adminControls').classList.remove('hidden');
  }
}
