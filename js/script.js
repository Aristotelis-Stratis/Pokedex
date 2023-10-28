let currentPokemon;
let firstPokemon = 0;
let allPokemon = 100;
let allPokemonList = [];
let selectedPokemon;
let currentPokemonIndex = 0;

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

async function loadPokemon() {
    for (let i = firstPokemon + 1; i <= firstPokemon + 10; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        allPokemonList.push(currentPokemon);
        newRender(currentPokemon, i);
    }
    console.log('Loaded Pokemon', allPokemonList);
}

// =========================== RENDER ALL POKEMON===========================
function newRender(currentPokemon, i) {
    let pokemonCard = document.getElementById('card-content');
    const pokemonName = currentPokemon.name;
    const capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    const pokemonNumber = '#' + currentPokemon.id.toString().padStart(3, '0');
    const typeOne = currentPokemon.types[0].type.name;
    const typeTwo = currentPokemon.types[1] ? currentPokemon.types[1].type.name : '';
    let backgroundColor = typeColors[typeOne].replace("1)", "0.85)") || "rgba(0, 0, 0, 1";
    const spriteURL = currentPokemon.sprites.other["official-artwork"].front_default;

    const typeButtonsHTML = `
    <button class="typeButton" style="background-color: ${typeColors[typeOne].replace("1)", "0.75)")}">${typeOne.charAt(0).toUpperCase() + typeOne.slice(1)}</button>
    ${typeTwo ? `<button class="typeButton" style="background-color: ${typeColors[typeTwo].replace("1)", "0.75)")}">${typeTwo.charAt(0).toUpperCase() + typeTwo.slice(1)}</button>` : ''}
    `;
    const entry = document.createElement("div");
    entry.className = "col";
    entry.setAttribute('data-index', i - 1); // Index beginnt bei 0
    entry.id = `entry ${`#` + i}`;
    entry.style.backgroundColor = backgroundColor;
    entry.onclick = function () {
        renderOverlayPokemon(currentPokemon);
        document.getElementById('overlay').style.display = 'flex';
        currentPokemonIndex = parseInt(this.getAttribute('data-index')); // Setze currentPokemonIndex auf den geklickten Index
        renderOverlayPokemon(allPokemonList[currentPokemonIndex]);
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
            <img src="./img/pokeball_BG.png"">
        </div>
    `;
    pokemonCard.appendChild(entry);
}

// =========================== OVERLAY ===========================
function renderOverlayPokemon(currentPokemon) {
    let overlayCard = document.getElementById('card-overlay');
    overlayCard.innerHTML = createOverlayCardHTML(currentPokemon);
    document.body.style.overflow = 'hidden';
    loadAbout();

}

function createOverlayCardHTML(currentPokemon) {
    selectedPokemon = currentPokemon;
    const pokemonName = currentPokemon.name;
    const capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    const pokemonNumber = '#' + currentPokemon.id.toString().padStart(3, '0');
    const typeOne = currentPokemon.types[0].type.name;
    const typeTwo = currentPokemon.types[1] ? currentPokemon.types[1].type.name : '';
    const backgroundColorTypeOne = typeColors[typeOne].replace("1)", "0.75)") || "rgba(0, 0, 0, 1";
    const backgroundColorTypeTwo = typeTwo ? (typeColors[typeTwo].replace("1)", "0.95)") || "rgba(0, 0, 0, 1") : '';
    const backgroundColor = typeColors[typeOne].replace("1)", "0.85)") || "rgba(0, 0, 0, 1";
    let overlayCard = document.getElementById('card-overlay');
    overlayCard.style.border = `1px solid ${backgroundColor}`;
    const spriteURL = currentPokemon.sprites.other["official-artwork"].front_default;

    return `
        <div id="pokedex" style="background-color: ${backgroundColor};">
            <div class="close-nav">
                <img src="./img/x.png"  onclick="closeOverlay()">
            </div>
            <div class="navigation arrow-left">
            <img src="./img/arrow-left.png" style="background-color: ${backgroundColor};" onclick="previousPokemon()">
            </div>
            <div class="navigation arrow-right">
            <img src="./img/arrow-right.png" style="background-color: ${backgroundColor};" onclick="nextPokemon()">
            </div>
            <div class="pokemonNameContainer">
                <h1 id="pokemonName">${capitalizedPokemonName}</h1>
                <div class="pokemonNumberContainer">
                    <p class="pokemonNumber">${pokemonNumber}</p>
                </div>
            </div>
            <div class="typeContainer">
                <button class="typeButton" id="overlay_typeOne" style="background-color: ${backgroundColorTypeOne}">
                    ${typeOne.charAt(0).toUpperCase() + typeOne.slice(1)}
                </button>
                ${typeTwo ? `
                    <button class="typeButton" id="overlay_typeTwo" style="background-color: ${backgroundColorTypeTwo}">
                        ${typeTwo.charAt(0).toUpperCase() + typeTwo.slice(1)}
                    </button>` : ''}
            </div>
            <div class="pokemonSpriteContainer">
                <img id="pokemonSprite" src="${spriteURL}">
            </div>
        </div>
        <div class="info-container">
            <div class="card text-center no-border c-black w-100">
                <div class="card-header no-border bg-white">
                    <ul class="nav nav-pills card-header-pills space-between bg-white">
                        <li class="nav-item">
                            <button class="nav-link-button" onclick="loadAbout()">About</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link-button" onclick="loadStats()">Base Stats</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link-button" onclick="loadEvolutions()">Evolutions</button>
                        </li>
                        <li class="nav-item">
                            <button class="nav-link-button" onclick="loadMoves()">Moves</button>
                        </li>
                    </ul>
                </div>
                <div class="card-container" id="card-container">
                </div>
            </div>
        </div>
    `;
}

// =========================== CLOSE OVERLAY ===========================
function closeOverlay() {
    let overlayCard = document.getElementById('card-overlay');
    document.getElementById('overlay').style.display = 'none';
    document.body.style.overflow = 'auto';
    overlayCard.innerHTML = '';
}

// =========================== NEXT POKEMON ===========================
function nextPokemon() {
    if (currentPokemonIndex < allPokemonList.length - 1) {
        currentPokemonIndex++; // Erhöhe den Index
        const nextPokemon = allPokemonList[currentPokemonIndex];
        renderOverlayPokemon(nextPokemon); // Anzeigen des nächsten Pokemons
    }
}

// =========================== PREVIOUS POKEMON ===========================
function previousPokemon() {
    if (currentPokemonIndex > 0) {
        currentPokemonIndex--;
        renderOverlayPokemon(allPokemonList[currentPokemonIndex]);
    }
}


// =========================== ABOUT ===========================
function templateAbout() {
    let currentPokemon = selectedPokemon;
    const height = currentPokemon.height / 10 + ' m';
    const weight = currentPokemon.weight / 10 + ' kg';
    const abilities = currentPokemon.abilities[0].ability.name;
    return `
        <div class="card-body">
            <div class="pkmn-info info-left">
                <p>Height</p>
                <p>Weight</p>
                <p>Abilities</p>
            </div>
            <div class="pkmn-info info-right">
                <p>${height}</p>
                <p>${weight}</p>
                <p>${abilities.charAt(0).toUpperCase() + abilities.slice(1)}</p>                             
            </div>
        </div>
        <div class="card-body-title">
            <h2>Breeding</h2>
        </div>
        <div class="card-body">
            <div class="pkmn-info info-left">
                <p>Gender</p>
                <p>Egg Groups</p>
                <p>Egg Cycle</p>
            </div>
            <div class="pkmn-info info-right">
                <div class="gender">
                    <div class="gender-container"><img src="./img/male.png" alt="">
                        <p>50%</p>
                    </div>
                    <div class="gender-container"><img src="./img/female.png" alt="">
                        <p>50%</p>
                    </div>
                </div>
                <p>Monster</p>
                <p>${currentPokemon.types[0].type.name.charAt(0).toUpperCase() + currentPokemon.types[0].type.name.slice(1)}</p>
            </div>
        </div>
    `;
}

function loadAbout() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = templateAbout();
}

// =========================== STATS ===========================
function getPokemonStats() {
    let currentPokemon = selectedPokemon;
    let HP = currentPokemon.stats[0].base_stat;
    let ATTACK = currentPokemon.stats[1].base_stat;
    let DEFENSE = currentPokemon.stats[2].base_stat;
    let SP_ATTACK = currentPokemon.stats[3].base_stat;
    let SP_DEFENSE = currentPokemon.stats[4].base_stat;
    let SPEED = currentPokemon.stats[5].base_stat;
    let TOTAL = HP + ATTACK + DEFENSE + SP_ATTACK + SP_DEFENSE + SPEED;
    return { HP, ATTACK, DEFENSE, SP_ATTACK, SP_DEFENSE, SPEED, TOTAL };
}


function loadStats() {
    let stats = document.getElementById('card-container');
    stats.innerHTML = '';
    const { HP, ATTACK, DEFENSE, SP_ATTACK, SP_DEFENSE, SPEED, TOTAL } = getPokemonStats();
    stats.innerHTML = templateStats(HP, ATTACK, DEFENSE, SP_ATTACK, SP_DEFENSE, SPEED, TOTAL);
}


function templateStats(HP, ATTACK, DEFENSE, SP_ATTACK, SP_DEFENSE, SPEED, TOTAL) {
    return `
    <div class="card-body">
        <div class="pkmn-info info-left">
            <p>HP</p>   
            <p>Attack</p>   
            <p>Defense</p>  
            <p>Sp. Atk</p>  
            <p>Sp. Def</p>  
            <p>Speed</p>    
            <p>Total</p>    
        </div>
        <div class="pkmn-info info-mid">
            <p id="value_1">${HP}</p>
            <p id="value_2">${ATTACK}</p>
            <p id="value_3">${DEFENSE}</p>
            <p id="value_4">${SP_ATTACK}</p>
            <p id="value_5">${SP_DEFENSE}</p>
            <p id="value_6">${SPEED}</p>
            <p id="value_7">${TOTAL}</p>
        </div>
        <div class="pkmn-info info-values">
            <div class="progress">
                <div class="progress-bar bg-success" role="progressbar" style="width: ${(HP / 255) * 100}%" aria-valuenow="${HP}" aria-valuemin="0" aria-valuemax="255"></div>
            </div>
            <div class="progress">
                <div class="progress-bar bg-danger" role="progressbar" style="width: ${(ATTACK / 255) * 100}%" aria-valuenow="${ATTACK}" aria-valuemin="0" aria-valuemax="255"></div>
            </div>
            <div class="progress">
                <div class="progress-bar bg-danger" role="progressbar" style="width: ${(DEFENSE / 255) * 100}%" aria-valuenow="${DEFENSE}" aria-valuemin="0" aria-valuemax="255"></div>
            </div>
            <div class="progress">
                <div class="progress-bar bg-success" role="progressbar" style="width: ${(SP_ATTACK / 255) * 100}%" aria-valuenow="${SP_ATTACK}" aria-valuemin="0" aria-valuemax="255"></div>
            </div>
            <div class="progress">
                <div class="progress-bar bg-success" role="progressbar" style="width: ${(SP_DEFENSE / 255) * 100}%" aria-valuenow="${SP_DEFENSE}" aria-valuemin="0" aria-valuemax="255"></div>
            </div>
            <div class="progress">
                <div class="progress-bar bg-danger" role="progressbar" style="width: ${(SPEED / 255) * 100}%" aria-valuenow="${SPEED}" aria-valuemin="0" aria-valuemax="255"></div>
            </div>
            <div class="progress">
                <div class="progress-bar bg-success" role="progressbar" style="width: ${(TOTAL / 720) * 100}%" aria-valuenow="${TOTAL}" aria-valuemin="0" aria-valuemax="720"></div>
            </div>
        </div>
    </div>`;
}

// =========================== MOVES ===========================

function loadMoves() {
    let currentPokemon = selectedPokemon;
    const cardContainer = document.getElementById('card-container');
    let movesHTML = '';

    for (let i = 0; i < currentPokemon.moves.length; i++) {
        let move = currentPokemon.moves[i].move.name;
        movesHTML += ` <li class="list-group-item">${move.charAt(0).toUpperCase() + move.slice(1)}</li>`;
    }
    cardContainer.innerHTML = `
    <div class="custom-scrollbar">
        <div class="content-moves">
            <ul class="list-group list-group-flush">
                ${movesHTML}
            </ul>
        </div>
    </div>
    `;
}


function loadEvolutions() {
    let currentPokemon = selectedPokemon;
    const cardContainer = document.getElementById('card-container');
    let evosHTML = '';

    evosHTML += ``;

    cardContainer.innerHTML = `
    <div class="custom-scrollbar">
        <div class="content-moves">
            <ul class="list-group list-group-flush">
                ${movesHTML}
            </ul>
        </div>
    </div>
    `;
}


function loadMorePokemon() {
    firstPokemon += 10;
    loadPokemon();
}