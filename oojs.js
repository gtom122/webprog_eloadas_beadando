// Alaposztály: Pilóta
class Driver {
    constructor(name, team) {
      this.name = name;
      this.team = team;
    }
  
    describe() {
      return `${this.name} a(z) ${this.team} csapatnál versenyez.`;
    }
  
    display() {
      const p = document.createElement("p");
      p.textContent = this.describe();
      document.body.appendChild(p);
    }
  }
  
  // Leszármazott osztály: Világbajnok pilóta
  class ChampionDriver extends Driver {
    constructor(name, team, titles) {
      super(name, team);
      this.titles = titles;
    }
  
    describe() {
      return `${this.name} (${this.team}) világbajnok, ${this.titles} címmel.`;
    }
  }
  
  // Példányok
  const drivers = [
    new Driver("Lando Norris", "McLaren"),
    new ChampionDriver("Sebastian Vettel", "Red Bull", 4),
    new ChampionDriver("Lewis Hamilton", "Mercedes", 7),
    new ChampionDriver("Fernando Alonso", "Renault", 2),
    new Driver("George Russell", "Mercedes")
  ];
  
  // Megjelenítés
  drivers.forEach(driver => driver.display());
  