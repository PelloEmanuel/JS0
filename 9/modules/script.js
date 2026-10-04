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

// Muestra una lista de textos, uno por línea
function listar(id, textos) {
  const lista = $(id);
  lista.innerHTML = '';
  textos.forEach((texto) => {
    const li = document.createElement('li');
    li.textContent = texto;
    lista.appendChild(li);
  });
}

// ---- Ejercicio 1: saludar a cada nombre ----
let nombres = ['Ana', 'Luis', 'Marta'];
dibujar('arr1', nombres);

$('agregar1').addEventListener('click', () => {
  const nombre = $('nombre1').value.trim();
  if (nombre === '') { decir('res1', 'Escribí un nombre.', 'error'); return; }
  nombres.push(nombre);
  dibujar('arr1', nombres);
  $('nombre1').value = '';
});

$('mostrar1').addEventListener('click', () => {
  if (nombres.length === 0) { decir('res1', 'No hay nombres para saludar.', 'error'); return; }
  const saludos = [];
  nombres.forEach((nombre) => {
    saludos.push('¡Hola, ' + nombre + '!');
  });
  listar('sal1', saludos);
  decir('res1', 'forEach() recorrió ' + nombres.length + ' nombres.', 'ok');
});
alReiniciar(1, () => { nombres = ['Ana', 'Luis', 'Marta']; dibujar('arr1', nombres); listar('sal1', []); });

// ---- Ejercicio 2: el doble de cada número ----
let numeros = [1, 2, 3, 4, 5];
dibujar('arr2', numeros);

$('agregar2').addEventListener('click', () => {
  const numero = leerNumero('numero2');
  if (numero === null) { decir('res2', 'Escribí un número válido.', 'error'); return; }
  numeros.push(numero);
  dibujar('arr2', numeros);
  $('numero2').value = '';
});

$('mostrar2').addEventListener('click', () => {
  if (numeros.length === 0) { decir('res2', 'No hay números.', 'error'); return; }
  const lineas = [];
  numeros.forEach((numero) => {
    lineas.push(numero + ' x 2 = ' + numero * 2);
  });
  listar('sal2', lineas);
  decir('res2', 'forEach() recorrió ' + numeros.length + ' números.', 'ok');
});
alReiniciar(2, () => { numeros = [1, 2, 3, 4, 5]; dibujar('arr2', numeros); listar('sal2', []); });

// ---- Ejercicio 3: nombre y edad de cada persona ----
let personas = [{ nombre: 'Ana', edad: 25 }, { nombre: 'Luis', edad: 31 }];
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

$('mostrar3').addEventListener('click', () => {
  if (personas.length === 0) { decir('res3', 'No hay personas.', 'error'); return; }
  const lineas = [];
  personas.forEach((persona) => {
    lineas.push(persona.nombre + ' tiene ' + persona.edad + ' años');
  });
  listar('sal3', lineas);
  decir('res3', 'forEach() recorrió ' + personas.length + ' objetos.', 'ok');
});
alReiniciar(3, () => {
  personas = [{ nombre: 'Ana', edad: 25 }, { nombre: 'Luis', edad: 31 }];
  dibujar('arr3', personas);
  listar('sal3', []);
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
