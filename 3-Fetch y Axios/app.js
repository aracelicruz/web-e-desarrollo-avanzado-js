// Seleccionar elementos del DOM
const fetchButton = document.getElementById("fetch-btn");
const axiosButton = document.getElementById("axios-btn");
const dataContainer = document.getElementById("data-container");

// URL base de la API
const API_URL = "https://rickandmortyapi.com/api/character";

// Función para limpiar el contenedor
function clearContainer() {
  dataContainer.innerHTML = "";
}

// Función para mostrar personajes
function displayCharacters(characters) {
  clearContainer();
  characters.forEach(character => {
    const characterElement = document.createElement("div");
    characterElement.className = "character";
    characterElement.innerHTML = `
      <img src="${character.image}" alt="${character.name}">
      <p><strong>${character.name}</strong></p>
    `;
    dataContainer.appendChild(characterElement);
  });
}

// Función para obtener datos con Fetch
async function fetchCharacters() {
  try {
    clearContainer();
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`Error: ${response.status}`);
    }
    const data = await response.json();
    displayCharacters(data.results);
  } catch (error) {
    console.error(error);
    dataContainer.innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
  }
}

// Función para obtener datos con Axios
async function axiosCharacters() {
  try {
    clearContainer();
    const response = await axios.get(API_URL);
    displayCharacters(response.data.results);
  } catch (error) {
    console.error(error);
    dataContainer.innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
  }
}

// Event Listeners
fetchButton.addEventListener("click", fetchCharacters);
axiosButton.addEventListener("click", axiosCharacters);
