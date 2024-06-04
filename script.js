const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weigh = document.getElementById("weight");
const heigh = document.getElementById("height");

const pokemonUrl = 'https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/'
searchButton.addEventListener("click",e=>
{
    e.preventDefault();
  fetchData();
})

const fetchData = async() =>
{
const searchInputValue = searchInput.value.toLowerCase();
  console.log(searchInputValue); 
if(await checkIfPokemonExists(searchInputValue) != -1){
const findById = `${pokemonUrl}${searchInputValue}`;
//console.log("urlis "+ findById );
const res = await fetch(findById );
const data = await res.json();
fillTheData(data);

  }
  else{
    alert("Pokémon not found.");
  }

}

const checkIfPokemonExists = async (id) =>{
  
const res = await fetch(pokemonUrl);
const data = await res.json();
const result = !isNaN(id) ? (data.results.findIndex((item) => id == item.id)) : data.results.findIndex((item) => id == item.name)
return result;

}

const fillTheData = (data) =>{
  const {name, id , height, weight,sprites,stats,types} = data;
pokemonName.innerText = isNaN(searchInput.value) ? searchInput.value : name;
pokemonId.innerText = `#${id}`;
weigh.innerText =`Weight: ${weight}`;
heigh.innerText = `Height: ${height}`;
stats.map((item) =>{
  const {base_stat,stat }= item;
  const elementName = stat.name;
 const element = document.getElementById(elementName);
    if (element) {
      element.innerText = base_stat;
    } else {
      console.warn(`Element with id ${elementName} not found`);
    }
})


const imageUrl = `${sprites.front_default}`;
insertImage(imageUrl);
updateTypes(types);
}

function insertImage (url) {
return (document.getElementById('image-container').innerHTML = ` <img id="sprite" src='${url}'>
  `);
}
function updateTypes (types){
document.getElementById("types").innerHTML = '';
types.map((item)=>{
const {slot,type} = item;
const typeName = type.name
if(typeName){
  document.getElementById('types').innerHTML += ` <span class="type ${typeName}"> ${typeName.toUpperCase()}</span>
  `;
  }
    })

}