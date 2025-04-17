const API_URL = "http://gamf.nhely.hu/ajax2/";
const code = "FH4U3E"; 

// Üzenet kiírás
function showMessage(msg) {
  document.getElementById("message").textContent = msg;
}

// READ
function loadData() {
  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({ op: "read", code }),
  })
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("data-container");
      container.innerHTML = "";
      let heights = [];

      data.list.forEach((row) => {
        const div = document.createElement("div");
        div.textContent = `ID: ${row.id}, Név: ${row.name}, Magasság: ${row.height}, Súly: ${row.weight}`;
        container.appendChild(div);
        heights.push(Number(row.height));
      });

      if (heights.length > 0) {
        const sum = heights.reduce((a, b) => a + b, 0);
        const avg = (sum / heights.length).toFixed(2);
        const max = Math.max(...heights);
        document.getElementById("stats").innerHTML = `
          <p>Összeg: ${sum}</p>
          <p>Átlag: ${avg}</p>
          <p>Legnagyobb magasság: ${max}</p>
        `;
      }
    });
}

// CREATE
function createData() {
  const name = document.getElementById("create-name").value.trim();
  const height = document.getElementById("create-height").value.trim();

  if (!name || !height || name.length > 30) {
    showMessage("Hibás bemenet.");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      op: "create",
      name,
      height,
      weight: 0,
      code,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      showMessage("Sikeres hozzáadás!");
      loadData();
    });
}

// GET for update
function getDataForId() {
  const id = document.getElementById("update-id").value;
  if (!id) return;

  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({ op: "read", code }),
  })
    .then((res) => res.json())
    .then((data) => {
      const row = data.list.find((x) => x.id === id);
      if (row) {
        document.getElementById("update-name").value = row.name;
        document.getElementById("update-height").value = row.height;
      } else {
        showMessage("Nincs ilyen ID a kóddal.");
      }
    });
}

// UPDATE
function updateData() {
  const id = document.getElementById("update-id").value;
  const name = document.getElementById("update-name").value.trim();
  const height = document.getElementById("update-height").value.trim();

  if (!id || !name || !height || name.length > 30) {
    showMessage("Hibás módosítási adat.");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      op: "update",
      id,
      name,
      height,
      weight: 0,
      code,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      showMessage("Sikeres módosítás!");
      loadData();
    });
}

// DELETE
function deleteData() {
  const id = document.getElementById("delete-id").value;
  if (!id) {
    showMessage("Adj meg ID-t a törléshez.");
    return;
  }

  fetch(API_URL, {
    method: "POST",
    body: new URLSearchParams({
      op: "delete",
      id,
      code,
    }),
  })
    .then((res) => res.json())
    .then(() => {
      showMessage("Törlés kész.");
      loadData();
    });
}
