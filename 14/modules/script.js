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

// ---- Ejercicio 1: invertir letras ----
let letras = ['a', 'b', 'c', 'd'];
dibujar('arr1', letras);

$('agregar1').addEventListener('click', () => {
  const letra = $('letra1').value.trim();
  if (letra === '') { decir('res1', 'Escribí una letra.', 'error'); return; }
  letras.push(letra);
  dibujar('arr1', letras);
  $('letra1').value = '';
});

$('invertir1').addEventListener('click', () => {
  letras.reverse();
  dibujar('arr1', letras);
  decir('res1', 'reverse() invirtió el array original.', 'ok');
});
alReiniciar(1, () => { letras = ['a', 'b', 'c', 'd']; dibujar('arr1', letras); });

// ---- Ejercicio 2: invertir números ----
let numeros = [1, 2, 3, 4, 5];
dibujar('arr2', numeros);

$('agregar2').addEventListener('click', () => {
  const numero = leerNumero('numero2');
  if (numero === null) { decir('res2', 'Escribí un número válido.', 'error'); return; }
  numeros.push(numero);
  dibujar('arr2', numeros);
  $('numero2').value = '';
});

$('invertir2').addEventListener('click', () => {
  numeros.reverse();
  dibujar('arr2', numeros);
  decir('res2', 'reverse() invirtió el orden de los números.', 'ok');
});
alReiniciar(2, () => { numeros = [1, 2, 3, 4, 5]; dibujar('arr2', numeros); });

// ---- Ejercicio 3: invertir un texto ----
dibujar('arr3', []);
dibujar('sal3', []);

// Cambia el espacio por un símbolo visible, solo para mostrarlo
function verEspacios(lista) {
  return lista.map((caracter) => caracter === ' ' ? '␣' : caracter);
}

$('invertir3').addEventListener('click', () => {
  const texto = $('texto3').value;
  if (texto.trim() === '') { decir('res3', 'Escribí un texto.', 'error'); return; }
  const caracteres = texto.split('');          // string -> array
  dibujar('arr3', verEspacios(caracteres));
  caracteres.reverse();                        // invierte el array
  dibujar('sal3', verEspacios(caracteres));
  decir('res3', 'Texto invertido: ' + caracteres.join(''), 'ok');   // array -> string
});
alReiniciar(3, () => { dibujar('arr3', []); dibujar('sal3', []); });

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
