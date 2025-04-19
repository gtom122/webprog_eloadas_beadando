class Driver {
  constructor(name, team, wins) {
    this.name = name;
    this.team = team;
    this.wins = wins;
  }

  render() {
    const card = document.createElement("div");
    card.className = "driver-card";

    card.innerHTML = `
      <div class="driver-name">${this.name}</div>
      <div class="driver-team">Legsikeresebb csapat: ${this.team}</div>
      <div class="driver-wins">Győzelmek: ${this.wins}</div>
    `;

    document.getElementById("container").appendChild(card);
  }
}

class ChampionDriver extends Driver {
  constructor(name, team, wins, championships) {
    super(name, team, wins);
    this.championships = championships;
  }

  render() {
    super.render();
    const lastCard = document.querySelector("#container .driver-card:last-child");
    const champTag = document.createElement("div");
    champTag.textContent = `🏆 Bajnoki címek: ${this.championships}`;
    champTag.style.color = "#f39c12";
    lastCard.appendChild(champTag);
  }
}

const drivers = [
  new ChampionDriver("Sebastian Vettel", "Red Bull", 53, 4),
  new ChampionDriver("Lewis Hamilton", "Mercedes", 103, 7),
  new ChampionDriver("Fernando Alonso", "Renault", 32, 2),
  new Driver("Lando Norris", "McLaren", 0),
  new Driver("Charles Leclerc", "Ferrari", 5),
];

drivers.forEach(driver => driver.render());

document.getElementById("addDriverForm").addEventListener("submit", function(e) {
  e.preventDefault(); 

  const name = document.getElementById("name").value.trim();
  const team = document.getElementById("team").value.trim();
  const wins = document.getElementById("wins").value.trim();

  // Egyszerű validáció
  if (!name || !team || wins === "" || name.length > 30 || team.length > 30) {
    alert("Kérlek töltsd ki helyesen az összes mezőt!");
    return;
  }

  const newDriver = new Driver(name, team, parseInt(wins));
  newDriver.render();

  // Űrlap kiürítése
  this.reset();
});




