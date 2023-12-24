const pokemonList = document.getElementById('js-pokemon-list');
const loadMorebutton = document.getElementById('js-load-more-button');
const pokemonCardModal = document.getElementById('js-pokemon-card-modal');


const limit = 10;
const maxRecords = 151;
let offset = 0;

async function loadPokemonItens(offset, limit) {
    await pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
            <li class="pokemon-item ${pokemon.type}" onclick="viewPokemonDetail('${pokemon.number}')">
                <span class="pokemon-item__number">#${pokemon.number}</span>
                <span class="pokemon-item__name">${pokemon.name}</span>
                <div class="pokemon-item__detail">
                    <ol class="pokemon-item__types">
                        ${pokemon.types.map((type) => `<li class="pokemon-item__types__type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img class="pokemon-item__detail__sprite" src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>`).join('');
    });
}

async function loadPokemonDetail(pokemon_id) {
    await pokeApi.getPokemonById(pokemon_id)
    .then((pokemon) => {
        pokemonCardModal.innerHTML = `
        <section class="pokemon-card ${pokemon.type}" id="pokemon-card">
            <button class="pokemon-card__button" id="pokemon-card-btn" onclick='exitModal()'><img src="assets/images/icons8-fechar.svg" alt="exit" width="100%"></button>
            <section class="pokemon-card__top">
                <div class="pokemon-card__top__details">
                    <span class="pokemon-card__top__details__id">#${pokemon.number}</span>
                    <span class="pokemon-card__top____details__name">${pokemon.name}</span>
                    <ol class="pokemon-card__top__details__types">
                        ${pokemon.types.map((type => `<li class="pokemon-card__top__details__types__type" style="background-color: var(--${type})">${type}</li>`)).join('')}
                    </ol>
                </div>
                <div><img class="pokemon-card__top__sprite" src="${pokemon.photo}" alt="${pokemon.name}"></div>
            </section>
            <section class="pokemon-card__bottom">
                <nav>
                    <ul class="pokemon-card__bottom__menu">
                        <li class="pokemon-card__bottom__menu__item" id="js-info-details" onclick="infoDetails(${pokemon_id})">
                            Details
                        </li>
                        <li class="pokemon-card__bottom__menu__item" id="js-info-moves" onclick="loadMoves(${pokemon_id})">
                            Moves
                        </li>
                        <li class="pokemon-card__bottom__menu__item" id="js-info-status" onclick="loadStats(${pokemon_id})">
                            Status
                        </li>
                        <li class="pokemon-card__bottom__menu__item" id="js-info-evolution">
                            Evolution
                        </li>
                    </ul>
                </nav>
                <section class="pokemon-card__bottom__info" id="js-item_info">
                    <div class="pokemon-card__bottom__info--details">
                        <div class="pokemon-card__bottom__info--details__fields">
                            <p>Height<br>${pokemon.height}</p>
                            <p>Weight<br>${pokemon.weight} lbs</p>
                        </div>
                        <p class="pokemon-card__bottom__info--details__description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem vitae ornare blandit. Mauris et sodales metus. Aenean suscipit mi risus, ac tincidunt erat auctor at. Nunc faucibus ipsum ligula, ac ultricies tellus bibendum in. Etiam tempor sapien a blandit consectetur. Aliquam faucibus sapien non ex maximus consequat. Aenean euismod consequat enim, vitae finibus urna finibus id. Vestibulum ultrices non sapien non dictum. Curabitur non massa molestie, porta libero quis, porta sapien. Praesent eget ante at nunc ultricies laoreet. In finibus placerat magna cursus congue. Quisque non placerat lectus, sit amet porta libero.  
                        </p>
                    </div>  
                </section>
            </section>
        </section>`
    })
    //loadMoves(pokemon_id);
    document.getElementById("js-info-evolution").addEventListener('click', clearPokemonInfo);
    

}

function loadMoves(pokemon_id) {
    const item_detail = document.getElementById("js-item_info")
    pokeApi.getPokemonMoves(pokemon_id)
        .then((moves = []) => {
            item_detail.innerHTML = `
            <div class="pokemon-card__bottom__info--moves">
             ${moves.map((move) => `<p class="pokemon-card__bottom__info--moves__move">${move}</p>
            `).join('')} 
            </div>`;
        })
}

function loadStats(pokemon_id) {
    const item_detail = document.getElementById("js-item_info")
    pokeApi.getPokemonStats(pokemon_id)
        .then((stats = []) => {
            item_detail.innerHTML = `
            <div class="pokemon-card__bottom__info--stats">
             ${stats.map((stat) => ` <p><span class="stat-label">${stat}</span> <progress value=${Math.round(Math.random() * 100)} max="100" class="pokemon-card__bottom__info--stats__stat"></progress></p>
            `).join('')} 
            </div>`;
        })
}

function infoDetails(pokemon_id) {
    const item_detail = document.getElementById("js-item_info")
    pokeApi.getPokemonById(pokemon_id)
    .then((pokemon) => {
    item_detail.innerHTML = `
    <div class="pokemon-card__bottom__info--details">
        <div class="pokemon-card__bottom__info--details__fields">
            <p>Height<br>${pokemon.height}</p>
            <p>Weight<br>${pokemon.weight} lbs</p>
        </div>
        <p class="pokemon-card__bottom__info--details__description"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus porttitor sem vitae ornare blandit. Mauris et sodales metus. Aenean suscipit mi risus, ac tincidunt erat auctor at. Nunc faucibus ipsum ligula, ac ultricies tellus bibendum in. Etiam tempor sapien a blandit consectetur. Aliquam faucibus sapien non ex maximus consequat. Aenean euismod consequat enim, vitae finibus urna finibus id. Vestibulum ultrices non sapien non dictum. Curabitur non massa molestie, porta libero quis, porta sapien. Praesent eget ante at nunc ultricies laoreet. In finibus placerat magna cursus congue. Quisque non placerat lectus, sit amet porta libero.  
        </p>
        </div>`
    });
}

function viewPokemonDetail(id) {
    pokemonCardModal.style.display = 'flex';
    pokemonCardModal.style.alignItems = 'center';
    loadPokemonDetail(id);
}

function exitModal() {
    pokemonCardModal.style.display = 'none';
    pokemonCardModal.innerHTML = '';
}

function clearPokemonInfo() {
    const item_detail = document.getElementById("js-item_info")
    item_detail.innerHTML = "";
}

loadPokemonItens(offset, limit)
//viewPokemonDetail(6)

loadMorebutton.addEventListener('click', () => {
    offset += limit;

    const qtdRecordNextPage = offset + limit;

    if(qtdRecordNextPage >= maxRecords) {
        const newLimit = maxRecords - offset;
        loadPokemonItens(offset, newLimit);
        loadMorebutton.parentElement.removeChild(loadMorebutton);
    }else {
        loadPokemonItens(offset, limit);
    }
   
});

