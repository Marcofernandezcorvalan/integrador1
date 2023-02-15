// contenedor de productos
const products = document.querySelector(".products__container");
// contenedor de las categorias
const categories = document.querySelector(".products__categories");
// html collection de las categorias
const categoriesData = document.querySelectorAll(".products__categories__category");
// botón more
const btnMore = document.querySelector(".btn-more");
// modal
const modal = document.querySelector(".modal");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const saveLocalStorage = (carritoLista) => {
  localStorage.setItem("carrito", JSON.stringify(carritoLista));
};

// Renderizar los Productos

const mostrarProducto = (product) => {
  const { id, name, precio, img } = product;
  return `
    <div class="products__container__card">
            <img class="products__container__card__img" src="${img}" alt="grafica" />
            <h3 class="products__container__card__title">${name}</h3>
            <div class="products__container__card__scont">
              <p>U$D ${precio}</p>
              <button class="products__container__card__scont--btn" data-id="${id}" data-name="${name}" data-img="${img}" >Buy</button>
            </div>
    </div>        
    `;
};

const renderizarProductosTodos = (index = 0) => {
  products.innerHTML += infoProducts.map(mostrarProducto).join("");
};

// filtrar los productos por categoria

const renderizarProductosFiltrados = (category) => {
  const listaProd = infoProducts.filter((product) => product.category === category);

  products.innerHTML = listaProd.map(mostrarProducto).join("");
};

const renderizarProductos = (index = 0, category = undefined) => {
  if (!category) {
    renderizarProductosTodos();
    return;
  }
  renderizarProductosFiltrados(category);
};

// Categorias

// const CambiarBtnMore = (category) => {
//   if (!category) {
//     btnMore.classList.add("hidden");
//     return;
//   }
//   btnMore.classList.add("hidden");
// };

const cambiarBtnAct = (categoriaSelec) => {
  const categories = [...categoriesData];
  categories.forEach((btn) => {
    if (btn.dataset.category !== categoriaSelec) {
      btn.classList.remove("act");
      return;
    }
    btn.classList.add("act");
  });
};

const cambiarFiltro = (e) => {
  const categoriaSelec = e.target.dataset.category;
  cambiarBtnAct(categoriaSelec);
  // CambiarBtnMore(categoriaSelec);
};

const aplicarFiltro = (e) => {
  if (!e.target.classList.contains("products__categories__category")) return;
  cambiarFiltro(e);
  if (!e.target.dataset.category) {
    products.innerHTML = "";
    renderizarProductos();
  } else {
    renderizarProductos(0, e.target.dataset.category);
  }
};

const checkUltArray = () => {
  controladorProductos.sigProductosIndex === controladorProductos.limiteProductos;
};

// función mostrar más

// const mostrarMas = () => {
//   renderizarProductos(controladorProductos.sigProductosIndex);
//   // if (checkUltArray()) {
//   //   btnMore.classList.add("hidden");
//   // }
// };

const init = () => {
  renderizarProductos();
  categories.addEventListener("click", aplicarFiltro);
  btnMore.addEventListener("click", mostrarMas);
};

init();
