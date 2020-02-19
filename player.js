class Player {
  nbMove = 0
  weapon = { name: 'Knife', damage: 10 }
  constructor(id, canMove) {
    this.id = id
    this.name = `player-${id}`
    this.health = 100
    this.canMove = canMove
    this.canFight = false
    this.defense = false
    this.playerHealthBarEl = document.getElementById(`healthBar-player-${id}`)
    this.playerCardEl = document.getElementById(`player${id}-weapon-card`)
    this.playerBtnsEl = document.querySelector(`.player-${id}-btns`)
  }

  static move(players, e, self) {
    const currentPlayer = players[0]
    const pastPlayer = players[1]
    // Stop move() si le click est sur un obstacle
    if (
      e.target.hasAttribute('data-access') ||
      e.target.dataset.playable !== '1'
    )
      return
    // Lance le move if player can move
    if (currentPlayer.canMove) {
      const prevCase = document.querySelector(
        `[data-player="player-${currentPlayer.id}"]`
      )
      const nextCase = e.target
      currentPlayer.caseId = nextCase.id
      self.setPlayableTds(currentPlayer)
      self.setPlayerWeapon(currentPlayer)
      nextCase.dataset.player = `player-${currentPlayer.id}`
      prevCase.removeAttribute('data-player', `player-${currentPlayer.id}`)
      currentPlayer.nbMove++
      currentPlayer.setCanMove()
      // Conditions pour lancer un fight
      if (
        currentPlayer.caseId == parseInt(pastPlayer.caseId) - 10 ||
        currentPlayer.caseId == parseInt(pastPlayer.caseId) + 10 ||
        currentPlayer.caseId == pastPlayer.caseId - 1 ||
        currentPlayer.caseId == parseInt(pastPlayer.caseId) + 1
      ) {
        const tds = document.querySelectorAll('td')
        tds.forEach(td => {
          td.setAttribute('data-playable', '0')
          td.dataset.fight = '1'
        })
        return Player.fight(players)
      }
      // Si le can move du current est passé à false (+3moves)
      if (!currentPlayer.canMove) {
        currentPlayer.nbMove = 0
        pastPlayer.canMove = true
        self.setPlayableTds(pastPlayer)
      }
    }
  }

  static fight(players) {
    const attacker = players[0]
    const attacked = players[1]
    attacked.playerBtnsEl.style = 'visibility: hidden;'
    attacker.playerBtnsEl.style = ''
    const attackBtn = attacker.playerBtnsEl.querySelector('.attack-btn')
    const defenseBtn = attacker.playerBtnsEl.querySelector('.defense-btn')
    const attack = defense => {
      attacked.health -= attacker.weapon.damage
      attacked.playerHealthBarEl.style = `width: ${attacked.health}%;`
      if (attacker.health > 0 || attacked.health > 0)
        Player.fight([attacked, attacker])
    }
    attackBtn.addEventListener('click', () => attack())
    // defenseBtn.addEventListener("click", defense);
  }

  setCanMove() {
    if (this.nbMove === 3) {
      this.canMove = false
    }
  }

  updateCard() {
    this.playerCardEl.textContent = `Arme : ${this.weapon.name} / Dégat : ${this.weapon.damage} `
  }

  setDamage() {
    switch (this.weapon.name) {
      case 'dague':
        this.weapon.damage = 15
        break
      case 'epee':
        this.weapon.damage = 20
        break
      case 'gun':
        this.weapon.damage = 25
        break
      case 'massu':
        this.weapon.damage = 30
        break
    }
  }
}
