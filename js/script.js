let currentPokemon;
let firstPokemon = 0;
let allPokemon = 151;
let allPokemonList = [];
let selectedPokemon;

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
        let currentPokemon = await response.json();
        allPokemonList.push(currentPokemon);
        newRender(currentPokemon, i);
    }
    console.log('Loaded Pokemon', allPokemonList);
}

/// =========================== RENDER ALL POKEMON===========================

function newRender(currentPokemon, i) {
    let pokemonCard = document.getElementById('card-content');
    const pokemonName = currentPokemon.name;
    const capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    const pokemonNumber = '#' + currentPokemon.id.toString().padStart(3, '0');
    const typeOne = currentPokemon.types[0].type.name;
    const typeTwo = currentPokemon.types[1] ? currentPokemon.types[1].type.name : '';
    let backgroundColor = typeColors[typeOne].replace("1)", "0.75)") || "rgba(0, 0, 0, 1";
    const spriteURL = currentPokemon.sprites.other["official-artwork"].front_default;

    const typeButtonsHTML = `
    <button class="typeButton" style="background-color: ${typeColors[typeOne].replace("1)", "0.75)")}">${typeOne.charAt(0).toUpperCase() + typeOne.slice(1)}</button>
    ${typeTwo ? `<button class="typeButton" style="background-color: ${typeColors[typeTwo].replace("1)", "0.75)")}">${typeTwo.charAt(0).toUpperCase() + typeTwo.slice(1)}</button>` : ''}
    `;
    const entry = document.createElement("div");
    entry.className = "col";
    entry.id = `entry ${`#`+ i}`;
    entry.style.backgroundColor = backgroundColor;
    entry.onclick = function () {
        renderOverlayPokemon(currentPokemon);
        document.getElementById('overlay').style.display = 'flex';
    };

    entry.innerHTML = `
        <div class="colNameContainer">
            <h2 id="pokemonName">${capitalizedPokemonName}</h2>
            <div class="colNumberContainer">
                <p class="colNumber" id="pokemonNumber">${pokemonNumber}</p>
            </div>
        </div>
        <div class="colTypeContainer">
        ${typeButtonsHTML}
    </div>
        <div class="colSpriteContainer">
            <img id="pokemonSprite${i}" src="${spriteURL}">
        </div>
        <div class="pkmnIcon">
            <svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"
                style="transform: rotate(-15deg);">
                <circle cx="100" cy="100" r="80" fill="none" stroke="rgba(255, 255, 255, 0.6)"
                    stroke-width="10" />
                <circle cx="100" cy="100" r="30" fill="none" stroke="rgba(255, 255, 255, 0.6)"
                    stroke-width="10" />
                <rect x="25" y="90" width="41" height="15" fill="rgba(255, 255, 255, 0.5)" />
                <rect x="134" y="90" width="41" height="15" fill="rgba(255, 255, 255, 0.5)" />
            </svg>
        </div>
    `;

    pokemonCard.appendChild(entry);
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



