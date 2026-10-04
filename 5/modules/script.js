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

// ---- Ejercicio 1: eliminar elementos ----
let letras = ['A', 'B', 'C', 'D', 'E'];
dibujar('arr1', letras);

$('eliminar1').addEventListener('click', () => {
  const posicion = leerNumero('posicion1');
  const cantidad = leerNumero('cantidad1');
  if (posicion === null || cantidad === null || posicion < 0 || cantidad < 0) {
    decir('res1', 'Escribí una posición y una cantidad válidas (0 o más).', 'error');
    return;
  }
  const eliminadas = letras.splice(posicion, cantidad); // devuelve lo eliminado
  dibujar('arr1', letras);
  decir('res1', 'splice(' + posicion + ', ' + cantidad + ') eliminó: ' + (eliminadas.join(', ') || 'nada'), 'ok');
});
alReiniciar(1, () => { letras = ['A', 'B', 'C', 'D', 'E']; dibujar('arr1', letras); });

// ---- Ejercicio 2: insertar sin eliminar ----
let nombres = ['Ana', 'Luis', 'Marta', 'Pedro'];
dibujar('arr2', nombres);

$('insertar2').addEventListener('click', () => {
  const nombre = $('nombre2').value.trim();
  if (nombre === '') { decir('res2', 'Escribí un nombre.', 'error'); return; }
  nombres.splice(1, 0, nombre); // posición 1, elimina 0, agrega el nombre
  dibujar('arr2', nombres);
  decir('res2', '"' + nombre + '" quedó en la segunda posición.', 'ok');
  $('nombre2').value = '';
});
alReiniciar(2, () => { nombres = ['Ana', 'Luis', 'Marta', 'Pedro']; dibujar('arr2', nombres); });

// ---- Ejercicio 3: reemplazar dos elementos ----
let frutas = ['Manzana', 'Banana', 'Pera', 'Uva', 'Kiwi'];
dibujar('arr3', frutas);

$('reemplazar3').addEventListener('click', () => {
  const posicion = leerNumero('posicion3');
  const nuevoA = $('nuevoa3').value.trim();
  const nuevoB = $('nuevob3').value.trim();
  if (posicion === null || posicion < 0 || posicion >= frutas.length) {
    decir('res3', 'La posición debe estar entre 0 y ' + (frutas.length - 1) + '.', 'error');
    return;
  }
  if (nuevoA === '' || nuevoB === '') { decir('res3', 'Escribí los dos elementos nuevos.', 'error'); return; }
  const reemplazadas = frutas.splice(posicion, 2, nuevoA, nuevoB);
  dibujar('arr3', frutas);
  decir('res3', 'Se reemplazó: ' + reemplazadas.join(', ') + '  por  ' + nuevoA + ', ' + nuevoB, 'ok');
});
alReiniciar(3, () => { frutas = ['Manzana', 'Banana', 'Pera', 'Uva', 'Kiwi']; dibujar('arr3', frutas); });

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
