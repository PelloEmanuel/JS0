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

// ---- Ejercicio 1: quitar el primer número ----
let numeros = [10, 20, 30, 40, 50];
dibujar('arr1', numeros);

$('quitar1').addEventListener('click', () => {
  if (numeros.length === 0) { decir('res1', 'El array ya está vacío.', 'error'); return; }
  const quitado = numeros.shift(); // shift() devuelve el elemento eliminado
  dibujar('arr1', numeros);
  decir('res1', 'shift() quitó el número ' + quitado + '.', 'ok');
});
alReiniciar(1, () => { numeros = [10, 20, 30, 40, 50]; dibujar('arr1', numeros); });

// ---- Ejercicio 2: mensajes de chat ----
let mensajes = ['Hola!', '¿Cómo estás?', '¿Viste el partido?', 'Nos vemos mañana'];
dibujar('arr2', mensajes);

$('quitar2').addEventListener('click', () => {
  if (mensajes.length === 0) { decir('res2', 'No quedan mensajes.', 'error'); return; }
  const mensaje = mensajes.shift();
  dibujar('arr2', mensajes);
  decir('res2', 'Mensaje eliminado: "' + mensaje + '"', 'ok');
});
alReiniciar(2, () => { mensajes = ['Hola!', '¿Cómo estás?', '¿Viste el partido?', 'Nos vemos mañana']; dibujar('arr2', mensajes); });

// ---- Ejercicio 3: cola de atención ----
let cola = ['Cliente 1', 'Cliente 2', 'Cliente 3'];
dibujar('arr3', cola);

$('llegar3').addEventListener('click', () => {
  const cliente = $('cliente3').value.trim();
  if (cliente === '') { decir('res3', 'Escribí el nombre del cliente.', 'error'); return; }
  cola.push(cliente); // el cliente nuevo se pone al final de la cola
  dibujar('arr3', cola);
  decir('res3', cliente + ' entró a la cola.', 'ok');
  $('cliente3').value = '';
});

$('atender3').addEventListener('click', () => {
  if (cola.length === 0) { decir('res3', 'No hay clientes en espera.', 'error'); return; }
  const atendido = cola.shift(); // se atiende al primero de la cola
  dibujar('arr3', cola);
  decir('res3', 'Atendiendo a ' + atendido + '. Quedan ' + cola.length + ' en espera.', 'ok');
});
alReiniciar(3, () => { cola = ['Cliente 1', 'Cliente 2', 'Cliente 3']; dibujar('arr3', cola); });

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
