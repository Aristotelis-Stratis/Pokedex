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
    for (let i = firstPokemon + 1; i <= firstPokemon + 50; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        let currentPokemon = await response.json();
        allPokemonList.push(currentPokemon);
        newRender(currentPokemon, i);
    }
}

// =========================== RENDER ALL POKEMON===========================
function newRender(currentPokemon, i) {
    let pokemonCard = document.getElementById('card-content');
    const pokemonName = currentPokemon.name;
    const capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    const pokemonNumber = `#${currentPokemon.id.toString().padStart(3, '0')}`;
    const typeOne = currentPokemon.types[0].type.name;
    const typeTwo = currentPokemon.types[1]?.type.name;
    let backgroundColor = typeColors[typeOne].replace("1)", "0.85)") || "rgba(0, 0, 0, 1";
    const spriteURL = currentPokemon.sprites.other["official-artwork"].front_default;

    const typeButtonsHTML = createTypeButtonsHTML(typeOne, typeTwo);
    const entry = document.createElement("div");
    entry.className = "col";
    entry.setAttribute('data-index', i - 1);
    entry.id = `entry ${`#` + i}`;
    entry.style.backgroundColor = backgroundColor;
    entry.onclick = function () {
        renderOverlayPokemon(currentPokemon);
        document.getElementById('overlay').style.display = 'flex';
        currentPokemonIndex = parseInt(this.getAttribute('data-index'));
        renderOverlayPokemon(allPokemonList[currentPokemonIndex]);
        document.getElementById('overlay').style.display = 'flex';
    };

    entry.innerHTML = createPokemonCardHTML(pokemonName, capitalizedPokemonName, pokemonNumber, typeButtonsHTML, spriteURL, i);
    pokemonCard.appendChild(entry);
}

// =========================== OVERLAY ===========================
function renderOverlayPokemon(currentPokemon) {
    let overlayCard = document.getElementById('card-overlay');
    overlayCard.innerHTML = createOverlayCardHTML(currentPokemon);
    document.body.style.overflow = 'hidden';
    loadAbout();
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
        currentPokemonIndex++;
        const nextPokemon = allPokemonList[currentPokemonIndex];
        renderOverlayPokemon(nextPokemon);
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
function loadAbout() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = templateAbout(selectedPokemon);
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

// =========================== MOVES ===========================
function loadMoves() {
    let currentPokemon = selectedPokemon;
    const cardContainer = document.getElementById('card-container');
    let movesHTML = '';

    for (let i = 0; i < currentPokemon.moves.length; i++) {
        let move = currentPokemon.moves[i].move.name;
        movesHTML += `<li class="list-group-item">${capitalizeFirstLetter(move)}</li>`;
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

function loadMorePokemon() {
    firstPokemon += 50;
    loadPokemon();
}

// =========================== SEARCH ===========================
document.addEventListener("DOMContentLoaded", function () {
    const searchInput = document.getElementById("searchInput");

    searchInput.addEventListener("input", function () {
        const searchTerm = searchInput.value.toLowerCase();
        filterPokemonList(searchTerm);
    });

    function filterPokemonList(searchTerm) {
        const filteredPokemon = allPokemonList.filter((pokemon) => {
            const pokemonName = pokemon.name.toLowerCase();
            return pokemonName.startsWith(searchTerm);
        });
        clearPokemonList();
        filteredPokemon.forEach((pokemon, index) => {
            newRender(pokemon, firstPokemon + index + 1);
        });
    }

    function clearPokemonList() {
        const pokemonCard = document.getElementById('card-content');
        while (pokemonCard.firstChild) {
            pokemonCard.removeChild(pokemonCard.firstChild);
        }
    }
});

// =========================== SCROLL UP ===========================
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector(".top-img").style.display = "none";
    window.addEventListener("scroll", function () {
        if (window.scrollY >= 100) {
            document.querySelector(".top-img").style.display = "block";
        } else {
            document.querySelector(".top-img").style.display = "none";
        }
    });
});

