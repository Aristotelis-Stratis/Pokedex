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
    // Fetching elements and data
    let pokemonCard = document.getElementById('card-content');
    let pokemonType_1 = currentPokemon['types'][0]['type']['name'];
    let pokemonType_2 = currentPokemon['types'].length > 1 ? currentPokemon['types'][1]['type']['name'] : '';
    let pokemonName = currentPokemon['name'];
    let pokemonNumber = '#' + currentPokemon['id'];

    // Creating the formatted name
    capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);

    // Background color and sprite URL
    let backgroundColor = typeColors[pokemonType_1].replace("1)", "0.75)") || "rgba(0, 0, 0, 1"; // Default color if type not found in typeColors
    const spriteURL = currentPokemon['sprites']['other']['official-artwork']['front_default'];

    // Creating the HTML code for the Pokemon card
    const cardHTML = createPokemonCardHTML(i, pokemonNumber, capitalizedPokemonName, backgroundColor, pokemonType_1, pokemonType_2, spriteURL);

    // Adding the Pokemon card to the document
    pokemonCard.innerHTML += cardHTML;

    // Fetching the Type-One and Type-Two buttons
    let typeOneButton = document.getElementById(`typeOne_${i}`);
    let typeTwoButton = document.getElementById(`typeTwo_${i}`);

    // Adjusting button properties
    setButtonProperties(typeOneButton, typeTwoButton, pokemonType_1, pokemonType_2);
}

// function renderPokemonInfo() {
//     renderPokemonName();
//     renderPokemonType();
//     renderPokemonStats();
//     renderAbout();
// }

// =========================== RENDER TYPE ===========================
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


