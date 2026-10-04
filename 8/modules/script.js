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

// ---- Ejercicio 1: buscar "admin" ----
const usuarios = ['ana', 'luis', 'admin', 'marta'];
dibujar('arr1', usuarios);

$('comprobar1').addEventListener('click', () => {
  const palabra = $('palabra1').value.trim();
  const existe = usuarios.includes(palabra);
  decir('res1', 'includes("' + palabra + '") devolvió ' + existe + '.', existe ? 'ok' : 'error');
});
alReiniciar(1, () => { $('palabra1').value = 'admin'; });

// ---- Ejercicio 2: buscar un color ----
const colores = ['rojo', 'azul', 'verde', 'amarillo'];
dibujar('arr2', colores);

$('comprobar2').addEventListener('click', () => {
  const color = $('color2').value.trim();
  if (colores.includes(color)) {
    decir('res2', 'Sí, "' + color + '" existe en el array.', 'ok');
  } else {
    decir('res2', 'No, "' + color + '" no existe en el array.', 'error');
  }
});
alReiniciar(2, () => { $('color2').value = 'verde'; });

// ---- Ejercicio 3: sumar solo si no está ----
let numeros = [4, 8, 15];
dibujar('arr3', numeros);

$('sumar3').addEventListener('click', () => {
  const numero = leerNumero('numero3');
  if (numero === null) { decir('res3', 'Escribí un número válido.', 'error'); return; }
  if (numeros.includes(numero)) {
    decir('res3', 'El ' + numero + ' ya está en el array: no se agregó.', 'error');
  } else {
    numeros.push(numero);
    dibujar('arr3', numeros);
    decir('res3', 'El ' + numero + ' no estaba: se agregó.', 'ok');
  }
  $('numero3').value = '';
});
alReiniciar(3, () => { numeros = [4, 8, 15]; dibujar('arr3', numeros); });

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
