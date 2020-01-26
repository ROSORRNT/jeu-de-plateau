let map = new Map(10, 10);

const newGame = () => {
  if (map.tableIsGenerated) {
    map = new Map(10, 10);
    const table = document.querySelector("table");
    table.remove();

  }

  map.genereMap();
};

map.button.addEventListener("click", newGame);
