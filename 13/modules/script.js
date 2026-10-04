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

// ---- Ejercicio 1: números de menor a mayor ----
let numeros = [30, 5, 100, 12, 8];
dibujar('arr1', numeros);

$('agregar1').addEventListener('click', () => {
  const numero = leerNumero('numero1');
  if (numero === null) { decir('res1', 'Escribí un número válido.', 'error'); return; }
  numeros.push(numero);
  dibujar('arr1', numeros);
  $('numero1').value = '';
});

$('ordenar1').addEventListener('click', () => {
  numeros.sort((a, b) => a - b); // sin esta función, sort() ordena como texto
  dibujar('arr1', numeros);
  decir('res1', 'sort() ordenó el array de menor a mayor.', 'ok');
});
alReiniciar(1, () => { numeros = [30, 5, 100, 12, 8]; dibujar('arr1', numeros); });

// ---- Ejercicio 2: palabras alfabéticamente ----
let palabras = ['mesa', 'zorro', 'casa', 'árbol'];
dibujar('arr2', palabras);

$('agregar2').addEventListener('click', () => {
  const palabra = $('palabra2').value.trim();
  if (palabra === '') { decir('res2', 'Escribí una palabra.', 'error'); return; }
  palabras.push(palabra);
  dibujar('arr2', palabras);
  $('palabra2').value = '';
});

$('ordenar2').addEventListener('click', () => {
  palabras.sort((a, b) => a.localeCompare(b)); // localeCompare respeta acentos
  dibujar('arr2', palabras);
  decir('res2', 'sort() ordenó las palabras alfabéticamente.', 'ok');
});
alReiniciar(2, () => { palabras = ['mesa', 'zorro', 'casa', 'árbol']; dibujar('arr2', palabras); });

// ---- Ejercicio 3: objetos por edad ----
let personas = [{ nombre: 'Ana', edad: 30 }, { nombre: 'Luis', edad: 22 }, { nombre: 'Marta', edad: 41 }];
dibujar('arr3', personas);

$('agregar3').addEventListener('click', () => {
  const nombre = $('nombre3').value.trim();
  const edad = leerNumero('edad3');
  if (nombre === '' || edad === null || edad < 0) {
    decir('res3', 'Escribí un nombre y una edad válida.', 'error');
    return;
  }
  personas.push({ nombre: nombre, edad: edad });
  dibujar('arr3', personas);
  $('nombre3').value = '';
  $('edad3').value = '';
});

$('ordenar3').addEventListener('click', () => {
  personas.sort((a, b) => a.edad - b.edad);
  dibujar('arr3', personas);
  decir('res3', 'sort() ordenó las personas de menor a mayor edad.', 'ok');
});
alReiniciar(3, () => {
  personas = [{ nombre: 'Ana', edad: 30 }, { nombre: 'Luis', edad: 22 }, { nombre: 'Marta', edad: 41 }];
  dibujar('arr3', personas);
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
