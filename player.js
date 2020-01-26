class Player {
  nbMove = 0;
  weapon = { name: "Knife", damage: 5 };
  constructor(id, canMove) {
    this.id = id;
    this.name = `player-${id}`;
    this.canMove = canMove;
    this.playerCard = document.getElementById(`player${id}-weapon-card`);
  }

  static move(players, e, self) {
    if (
      e.target.hasAttribute("data-access") ||
      e.target.dataset.playable !== "1"
    ) {
      return;
    }

    if (players[0].canMove) {
      const prevCase = document.querySelector(
        `[data-player="player-${players[0].id}"]`
      );
      const nextCase = e.target;
      players[0].caseId = nextCase.id;
      self.setPlayableBoxes(players[0]);
      self.setPlayerWeapon(players[0]);
      nextCase.dataset.player = `player-${players[0].id}`;
      prevCase.removeAttribute("data-player", `player-${players[0].id}`);
      players[0].nbMove++;
      players[0].setCanMove();
      if (!players[0].canMove) {
        players[0].nbMove = 0;
        players[1].canMove = true;
        self.setPlayableBoxes(players[1]);
      }
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
}
