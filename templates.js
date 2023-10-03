function templateAbout() {
    return `                        
<div class="card-body">
    <div class="pkmn-info info-left">
        <p>Species</p>
        <p>Height</p>
        <p>Weight</p>
        <p>Abilities</p>
    </div>
    <div class="pkmn-info info-right">
        <p>Seed</p>
        <p>23cm</p>
        <p>23kg</p>
        <p>Overgrow, Chlorophyl</p>
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
                <p>87.5%</p>
            </div>
            <div class="gender-container"><img src="./img/icons8-female-80 (1).png" alt="">
                <p>12.5%</p>
            </div>
        </div>
        <p>Monster</p>
        <p>Grass</p>
    </div>
</div>`;
}

function templateStats() {
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
            <p id="value_1">45</p>
            <p id="value_2">60</p>
            <p id="value_3">48</p>
            <p id="value_4">65</p>
            <p id="value_5">65</p>
            <p id="value_6">45</p>
            <p id="value_7">317</p>
        </div>
        <div class="pkmn-info info-values">
            <div class="value-div">
                <svg width="100%" height="20">
                    <rect class="background-rect" x="0" y="7" width="100%" height="5" />
                    <line class="line line-red" data-value-id="value_1" x1="0" y1="10" x2="0" y2="10"
                    stroke="red" stroke-width="5" />
                </svg>
            </div>

            <div class="value-div">
                <svg width="100%" height="20">
                    <rect class="background-rect" x="0" y="7" width="100%" height="5" />
                    <line class="line line-green" data-value-id="value_2" x1="0" y1="10" x2="0" y2="10"
                        stroke="red" stroke-width="5" />
                </svg>
            </div>

            <div class="value-div">
                <svg width="100%" height="20">
                    <rect class="background-rect" x="0" y="7" width="100%" height="5" />
                    <line class="line line-red" data-value-id="value_3" x1="0" y1="10" x2="0" y2="10"
                        stroke="red" stroke-width="5" />
                </svg>
            </div>

            <div class="value-div">
                <svg width="100%" height="20">
                    <rect class="background-rect" x="0" y="7" width="100%" height="5" />
                    <line class="line line-green" data-value-id="value_4" x1="0" y1="10" x2="0" y2="10"
                        stroke="red" stroke-width="5" />
                </svg>
            </div>

            <div class="value-div">
                <svg width="100%" height="20">
                    <rect class="background-rect" x="0" y="7" width="100%" height="5" />
                    <line class="line line-red" data-value-id="value_5" x1="0" y1="10" x2="0" y2="10"
                        stroke="red" stroke-width="5" />
                </svg>
            </div>

            <div class="value-div">
                <svg width="100%" height="20">
                    <rect class="background-rect" x="0" y="7" width="100%" height="5" />
                    <line class="line line-green" data-value-id="value_6" x1="0" y1="10" x2="0" y2="10"
                        stroke="red" stroke-width="5" />
                </svg>
            </div>

            <div class="value-div">
                <svg width="100%" height="20">
                    <rect class="background-rect" x="0" y="7" width="100%" height="5" />
                    <line class="line line-red" data-value-id="value_7" x1="0" y1="10" x2="0" y2="10"
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
    <div class="attack-container">
       <button type="button" class="btn btn-outline-primary">Primary</button>
       <button type="button" class="btn btn-outline-secondary">Secondary</button>
       <button type="button" class="btn btn-outline-success">Success</button>
       <button type="button" class="btn btn-outline-danger">Danger</button>
       <button type="button" class="btn btn-outline-warning">Warning</button>
       <button type="button" class="btn btn-outline-info">Info</button>
       <button type="button" class="btn btn-outline-primary">Primary</button>
       <button type="button" class="btn btn-outline-secondary">Secondary</button>
       <button type="button" class="btn btn-outline-success">Success</button>
       <button type="button" class="btn btn-outline-danger">Danger</button>
       <button type="button" class="btn btn-outline-warning">Warning</button>
       <button type="button" class="btn btn-outline-info">Info</button>
       <button type="button" class="btn btn-outline-primary">Primary</button>
       <button type="button" class="btn btn-outline-secondary">Secondary</button>
       <button type="button" class="btn btn-outline-success">Success</button>
       <button type="button" class="btn btn-outline-danger">Danger</button>
       <button type="button" class="btn btn-outline-warning">Warning</button>
       <button type="button" class="btn btn-outline-info">Info</button>
    </div>
</div>
`;
}