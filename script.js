let currentPokemon;
let allPokemon;
let offset = 0;

async function loadPokemon() {
    let url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur';
    let response = await fetch(url);
    currentPokemon = await response.json();

    console.log('Loaded Pokemon', currentPokemon);
    renderPokemonInfo();
}

// =========================== RENDER ===========================
function renderPokemonInfo() {
    renderPokemonName();
    renderPokemonType();
    renderPokemonStats();
    updateButtonColors();
    loadStats();
    document.getElementById('pokemonSprite').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}

function renderPokemonName() {
    let pokemonName = currentPokemon['name'];
    capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    document.getElementById('pokemonName').innerHTML = capitalizedPokemonName;
}

function renderPokemonType() {
    let pokemonType_1 = currentPokemon['types'][0]['type']['name'];
    let pokemonType_2 = currentPokemon['types'][1]['type']['name'];
    document.getElementById('typeOne').innerHTML = pokemonType_1.charAt(0).toUpperCase() + pokemonType_1.slice(1);
    document.getElementById('typeTwo').innerHTML = pokemonType_2.charAt(0).toUpperCase() + pokemonType_2.slice(1);
}

function renderPokemonStats() {
    let HP = currentPokemon['stats'][0]['base_stat'];
    let ATTACK = currentPokemon['stats'][1]['base_stat'];
    let DEFENSE = currentPokemon['stats'][2]['base_stat'];
    let SP_ATTACK = currentPokemon['stats'][3]['base_stat'];
    let SP_DEFENSE = currentPokemon['stats'][4]['base_stat'];
    let SPEED = currentPokemon['stats'][5]['base_stat'];
    let TOTAL = HP + ATTACK + DEFENSE + SP_ATTACK + SP_DEFENSE + SPEED;
    return { HP, ATTACK, DEFENSE, SP_ATTACK, SP_DEFENSE, SPEED, TOTAL };
}
// =========================== RENDER STATS ===========================


// =========================== LOAD CARD LINKS ===========================
function loadAbout() {
    let about = document.getElementById('card-container');
    about.innerHTML = '';
    about.innerHTML += templateAbout();
}
function loadStats() {
    let stats = document.getElementById('card-container');
    stats.innerHTML = '';
    const { HP, ATTACK, DEFENSE, SP_ATTACK, SP_DEFENSE, SPEED, TOTAL } = renderPokemonStats();
    stats.innerHTML = templateStats(HP, ATTACK, DEFENSE, SP_ATTACK, SP_DEFENSE, SPEED, TOTAL);
}

function loadEvolutions() {

}

function loadMoves() {
    let moves = document.getElementById('card-container');
    moves.innerHTML = '';
    moves.innerHTML = currentPokemon['moves'][0]['move']['name'];
}

// =========================== OPEN CARD ===========================
function openTitleCard() {
    let content = document.getElementById('content');
    content.innerHTML += templateTitleCard();
}

// =========================== CLOSE CARD ===========================


// =========================== LOAD MORE WITH SCROLL ===========================


// =========================== SEARCH BAR ===========================





const typeColors = {
    "Normal": "#A8A77A",
    "Kampf": "#C22E28",
    "Flug": "#A98FF3",
    "Gift": "#A33EA1",
    "Boden": "#E2BF65",
    "Gestein": "#B6A136",
    "Käfer": "#A6B91A",
    "Geist": "#735797",
    "Stahl": "#B7B7CE",
    "Feuer": "#EE8130",
    "Wasser": "#6390F0",
    "Grass": "#7AC74C",
    "Elektro": "#F7D02C",
    "Psycho": "#F95587",
    "Eis": "#96D9D6",
    "Drache": "#6F35FC",
    "Unlicht": "#705746",
    "Fee": "#D685AD"
    // Weitere Typen und Farben hinzufügen...
};

function updateButtonColors(typeOne, typeTwo) {
    const buttonOne = document.getElementById("typeOne");
    const buttonTwo = document.getElementById("typeTwo");

    if (typeOne in typeColors) {
        buttonOne.style.backgroundColor = typeColors[typeOne];
    } else {
        // Standardfarbe oder Fehlerbehandlung, wenn der Typ nicht gefunden wurde
        buttonOne.style.backgroundColor = "gray";
    }

    if (typeTwo in typeColors) {
        buttonTwo.style.backgroundColor = typeColors[typeTwo];
    } else {
        buttonTwo.style.backgroundColor = "gray";
    }
}