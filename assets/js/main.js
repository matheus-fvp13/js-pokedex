
const offset = 0;
const limit = 10;
const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;


function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon">
            <span class="number">#001</span>
            <span class="name">${pokemon.name}</span>
            <div class="detail">
                <ol class="types">
                    <li class="type">grass</li>
                    <li class="type">posion</li>
                </ol>
                <img src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/1.svg" alt="${pokemon.name}">
            </div>
        </li>
    `
}

const pokemons = document.getElementById('pokemons');

fetch(url)
    .then((response) => response.json())
    .then((body) => body.results)
    .then((pokemonList) => {
        for(let i = 0; i < pokemonList.length; i++) {
            const pokemon = pokemonList[i];
            pokemons.innerHTML += convertPokemonToLi(pokemon);
        }
        
    })
    .catch((error) => console.log(error));


