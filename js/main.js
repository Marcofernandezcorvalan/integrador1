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
// menu hamburguesa
const hamBtn = document.querySelector(".menuLabel");
// nav list
const barsMenu = document.querySelector(".header__nav__list");
// menu User
const menuUser = document.querySelector(".menuUser");
// login y register
const logReg = document.querySelector(".header__cont");
// cart
const cart = document.querySelector(".cartLabel");
// cart Container
const cartCont = document.querySelector(".cart");
// contenedor de las cards del carrito
const cardsCont = document.querySelector(".cardsContainer");
// total del carrito
const total = document.querySelector(".cartTotal");
// botón comprar en el carrito
const BuyBtn = document.querySelector(".botonCartBuy");
// botón limpiar en el carrito
const CleanBtn = document.querySelector(".botonCartClean");

// CARRITO

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

const saveLocalStorage = (carritoLista) => {
  localStorage.setItem("carrito", JSON.stringify(carritoLista));
};

const mostrarProductoCart = (cartProduct) => {
  const { id, name, img, precio, quantity } = cartProduct;
  return `
  <div class="cartItem">
          <img src="${img}" />
          <div class="itemInfo">
            <h3 class="itemTitle">${name}</h3>
            <span class="itemPrecio">U$D ${precio} </span>
          </div>
          <div class="itemCantidad">
            <span class="cantidadNum rest" data-id="${id}">-</span>
            <span class="cantidadNum">${quantity}</span>
            <span class="cantidadNum sum" data-id="${id}">+</span>
          </div>
        </div>
  `;
};

const renderCart = () => {
  if (!carrito.length) {
    cardsCont.innerHTML = ` <p class="emptyMsg">No hay Productos en el Carrito</p>`;
    return;
  }
  cardsCont.innerHTML = carrito.map(mostrarProductoCart).join("");
};

const totalCarrito = () => {
  return carrito.reduce((acc, cur) => {
    return acc + Number(cur.precio) * cur.quantity;
  }, 0);
};

const mostrarTotal = () => {
  total.innerHTML = `<div class="totalCont">U$D ${totalCarrito()}</div>`;
};

const desabilitarBtn = (btn) => {
  if (!carrito.length) {
    btn.classList.add("disabled");
  } else {
    btn.classList.remove("disabled");
  }
};

const checkCart = () => {
  saveLocalStorage(carrito);
  renderCart();
  mostrarTotal();
  desabilitarBtn(BuyBtn);
  desabilitarBtn(CleanBtn);
};

const agregarProducto = (e) => {
  if (!e.target.classList.contains("products__container__card__scont--btn")) {
    return;
  }

  const { id, name, img, precio } = e.target.dataset;
  const product = productsData(id, name, img, precio);

  if (existeEnCarrito(product)) {
    agregarUnidadACard(product);
    showSuccessModal("Se añadió una unidad");
  } else {
    crearCardCarrito(product);
    showSuccessModal("Producto añadido con Éxito");
  }

  checkCart();
};

const productsData = (id, name, img, precio) => {
  return { id, name, img, precio };
};

const existeEnCarrito = (product) => {
  return carrito.find((item) => {
    return item.id === product.id;
  });
};

const agregarUnidadACard = (product) => {
  carrito = carrito.map((cartProduct) => {
    return cartProduct.id === product.id
      ? { ...cartProduct, quantity: cartProduct.quantity + 1 }
      : cartProduct;
  });
};

const showSuccessModal = (msg) => {
  modal.classList.add("modalActivo");
  modal.textContent = msg;
  setTimeout(() => {
    modal.classList.remove("modalActivo");
  }, 900);
};

const crearCardCarrito = (product) => {
  carrito = [
    ...carrito,
    {
      ...product,
      quantity: 1,
    },
  ];
};

const vaciarCarrito = () => {
  carrito = [];
  checkCart();
};

const confirm = (confirmMsg) => {
  if (!carrito.length) return;
  if (window.confirm(confirmMsg)) {
    vaciarCarrito();
  }
};

const completarCompra = () => {
  confirm("¿Desea completar la Compra?");
};

const btnVaciarCarrito = () => {
  confirm("¿Desea eliminar los productos?");
};

