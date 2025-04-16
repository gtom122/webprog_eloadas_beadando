// Web Worker: Számolás a háttérben
onmessage = function(e) {
    let szam = e.data;
    let eredmeny = 0;
    for (let i = 0; i < szam; i++) {
        eredmeny += i;
    }
    postMessage(eredmeny);
};
