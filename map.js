class Map {
  board = document.querySelector('#board')
  button = document.querySelector('.new-game')
  tableIsGenerated = false
  player1 = new Player(1, true)
  player2 = new Player(2, false)
  players = [this.player1, this.player2]
  weaponsOnMap = [
    new Weapon('dague'),
    new Weapon('epee'),
    new Weapon('gun'),
    new Weapon('massu'),
  ]
  randomPlaces = [
    Math.floor(Math.random() * 44),
    55 + Math.floor(Math.random() * 44),
  ]

  constructor(rows, columns) {
    this.rows = rows
    this.columns = columns
  }

  // Appelée à la création de chaque td (l.119) lorsqu'on génère le plateau
  placePlayerInit = td => {
    for (let i = 0; i < this.players.length; i++) {
      // check si le td correspond à la random place, et y positionne le joueur itéré
      if (td.id == this.randomPlaces[i]) {
        td.dataset.player = `player-${this.players[i].id}`
        this.players[i].caseId = td.id
        // check si le td était un obstacle ou une arme
        if (td.hasAttribute('data-access'))
          td.setAttribute('data-playable', '0')
        else if (td.hasAttribute('data-weapon'))
          td.setAttribute('data-weapon', 'clean')
      }
    }
  }

  getWhoCanPlay() {
    let playOrder = [] // [0] can play, [1] can't
    for (let i = 0; i < this.players.length; i++) {
      if (this.players[0].canMove) playOrder = [this.player1, this.player2]
      else playOrder = [this.player2, this.player1]
    }
    return playOrder
  }

  setPlayableTds(currentPlayer) {
    const tds = document.querySelectorAll('td')
    for (const td of tds) {
      // Définit les cases jouables relativement à la position du joueur actuel (cases adjacentes)
      if (
        td.id == parseInt(currentPlayer.caseId) - 10 ||
        td.id == parseInt(currentPlayer.caseId) + 10 ||
        td.id == parseInt(currentPlayer.caseId) - 1 ||
        td.id == parseInt(currentPlayer.caseId) + 1
      )
        td.dataset.playable = '1'
      // Re-définir comme non-jouables les cases adjascentes qui seraient un ostacle, ou occuppé par un joueur
      else if (
        !td.dataset.access &&
        td.dataset.currentPlayer !== `player${currentPlayer.id}`
      )
        td.dataset.playable = '0'
    }
  }

  setPlayerWeapon = currentPlayer => {
    const weaponsPlace = Helpers.getAllElementsWithAttribute('data-weapon')
    weaponsPlace.forEach(weaponPlace => {
      // check si une case occupée par une arme est aussi occupée par le currentPlayer (il la ramasse)
      if (currentPlayer.caseId == weaponPlace.id) {
        currentPlayer.weapon.name = weaponPlace.dataset.weapon
        currentPlayer.setDamage()
        weaponPlace.removeAttribute('data-weapon', weaponPlace.dataset.weapon)
        currentPlayer.updateCard()
      }
    })
  }

  genereMap() {
    this.weaponsOnMap.forEach(weapon => {
      weapon.caseId = Math.floor(Math.random() * Math.floor(100))
    })

    this.obstacles = []
    for (let i = 0; i < 10; i++) {
      this.obstacles.push(Math.floor(Math.random() * Math.floor(100)))
    }

    var table = document.createElement('table')
    var tbody = document.createElement('tbody')
    this.board.append(table)
    table.append(tbody)
    this.tableIsGenerated = true

    for (let i = 0; i < this.rows; i++) {
      var tr = document.createElement('tr')
      tbody.append(tr)

      for (let j = 0; j < this.columns; j++) {
        let td = document.createElement('td')
        td.setAttribute('data-x', j)
        td.setAttribute('data-y', i)
        td.className = 'case'
        td.id = '' + i + j
        td.addEventListener('click', e => {
          Player.move(this.getWhoCanPlay(), e, this)
        })
        this.obstacles.forEach(obst => {
          if (obst == td.id) {
            td.setAttribute('data-access', 'none')
          }
        })
        this.weaponsOnMap.forEach(weapon => {
          if (weapon.caseId == td.id) {
            td.dataset.weapon = weapon.name
          }
        })
        this.placePlayerInit(td)
        tr.append(td)
      }
    }
    this.setPlayableTds(this.getWhoCanPlay()[0])
  }
}
