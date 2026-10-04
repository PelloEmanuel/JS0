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

// ---- Ejercicio 1: quitar el último animal ----
let animales = ['Perro', 'Gato', 'Conejo', 'Loro'];
dibujar('arr1', animales);

$('quitar1').addEventListener('click', () => {
  if (animales.length === 0) { decir('res1', 'El array ya está vacío.', 'error'); return; }
  animales.pop();
  dibujar('arr1', animales);
  decir('res1', 'pop() eliminó el último animal.', 'ok');
});
alReiniciar(1, () => { animales = ['Perro', 'Gato', 'Conejo', 'Loro']; dibujar('arr1', animales); });

// ---- Ejercicio 2: lista de compras, mostrar el eliminado ----
let compras = ['Pan', 'Leche', 'Huevos', 'Manzanas'];
dibujar('arr2', compras);

$('quitar2').addEventListener('click', () => {
  if (compras.length === 0) { decir('res2', 'La lista de compras está vacía.', 'error'); return; }
  const eliminado = compras.pop(); // pop() devuelve el elemento eliminado
  dibujar('arr2', compras);
  decir('res2', 'Producto eliminado: ' + eliminado, 'ok');
});
alReiniciar(2, () => { compras = ['Pan', 'Leche', 'Huevos', 'Manzanas']; dibujar('arr2', compras); });

// ---- Ejercicio 3: vaciar con while ----
let numeros = [1, 2, 3, 4, 5];
dibujar('arr3', numeros);

$('vaciar3').addEventListener('click', () => {
  if (numeros.length === 0) { decir('res3', 'El array ya está vacío.', 'error'); return; }
  const sacados = [];
  while (numeros.length > 0) {
    sacados.push(numeros.pop());
  }
  dibujar('arr3', numeros);
  decir('res3', 'Elementos sacados en orden: ' + sacados.join(', '), 'ok');
});
alReiniciar(3, () => { numeros = [1, 2, 3, 4, 5]; dibujar('arr3', numeros); });

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
