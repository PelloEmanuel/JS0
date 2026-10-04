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

// ---- Ejercicio 1: tres colores al principio ----
let colores = [];
dibujar('arr1', colores);

$('agregar1').addEventListener('click', () => {
  if (colores.length === 3) { decir('res1', 'Ya agregaste los 3 colores. Usá Reiniciar para empezar de nuevo.', 'error'); return; }
  const color = $('color1').value;
  colores.unshift(color);
  dibujar('arr1', colores);
  decir('res1', 'unshift() puso "' + color + '" al principio.', 'ok');
});
alReiniciar(1, () => { colores = []; dibujar('arr1', colores); });

// ---- Ejercicio 2: tarea urgente al principio ----
let tareas = ['Estudiar JavaScript', 'Hacer las compras', 'Lavar la ropa'];
dibujar('arr2', tareas);

$('agregar2').addEventListener('click', () => {
  const tarea = $('tarea2').value.trim();
  if (tarea === '') { decir('res2', 'Escribí la tarea urgente.', 'error'); return; }
  tareas.unshift('URGENTE: ' + tarea);
  dibujar('arr2', tareas);
  decir('res2', 'La tarea urgente quedó en la primera posición.', 'ok');
  $('tarea2').value = '';
});
alReiniciar(2, () => { tareas = ['Estudiar JavaScript', 'Hacer las compras', 'Lavar la ropa']; dibujar('arr2', tareas); });

// ---- Ejercicio 3: usuarios conectados ----
let usuarios = ['Marta', 'Juan'];
dibujar('arr3', usuarios);

$('agregar3').addEventListener('click', () => {
  const usuario = $('usuario3').value.trim();
  if (usuario === '') { decir('res3', 'Escribí el nombre del usuario.', 'error'); return; }
  usuarios.unshift(usuario);
  dibujar('arr3', usuarios);
  decir('res3', usuario + ' se conectó y aparece primero.', 'ok');
  $('usuario3').value = '';
});
alReiniciar(3, () => { usuarios = ['Marta', 'Juan']; dibujar('arr3', usuarios); });

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
