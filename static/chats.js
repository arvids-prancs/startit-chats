const ATJAUNOT = 5000;

async function lasiChatu() {
    const atbilde = await fetch('/chats/lasi');
    const datuObjekts = await atbilde.json();
    raadiChatuVienkarshi(datuObjekts);
    await new Promise(resolve => setTimeout(resolve, ATJAUNOT));
    await lasiChatu();
}

function raadiChatuVienkarshi(dati) {
    const jaunaRinda = "</br>";
    let chats = "";
    let chataDiv = document.getElementById("chats");
    for (let rinda of dati['chats']) {
        chats = chats + rinda + jaunaRinda;
    }
    chataDiv.innerHTML = chats;
}

async function suutiZinju() {
    let zinjasElement = document.getElementById("zinja");
    let zinja = zinjasElement.value;
    zinjasElement.value = "";
    const atbilde = await fetch('/chats/suuti', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"chats": zinja})
    });
    const datuObjekts = await atbilde.json();
    raadiChatuVienkarshi(datuObjekts);
}

let ievadesLauks = document.getElementById("zinja");
ievadesLauks.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        suutiZinju();
    }
});