function templateAbout() {
    return `                        
<div class="card-body">
    <div class="pkmn-info info-left">
        <p>Height</p>
        <p>Weight</p>
        <p>Abilities</p>
    </div>
    <div class="pkmn-info info-right">
        <p id="height">23cm</p>
        <p id="weight">23kg</p>
        <p id="abilities"></p>
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
            <div class="value-div">
                <svg width="100%" height="20">
                    <rect class="background-rect" x="0" y="7" width="100%" height="5" />
                    <line class="line line-red" data-value-id="value_1" x1="${HP}" y1="10" x2="0" y2="10"
                    stroke="red" stroke-width="5" />
                </svg>
            </div>

            <div class="value-div">
                <svg width="100%" height="20">
                    <rect class="background-rect" x="0" y="7" width="100%" height="5" />
                    <line class="line line-green" data-value-id="value_2" x1="${ATTACK}" y1="10" x2="0" y2="10"
                        stroke="red" stroke-width="5" />
                </svg>
            </div>

            <div class="value-div">
                <svg width="100%" height="20">
                    <rect class="background-rect" x="0" y="7" width="100%" height="5" />
                    <line class="line line-red" data-value-id="value_3" x1="${DEFENSE}" y1="10" x2="0" y2="10"
                        stroke="red" stroke-width="5" />
                </svg>
            </div>

            <div class="value-div">
                <svg width="100%" height="20">
                    <rect class="background-rect" x="0" y="7" width="100%" height="5" />
                    <line class="line line-green" data-value-id="value_4" x1="${SP_ATTACK}" y1="10" x2="0" y2="10"
                        stroke="red" stroke-width="5" />
                </svg>
            </div>

            <div class="value-div">
                <svg width="100%" height="20">
                    <rect class="background-rect" x="0" y="7" width="100%" height="5" />
                    <line class="line line-red" data-value-id="value_5" x1="${SP_DEFENSE}" y1="10" x2="0" y2="10"
                        stroke="red" stroke-width="5" />
                </svg>
            </div>

            <div class="value-div">
                <svg width="100%" height="20">
                    <rect class="background-rect" x="0" y="7" width="100%" height="5" />
                    <line class="line line-green" data-value-id="value_6" x1="${SPEED}" y1="10" x2="0" y2="10"
                        stroke="red" stroke-width="5" />
                </svg>
            </div>

            <div class="value-div">
                <svg width="100%" height="20">
                    <rect class="background-rect" x="0" y="7" width="100%" height="5" />
                    <line class="line line-red" data-value-id="value_7" x1="${TOTAL}" y1="10" x2="0" y2="10"
                        stroke="red" stroke-width="5" />
                </svg>
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

// function templateTitleCard() {
//     return `
//     <div class="pokedex-entry">
//             <div id="pokedex">
//                 <div class="navigation">
//                     <img src="./img/arrow-left-white.png">
//                     <img src="./img/like.png" id="like">
//                 </div>
//                 <div class="pokemonNameContainer">
//                     <h1 id="pokemonName">Name</h1>
//                     <div class="pokemonNumberContainer">
//                         <p class="pokemonNumber" id="pokemonNumber">#123</p>
//                     </div>
//                 </div>
//                 <div class="typeContainer">
//                     <button class="typeButton" id="typeOne">Fire</button> <button class="typeButton"
//                         id="typeTwo">Test</button>
//                 </div>
//                 <div class="pokemonSpriteContainer">
//                     <img id="pokemonSprite" src="" alt="Charmander">
//                 </div>
//             </div>
//             <div class="info-container">
//                 <div class="card text-center no-border c-black w-100">
//                     <div class="card-header no-border bg-white">
//                         <ul class="nav nav-pills card-header-pills space-between bg-white">
//                             <li class="nav-item">
//                                 <a class="nav-link" href="#" onclick="loadAbout()">About</a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link" href="#" onclick="loadStats()">Base Stats</a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link" href="#">Evolutions</a>
//                             </li>
//                             <li class="nav-item">
//                                 <a class="nav-link" href="#" onclick="loadMoves()">Moves</a>
//                             </li>
//                         </ul>
//                     </div>
//                     <div class="card-container" id="card-container">
//                         <div class="evolution-container">
//                         <div class="evolution"></div>
//                         <div class="evolution"></div>
//                         <div class="evolution"></div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>`;
// }