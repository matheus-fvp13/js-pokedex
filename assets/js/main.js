const pokemonList = document.getElementById('js-pokemon-list');
const loadMorebutton = document.getElementById('js-load-more-button');
const pokemonCardModal = document.getElementById('js-pokemon-card-modal');

const pokemonId = 1;


const limit = 10;
const maxRecords = 151;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
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
            <section class="pokemon-card__top">
                <button class="pokemon-card__top__button" id="pokemon-card-btn" onclick='exitModal()'>Voltar</button>
                <span class="pokemon-card__top__id">#${pokemon.number}</span>
                <span class="pokemon-card__top__name">${pokemon.name}</span>
                <div class="pokemon-card__top__details">
                    <ol class="pokemon-card__top__details__types">
                        ${pokemon.types.map((type => `<li class="pokemon-card__top__details__types__type" style="background-color: var(--${type})">${type}</li>`)).join('')}
                    </ol>
                    <img class="pokemon-card__top__details__sprite" src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </section>
            <section class="pokemon-card__bottom">
                <nav>
                    <ul class="pokemon-card__bottom__menu">
                        <li class="pokemon-card__bottom__menu__item" id="js-info-details">
                            Details
                        </li>
                        <li class="pokemon-card__bottom__menu__item" id="js-info-moves" onclick="loadMoves(${pokemon_id})">
                            Moves
                        </li>
                        <li class="pokemon-card__bottom__menu__item" id="js-info-status">
                            Status
                        </li>
                        <li class="pokemon-card__bottom__menu__item" id="js-info-evolution">
                            Evolution
                        </li>
                    </ul>
                </nav>
                <section class="pokemon-card__bottom__info" id="js-item_info">
                </section>
            </section>
        </section>`
    })
    //loadMoves(pokemon_id);
    document.getElementById("js-info-details").addEventListener('click', clearPokemonInfo);
    document.getElementById("js-info-status").addEventListener('click', clearPokemonInfo);
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

//loadPokemonItens(offset, limit)
viewPokemonDetail(1)

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

