let kaffer;
let filter = "alle";
document.addEventListener("DOMContentLoaded", loadJSON);



//her hentes json data og sendes videre hen til visKaffer. Hvis der klikkes på brugermenuen, henter den funtionen toggleMenu.

async function loadJSON() {
    const JSONData = await fetch("https://spreadsheets.google.com/feeds/list/1cusyHmJ0ML-csQjEMGf9hkosvQJtib6zNYnf44xYeA4/od6/public/values?alt=json");
    kaffer = await JSONData.json();
    addEventListenersToButtons();
    visKaffer();

    document.querySelector("#burgermenu").addEventListener("click", toggleMenu);

}

// Classen hidden tilføjes/fjernes når der tages fat i menu. Billedet af burgermenuen vises.

function toggleMenu() {
    console.log("toggleMenu");

    document.querySelector("#menu").classList.toggle("hidden");

    let erSkjult = document.querySelector("#menu").classList.contains("hidden");

    if (erSkjult == true) {
        document.querySelector("#burgermenu").innerHTML = "<img src = \"images_coffee/burger.svg\" alt=\"burger\">";
    } else {
        document.querySelector("#burgermenu").innerHTML = "<img src=\"images_coffee/kryds.svg\" alt = \"kryds\">";
    }
}



//visKaffer sætter hver enkelt bønne/metode in i html

function visKaffer() {
    const templatePointer = document.querySelector("template");
    const listPointer = document.querySelector("#list");
    listPointer.innerHTML = ""; //html containeren tømmes og der tilgøjes nyt indhold

    kaffer.feed.entry.forEach(kaffe => {
        if (filter == "alle" || filter == kaffe.gsx$kategori.$t) {
            console.log(kaffe);

            const minKlon = templatePointer.cloneNode(true).content;

            minKlon.querySelector("h2").textContent = kaffe.gsx$navn.$t;


            minKlon.querySelector("img").src = `images_coffee/${kaffe.gsx$billede.$t}.jpg`;
            minKlon.querySelector("img").src = `images_coffee/${kaffe.gsx$billede.$t}.jpg`;


            minKlon.querySelector(".beskrivelse").textContent = kaffe.gsx$beskrivelse.$t;


            // Når der tages fat i article, hentes functionen visDetaljer som er et single view med produkterne detaljer
            minKlon.querySelector("article").addEventListener("click", () => visDetaljer(kaffe));

            listPointer.appendChild(minKlon);
        }


    })

}

// funktionen viser hver enkelt kaffe/metode i et nyt vindue.

function visDetaljer(kaffe) {
    console.log(kaffe);

    location.href = `detalje.html?id=${kaffe.gsx$id.$t}`
}

document.querySelector("#luk").addEventListener("click", () => popup.style.display = "none");


// funktion der lægger en eventlistener på at filtreringsknapperne. Funktionen filtrere indholdet på siden alt efter hvilken knap der trykke på. Når der klikkes hentes funktionen filterBTN

function addEventListenersToButtons() {
    document.querySelectorAll(".filter").forEach((btn) => {
        btn.addEventListener("click", filterBTNs);
    });
}


// Denne funktion udskriver indholdet på siden. Alt efter hvilken knap der trykkes på, vil indholdet i h3 ændre sig til det valgte.

function filterBTNs() {
    filter = this.dataset.kategori;
    document.querySelector("h3").textContent = this.textContent;

    document.querySelectorAll(".filter").forEach((btn) => {
        btn.classList.remove("valgt");
    })
    this.classList.add("valgt");
    visKaffer();
}

loadJSON();
