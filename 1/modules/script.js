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

// ---- Ejercicio 1: array vacío y tres frutas ----
let frutas = [];
dibujar('arr1', frutas);

$('agregar1').addEventListener('click', () => {
  const fruta = $('fruta1').value.trim();
  if (fruta === '') { decir('res1', 'Escribí el nombre de una fruta.', 'error'); return; }
  if (frutas.length === 3) { decir('res1', 'Ya agregaste las 3 frutas. Usá Reiniciar para empezar de nuevo.', 'error'); return; }
  frutas.push(fruta);
  dibujar('arr1', frutas);
  decir('res1', 'push() agregó "' + fruta + '". El array tiene ' + frutas.length + ' elemento(s).', 'ok');
  $('fruta1').value = '';
});
alReiniciar(1, () => { frutas = []; dibujar('arr1', frutas); });

// ---- Ejercicio 2: agregar amigos a un array existente ----
let amigos = ['Carlos', 'Ana'];
dibujar('arr2', amigos);

$('agregar2').addEventListener('click', () => {
  const amigo = $('amigo2').value.trim();
  if (amigo === '') { decir('res2', 'Escribí el nombre de un amigo.', 'error'); return; }
  amigos.push(amigo);
  dibujar('arr2', amigos);
  decir('res2', 'push() agregó a "' + amigo + '". Ahora hay ' + amigos.length + ' amigos.', 'ok');
  $('amigo2').value = '';
});
alReiniciar(2, () => { amigos = ['Carlos', 'Ana']; dibujar('arr2', amigos); });

// ---- Ejercicio 3: agregar solo si es mayor que el último ----
let numeros = [3, 8, 15, 20];
dibujar('arr3', numeros);

$('agregar3').addEventListener('click', () => {
  const numero = leerNumero('numero3');
  if (numero === null) { decir('res3', 'Escribí un número válido.', 'error'); return; }
  const ultimo = numeros[numeros.length - 1];
  if (numero > ultimo) {
    numeros.push(numero);
    dibujar('arr3', numeros);
    decir('res3', numero + ' es mayor que ' + ultimo + ': se agregó con push().', 'ok');
  } else {
    decir('res3', numero + ' no es mayor que el último (' + ultimo + '): no se agregó.', 'error');
  }
  $('numero3').value = '';
});
alReiniciar(3, () => { numeros = [3, 8, 15, 20]; dibujar('arr3', numeros); });

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