const btnEventMenos = (id) => {
  const productoExistente = carrito.find((item) => {
    return item.id === id;
  });

  if (productoExistente.quantity === 1) {
    if (window.confirm("¿Quiere eliminar el producto?")) {
      eliminarProductoCarrito(productoExistente);
    }
    return;
  }
  disminuirCantidad(productoExistente);
};

const eliminarProductoCarrito = (productoExistente) => {
  carrito = carrito.filter((product) => product.id !== productoExistente.id);
  checkCart();
};

const disminuirCantidad = (productoExistente) => {
  carrito = carrito.map((product) => {
    return product.id === productoExistente.id
      ? { ...product, quantity: Number(product.quantity) - 1 }
      : product;
  });
};

const btnEventMas = (id) => {
  const productoExistente = carrito.find((item) => {
    return item.id === id;
  });
  agregarUnidadACard(productoExistente);
};

const controlCantidadCardCart = (e) => {
  if (e.target.classList.contains("rest")) {
    btnEventMenos(e.target.dataset.id);
  } else if (e.target.classList.contains("sum")) {
    btnEventMas(e.target.dataset.id);
  }
  checkCart();
};

// FIN DEL CARRITO

// Renderizar los Productos

const mostrarProducto = (product) => {
  const { id, name, precio, img } = product;
  return `
    <div class="products__container__card">
            <img class="products__container__card__img" src="${img}" alt="grafica" />
            <h3 class="products__container__card__title">${name}</h3>
            <div class="products__container__card__scont">
              <p>U$D ${precio}</p>
              <button class="products__container__card__scont--btn" data-id="${id}" data-name="${name}" data-img="${img}" data-precio="${precio}">Buy</button>
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

// const checkUltArray = () => {
//   controladorProductos.sigProductosIndex === controladorProductos.limiteProductos;
// };

// función mostrar más

// const mostrarMas = () => {
//   renderizarProductos(controladorProductos.sigProductosIndex);
//   // if (checkUltArray()) {
//   //   btnMore.classList.add("hidden");
//   // }
// };

const toggleMenu = () => {
  barsMenu.classList.toggle("openMenu");
  if (logReg.classList.contains("openMenu")) {
    logReg.classList.remove("openMenu");
    return;
  }
  if (cartCont.classList.contains("openCart")) {
    cartCont.classList.remove("openCart");
    return;
  }
};

const toggleUser = () => {
  logReg.classList.toggle("openMenu");
  if (barsMenu.classList.contains("openMenu")) {
    barsMenu.classList.remove("openMenu");
    return;
  }
  if (cartCont.classList.contains("openCart")) {
    cartCont.classList.remove("openCart");
    return;
  }
};

const toggleCart = () => {
  cartCont.classList.toggle("openCart");
  if (barsMenu.classList.contains("openMenu")) {
    barsMenu.classList.remove("openMenu");
    return;
  }
  if (logReg.classList.contains("openMenu")) {
    logReg.classList.remove("openMenu");
    return;
  }
};

const cerrar = (e) => {
  if (!e.target.classList.contains("link")) {
    return;
  }
  barsMenu.classList.remove("openMenu");
};

const cerrarEnScrolleo = () => {
  if (
    !barsMenu.classList.contains("openMenu") &&
    !cartCont.classList.contains("openCart") &&
    !logReg.classList.contains("openMenu")
  ) {
    return;
  }
  barsMenu.classList.remove("openMenu");
  cartCont.classList.remove("openCart");
  logReg.classList.remove("openMenu");
};

const init = () => {
  renderizarProductos();
  categories.addEventListener("click", aplicarFiltro);
  // btnMore.addEventListener("click", mostrarMas);
  hamBtn.addEventListener("click", toggleMenu);
  menuUser.addEventListener("click", toggleUser);
  cart.addEventListener("click", toggleCart);
  barsMenu.addEventListener("click", cerrar);
  window.addEventListener("scroll", cerrarEnScrolleo);
  document.addEventListener("DOMContentLoaded", renderCart);
  document.addEventListener("DOMContentLoaded", mostrarTotal);
  document.addEventListener("DOMContentLoaded", desabilitarBtn(BuyBtn));
  document.addEventListener("DOMContentLoaded", desabilitarBtn(CleanBtn));
  products.addEventListener("click", agregarProducto);
  BuyBtn.addEventListener("click", completarCompra);
  CleanBtn.addEventListener("click", btnVaciarCarrito);
  cardsCont.addEventListener("click", controlCantidadCardCart);
};

init();
