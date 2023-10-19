let currentPokemon;
let firstPokemon = 0;
let allPokemon = 10;
let allPokemonObjects = [];
let i;

// =========================== COLORS ===========================
const typeColors = {
    "normal": "rgba(168, 167, 122, 1)",
    "fire": "rgba(238, 129, 48, 1)",
    "water": "rgba(99, 144, 240, 1)",
    "electric": "rgba(247, 208, 44, 1)",
    "grass": "rgba(122, 199, 76, 1)",
    "ice": "rgba(150, 217, 214, 1)",
    "fighting": "rgba(194, 46, 40, 1)",
    "poison": "rgba(163, 62, 161, 1)",
    "ground": "rgba(226, 191, 101, 1)",
    "flying": "rgba(169, 143, 243, 1)",
    "psychic": "rgba(249, 85, 135, 1)",
    "bug": "rgba(166, 185, 26, 1)",
    "rock": "rgba(182, 161, 54, 1)",
    "ghost": "rgba(115, 87, 151, 1)",
    "steel": "rgba(183, 183, 206, 1)",
    "dragon": "rgba(111, 53, 252, 1)",
    "dark": "rgba(112, 87, 70, 1)",
    "fairy": "rgba(214, 133, 173, 1)"
};

// =========================== LOAD ===========================
async function loadPokemon() {
    for (let i = 1; i <= allPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();
        allPokemonObjects.push(currentPokemon);
        console.log('Loaded Pokemon', currentPokemon);
        renderPokemon(i);


        // eine For-Schleife bauen, die alle Elemente jedes Pokemon rendert weil alles über 0 = undefined ist. 
        // Nach der For-Schleife alle HTML Sachen einzelnt rendern das heißt Typen in typeHTML(),moves() usw
    }
}

// =========================== RENDER ===========================
function renderPokemon(i) {
    let pokemonCard = document.getElementById('card-content');
    let pokemonType_1 = allPokemonObjects[0]['types'][0]['type']['name'];
    let pokemonType_2 = allPokemonObjects[0]['types'].length > 1 ? allPokemonObjects[0]['types'][1]['type']['name'] : '';
    let pokemonName = currentPokemon['name'];
    let pokemonNumber = '#' + currentPokemon['id'];
    capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    let backgroundColor = typeColors[pokemonType_1].replace("1)", "0.75)") || "rgba(0, 0, 0, 1"; // Default color if type not found in typeColors
    let spriteURL = currentPokemon['sprites']['other']['official-artwork']['front_default'];
    let cardHTML = createPokemonCardHTML(i, pokemonNumber, capitalizedPokemonName, backgroundColor, pokemonType_1, pokemonType_2, spriteURL);
    pokemonCard.innerHTML += cardHTML;

    let typeOneButton = document.getElementById(`typeOne_${i}`);
    let typeTwoButton = document.getElementById(`typeTwo_${i}`);

    // Adjusting button properties
    setButtonProperties(typeOneButton, typeTwoButton, pokemonType_1, pokemonType_2);
}

// =========================== RENDER OVERLAY ===========================
function renderOverlayPokemon(i) {
    let overlayCard = document.getElementById('card-overlay');
    overlayCard.innerHTML = createOverlayCardHTML(i);
}

// =========================== RENDER BUTTON TYPE ===========================
function setButtonProperties(typeOneButton, typeTwoButton, pokemonType_1, pokemonType_2) {
    typeOneButton.innerHTML = pokemonType_1.charAt(0).toUpperCase() + pokemonType_1.slice(1);

    if (pokemonType_1) {
        typeOneButton.style.backgroundColor = typeColors[pokemonType_1].replace("1)", "0.8)");
    }

    if (pokemonType_2) {
        typeTwoButton.innerHTML = pokemonType_2.charAt(0).toUpperCase() + pokemonType_2.slice(1);
        typeTwoButton.style.backgroundColor = typeColors[pokemonType_2].replace("1)", "0.8)");
    } else {
        typeTwoButton.style.display = 'none';
    }
}


// =========================== RENDER ABOUT ===========================
function loadAbout() {
    let about = document.getElementById('card-container');
    let height = currentPokemon['height'];
    let weight = currentPokemon['weight'];
    let abilities = currentPokemon['abilities'][0]['ability']['name'];
    about.innerHTML = templateAbout();
    document.getElementById('height').innerHTML = height / 10 + ' m';
    document.getElementById('weight').innerHTML = weight / 10 + ' kg';
    document.getElementById('abilities').innerHTML = abilities.charAt(0).toUpperCase() + abilities.slice(1);
}

// =========================== RENDER STATS ===========================
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

// =========================== LOAD CARD LINKS ===========================
function loadStats() {
    let stats = document.getElementById('card-container');
    stats.innerHTML = '';
    const { HP, ATTACK, DEFENSE, SP_ATTACK, SP_DEFENSE, SPEED, TOTAL } = renderPokemonStats();
    stats.innerHTML = templateStats(HP, ATTACK, DEFENSE, SP_ATTACK, SP_DEFENSE, SPEED, TOTAL);
}

// function loadEvolutions() {}

function loadMoves() {
    let moves = document.getElementById('card-container');
    moves.innerHTML = '';
    moves.innerHTML = templateMoves();
}

// =========================== CLOSE CARD ===========================
function closeOverlay() {
    let overlay = document.getElementById('overlay');
    overlay.style.display = 'none';
}


// =========================== LOAD MORE WITH SCROLL ===========================
// =========================== RENDER MOVES ===========================
// =========================== SEARCH BAR ===========================
// =========================== LIKE ===========================



