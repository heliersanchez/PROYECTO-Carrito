// === SELECTORES ===
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const listaCursos = document.querySelector('#lista-cursos');
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');

let articulosCarrito = [];

// === LISTENERS ===
cargarEventListeners();

function cargarEventListeners() {
  listaCursos.addEventListener('click', agregarCurso);

  carrito.addEventListener('click', eliminarCurso);

  vaciarCarritoBtn.addEventListener('click', (e) => {
    e.preventDefault();
    articulosCarrito = [];
    limpiarHTML();
  });
}

// === FUNCIONES ===
function agregarCurso(e) {
  e.preventDefault();

  if (e.target.classList.contains('agregar-carrito')) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

function leerDatosCurso(curso) {
  const infoCurso = {
    imagen: curso.querySelector('img').src,
    nombre: curso.querySelector('h4').textContent,
    precio: curso.querySelector('p span').textContent,
    id: curso.querySelector('a').getAttribute('data-id'),
    cantidad: 1,
  };

  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);

  if (existe) {
    articulosCarrito.forEach((curso) => {
      if (curso.id === infoCurso.id) curso.cantidad++;
    });
  } else articulosCarrito = [...articulosCarrito, infoCurso];

  crearHTML();
}

function eliminarCurso(e) {
  if (e.target.classList.contains('borrar-curso')) {
    const cursoId = e.target.getAttribute('data-id');

    articulosCarrito = articulosCarrito.filter((curso) => {
      if (curso.id === cursoId) {
        if (curso.cantidad > 1) {
          curso.cantidad--;
          return curso;
        } else delete curso;
      } else return curso;
    });

    crearHTML();
  }
}

function crearHTML() {
  limpiarHTML();

  articulosCarrito.forEach((indice) => {
    const { imagen, nombre, precio, cantidad, id } = indice;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td> <img src='${imagen}' width='100' ></td>
      <td>${nombre}</td>
      <td>${precio}</td>
      <td>${cantidad}</td>
      <td> <a href="#" class="borrar-curso" data-id="${id}"> X </a> </td>
    `;

    contenedorCarrito.appendChild(row);
  });
}

function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
