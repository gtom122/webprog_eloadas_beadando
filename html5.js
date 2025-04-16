// Web Storage
function mentes() {
    let adat = document.getElementById("storageInput").value;
    localStorage.setItem("taroltAdat", adat);
    document.getElementById("storageOutput").innerText = "Mentve: " + adat;
}

// Geolocation API
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            document.getElementById("locationOutput").innerText =
                "Szélesség: " + position.coords.latitude +
                ", Hosszúság: " + position.coords.longitude;
        });
    } else {
        document.getElementById("locationOutput").innerText = "A böngésző nem támogatja a geolokációt.";
    }
}

// Canvas rajzolás
const canvas = document.getElementById("rajzCanvas");
const ctx = canvas.getContext("2d");
ctx.fillStyle = "blue";
ctx.fillRect(50, 50, 100, 100);

// Web Workers
function startWorker() {
    if (typeof Worker !== "undefined") {
        let worker = new Worker("worker.js");
        worker.postMessage(10000000); // Küldünk egy számot a workernek

        worker.onmessage = function(e) {
            document.getElementById("workerOutput").innerText = "Eredmény: " + e.data;
        };
    } else {
        document.getElementById("workerOutput").innerText = "A böngésző nem támogatja a Web Workerst.";
    }
}

// Server-Sent Events (SSE)
if (typeof EventSource !== "undefined") {
    let eventSource = new EventSource("sse.php"); // Kell egy szerveroldali PHP fájl!
    eventSource.onmessage = function(e) {
        document.getElementById("sseOutput").innerText = "Üzenet a szervertől: " + e.data;
    };
} else {
    document.getElementById("sseOutput").innerText = "A böngésző nem támogatja az SSE-t.";
}

// Drag and Drop API
let dragItem = document.getElementById("dragMe");
let dropZone = document.getElementById("dropZone");

dragItem.addEventListener("dragstart", function(e) {
    e.dataTransfer.setData("text", "dragged");
});

dropZone.addEventListener("dragover", function(e) {
    e.preventDefault();
});

dropZone.addEventListener("drop", function(e) {
    e.preventDefault();
    dropZone.style.background = "lightgreen";
});

// Server-Sent Events 
if (typeof EventSource !== "undefined") {
    let eventSource = new EventSource("sse.php");

    eventSource.onmessage = function(e) {
        document.getElementById("sseOutput").innerText = "Üzenet a szervertől: " + e.data;
    };
} else {
    document.getElementById("sseOutput").innerText = "A böngésző nem támogatja az SSE-t.";
}
