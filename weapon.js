class Weapon {
    constructor(name) {
      this.name = name;
    }
  
    setDamage() {
      
      switch (this.name) {
        case "dague":
          this.damage = 10;
          break;
        case "epee":
          this.damage = 20;
          break;
        case "gun":
          this.damage = 30;
          break;
        case "massu":
          this.damage = 40;
          break;
      }
    }
  }
  