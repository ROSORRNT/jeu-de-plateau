class Player {
  nbMove = 0;
  weapon = { name: "Knife", damage: 5 };
  constructor(id, canMove) {
    this.id = id;
    this.name = `player-${id}`;
    this.canMove = canMove;
    this.canFight = false;
    this.defense = false;
    this.playerCard = document.getElementById(`player${id}-weapon-card`);
    this.playerBtns = document.querySelector(`.player-${id}-btns`);
  }

  static move(players, e, self) {
    const currentPlayer = players[0];
    const pastPlayer = players[1];
    if (
      e.target.hasAttribute("data-access") ||
      e.target.dataset.playable !== "1"
    ) {
      return;
    }

    if (currentPlayer.canMove) {
      const prevCase = document.querySelector(
        `[data-player="player-${currentPlayer.id}"]`
      );
      const nextCase = e.target;
      currentPlayer.caseId = nextCase.id;
      self.setPlayableBoxes(currentPlayer);
      self.setPlayerWeapon(currentPlayer);
      nextCase.dataset.player = `player-${currentPlayer.id}`;
      prevCase.removeAttribute("data-player", `player-${currentPlayer.id}`);
      currentPlayer.nbMove++;
      currentPlayer.setCanMove();
      
      if (!currentPlayer.canMove) {
        currentPlayer.nbMove = 0;
        pastPlayer.canMove = true;
        self.setPlayableBoxes(pastPlayer);
        Player.fight(players);
      }
    }
  }

  static fight(players, self) {
    const attacker = players[0];
    const attacked = players[1];
    if (
      attacker.caseId == attacked.caseId - 10 ||
      attacker.caseId == parseInt(attacked.caseId) + 10 ||
      attacker.caseId == attacked.caseId - 1 ||
      attacker.caseId == parseInt(attacked.caseId) + 1
    ) {
      const tds = document.querySelectorAll("td");
      tds.forEach(td => {
        td.removeAttribute('data-playable')
        td.dataset.fight = "1";
      });    
      attacker.playerBtns.style = "";

      Player.decreaseLife(attacker, attacked);
    } else {
      return;
    }
  }

  setCanMove() {
    if (this.nbMove === 3) {
      this.canMove = false;
    }
  }

  updateCard() {
    this.playerCard.textContent = `Arme : ${this.weapon.name} / Dégat : ${this.weapon.damage} `;
  }

  setDamage() {
    switch (this.weapon.name) {
      case "dague":
        this.weapon.damage = 10;
        break;
      case "epee":
        this.weapon.damage = 20;
        break;
      case "gun":
        this.weapon.damage = 30;
        break;
      case "massu":
        this.weapon.damage = 40;
        break;
    }
  }

  static decreaseLife(attacker, attacked) {}
}
