document.addEventListener("DOMContentLoaded", function () {
    const links = document.querySelectorAll("nav ul li a");
    const currentPage = window.location.pathname.split("/").pop();

    links.forEach(link => {
        if (link.getAttribute("href") === currentPage) {
            link.classList.add("active");
        }
    });
});

// Adatok tömbje
let data = [
    { country: "Ausztrália", city: "Melbourne", trackname: "Albert Park Circuit", date: "2025-03-16" },
    { country: "China", city: "Shanghai", trackname: "Shanghai International Circuit", date: "2025-03-23" },
    { country: "Japan", city: "Suzuka", trackname: "Suzuka Circuit", date: "2025-04-06" },
    { country: "Bahrain", city: "Sakhir", trackname: "Bahrain International Circuit", date: "2025-04-13" }
];


// Táblázat frissítése
function updateTable() {
    const tableBody = document.querySelector("#crudTable tbody");
    tableBody.innerHTML = ""; // Töröljük a meglévő sorokat

    data.forEach((item, index) => {
        let row = tableBody.insertRow();
        row.insertCell(0).innerText = item.country;
        row.insertCell(1).innerText = item.city;
        row.insertCell(2).innerText = item.trackname
        row.insertCell(3).innerText = item.date;

        // Módosítás gomb
        let editCell = row.insertCell(4);
        let editButton = document.createElement("button");
        editButton.innerText = "Szerkesztés";
        editButton.onclick = () => editRow(index);
        editCell.appendChild(editButton);

        // Törlés gomb
        let deleteButton = document.createElement("button");
        deleteButton.innerText = "Törlés";
        deleteButton.onclick = () => deleteRow(index);
        editCell.appendChild(deleteButton);
    });
}

// Betűk ellenőrzése
function isTextOnly(input) {
    const regex = /^[a-zA-ZáéíóöőüűÁÉÍÓÖŐÜŰ\s]*$/;
    return regex.test(input);
}

// Sor hozzáadása
function addRow() {
    let country = document.getElementById("countryInput").value;
    let city = document.getElementById("cityInput").value;
    let trackname = document.getElementById("tracknameInput").value;
    let date = document.getElementById("dateInput").value;

    if (city && country && trackname && date) {
        if (!isTextOnly(country) || !isTextOnly(city) || !isTextOnly(trackname)) {
            alert("Az 'Ország', 'Város' és 'Pályanév' mezőkben csak szöveg lehet!");
            return;
        }
        data.push({ country, city, trackname, date });
        updateTable();
        document.getElementById("countryInput").value = "";
        document.getElementById("cityInput").value = "";
        document.getElementById("tracknameInput").value = "";
        document.getElementById("dateInput").value = "";
    } else {
        alert("Minden mezőt ki kell tölteni!");
    }
}

// Sor törlése
function deleteRow(index) {
    data.splice(index, 1);
    updateTable();
}

// Sor szerkesztése
function editRow(index) {
    let newcountry = prompt("Új ország:", data[index].country);
    let newcity = prompt("Új város:", data[index].city);
    let newtrackname = prompt("Új pálya:", data[index].trackname);
    let newdate = prompt("Új dátum:", data[index].date);


    if (newcountry && newcity && newtrackname && newdate) {
        data[index] = { country: newcountry, city: newcity, trackname: newtrackname, date: newdate };
        updateTable();
    }
}

// Keresés a táblázatban
function filterTable() {
    let input = document.getElementById("searchInput").value.toLowerCase();
    let rows = document.querySelectorAll("#crudTable tbody tr");

    rows.forEach(row => {
        let cells = row.getElementsByTagName("td");
        let match = Array.from(cells).some(cell => cell.innerText.toLowerCase().includes(input));
        row.style.display = match ? "" : "none";
    });
}

// Oszlop szerinti rendezés
function sortTable(columnIndex) {
    data.sort((a, b) => {
        let valA = Object.values(a)[columnIndex];
        let valB = Object.values(b)[columnIndex];
        return valA > valB ? 1 : -1;
    });
    updateTable();
}

// Táblázat inicializálása
document.addEventListener("DOMContentLoaded", updateTable);
