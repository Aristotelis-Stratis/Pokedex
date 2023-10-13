let currentPokemon;
let offset = 0;
let firstPokemon = 0;
let allPokemon = 20;

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
    for (let i = firstPokemon + 1; i <= allPokemon; i++) {
        let url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        let response = await fetch(url);
        currentPokemon = await response.json();

        console.log('Loaded Pokemon', currentPokemon);
        renderPokemon(i);
    }
}

// =========================== RENDER ===========================

function renderPokemon(i) {
    let pokemonCard = document.getElementById('card-content');
    let pokemonType_1 = currentPokemon['types'][0]['type']['name'];
    let pokemonType_2 = currentPokemon['types'].length > 1 ? currentPokemon['types'][1]['type']['name'] : '';
    let backgroundColor = typeColors[pokemonType_1].replace("1)", "0.75)") || "rgba(0, 0, 0, 1"; // Default color if type not found in typeColors
    let pokemonName = currentPokemon['name'];
    let pokemonNumber = '#' + currentPokemon['id'];
    capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    pokemonCard.innerHTML +=
        `
    <div class="row row-cols-4" id="${pokemonNumber} ${currentPokemon['name']}">
                <div class="col" id="entry${i}" onclick="openCard(${i})" style="background-color: ${backgroundColor};">
                    <div class="colNameContainer">
                        <h2 id="pokemonName">${capitalizedPokemonName}</h2>
                        <div class="colNumberContainer">
                            <p class="colNumber" id="pokemonNumber">${pokemonNumber}</p>
                        </div>
                    </div>
                    <div class="colTypeContainer">
                        <button class="typeButton" id="typeOne_${i}">${pokemonType_1}</button>
                        <button class="typeButton" id="typeTwo_${i}">${pokemonType_2}</button>
                    </div>
                    <div class="colSpriteContainer">
                        <img id="pokemonSprite" src="${currentPokemon['sprites']['other']['official-artwork']['front_default']}">
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
                </div>
            </div>
    `;
    // renderPokemonType()
    let typeOneButton = document.getElementById(`typeOne_${i}`);
    let typeTwoButton = document.getElementById(`typeTwo_${i}`);
    typeOneButton.innerHTML = pokemonType_1.charAt(0).toUpperCase() + pokemonType_1.slice(1);
    typeTwoButton.innerHTML = pokemonType_2.charAt(0).toUpperCase() + pokemonType_2.slice(1);
    if (pokemonType_1) {
        typeOneButton.style.backgroundColor = typeColors[pokemonType_1].replace("1)", "1)");
    }
    if (pokemonType_2) {
        typeTwoButton.style.backgroundColor = typeColors[pokemonType_2].replace("1)", "0.8)");
    } else {
        typeTwoButton.style.display = 'none';
    }
}

// function renderPokemonInfo() {
//     renderPokemonName();
//     renderPokemonType();
//     renderPokemonStats();
//     renderAbout();
// }

// =========================== RENDER TYPE ===========================
//  function renderPokemonType() {
//      let typeOneButton = document.getElementById(`typeOne_${i}`);
//     let typeTwoButton = document.getElementById(`typeTwo_${i}`);
//     typeOneButton.innerHTML = pokemonType_1.charAt(0).toUpperCase() + pokemonType_1.slice(1);
//     typeTwoButton.innerHTML = pokemonType_2.charAt(0).toUpperCase() + pokemonType_2.slice(1);
//     if (pokemonType_1) {
//         typeOneButton.style.backgroundColor = typeColors[pokemonType_1].replace("1)", "1)");
//     }
//     if (pokemonType_2) {
//         typeTwoButton.style.backgroundColor = typeColors[pokemonType_2].replace("1)", "0.8)");
//     } else {
//         typeTwoButton.style.display = 'none';
//     }
//  }


// =========================== RENDER NAME ===========================
// function renderPokemonName() {
//     let pokemonName = currentPokemon['name'];
//     let pokemonNumber = currentPokemon['order'];
//     capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
//     document.getElementById('pokemonName').innerHTML = capitalizedPokemonName;
//     document.getElementById('pokemonNumber').innerHTML = '#' + pokemonNumber;
// }

// =========================== RENDER ABOUT ===========================
function renderAbout() {
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

// =========================== RENDER MOVES ===========================
// function renderMoves() {
//     let movesContainer = document.getElementById('moves-container');
//     for (let i = 0; i < currentPokemon['moves']['length']; i++) {
//         movesContainer.innerHTML += ``;

//     }
// }


// =========================== LOAD CARD LINKS ===========================


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
    moves.innerHTML = templateMoves();
}

// =========================== OPEN CARD ===========================
function openCard() {
    let entry = document.getElementById('entry');
    entry.style.display = "flex";
}

// =========================== CLOSE CARD ===========================
function closeCard() {
    let entry = document.getElementById('entry');
    entry.style.display = "none";
}


// =========================== LOAD MORE WITH SCROLL ===========================


// =========================== SEARCH BAR ===========================




// =========================== LIKE ===========================
// function like() {
//     let like = document.getElementById('like');
//     let likeImg = './img/like.png';
//     let likeFullImg = './img/like_full.png';

//     if (like.getAttribute('src') === likeImg) {
//         like.setAttribute('src', likeFullImg);
//         localStorage.setItem('likeStatus', 'liked');
//     } else {
//         like.src = likeImg;
//         localStorage.removeItem('likeStatus');
//     }
// }
// document.addEventListener('DOMContentLoaded', () => {
//     let like = document.getElementById('like');
//     let likeStatus = localStorage.getItem('likeStatus');

//     if (likeStatus === 'liked') {
//         like.setAttribute('src', './img/like_full.png');
//     }
// });


