new Vue({
  el: '#app',
  data: {
    playerHealth: 100,
    monsterHealth: 100,
    gameIsRunning: false,
    turns: []
  },
  methods: {
    startGame() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
    },
    attack() {
      let damage = this.calculateDamage(3, 10);
      this.monsterHealth -= damage;
      this.turnsLog(true, 'Player hits for ' + damage);
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
      this.checkWin()
    },
    specialAttack() {
      let damage = this.calculateDamage(10, 20)
      this.monsterHealth -= damage;
      this.turnsLog(true, 'Player hits hard for ' + damage);
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
      this.checkWin()
    },
    heal() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turnsLog(true, 'Player hills');
      this.monsterAttacks();
    },
    run() {
      this.turnsLog(true, 'Player run from battle!');
      this.gameIsRunning = false;
    },
    monsterAttacks() {
      let damage = this.calculateDamage(5, 12);
      this.turnsLog(false, 'Monster hits for ' + damage);
      this.playerHealth -= damage;
      this.checkWin();
    },
    calculateDamage(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New Game?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm('You lose! New Game?')) {
          this.startGame()
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    },
    turnsLog (role, text) {
      this.turns.unshift({
        isPlayer: role,
        message: text
      })
    }
  }
});
