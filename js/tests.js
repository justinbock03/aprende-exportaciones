/*
 * PRUEBAS de las funciones de js/calculos.js y de la integridad de los datos.
 * Los valores esperados del caso salen de la guía ampliada (caso práctico).
 */
(function () {
  'use strict';
  var K = window.Calculos;
  var resultados = [];

  function cerca(nombre, obtenido, esperado, tol) {
    var t = tol === undefined ? 0.005 : tol;
    resultados.push({ nombre: nombre, esperado: esperado, obtenido: obtenido, ok: typeof obtenido === 'number' && Math.abs(obtenido - esperado) <= t });
  }
  function igual(nombre, obtenido, esperado) {
    resultados.push({ nombre: nombre, esperado: esperado, obtenido: obtenido, ok: obtenido === esperado });
  }

  /* ---------- Caso Textiles Andinos del Sur (guía, caso práctico) ---------- */
  var d = K.calcularDrawback({ fob: 250000, costo: 190000, cif: 70000, arancel: 7700, tc: 3.60 });
  cerca('Caso · Restitución 3 % del FOB (US$)', d.restitucion, 7500);
  cerca('Caso · Tope 50 % del costo (US$)', d.tope, 95000);
  cerca('Caso · Drawback = menor (US$)', d.monto, 7500);
  cerca('Caso · Drawback en soles', d.montoSoles, 27000);
  igual('Caso · El tope NO limita', d.topeActivo, false);
  igual('Caso · Cumple límite de insumos (28 % ≤ 50 %)', d.cumpleInsumos, true);
  cerca('Caso · CIF / FOB', d.proporcionCif, 0.28, 1e-9);
  cerca('Caso · Cobertura del arancel (97,4 %)', K.redondear(d.cobertura * 100, 1), 97.4);

  var s = K.calcularSaldoFavor({ baseComprasLocales: 420000, cifImport: 70000, arancelImport: 7700, tc: 3.60, baseVentasLocales: 0, fob: 250000 });
  cerca('Caso · IGV de compras locales', s.igvCompras, 75600);
  cerca('Caso · Base de importación', s.baseImportacion, 279720);
  cerca('Caso · IGV + IPM de importación', s.igvImportacion, 50349.60);
  cerca('Caso · SFE', s.sfe, 125949.60);
  cerca('Caso · SFMB', s.sfmb, 125949.60);
  cerca('Caso · Límite 18 % del FOB', s.limite, 162000);
  cerca('Caso · Monto aplicable', s.aplicable, 125949.60);
  cerca('Caso · Sin arrastre', s.arrastre, 0);
  cerca('Caso · Uso del límite (77,7 %)', Math.floor(s.usoLimite * 1000) / 10, 77.7);
  cerca('Caso · Total recuperado (Drawback + IGV)', d.montoSoles + s.aplicable, 152949.60);
  cerca('Caso · Costo de esperar (12 % anual, 42 días)', K.redondear(K.costoEspera(s.aplicable, 0.12, 42), 2), 1763.29);

  /* ---------- Casos borde ---------- */
  var b1 = K.calcularDrawback({ fob: 100000, costo: 4000, cif: 10000 });
  cerca('Borde · Tope del 50 % activo: monto = 2 000', b1.monto, 2000);
  igual('Borde · Tope del 50 % activo: bandera', b1.topeActivo, true);

  var b2 = K.calcularDrawback({ fob: 100000, costo: 80000, cif: 60000 });
  igual('Borde · Insumos > 50 % del FOB: no cumple', b2.cumpleInsumos, false);
  igual('Borde · Insumos > 50 % del FOB: no procede', b2.procede, false);
  cerca('Borde · Insumos > 50 % del FOB: monto aplicable 0', b2.montoAplicable, 0);

  var b3 = K.calcularDrawback({ fob: 100000, costo: 80000, cif: 50000 });
  igual('Borde · Insumos = 50 % exacto: sí cumple', b3.cumpleInsumos, true);

  var b4 = K.calcularDrawback({ fob: 10000, costo: 8000, cif: 1000 });
  igual('Borde · Monto US$ 300 < mínimo US$ 500', b4.superaMinimo, false);

  var b5 = K.calcularSFMB(200000, 0, 900000);
  cerca('Borde · SFMB mayor al límite: aplicable = 162 000', b5.aplicable, 162000);
  cerca('Borde · SFMB mayor al límite: arrastre = 38 000', b5.arrastre, 38000);

  var b6 = K.calcularSFMB(50000, 10000, 900000);
  cerca('Borde · Ventas locales reducen el SFMB (50 000 − 10 000)', b6.sfmb, 40000);

  var b7 = K.calcularSFMB(10000, 15000, 900000);
  cerca('Borde · IGV de ventas mayor al SFE: SFMB = 0', b7.sfmb, 0);

  var b8 = K.calcularSaldoFavor({ baseComprasLocales: 0, cifImport: 0, arancelImport: 0, tc: 3.6, fob: 100000, saldoAnterior: 5000 });
  cerca('Borde · El saldo arrastrado se suma al SFE', b8.sfe, 5000);

  /* ---------- Lectura de números escritos por personas ---------- */
  cerca('Lectura · "125 949,60"', K.leerNumero('125 949,60'), 125949.6);
  cerca('Lectura · "125949.60"', K.leerNumero('125949.60'), 125949.6);
  cerca('Lectura · "125,949.60"', K.leerNumero('125,949.60'), 125949.6);
  cerca('Lectura · "S/ 27 000"', K.leerNumero('S/ 27 000'), 27000);
  cerca('Lectura · "27,000"', K.leerNumero('27,000'), 27000);
  cerca('Lectura · "3,60"', K.leerNumero('3,60'), 3.6);
  cerca('Lectura · "97,4 %"', K.leerNumero('97,4 %'), 97.4);
  igual('Lectura · "abc" no es número', isNaN(K.leerNumero('abc')), true);
  igual('Formato · 125949.6 → "125 949,60"', K.formatear(125949.6).replace(/ /g, ' '), '125 949,60');

  /* ---------- Integridad de datos ---------- */
  var C = window.CONTENIDO, P = window.PREGUNTAS;
  igual('Datos · 17 módulos (0 a 16)', C.modulos.length, 17);
  var ids = {};
  P.forEach(function (q) { ids[q.id] = (ids[q.id] || 0) + 1; });
  igual('Datos · IDs de preguntas únicos', Object.keys(ids).every(function (k) { return ids[k] === 1; }), true);
  igual('Datos · Toda pregunta apunta a un módulo existente', P.every(function (q) { return C.modulos.some(function (m) { return m.id === q.m; }); }), true);
  igual('Datos · Mínimo 5 preguntas por módulo', C.modulos.every(function (m) { return P.filter(function (q) { return q.m === m.id; }).length >= 5; }), true);
  igual('Datos · Al menos 30 preguntas para el examen', P.length >= 30, true);
  igual('Datos · Preguntas de opción múltiple con índice válido', P.filter(function (q) { return q.tipo === 'mc'; }).every(function (q) { return q.c >= 0 && q.c < q.ops.length; }), true);
  // Las preguntas de cálculo del caso coinciden con las funciones
  var k6 = P.filter(function (q) { return q.id === 'k6'; })[0];
  cerca('Datos · Pregunta k6 = costoEspera del caso', k6.r, K.redondear(K.costoEspera(125949.6, 0.12, 42), 2));

  /* ---------- Mostrar ---------- */
  var tb = document.getElementById('filas'), fallas = 0;
  resultados.forEach(function (r) {
    if (!r.ok) fallas++;
    var tr = document.createElement('tr');
    tr.innerHTML = '<td>' + r.nombre + '</td><td>' + r.esperado + '</td><td>' + r.obtenido + '</td><td class="' + (r.ok ? 'ok">✔ OK' : 'no">✘ FALLA') + '</td>';
    tb.appendChild(tr);
  });
  var res = document.getElementById('resumen');
  res.textContent = (resultados.length - fallas) + ' de ' + resultados.length + ' pruebas correctas' + (fallas ? ' — ' + fallas + ' FALLAN' : ' ✔');
  res.className = fallas ? 'no' : 'ok';
  document.title = (fallas ? 'FALLAN ' + fallas : 'OK ' + resultados.length) + ' · Pruebas';
  window.RESULTADO_PRUEBAS = { total: resultados.length, fallas: fallas, detalle: resultados };
})();
