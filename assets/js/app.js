// OBTENER Y CLASIFICAR LOS COMPONENTES DEL DOM A UTILIZAR
const card = document.getElementById("dynamic-card");
const templateCard = document.getElementById("template-card").content;
const list = document.getElementById("dynamic-list");
const templateList = document.getElementById("template-list").content;
const loading = document.getElementById("spinner-load");
const btnList = document.getElementById("btn-list");
const btnGalery = document.getElementById("btn-galery");
const valueForm = document.getElementById("input-form");
const fragment = new DocumentFragment();

// DATOS DE LA API ALMACENADOS EN CONTEXTO GLOBAL
let globalData;

// ESPERA A QUE TODO EL DOCUMENTO HTML SE CARGUE Y LUEGO EJECUTA LA FUNCION fetchData(URL)
document.addEventListener("DOMContentLoaded", () => {
  fetchData(URL);
});

// ALMACENA LA URL BASE
const URL = "https://digimon-api.vercel.app/api/digimon";

// PROMESA ENCARGADA DE ESPERAR LOS DATOS DE LA API
const fetchData = async (URL) => {
  try {
    const res = await fetch(URL);
    const data = await res.json();
    globalData = data; // almacena los datos de la api en una variable global
    printCard(data); // imprime card
    printList(data); // imprime lista (reemplaza a card, se debe solucionar)

    loadingData(true); // ejecuta la funcion encargada de pintar un spinner con el parametro true
  } catch (e) {
    console.log(`Error al llamar a la api: ${e}`); // en caso de error indica por consola
  } finally {
    loadingData(false);
  }
};

// IMPRIME FILAS
const printList = (data) => {
  card.textContent = "";
  data.forEach((item) => {
    // console.log(item);
    const clone = templateList.cloneNode(true);
    clone.querySelector("h2").textContent = item.name;
    clone.querySelector("img").setAttribute("src", item.img);
    clone.querySelector("img").setAttribute("alt", item.name);
    clone.querySelector("p").textContent = item.level;
    fragment.append(clone);
  });
  card.append(fragment);
};

// IMPRIME TARJETAS
const printCard = (data) => {
  card.textContent = "";
  data.forEach((item) => {
    // console.log(item);
    const clone = templateCard.cloneNode(true);
    clone.querySelector("img").setAttribute("src", item.img);
    clone.querySelector("img").setAttribute("alt", item.name);
    clone.querySelector("h4").textContent = item.name;
    clone.querySelector("p").textContent = item.level;
    fragment.append(clone);
  });
  card.append(fragment);
};

// OBTENEMOS LOS DATOS DEL FORMULARIO
const getDataForm = (e) => {
  e.preventDefault();
  let characterName = valueForm.value.trim().toLowerCase(); // eliminar espacios en blanco y convertir a minúsculas
  if (characterName.length === 0) {
    fetchData(URL); // Mostrar todos los datos cuando el formulario este en blanco + enter
  }
  const URL_NAME = `${URL}/name/${characterName}`;
  fetchData(URL_NAME); // Mostrar digimon por nombre.
};

// TODO: Crear funcion que filtre por level ...no mas tiempo

// SPINNER
const loadingData = (state) => {
  // condicional ternaria que indica si se imprime o no el spinner segun su estado.
  state ? loading.classList.remove("d-none") : loading.classList.add("d-none");
};

// DELEGACION DE EVENTOS (SIMILAR A ON CLICK PERO DESDE EL BACK)
document.addEventListener("click", (e) => {
  if (e.target.id === "btn-list") {
    printList(globalData);
  }
  if (e.target.id === "btn-galery") {
    printCard(globalData);
  }
  if (e.target.id === "btn-search") {
    getDataForm(e);
  }
});

// Futura implemetacion: busqueda automatica.
// valueForm.addEventListener("input", (e) => {
//   getDataForm(e);
// });
