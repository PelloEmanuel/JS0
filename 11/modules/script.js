const $ = (id) => document.getElementById(id);

// Muestra un array como "fichas" dentro de un contenedor
function dibujar(id, lista) {
  const caja = $(id);
  caja.innerHTML = '';
  if (lista.length === 0) {
    caja.textContent = '[ ]  (array vacío)';
    return;
  }
  lista.forEach((item) => {
    const ficha = document.createElement('span');
    ficha.className = 'ficha';
    ficha.textContent = typeof item === 'object'
      ? Object.entries(item).map(([clave, valor]) => clave + ': ' + valor).join(', ')
      : item;
    caja.appendChild(ficha);
  });
}

// Muestra un mensaje de resultado (tipo: 'ok' o 'error')
function decir(id, texto, tipo) {
  const mensaje = $(id);
  mensaje.textContent = texto;
  mensaje.className = 'resultado ' + (tipo || '');
}

// Botón Reiniciar de cada ejercicio
function alReiniciar(n, restaurar) {
  $('reiniciar' + n).addEventListener('click', () => {
    restaurar();
    decir('res' + n, '');
  });
}

// Devuelve el número escrito en un campo, o null si no es válido
function leerNumero(id) {
  const texto = $(id).value.trim();
  return texto === '' || isNaN(texto) ? null : Number(texto);
}

// ---- Ejercicio 1: números mayores a 10 ----
let numeros = [4, 12, 7, 25, 10, 33];
dibujar('arr1', numeros);
dibujar('sal1', []);

$('agregar1').addEventListener('click', () => {
  const numero = leerNumero('numero1');
  if (numero === null) { decir('res1', 'Escribí un número válido.', 'error'); return; }
  numeros.push(numero);
  dibujar('arr1', numeros);
  $('numero1').value = '';
});

$('filtrar1').addEventListener('click', () => {
  const mayores = numeros.filter((numero) => numero > 10);
  dibujar('sal1', mayores);
  decir('res1', 'filter() dejó ' + mayores.length + ' de ' + numeros.length + ' números.', 'ok');
});
alReiniciar(1, () => { numeros = [4, 12, 7, 25, 10, 33]; dibujar('arr1', numeros); dibujar('sal1', []); });

// ---- Ejercicio 2: palabras de más de 5 letras ----
let palabras = ['sol', 'manzana', 'casa', 'elefante', 'pez'];
dibujar('arr2', palabras);
dibujar('sal2', []);

$('agregar2').addEventListener('click', () => {
  const palabra = $('palabra2').value.trim();
  if (palabra === '') { decir('res2', 'Escribí una palabra.', 'error'); return; }
  palabras.push(palabra);
  dibujar('arr2', palabras);
  $('palabra2').value = '';
});

$('filtrar2').addEventListener('click', () => {
  const largas = palabras.filter((palabra) => palabra.length > 5);
  dibujar('sal2', largas);
  decir('res2', 'filter() dejó ' + largas.length + ' de ' + palabras.length + ' palabras.', 'ok');
});
alReiniciar(2, () => { palabras = ['sol', 'manzana', 'casa', 'elefante', 'pez']; dibujar('arr2', palabras); dibujar('sal2', []); });

// ---- Ejercicio 3: usuarios activos ----
let usuarios = [
  { nombre: 'Ana', activo: true },
  { nombre: 'Luis', activo: false },
  { nombre: 'Marta', activo: true },
  { nombre: 'Pedro', activo: false }
];
dibujar('arr3', usuarios);
dibujar('sal3', []);

$('agregar3').addEventListener('click', () => {
  const nombre = $('nombre3').value.trim();
  if (nombre === '') { decir('res3', 'Escribí un nombre.', 'error'); return; }
  usuarios.push({ nombre: nombre, activo: $('estado3').value === 'Activo' });
  dibujar('arr3', usuarios);
  $('nombre3').value = '';
});

$('filtrar3').addEventListener('click', () => {
  const activos = usuarios.filter((usuario) => usuario.activo);
  dibujar('sal3', activos);
  decir('res3', 'filter() dejó ' + activos.length + ' usuario(s) activo(s).', 'ok');
});
alReiniciar(3, () => {
  usuarios = [
    { nombre: 'Ana', activo: true },
    { nombre: 'Luis', activo: false },
    { nombre: 'Marta', activo: true },
    { nombre: 'Pedro', activo: false }
  ];
  dibujar('arr3', usuarios);
  dibujar('sal3', []);
});

// ---- Modo claro / oscuro ----
const btnTema = document.getElementById('btnTema');

function aplicarTema(tema) {
  document.documentElement.setAttribute('data-tema', tema);
  btnTema.textContent = tema === 'oscuro' ? 'Modo claro' : 'Modo oscuro';
}

aplicarTema(localStorage.getItem('tema') || 'claro');

btnTema.addEventListener('click', () => {
  const actual = document.documentElement.getAttribute('data-tema');
  const nuevo = actual === 'oscuro' ? 'claro' : 'oscuro';
  localStorage.setItem('tema', nuevo);
  aplicarTema(nuevo);
});
