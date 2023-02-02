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
    `;
};

const renderizarProductosDivididos = (index = 0) => {
  products.innerHTML += controladorProductos.productosDivididos[index].map(mostrarProducto).join("");
};

const renderizarProductos = (index = 0, category = undefined) => {
  if (!category) {
    renderizarProductosDivididos();
    return;
  }
};

const init = () => {
  renderizarProductos();
};

init();
