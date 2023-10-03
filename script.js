let currentPokemon;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('Loaded Pokemon', currentPokemon);
    renderPokemonInfo();
}


function renderPokemonInfo() {
    renderPokemonName();
    document.getElementById('pokemonSprite').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}

function renderPokemonName() {
    let pokemonName = currentPokemon['name'];
    capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    document.getElementById('pokemonName').innerHTML = capitalizedPokemonName;
}

document.addEventListener("DOMContentLoaded", function () {
    const lines = document.querySelectorAll(".line");

    function updateLines() {
        lines.forEach(line => {
            const valueId = line.getAttribute("data-value-id");
            const pElement = document.getElementById(valueId);
            const wert = parseFloat(pElement.textContent);
            if (valueId === "value_7") {
                x2 = (wert / 540) * 100;
            } else {
                x2 = (wert / 90) * 100;
            } line.setAttribute("x2", `${x2}%`);
        });
    }

    // Initialisieren und bei Änderungen aktualisieren
    updateLines();
    lines.forEach(line => {
        const valueId = line.getAttribute("data-value-id");
        const pElement = document.getElementById(valueId);
        pElement.addEventListener("input", updateLines);
    });
});

function loadAbout() {
    let about = document.getElementById('card-container');
    about.innerHTML = '';
    about.innerHTML += templateAbout();
}
function loadStats() {
    let stats = document.getElementById('card-container');
    stats.innerHTML = '';
    stats.innerHTML = templateStats();
}

function loadEvolutions() {

}

function loadMoves() {
    let moves = document.getElementById('card-container');
    moves.innerHTML = '';
    moves.innerHTML = currentPokemon['moves'][0]['move']['name'];
}
