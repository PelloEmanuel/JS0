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

// ---- Ejercicio 1: sumar ----
let numeros = [3, 5, 8, 2];
dibujar('arr1', numeros);

$('agregar1').addEventListener('click', () => {
  const numero = leerNumero('numero1');
  if (numero === null) { decir('res1', 'Escribí un número válido.', 'error'); return; }
  numeros.push(numero);
  dibujar('arr1', numeros);
  $('numero1').value = '';
});

$('calcular1').addEventListener('click', () => {
  // acumulador empieza en 0 y va sumando cada elemento
  const suma = numeros.reduce((acumulado, numero) => acumulado + numero, 0);
  decir('res1', 'La suma total es: ' + suma, 'ok');
});
alReiniciar(1, () => { numeros = [3, 5, 8, 2]; dibujar('arr1', numeros); });

// ---- Ejercicio 2: multiplicar ----
let enteros = [2, 3, 4];
dibujar('arr2', enteros);

$('agregar2').addEventListener('click', () => {
  const numero = leerNumero('numero2');
  if (numero === null || !Number.isInteger(numero)) { decir('res2', 'Escribí un número entero.', 'error'); return; }
  enteros.push(numero);
  dibujar('arr2', enteros);
  $('numero2').value = '';
});

$('calcular2').addEventListener('click', () => {
  // acumulador empieza en 1 porque se multiplica
  const producto = enteros.reduce((acumulado, numero) => acumulado * numero, 1);
  decir('res2', 'El producto total es: ' + producto, 'ok');
});
alReiniciar(2, () => { enteros = [2, 3, 4]; dibujar('arr2', enteros); });

// ---- Ejercicio 3: total de precios ----
let productos = [{ precio: 100 }, { precio: 250 }, { precio: 80 }];
dibujar('arr3', productos);

$('agregar3').addEventListener('click', () => {
  const precio = leerNumero('precio3');
  if (precio === null || precio < 0) { decir('res3', 'Escribí un precio válido.', 'error'); return; }
  productos.push({ precio: precio });
  dibujar('arr3', productos);
  $('precio3').value = '';
});

$('calcular3').addEventListener('click', () => {
  const total = productos.reduce((acumulado, producto) => acumulado + producto.precio, 0);
  decir('res3', 'El total de precios es: $' + total, 'ok');
});
alReiniciar(3, () => { productos = [{ precio: 100 }, { precio: 250 }, { precio: 80 }]; dibujar('arr3', productos); });

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
