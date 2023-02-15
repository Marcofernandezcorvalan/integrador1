const infoProducts = [
  {
    id: 1,
    name: "GeForce RTX 4090",
    precio: 2300,
    category: "expensive",
    img: "./assets/img/rtx4090.jpg",
  },
  {
    id: 2,
    name: "GeForce RTX 4080",
    precio: 1800,
    category: "expensive",
    img: "./assets/img/rtx4080.jpg",
  },
  {
    id: 3,
    name: "GeForce RTX 3090 TI",
    precio: 1500,
    category: "accessible",
    img: "./assets/img/rtx3090ti.jpg",
  },
  {
    id: 4,
    name: "GeForce RTX 3090",
    precio: 1300,
    category: "accessible",
    img: "./assets/img/rtx3090.jpg",
  },
  {
    id: 5,
    name: "GeForce RTX 3080 TI",
    precio: 1100,
    category: "accessible",
    img: "./assets/img/rtx3080ti.png",
  },
  {
    id: 6,
    name: "GeForce RTX 3080",
    precio: 1000,
    category: "accessible",
    img: "./assets/img/rtx3080.jpg",
  },
  {
    id: 7,
    name: "GeForce RTX 3070 TI",
    precio: 900,
    category: "economic",
    img: "./assets/img/rtx3070ti-2.jpg",
  },
  {
    id: 8,
    name: "GeFoce RTX 3070",
    precio: 800,
    category: "economic",
    img: "./assets/img/rtx3070-2.jpg",
  },
];

// const separarProductos = (size) => {
//   let productosDivididos = [];
//   for (let i = 0; i < infoProducts.length; i += size) {
//     productosDivididos.push(infoProducts.slice(i, i + size));
//   }
//   return productosDivididos;
// };

// const controladorProductos = {
//   productosDivididos: separarProductos(4),
//   sigProductosIndex: 1,
//   limiteProductos: separarProductos(4).length,
// };

// console.log(controladorProductos);
