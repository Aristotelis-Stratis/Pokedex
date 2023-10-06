let currentPokemon;
let allPokemon;
let offset = 0;

const typeColors = {
    "normal": "#A8A77A",
    "fire": "#EE8130",
    "water": "#6390F0",
    "electric": "#F7D02C",
    "grass": "#7AC74C",
    "ice": "#96D9D6",
    "fighting": "#C22E28",
    "poison": "#A33EA1",
    "ground": "#E2BF65",
    "flying": "#A98FF3",
    "psychic": "#F95587",
    "bug": "#A6B91A",
    "rock": "#B6A136",
    "ghost": "#735797",
    "steel": "#B7B7CE",
    "dragon": "#6F35FC",
    "dark": "#705746",
    "fairy": "#D685AD"
};

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

    let typeOneButton = document.getElementById('typeOne');
    let typeTwoButton = document.getElementById('typeTwo');

    typeOneButton.innerHTML = pokemonType_1.charAt(0).toUpperCase() + pokemonType_1.slice(1);
    typeTwoButton.innerHTML = pokemonType_2.charAt(0).toUpperCase() + pokemonType_2.slice(1);

    typeOneButton.style.backgroundColor = typeColors[pokemonType_1]; 
    typeTwoButton.style.backgroundColor = typeColors[pokemonType_2];
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
