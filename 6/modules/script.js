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

// ---- Ejercicio 1: primeros 3 elementos ----
const numeros = [5, 10, 15, 20, 25, 30];
dibujar('arr1', numeros);
dibujar('sal1', []);

$('copiar1').addEventListener('click', () => {
  const copia = numeros.slice(0, 3);
  dibujar('sal1', copia);
  decir('res1', 'slice(0, 3) copió los primeros 3. El original no cambió.', 'ok');
});
alReiniciar(1, () => dibujar('sal1', []));

// ---- Ejercicio 2: desde una posición hasta otra ----
const peliculas = ['Alien', 'Matrix', 'Titanic', 'Avatar', 'Gladiador', 'Rocky'];
dibujar('arr2', peliculas);
dibujar('sal2', []);

$('copiar2').addEventListener('click', () => {
  const desde = leerNumero('desde2');
  const hasta = leerNumero('hasta2');
  if (desde === null || hasta === null || desde < 0 || hasta < 0) {
    decir('res2', 'Escribí posiciones válidas (0 o más).', 'error');
    return;
  }
  const copia = peliculas.slice(desde, hasta);
  dibujar('sal2', copia);
  decir('res2', 'slice(' + desde + ', ' + hasta + ') copió desde la posición ' + desde + ' hasta antes de la ' + hasta + '.', 'ok');
});
alReiniciar(2, () => dibujar('sal2', []));

// ---- Ejercicio 3: últimos 3 elementos ----
const letras = ['a', 'b', 'c', 'd', 'e', 'f'];
dibujar('arr3', letras);
dibujar('sal3', []);

$('copiar3').addEventListener('click', () => {
  const ultimos = letras.slice(-3); // un número negativo cuenta desde el final
  dibujar('sal3', ultimos);
  decir('res3', 'slice(-3) copió los últimos 3. El original sigue igual.', 'ok');
});
alReiniciar(3, () => dibujar('sal3', []));

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
