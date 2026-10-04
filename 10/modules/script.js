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

// ---- Ejercicio 1: multiplicar por 3 ----
let numeros = [1, 2, 3, 4, 5];
dibujar('arr1', numeros);
dibujar('sal1', []);

$('agregar1').addEventListener('click', () => {
  const numero = leerNumero('numero1');
  if (numero === null) { decir('res1', 'Escribí un número válido.', 'error'); return; }
  numeros.push(numero);
  dibujar('arr1', numeros);
  $('numero1').value = '';
});

$('mapear1').addEventListener('click', () => {
  const triples = numeros.map((numero) => numero * 3);
  dibujar('sal1', triples);
  decir('res1', 'map() creó un array nuevo. El original no cambió.', 'ok');
});
alReiniciar(1, () => { numeros = [1, 2, 3, 4, 5]; dibujar('arr1', numeros); dibujar('sal1', []); });

// ---- Ejercicio 2: nombres en mayúsculas ----
let nombres = ['ana', 'luis', 'marta'];
dibujar('arr2', nombres);
dibujar('sal2', []);

$('agregar2').addEventListener('click', () => {
  const nombre = $('nombre2').value.trim();
  if (nombre === '') { decir('res2', 'Escribí un nombre.', 'error'); return; }
  nombres.push(nombre);
  dibujar('arr2', nombres);
  $('nombre2').value = '';
});

$('mapear2').addEventListener('click', () => {
  const mayusculas = nombres.map((nombre) => nombre.toUpperCase());
  dibujar('sal2', mayusculas);
  decir('res2', 'map() convirtió cada nombre con toUpperCase().', 'ok');
});
alReiniciar(2, () => { nombres = ['ana', 'luis', 'marta']; dibujar('arr2', nombres); dibujar('sal2', []); });

// ---- Ejercicio 3: precios con IVA ----
let precios = [100, 250, 80];
dibujar('arr3', precios);
dibujar('sal3', []);

$('agregar3').addEventListener('click', () => {
  const precio = leerNumero('precio3');
  if (precio === null || precio < 0) { decir('res3', 'Escribí un precio válido.', 'error'); return; }
  precios.push(precio);
  dibujar('arr3', precios);
  $('precio3').value = '';
});

$('mapear3').addEventListener('click', () => {
  const conIva = precios.map((precio) => Number((precio * 1.21).toFixed(2)));
  dibujar('sal3', conIva);
  decir('res3', 'map() multiplicó cada precio por 1.21.', 'ok');
});
alReiniciar(3, () => { precios = [100, 250, 80]; dibujar('arr3', precios); dibujar('sal3', []); });

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
