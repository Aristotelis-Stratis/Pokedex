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

function renderPokemonName(){
    let pokemonName = currentPokemon['name'];
    capitalizedPokemonName = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1);
    document.getElementById('pokemonName').innerHTML = capitalizedPokemonName;
}