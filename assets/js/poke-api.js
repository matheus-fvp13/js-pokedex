const pokeApi = {};

function covertPokeApiDetailToPokemon(pokeDetail) {
    const pokemon = new Pokemon();
    pokemon.name = pokeDetail.name;
    pokemon.number = pokeDetail.id;

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
    const [type] = types;

    pokemon.types = types;
    pokemon.type = type;
    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;

    return pokemon;
}

pokeApi.getPokemonDetail = async (pokemon) => {
    return fetch(pokemon.url)
            .then((response) => response.json())
            .then(covertPokeApiDetailToPokemon)
}

pokeApi.getPokemons = async (offset = 0, limit = 10) => {
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    return fetch(url)
        .then((response) => response.json())
        .then((body) => body.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequest) => Promise.all(detailRequest))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.log(error));
}

pokeApi.getPokemonById = async (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
    return fetch(url)
        .then((response) => response.json())
        .then(covertPokeApiDetailToPokemon)
        .then((pokemon) => pokemon)
}

pokeApi.getPokemonAbilities = async (pokemonId) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemonId}/`
    return fetch(url)
        .then((response) => response.json())
        .then((pokemon) => pokemon.abilities)
        .then((abilities) => abilities.map((ability => ability.ability.name)))
}



