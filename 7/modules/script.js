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

// ---- Ejercicio 1: buscar una palabra ----
const animales = ['gato', 'loro', 'perro', 'pez'];
dibujar('arr1', animales);

$('buscar1').addEventListener('click', () => {
  const palabra = $('palabra1').value.trim();
  const posicion = animales.indexOf(palabra);
  if (posicion === -1) {
    decir('res1', 'indexOf() devolvió -1: "' + palabra + '" no está (distingue mayúsculas).', 'error');
  } else {
    decir('res1', '"' + palabra + '" está en la posición ' + posicion + '.', 'ok');
  }
});
alReiniciar(1, () => { $('palabra1').value = 'perro'; });

// ---- Ejercicio 2: buscar un número ----
const numeros = [10, 30, 50, 70];
dibujar('arr2', numeros);

$('buscar2').addEventListener('click', () => {
  const numero = leerNumero('numero2');
  if (numero === null) { decir('res2', 'Escribí un número válido.', 'error'); return; }
  const posicion = numeros.indexOf(numero);
  if (posicion === -1) {
    decir('res2', 'El ' + numero + ' no está en el array.', 'error');
  } else {
    decir('res2', 'El ' + numero + ' está en el array, en la posición ' + posicion + '.', 'ok');
  }
});
alReiniciar(2, () => { $('numero2').value = '50'; });

// ---- Ejercicio 3: buscar una ciudad ----
const ciudades = ['Barcelona', 'Madrid', 'Sevilla', 'Valencia'];
dibujar('arr3', ciudades);

$('buscar3').addEventListener('click', () => {
  const ciudad = $('ciudad3').value.trim();
  const indice = ciudades.indexOf(ciudad);
  if (indice === -1) {
    decir('res3', '"' + ciudad + '" no está en la lista de ciudades.', 'error');
  } else {
    decir('res3', 'El índice de "' + ciudad + '" es ' + indice + '.', 'ok');
  }
});
alReiniciar(3, () => { $('ciudad3').value = 'Madrid'; });

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
