let currentPokemon;
let allPokemon;
let offset = 0;

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
    let url = 'https://pokeapi.co/api/v2/pokemon/bulbasaur ';
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
    loadAbout();
    renderAbout();
    document.getElementById('pokemonSprite').src = currentPokemon['sprites']['other']['official-artwork']['front_default'];
}
// =========================== RENDER NAME ===========================
function renderPokemonName() {
    let pokemonName = currentPokemon['name'];
    let pokemonNumber = currentPokemon['order'];
    capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    document.getElementById('pokemonName').innerHTML = capitalizedPokemonName;
    document.getElementById('pokemonNumber').innerHTML = '#' + pokemonNumber;
}
// =========================== RENDER TYPE ===========================
function renderPokemonType() {
    let pokemonType_1 = currentPokemon['types'][0]['type']['name'];
    let pokemonType_2 = currentPokemon['types'].length > 1 ? currentPokemon['types'][1]['type']['name'] : '';
    let typeOneButton = document.getElementById('typeOne');
    let typeTwoButton = document.getElementById('typeTwo');
    let backgroundColor = document.getElementById('pokedex');
    const darkerBackgroundColor = typeColors[pokemonType_1].replace("1)", "0.6");
    typeOneButton.innerHTML = pokemonType_1.charAt(0).toUpperCase() + pokemonType_1.slice(1);
    typeTwoButton.innerHTML = pokemonType_2.charAt(0).toUpperCase() + pokemonType_2.slice(1);
    backgroundColor.style.backgroundColor = darkerBackgroundColor;
    if (pokemonType_1) {
        typeOneButton.style.backgroundColor = typeColors[pokemonType_1].replace("1)", "0.8)");
    }
    if (pokemonType_2) {
        typeTwoButton.style.backgroundColor = typeColors[pokemonType_2].replace("1)", "0.8)");
    } else {
        typeTwoButton.style.display = 'none';
    }
}
// =========================== RENDER ABOUT ===========================
function renderAbout() {
    let height = currentPokemon['height'];
    let weight = currentPokemon['weight'];
    let abilities = currentPokemon['abilities'][0]['ability']['name'];
    document.getElementById('height').innerHTML = height / 10 + ' m';
    document.getElementById('weight').innerHTML = weight / 10 + ' kg';
    document.getElementById('abilities').innerHTML = abilities.charAt(0).toUpperCase() + abilities.slice(1);;
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
    moves.innerHTML = templateMoves();
}

// =========================== OPEN CARD ===========================
function openTitleCard() {
    let content = document.getElementById('content');
    content.innerHTML += templateTitleCard();
}

// =========================== CLOSE CARD ===========================


// =========================== LOAD MORE WITH SCROLL ===========================


// =========================== SEARCH BAR ===========================




// =========================== LIKE ===========================
function like(){
    let like = document.getElementById('like');
    let likeImg = './img/like.png';
    let likeFullImg = './img/like_full.png';

    if (like.getAttribute('src') === likeImg){
        like.setAttribute('src', likeFullImg);
        localStorage.setItem('likeStatus', 'liked');
    } else {
        like.src = likeImg;
        localStorage.removeItem('likeStatus');
    }
}
document.addEventListener('DOMContentLoaded', () => {
    let like = document.getElementById('like');
    let likeStatus = localStorage.getItem('likeStatus');

    if (likeStatus === 'liked') {
        like.setAttribute('src', './img/like_full.png');
    }
});