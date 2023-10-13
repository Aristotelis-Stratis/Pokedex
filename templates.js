function templateAbout(height, weight, abilities) {
    let pokemonType_1 = currentPokemon['types'][0]['type']['name'];
    type = pokemonType_1.charAt(0).toUpperCase() + pokemonType_1.slice(1);
    return `                        
<div class="card-body">
    <div class="pkmn-info info-left">
        <p>Height</p>
        <p>Weight</p>
        <p>Abilities</p>
    </div>
    <div class="pkmn-info info-right">
        <p id="height">${height}</p>
        <p id="weight">${weight}</p>
        <p id="abilities">${abilities}</p>
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
            <div class="gender-container"><img src="./img/icons8-male-80 (1).png" alt="">
                <p>50%</p>
            </div>
            <div class="gender-container"><img src="./img/icons8-female-80 (1).png" alt="">
                <p>50%</p>
            </div>
        </div>
        <p>Monster</p>
        <p>${type}</p>
    </div>
</div>
`;
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

function templateEvolutions() {

}
function templateMoves() {
    return `
    <div class="card-body">
        <div class="attack-container" id="moves-container">
            <button>${currentPokemon['name']}</button>
       </div>
    </div>`;
}

function createPokemonCardHTML(i, pokemonNumber, capitalizedPokemonName, backgroundColor, pokemonType_1, pokemonType_2, spriteURL) {
    return `
        <div class="row row-cols-4" id="${pokemonNumber} ${currentPokemon['name']}">
            <div class="col" id="entry${i}" style="background-color: ${backgroundColor};">
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
                    <img id="pokemonSprite" src="${spriteURL}">
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
}

function createOverlayCardHTML(i, pokemonNumber, capitalizedPokemonName, backgroundColor, pokemonType_1, pokemonType_2, spriteURL) {
    return `
    <div class="pokedex-entry" id="card-overlay">
    <div id="pokedex ${i}">
        <div class="navigation">
            <img src="./img/arrow-left-white.png" onclick="closeOverlay()">
            <img src="./img/like.png" id="like" onclick="like()">
        </div>
        <div class="pokemonNameContainer">
            <h1 id="pokemonName">${capitalizedPokemonName}</h1>
            <div class="pokemonNumberContainer">
                <p class="pokemonNumber" id="pokemonNumber">${pokemonNumber}</p>
            </div>
        </div>
        <div class="typeContainer">
        <button class="typeButton" id="typeOne_${i}">${pokemonType_1}</button>
        <button class="typeButton" id="typeTwo_${i}">${pokemonType_2}</button>
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
                        <a class="nav-link" href="#" onclick="loadAbout(${i})">About</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="loadStats(${i})">Base Stats</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Evolutions</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" onclick="loadMoves(${i})">Moves</a>
                    </li>
                </ul>
            </div>
            <div class="card-container" id="card-container">
                <div class="evolution-container">
                    <div class="evolution"></div>
                    <div class="evolution"></div>
                    <div class="evolution"></div>
                </div>
            </div>
        </div>
    </div>
</div>`;
}