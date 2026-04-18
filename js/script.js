const pokemon_nome = document.querySelector('.pokemon_nome');
const pokemon_numero = document.querySelector('.pokemon_number');
const pokemon_imagem = document.querySelector('.pokemon_image');
const form = document.querySelector('.form');
const input = document.querySelector('.input_search');
const button_prev = document.querySelector('.btn-prev');
const button_next = document.querySelector('.btn-next');    

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {

    const APIresponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (APIresponse.status === 200) {

        const data = await APIresponse.json();
        return data;
    }
}

const renderPokemon = async (pokemon) => {
    const data = await fetchPokemon(pokemon);

    if(data){

    pokemon_nome.innerHTML = data.name;
    pokemon_numero.innerHTML = data.id;
    pokemon_imagem.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
    searchPokemon = data.id;
    } else {
        pokemon_nome.innerHTML = 'Not Found';
        pokemon_numero.innerHTML = '';
        pokemon_imagem.style.display = 'block';
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
})

button_prev.addEventListener('click', () => {
   if(searchPokemon > 1){
    searchPokemon -= 1;
    renderPokemon(searchPokemon);
    }
})

button_next.addEventListener('click', () => {
    searchPokemon += 1;
    renderPokemon(searchPokemon);
})


renderPokemon(searchPokemon);



