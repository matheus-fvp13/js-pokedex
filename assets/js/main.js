const pokemonList = document.getElementById('pokemons');
const loadMorebutton = document.getElementById('loadMoreButton');
const pokemonCardModal = document.getElementById('pokemon-card-modal');


const limit = 10;
const maxRecords = 151;
let offset = 0;

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        pokemonList.innerHTML += pokemons.map((pokemon) => `
            <li class="pokemon ${pokemon.type}" onclick="viewPokemonDetail('${pokemon.number}')">
                <span class="number">#${pokemon.number}</span>
                <span class="name">${pokemon.name}</span>
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>
                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </li>`).join('');
    });
}

function loadPokemonDetail(pokemon_id) {
    pokeApi.getPokemonById(pokemon_id)
    .then((pokemon) => {
        pokemonCardModal.innerHTML = `
        <section class="pokemon-card ${pokemon.type}" id="pokemon-card">
            <section class="pokemon-detail-top">
                <button class="pokemon-card-btn" id="pokemon-card-btn" onclick='exitModal()'>Voltar</button>
                <span class="pokemon-detail-top-id">#${pokemon.number}</span>
                <span class="pokemon-detail-top-name">${pokemon.name}</span>
                <div class="pokemon-detail-top-details">
                    <ol class="pokemon-detail-top-types">
                        ${pokemon.types.map((type => `<li class="type" style="background-color: var(--${type})">${type}</li>`)).join('')}
                    </ol>
                    <img class="pokemon-detail-top-image" src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
            </section>
            <section class="pokemon-detail-bottom">
                <nav>
                    <ul class="pokemon-card-menu">
                        <li class="menu-item">
                            Details
                        </li>
                        <li class="menu-item">
                            Moves
                        </li>
                        <li class="menu-item">
                            Status
                        </li>
                        <li class="menu-item">
                            Evolution
                        </li>
                    </ul>
                </nav>
                <section class="item-detail" id="item_detail">

                </section>
            </section>
        </section>`
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

loadPokemonItens(offset, limit)

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

