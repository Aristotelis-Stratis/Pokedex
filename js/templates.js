function createPokemonCardHTML(pokemonName, capitalizedPokemonName, pokemonNumber, typeButtonsHTML, spriteURL, i) {
    return `
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
            <img src="./img/pokeball_BG.png">
        </div>
    `;
}

function createTypeButtonsHTML(typeOne, typeTwo) {
    const typeButtonOne = `<button class="typeButton" style="background-color: ${typeColors[typeOne].replace("1)", "0.75)")}">${capitalizeFirstLetter(typeOne)}</button>`;
    
    const typeButtonTwo = typeTwo ? `<button class="typeButton" style="background-color: ${typeColors[typeTwo].replace("1)", "0.75)")}">${capitalizeFirstLetter(typeTwo)}</button>` : '';

    return typeButtonOne + typeButtonTwo;
}

function createOverlayCardHTML(currentPokemon) {
    selectedPokemon = currentPokemon;
    const backgroundColor = getBackgroundColor(currentPokemon);
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
                ${getPokemonNameHTML(currentPokemon)}
            </div>
            <div class="typeContainer">
                ${getTypeButtonsHTML(currentPokemon)}
            </div>
            <div class="pokemonSpriteContainer">
                ${getPokemonSpriteHTML(currentPokemon)}
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

function getBackgroundColor(currentPokemon) {
    const typeOne = currentPokemon.types[0].type.name;
    return typeColors[typeOne].replace("1)", "0.85)") || "rgba(0, 0, 0, 1";
}

function getPokemonNameHTML(currentPokemon) {
    const capitalizedPokemonName = capitalizeFirstLetter(currentPokemon.name);
    const pokemonNumber = `#${currentPokemon.id.toString().padStart(3, '0')}`;
    return `
        <h1 id="pokemonName">${capitalizedPokemonName}</h1>
        <div class="pokemonNumberContainer">
            <p class="pokemonNumber">${pokemonNumber}</p>
        </div>
    `;
}

function getTypeButtonsHTML(currentPokemon) {
    const typeOne = currentPokemon.types[0].type.name;
    const typeTwo = currentPokemon.types[1] ? currentPokemon.types[1].type.name : '';
    const backgroundColorTypeOne = typeColors[typeOne].replace("1)", "0.75)") || "rgba(0, 0, 0, 1";
    const backgroundColorTypeTwo = typeTwo ? (typeColors[typeTwo].replace("1)", "0.95)") || "rgba(0, 0, 0, 1") : '';
    return `
        <button class="typeButton" id="overlay_typeOne" style="background-color: ${backgroundColorTypeOne}">
            ${capitalizeFirstLetter(typeOne)}
        </button>
        ${typeTwo ? `
            <button class="typeButton" id="overlay_typeTwo" style="background-color: ${backgroundColorTypeTwo}">
                ${capitalizeFirstLetter(typeTwo)}
            </button>` : ''}
    `;
}

function getPokemonSpriteHTML(currentPokemon) {
    const spriteURL = currentPokemon.sprites.other["official-artwork"].front_default;
    return `
        <img id="pokemonSprite" src="${spriteURL}">
    `;
}

function templateAbout(currentPokemon) {
    const height = (currentPokemon.height / 10).toFixed(1) + ' m'; // Formatieren der Höhe auf eine Nachkommastelle
    const weight = (currentPokemon.weight / 10).toFixed(1) + ' kg'; // Formatieren des Gewichts auf eine Nachkommastelle
    const abilities = capitalizeFirstLetter(currentPokemon.abilities[0].ability.name);

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
                <p>${abilities}</p>                             
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
                <p>${capitalizeFirstLetter(currentPokemon.types[0].type.name)}</p>
            </div>
        </div>
    `;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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
