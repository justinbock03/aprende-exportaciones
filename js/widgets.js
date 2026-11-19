/*
 * WIDGETS INTERACTIVOS
 * Cada función recibe el elemento marcador y lo llena.
 * Las fórmulas NO están aquí: se usan las de js/calculos.js.
 */
(function (APP) {
  'use strict';
  var C = window.CONTENIDO;
  var K = window.Calculos;
  var esc = APP.esc, ico = APP.icono, f = K.formatear, pct = K.formatearPct;
  var W = APP.widgets = APP.widgets || {};
  var uid = 0;
  function id(p) { uid++; return 'w' + uid + '-' + p; }

  /* ---------- Ayudas de formulario ---------- */
  function campo(clave, etiqueta, ayuda, valor) {
    var i = id(clave);
    return '<div class="campo"><label for="' + i + '">' + etiqueta + '</label>' +
      '<input id="' + i + '" data-campo="' + clave + '" type="text" inputmode="decimal" autocomplete="off" value="' + esc(valor === undefined ? '' : valor) + '"' +
      (ayuda ? ' aria-describedby="' + i + '-a"' : '') + '>' +
      (ayuda ? '<span class="ayuda" id="' + i + '-a">' + ayuda + '</span>' : '') + '</div>';
  }
  function leerCampos(raiz) {
    var d = {}, ok = true;
    APP.$$('[data-campo]', raiz).forEach(function (inp) {
      var v = inp.value.trim();
      var n = v === '' ? NaN : K.leerNumero(v);
      var invalido = v !== '' && isNaN(n);
      inp.setAttribute('aria-invalid', invalido ? 'true' : 'false');
      if (invalido) ok = false;
      d[inp.getAttribute('data-campo')] = n;
    });
    d._ok = ok;
    return d;
  }
  function ponerCampos(raiz, valores) {
    APP.$$('[data-campo]', raiz).forEach(function (inp) {
      var k = inp.getAttribute('data-campo');
      inp.value = valores[k] === undefined ? '' : valores[k];
    });
  }
  function paso(desc, formula, valor, total) {
    return '<div class="paso-calc' + (total ? ' total' : '') + '"><div class="desc">' + desc + (formula ? '<code>' + formula + '</code>' : '') + '</div><div class="val">' + valor + '</div></div>';
  }
  function veredicto(tipo, html) {
    return '<div class="veredicto ' + tipo + '">' + ico(tipo === 'ok' ? 'check' : tipo === 'no' ? 'x' : 'info') + '<div>' + html + '</div></div>';
  }

  /* =================================================================
     1. Calculadora de Drawback
     ================================================================= */
  var EJEMPLO_DBK = { fob: '250 000', costo: '190 000', cif: '70 000', arancel: '7 700', tc: '3,60' };

  W.calcDrawback = function (el) {
    el.className = 'widget';
    el.innerHTML =
      '<p class="muted">Ingresa los montos en US$. El tipo de cambio es opcional (para ver el monto en soles).</p>' +
      '<div class="campos">' +
      campo('fob', 'Valor FOB exportado (US$)', 'Base del 3 %') +
      campo('costo', 'Costo de producción del bien exportado (US$)', 'Base del tope del 50 %') +
      campo('cif', 'CIF de insumos importados (US$)', 'Debe ser ≤ 50 % del FOB') +
      campo('arancel', 'Arancel realmente pagado (US$)', 'Opcional: para ver cuánto cubre') +
      campo('tc', 'Tipo de cambio (S/ por US$)', 'Opcional') +
      '</div>' +
      '<div class="fila-botones"><button type="button" class="btn primario" data-ej>Cargar ejemplo Textiles Andinos</button><button type="button" class="btn" data-limpiar>Limpiar</button></div>' +
      '<div class="resultado" aria-live="polite"></div>';
    var res = APP.$('.resultado', el);

    function calcular() {
      var d = leerCampos(el);
      if (!d._ok) { res.innerHTML = veredicto('no', 'Revisa los campos marcados: no son números válidos.'); return; }
      if (!(d.fob > 0) || !(d.costo > 0)) { res.innerHTML = veredicto('info', 'Ingresa al menos el FOB y el costo de producción.'); return; }
      var r = K.calcularDrawback({ fob: d.fob, costo: d.costo, cif: isNaN(d.cif) ? 0 : d.cif, arancel: isNaN(d.arancel) ? 0 : d.arancel, tc: isNaN(d.tc) ? 0 : d.tc });
      var h = '<h4>Paso a paso</h4>';
      h += paso('1. Restitución: 3 % del FOB', '3 % × ' + f(d.fob), 'US$ ' + f(r.restitucion));
      h += paso('2. Tope: 50 % del costo de producción', '50 % × ' + f(d.costo), 'US$ ' + f(r.tope));
      h += paso('3. Se toma el <b>menor</b>' + (r.topeActivo ? ' <span class="etq suspension">el tope limita</span>' : ' <span class="etq facilitacion">el tope no limita</span>'),
        'menor(' + f(r.restitucion) + ' ; ' + f(r.tope) + ')', 'US$ ' + f(r.monto), true);
      if (!isNaN(d.cif)) {
        h += paso('4. Límite de insumos: CIF ≤ 50 % del FOB', f(d.cif) + ' ≤ ' + f(r.limiteInsumosMonto) + ' → el CIF es el ' + pct(r.proporcionCif) + ' del FOB',
          r.cumpleInsumos ? '✔ Cumple' : '✘ No cumple');
      }
      if (r.cobertura !== null) h += paso('5. Cobertura del arancel pagado', f(r.monto) + ' / ' + f(d.arancel), pct(r.cobertura));
      if (r.montoSoles !== null) h += paso('6. En soles', f(r.monto) + ' × ' + f(r.tc, 2), 'S/ ' + f(r.montoSoles), true);

      if (isNaN(d.cif)) h += veredicto('info', 'Ingresa el CIF de insumos importados para verificar el límite del 50 % del FOB.');
      else if (r.procede) h += veredicto('ok', 'Cumple las condiciones de cálculo: le corresponden <b>US$ ' + f(r.monto) + '</b>' + (r.montoSoles !== null ? ' (S/ ' + f(r.montoSoles) + ')' : '') + '.');
      else h += veredicto('no', '<b>No procede:</b> el CIF de los insumos importados supera el 50 % del FOB. El producto debe tener valor agregado nacional, no ser “importar y reexportar”.');
      if (r.procede && !r.superaMinimo) h += veredicto('info', 'El monto es menor al mínimo de US$ 500 por solicitud: los montos menores se acumulan.');
      h += '<details class="acordeon"><summary>Requisitos que la calculadora no puede verificar</summary><div class="cuerpo"><ul>' +
        '<li>Insumos importados en los <b>36 meses</b> anteriores.</li>' +
        '<li>Voluntad indicada en la declaración de exportación (<b>código 13</b>).</li>' +
        '<li>Solicitud dentro de <b>180 días hábiles</b> desde el embarque.</li>' +
        '<li>Límite anual de <b>US$ 20 M</b> por partida arancelaria y empresa no vinculada.</li>' +
        '<li>Exclusiones: insumos exonerados, con arancel 0, con preferencia arancelaria o en régimen suspensivo (p. ej. admisión temporal).</li></ul></div></details>';
      h += '<div class="caja consejo"><div class="titulo-caja">' + ico('documento') + '<span>Ángulo contable</span></div><p>El Drawback <b>sí es un ingreso</b> (no la devolución de un gasto): Debe 16 / Haber 75 al reconocerlo; Debe 10 / Haber 16 al cobrarlo.</p></div>';
      res.innerHTML = h;
    }
    el.addEventListener('input', calcular);
    APP.$('[data-ej]', el).addEventListener('click', function () { ponerCampos(el, EJEMPLO_DBK); calcular(); });
    APP.$('[data-limpiar]', el).addEventListener('click', function () { ponerCampos(el, {}); calcular(); });
    calcular();
  };

  /* =================================================================
     2. Calculadora de saldo a favor (SFE / SFMB)
     ================================================================= */
  var EJEMPLO_SALDO = { compras: '420 000', cif: '70 000', arancel: '7 700', tc: '3,60', ventas: '0', fob: '250 000', anterior: '0', tasa: '12', dias: '42' };

  W.calcSaldo = function (el) {
    el.className = 'widget';
    el.innerHTML =
      '<p class="muted">IGV = 18 % (16 % IGV + 2 % IPM). Las compras y ventas locales en soles; importaciones y FOB en US$.</p>' +
      '<div class="campos">' +
      campo('compras', 'Compras locales para exportar: base imponible (S/)', 'Se calcula su IGV al 18 %') +
      campo('cif', 'Importaciones: valor CIF (US$)') +
      campo('arancel', 'Importaciones: arancel pagado (US$)', 'Base de importación = (CIF + arancel) × TC') +
      campo('tc', 'Tipo de cambio (S/ por US$)') +
      campo('ventas', 'Ventas locales gravadas: base (S/)', 'Su IGV se descuenta del SFE') +
      campo('fob', 'FOB exportado del mes (US$)', 'Límite = 18 % del FOB') +
      campo('anterior', 'Saldo arrastrado de meses anteriores (S/)', 'Opcional') +
      campo('tasa', 'Costo de financiarte (% anual)', 'Para el costo de esperar') +
      campo('dias', 'Días calendario de espera', '30 días hábiles ≈ 42 calendario') +
      '</div>' +
      '<div class="fila-botones"><button type="button" class="btn primario" data-ej>Cargar ejemplo Textiles Andinos</button><button type="button" class="btn" data-limpiar>Limpiar</button></div>' +
      '<div class="resultado" aria-live="polite"></div>';
    var res = APP.$('.resultado', el);
    function v(x) { return isNaN(x) ? 0 : x; }

    function calcular() {
      var d = leerCampos(el);
      if (!d._ok) { res.innerHTML = veredicto('no', 'Revisa los campos marcados: no son números válidos.'); return; }
      if (!(d.fob > 0) || !(d.tc > 0)) { res.innerHTML = veredicto('info', 'Ingresa al menos el FOB y el tipo de cambio.'); return; }
      var r = K.calcularSaldoFavor({ baseComprasLocales: v(d.compras), cifImport: v(d.cif), arancelImport: v(d.arancel), tc: d.tc, baseVentasLocales: v(d.ventas), fob: d.fob, saldoAnterior: v(d.anterior) });
      var h = '<h4>Paso a paso</h4>';
      h += paso('1. IGV de compras locales', '18 % × ' + f(v(d.compras)), 'S/ ' + f(r.igvCompras));
      h += paso('2. Base de importación', '(' + f(v(d.cif)) + ' + ' + f(v(d.arancel)) + ') × ' + f(d.tc), 'S/ ' + f(r.baseImportacion));
      h += paso('3. IGV + IPM de importación (16 % + 2 %)', '18 % × ' + f(r.baseImportacion), 'S/ ' + f(r.igvImportacion));
      if (r.saldoAnterior) h += paso('4. Saldo arrastrado de meses anteriores', '', 'S/ ' + f(r.saldoAnterior));
      h += paso('SFE = suma del IGV vinculado a la exportación', f(r.igvCompras) + ' + ' + f(r.igvImportacion) + (r.saldoAnterior ? ' + ' + f(r.saldoAnterior) : ''), 'S/ ' + f(r.sfe), true);
      h += paso('IGV de ventas locales', '18 % × ' + f(v(d.ventas)), 'S/ ' + f(r.igvVentasLocales));
      h += paso('SFMB = SFE − IGV de ventas locales', f(r.sfe) + ' − ' + f(r.igvVentasLocales), 'S/ ' + f(r.sfmb), true);
      h += paso('Límite mensual: 18 % del FOB en soles', '18 % × (' + f(d.fob) + ' × ' + f(d.tc) + ') = 18 % × ' + f(r.fobSoles), 'S/ ' + f(r.limite));
      h += paso('Monto a compensar o devolver este mes (el menor)', 'menor(' + f(r.sfmb) + ' ; ' + f(r.limite) + ')', 'S/ ' + f(r.aplicable), true);
      h += paso('Saldo que se arrastra como SFE al mes siguiente', f(r.sfmb) + ' − ' + f(r.aplicable), 'S/ ' + f(r.arrastre));
      h += paso('Peso sobre el FOB', f(r.aplicable) + ' / ' + f(r.fobSoles), pct(r.porcentajeFob));
      if (r.arrastre > 0.004) h += veredicto('info', 'El SFMB supera el 18 % del FOB: el exceso de <b>S/ ' + f(r.arrastre) + '</b> <b>no se pierde</b>, se arrastra a los meses siguientes.');
      else if (r.usoLimite !== null) h += veredicto('ok', 'El SFMB usa el ' + pct(r.usoLimite) + ' del límite: no hay saldo que arrastrar.');
      if (d.tasa > 0 && d.dias > 0) {
        var costo = K.costoEspera(r.aplicable, d.tasa / 100, d.dias);
        h += '<h4>Costo de esperar la devolución</h4>';
        h += paso('Monto × tasa anual × días / 360', f(r.aplicable) + ' × ' + f(d.tasa, 2) + ' % × ' + f(d.dias, 0) + '/360', 'S/ ' + f(costo), true);
      }
      h += '<div class="caja ojo"><div class="titulo-caja">' + ico('alerta') + '<span>El IGV devuelto no es ganancia</span></div><p>Es dinero de la empresa que el Estado tiene retenido: vuelve como <b>capital de trabajo</b>. Asiento al recibirlo: Debe 10 / Haber 40. Antes de pedirlo, presenta el <b>PDB Exportadores (formulario 0201)</b>.</p></div>';
      res.innerHTML = h;
    }
    el.addEventListener('input', calcular);
    APP.$('[data-ej]', el).addEventListener('click', function () { ponerCampos(el, EJEMPLO_SALDO); calcular(); });
    APP.$('[data-limpiar]', el).addEventListener('click', function () { ponerCampos(el, {}); calcular(); });
    calcular();
  };

  /* =================================================================
     3. Caso práctico guiado (Textiles Andinos del Sur)
     ================================================================= */
  var PASOS_CASO = [
    { grupo: 'Paso 1 · Drawback', q: '¿Cuánto es la restitución del 3 % del FOB? (US$)', r: 7500, tol: 0.5, u: 'US$', pista: '3 % × FOB de US$ 250 000.', sol: '3 % × 250 000 = US$ 7 500' },
    { grupo: 'Paso 1 · Drawback', q: '¿Cuánto es el tope del 50 % del costo de producción? (US$)', r: 95000, tol: 0.5, u: 'US$', pista: '50 % × costo de US$ 190 000.', sol: '50 % × 190 000 = US$ 95 000' },
    { grupo: 'Paso 1 · Drawback', q: 'Se toma el menor. ¿Cuánto es el Drawback en soles? (TC 3,60)', r: 27000, tol: 0.5, u: 'S/', pista: 'El menor entre 7 500 y 95 000, multiplicado por 3,60.', sol: 'US$ 7 500 × 3,60 = S/ 27 000. El tope no limita porque el 3 % es mucho menor.' },
    { grupo: 'Paso 1 · Drawback', q: '¿Qué porcentaje del arancel pagado (US$ 7 700) cubre el Drawback? (%)', r: 97.4, tol: 0.1, u: '%', pista: '7 500 / 7 700 × 100.', sol: '7 500 / 7 700 = 97,4 %: casi cubre todo el arancel pagado.' },
    { grupo: 'Paso 2 · Saldo a favor (IGV)', q: '¿Cuánto IGV pagó en compras locales? (base S/ 420 000)', r: 75600, tol: 0.5, u: 'S/', pista: '18 % × 420 000.', sol: '18 % × 420 000 = S/ 75 600,00' },
    { grupo: 'Paso 2 · Saldo a favor (IGV)', q: '¿Cuál es la base de importación en soles? (CIF + arancel) × TC', r: 279720, tol: 0.5, u: 'S/', pista: '(70 000 + 7 700) × 3,60.', sol: '(70 000 + 7 700) × 3,60 = S/ 279 720,00' },
    { grupo: 'Paso 2 · Saldo a favor (IGV)', q: '¿Cuánto IGV + IPM (16 % + 2 %) pagó en la importación?', r: 50349.6, tol: 0.05, u: 'S/', pista: '18 % × 279 720.', sol: '18 % × 279 720 = S/ 50 349,60' },
    { grupo: 'Paso 2 · Saldo a favor (IGV)', q: '¿Cuánto es el SFE?', r: 125949.6, tol: 0.05, u: 'S/', pista: 'IGV de compras locales + IGV de importación.', sol: 'SFE = 75 600 + 50 349,60 = S/ 125 949,60' },
    { grupo: 'Paso 2 · Saldo a favor (IGV)', q: '¿Cuál es el límite del 18 % del FOB en soles?', r: 162000, tol: 0.5, u: 'S/', pista: '18 % × S/ 900 000.', sol: '18 % × 900 000 = S/ 162 000,00' },
    { grupo: 'Paso 2 · Saldo a favor (IGV)', q: 'No hay ventas locales. ¿Cuánto es el SFMB que se devuelve?', r: 125949.6, tol: 0.05, u: 'S/', pista: 'SFMB = SFE − IGV de ventas locales (0), y se compara con el límite.', sol: 'SFMB = S/ 125 949,60 (menor que el límite de 162 000; usa el 77,7 % del límite, no hay saldo que arrastrar).' },
    { grupo: 'Paso 3 · Resultado', q: '¿Cuánto recupera en total? (Drawback + IGV)', r: 152949.6, tol: 0.05, u: 'S/', pista: '27 000 + 125 949,60.', sol: 'S/ 27 000 + S/ 125 949,60 = S/ 152 949,60 (≈17 % del FOB).' },
    { grupo: 'Paso 3 · Resultado', q: 'Si SUNAT tarda 42 días calendario y la empresa se financia al 12 % anual, ¿cuál es el costo de esperar?', r: 1763.29, tol: 0.05, u: 'S/', pista: '125 949,60 × 12 % × 42 / 360.', sol: '125 949,60 × 12 % × 42/360 = S/ 1 763,29' }
  ];

  W.casoGuiado = function (el) {
    el.className = 'widget';
    var actual = 0, aciertos = 0;
    el.innerHTML = '<div class="barra-prog" aria-hidden="true"><span style="width:0"></span></div><p class="muted" data-estado aria-live="polite"></p><div data-pasos></div><div data-final></div>' +
      '<div class="fila-botones"><button type="button" class="btn chico" data-reiniciar>' + ico('repetir') + 'Reiniciar caso</button></div>';
    var cont = APP.$('[data-pasos]', el), fin = APP.$('[data-final]', el);

    function actualizarEstado() {
      APP.$('.barra-prog span', el).style.width = Math.round(actual * 100 / PASOS_CASO.length) + '%';
      APP.$('[data-estado]', el).textContent = 'Paso ' + Math.min(actual + 1, PASOS_CASO.length) + ' de ' + PASOS_CASO.length + ' · aciertos al primer intento o con pista: ' + aciertos;
    }

    function mostrarPaso(i) {
      var p = PASOS_CASO[i], pid = id('caso');
      var div = document.createElement('div');
      div.className = 'tarjeta aparecer';
      div.style.margin = '10px 0';
      div.innerHTML = '<p class="numero-preg muted" style="margin:0"><b>' + esc(p.grupo) + '</b> · ' + (i + 1) + '/' + PASOS_CASO.length + '</p>' +
        '<p style="font-weight:600"><label for="' + pid + '">' + esc(p.q) + '</label></p>' +
        '<div class="respuesta-calc"><input id="' + pid + '" type="text" inputmode="decimal" autocomplete="off" placeholder="Tu respuesta en ' + esc(p.u) + '">' +
        '<button type="button" class="btn primario chico" data-comprobar>Comprobar</button>' +
        '<button type="button" class="btn chico" data-pista>Pista</button>' +
        '<button type="button" class="btn chico" data-solucion>Ver solución</button></div>' +
        '<div data-retro aria-live="polite"></div>';
      cont.appendChild(div);
      var inp = APP.$('input', div), retro = APP.$('[data-retro]', div), resuelto = false;

      function cerrar(bien, texto) {
        resuelto = true;
        inp.disabled = true;
        APP.$$('button', div).forEach(function (b) { b.disabled = true; });
        retro.innerHTML = '<div class="retro ' + (bien ? 'bien' : 'mal') + '"><strong>' + (bien ? '¡Correcto!' : 'Solución') + '</strong>' + esc(p.sol) + '</div>';
        if (bien) aciertos++;
        actual = i + 1;
        actualizarEstado();
        if (actual < PASOS_CASO.length) mostrarPaso(actual);
        else mostrarFinal();
      }
      APP.$('[data-comprobar]', div).addEventListener('click', function () {
        if (resuelto) return;
        var n = K.leerNumero(inp.value);
        if (isNaN(n)) { retro.innerHTML = '<div class="retro mal"><strong>Escribe un número.</strong>Por ejemplo: 125 949,60</div>'; return; }
        if (Math.abs(n - p.r) <= p.tol) cerrar(true);
        else retro.innerHTML = '<div class="retro mal"><strong>Todavía no.</strong>Revisa el cálculo o pide una pista.</div>';
      });
      inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') APP.$('[data-comprobar]', div).click(); });
      APP.$('[data-pista]', div).addEventListener('click', function () {
        retro.innerHTML = '<div class="retro bien"><strong>Pista</strong>' + esc(p.pista) + '</div>';
      });
      APP.$('[data-solucion]', div).addEventListener('click', function () { cerrar(false); });
      if (i > 0) inp.focus({ preventScroll: true });
    }

    function mostrarFinal() {
      fin.innerHTML = '<div class="aparecer"><h3>Resultado</h3>' +
        '<div class="cifras"><div class="cifra"><span class="valor">S/ 27 000</span><span class="etiqueta">Drawback · 3 % del FOB · <b>ingreso</b></span></div>' +
        '<div class="cifra"><span class="valor">S/ 125 949,60</span><span class="etiqueta">IGV devuelto · 14 % del FOB · <b>no es ganancia</b></span></div>' +
        '<div class="cifra"><span class="valor">S/ 152 949,60</span><span class="etiqueta">Total recuperado · ≈17 % del FOB</span></div></div>' +
        '<h3>Asientos contables referenciales</h3>' +
        '<div class="tabla-envoltura"><table class="apilable"><thead><tr><th scope="col">Operación</th><th scope="col">Debe</th><th scope="col">Haber</th><th scope="col" class="num">S/</th></tr></thead><tbody>' +
        '<tr><td data-col="Operación">Reconocimiento del Drawback</td><td data-col="Debe">16 Ctas. por cobrar diversas – terceros</td><td data-col="Haber">75 Otros ingresos de gestión</td><td data-col="S/" class="num">27 000,00</td></tr>' +
        '<tr><td data-col="Operación">Cobro del Drawback</td><td data-col="Debe">10 Efectivo y equivalentes</td><td data-col="Haber">16 Ctas. por cobrar diversas – terceros</td><td data-col="S/" class="num">27 000,00</td></tr>' +
        '<tr><td data-col="Operación">Devolución del IGV (SFMB)</td><td data-col="Debe">10 Efectivo y equivalentes</td><td data-col="Haber">40 Tributos por pagar (IGV – saldo a favor)</td><td data-col="S/" class="num">125 949,60</td></tr>' +
        '</tbody></table></div>' +
        '<div class="caja dilo"><div class="titulo-caja">' + ico('cita') + '<span>Dilo así</span></div><blockquote>“De cada 100 soles que exporta, la empresa recupera 17: 3 por Drawback y 14 por IGV. Pero esos 14 no son regalo: son su propio dinero que el Estado le tenía retenido.”</blockquote></div></div>';
    }

    APP.$('[data-reiniciar]', el).addEventListener('click', function () {
      actual = 0; aciertos = 0; cont.innerHTML = ''; fin.innerHTML = ''; actualizarEstado(); mostrarPaso(0);
    });
    actualizarEstado();
    mostrarPaso(0);
  };

  /* =================================================================
     4. Selector "¿Qué instrumento me conviene?"
     ================================================================= */
  var PREG_SELECTOR = [
    { k: 'ruc', q: '¿Tienes RUC activo y clave SOL?', ops: [['si', 'Sí'], ['no', 'No']] },
    { k: 'insumos', q: '¿Lo que exportas usa insumos importados (que pagan o pagarían arancel)?', ops: [['si', 'Sí'], ['no', 'No']] },
    { k: 'requisitos', q: '¿El CIF de esos insumos es ≤ 50 % del FOB exportado y se importaron en los últimos 36 meses?', ops: [['si', 'Sí'], ['no', 'No'], ['nose', 'No sé']], si: function (r) { return r.insumos === 'si'; } },
    { k: 'garantia', q: '¿Podrías dar una garantía (carta fianza o póliza) y exportar el producto en un máximo de 24 meses?', ops: [['si', 'Sí'], ['no', 'No']], si: function (r) { return r.insumos === 'si'; } },
    { k: 'igv', q: '¿Pagas IGV en compras (bienes, servicios) para producir lo que exportas?', ops: [['si', 'Sí'], ['no', 'No']] },
    { k: 'envio', q: '¿Cómo son tus envíos?', ops: [['chico', 'Pequeños: ≤ US$ 7 500 FOB y ≤ 30 kg por paquete'], ['grande', 'Más grandes']] }
  ];

  function recomendar(r) {
    var out = [];
    if (r.ruc === 'no') out.push({ c: 'no', t: 'Primero: formalízate', h: 'Exporta Fácil exige RUC y clave SOL; la admisión temporal pide RUC activo y clave SOL; la solicitud de Drawback se registra en el portal de SUNAT con clave SOL. Sin ellos no puedes usar estos instrumentos.' });
    if (r.envio === 'chico') out.push({ c: 'facilitacion', t: 'Exporta Fácil · facilitación', h: 'Tus envíos están dentro de los límites (US$ 7 500 FOB por DEF y 30 kg en SERPOST): puedes exportar por correo <b>sin agente de aduanas</b>. Recuerda: no es beneficio tributario, simplifica el trámite.', m: 'exporta-facil' });
    if (r.igv === 'si') out.push({ c: 'devolucion', t: 'Saldo a favor del exportador · devolución', h: 'Como pagas IGV en compras y tu exportación no lleva IGV, puedes <b>compensarlo o pedir su devolución</b> (límite mensual 18 % del FOB; plazo 4 años). Antes presenta el PDB Exportadores (0201). Ojo: no es ganancia, es capital de trabajo que vuelve.', m: 'saldo-a-favor' });
    var dbk = r.insumos === 'si' && r.requisitos === 'si';
    var at = r.insumos === 'si' && r.garantia === 'si';
    if (dbk) out.push({ c: 'devolucion', t: 'Drawback · devolución', h: 'Cumples el límite de insumos y la antigüedad: te corresponde el <b>menor entre 3 % del FOB y 50 % del costo</b>. Marca el código 13 en la declaración y solicita dentro de <b>180 días hábiles</b> desde el embarque (mínimo US$ 500).', m: 'drawback' });
    if (r.insumos === 'si' && r.requisitos === 'nose') out.push({ c: 'no', t: 'Drawback: verifica primero', h: 'Revisa que el CIF de los insumos importados sea ≤ 50 % del FOB y que se hayan importado en los últimos 36 meses. Usa la calculadora del módulo 8.', m: 'drawback' });
    if (r.insumos === 'si' && r.requisitos === 'no') out.push({ c: 'no', t: 'Drawback: no calificas', h: 'Si el CIF de los insumos supera el 50 % del FOB o se importaron hace más de 36 meses, no procede (el producto debe tener valor agregado nacional).', m: 'drawback' });
    if (at) out.push({ c: 'suspension', t: 'Admisión temporal · suspensión', h: 'Puedes importar los insumos <b>sin pagar aranceles ni IGV</b> al inicio, transformarlos y exportarlos en hasta 24 meses. Ventaja: no inmovilizas capital. Riesgo: si incumples, se ejecuta la garantía y pagas tributos con intereses.', m: 'admision-temporal' });
    if (dbk && at) out.push({ c: 'no', t: 'Ojo: elige por insumo', h: 'No puedes usar Drawback y admisión temporal sobre el <b>mismo insumo</b> (sería doble beneficio), salvo que se nacionalice pagando todo. Compara: la admisión temporal da liquidez desde el inicio pero exige garantía; el Drawback no pide garantía pero pagas primero.', m: 'admision-temporal' });
    if (r.insumos === 'si' && r.garantia === 'no' && !dbk) out.push({ c: 'no', t: 'Admisión temporal: difícil para ti', h: 'Exige garantía (tributos suspendidos + interés compensatorio) y capacidad crediticia. Para una microempresa puede desanimar más de lo que ahorra.', m: 'admision-temporal' });
    if (!out.some(function (o) { return o.c !== 'no'; })) out.push({ c: 'no', t: 'Sin recomendación clara', h: 'Con estas respuestas ninguno de los 4 instrumentos aplica claramente. Revisa el módulo 7 para comparar.', m: 'instrumentos' });
    return out;
  }

  W.selector = function (el) {
    el.className = 'widget';
    var resp = {};
    var nombre = id('sel');
    el.innerHTML = '<p class="muted">Responde y la recomendación se actualiza sola. Usa solo las reglas de la guía.</p><div data-preguntas></div><div aria-live="polite" data-reco></div>' +
      '<div class="fila-botones"><button type="button" class="btn chico" data-reiniciar>' + ico('repetir') + 'Empezar de nuevo</button></div>';
    var cont = APP.$('[data-preguntas]', el), reco = APP.$('[data-reco]', el);

    function pintar() {
      cont.innerHTML = PREG_SELECTOR.map(function (p, i) {
        if (p.si && !p.si(resp)) return '';
        return '<div class="selector-pregunta"><fieldset><legend>' + (i + 1) + '. ' + esc(p.q) + '</legend><div class="opciones-radio">' +
          p.ops.map(function (o) {
            return '<label><input type="radio" name="' + nombre + '-' + p.k + '" value="' + o[0] + '"' + (resp[p.k] === o[0] ? ' checked' : '') + ' data-k="' + p.k + '"> ' + esc(o[1]) + '</label>';
          }).join('') + '</div></fieldset></div>';
      }).join('');
      var visibles = PREG_SELECTOR.filter(function (p) { return !p.si || p.si(resp); });
      var completas = visibles.every(function (p) { return resp[p.k]; });
      if (!completas) { reco.innerHTML = '<p class="muted">Faltan ' + visibles.filter(function (p) { return !resp[p.k]; }).length + ' respuesta(s).</p>'; return; }
      reco.innerHTML = '<h4>Recomendación</h4>' + recomendar(resp).map(function (o) {
        var m = o.m ? APP.modulo(o.m) : null;
        return '<div class="recomendacion ' + o.c + ' aparecer"><strong>' + esc(o.t) + '</strong><p style="margin:.3em 0">' + o.h + '</p>' +
          (m ? '<small><a href="#/m/' + m.id + '">Ver módulo ' + m.num + ' · ' + esc(m.tituloCorto) + '</a></small>' : '') + '</div>';
      }).join('');
    }
    cont.addEventListener('change', function (e) {
      var t = e.target;
      if (t && t.getAttribute('data-k')) {
        resp[t.getAttribute('data-k')] = t.value;
        if (resp.insumos === 'no') { delete resp.requisitos; delete resp.garantia; }
        var k = t.getAttribute('data-k');
        pintar();
        var mismo = cont.querySelector('input[data-k="' + k + '"][value="' + t.value + '"]');
        if (mismo) mismo.focus();
      }
    });
    APP.$('[data-reiniciar]', el).addEventListener('click', function () { resp = {}; pintar(); });
    pintar();
  };

  /* =================================================================
     5. Trámites paso a paso (Drawback y admisión temporal)
     ================================================================= */
  function lineaPasos(el, pasos, extra) {
    el.className = 'widget';
    el.innerHTML = '<ol class="linea">' + pasos.map(function (p, i) {
      var did = id('det');
      return '<li data-i="' + i + '"><button type="button" class="paso-btn" aria-expanded="false" aria-controls="' + did + '">' + esc(p.t) + '</button>' +
        '<div class="detalle" id="' + did + '" hidden>' + p.d + '</div></li>';
    }).join('') + '</ol>' +
      '<div class="fila-botones no-imprimir"><button type="button" class="btn chico primario" data-sig>Siguiente paso</button><button type="button" class="btn chico" data-todo>Ver todo</button><button type="button" class="btn chico" data-reset>' + ico('repetir') + 'Reiniciar</button></div>' + (extra || '');
    var lis = APP.$$('.linea > li', el), i = -1;
    function abrir(n, abierto) {
      var li = lis[n], b = APP.$('.paso-btn', li), d = APP.$('.detalle', li);
      b.setAttribute('aria-expanded', abierto); d.hidden = !abierto;
      li.classList.toggle('visto', abierto);
      if (abierto) d.classList.add('aparecer');
    }
    lis.forEach(function (li, n) {
      APP.$('.paso-btn', li).addEventListener('click', function () {
        abrir(n, APP.$('.detalle', li).hidden);
      });
    });
    APP.$('[data-sig]', el).addEventListener('click', function () {
      if (i >= 0 && i < lis.length) lis[i].classList.remove('activo');
      i = Math.min(i + 1, lis.length - 1);
      abrir(i, true); lis[i].classList.add('activo');
      APP.$('.paso-btn', lis[i]).focus();
    });
    APP.$('[data-todo]', el).addEventListener('click', function () { lis.forEach(function (li, n) { abrir(n, true); }); });
    APP.$('[data-reset]', el).addEventListener('click', function () { i = -1; lis.forEach(function (li, n) { abrir(n, false); li.classList.remove('activo'); }); });
    return el;
  }

  W.tramiteDrawback = function (el) {
    lineaPasos(el, [
      { t: 'Marcar la voluntad en la declaración de exportación', d: 'Se indica con el <b>código 13</b>, para que SUNAT sepa desde el embarque que se pedirá Drawback.' },
      { t: 'Registrar la solicitud en el portal SUNAT', d: 'Embarcada la mercancía, se registra con <b>clave SOL</b> y una <b>cuenta bancaria en soles</b>. Plazo: <b>180 días hábiles desde el embarque</b>; mínimo US$ 500 por solicitud.' },
      { t: 'El sistema jala los datos (sin poder editarlos)', d: 'Toma los datos de facturas y guías electrónicas: <b>todo debe coincidir</b> con lo que SUNAT ya tiene. Aquí se nota la trazabilidad insumo-producto.' },
      { t: 'Aprobación automática o revisión documentaria', d: 'Si pasa a revisión, tienes <b>2 días hábiles</b> para sustentar.' },
      { t: 'Abono', d: 'Si se aprueba, el abono se ordena en <b>5 días hábiles</b>. Contablemente: Debe 10 / Haber 16.' },
      { t: 'Fiscalización posterior', d: 'SUNAT puede fiscalizar después y exigir <b>reintegro con intereses y multa</b>. Por eso se guarda un expediente por solicitud (caso Agualima: más de 8 años de litigio).' }
    ], '<p class="muted"><small>Desde el 2 de febrero de 2026 el trámite es 100 % digital (DESPA-PG.07 v5).</small></p>');
  };

  var SALIDAS = [
    { k: 'exportar', t: 'a) Exportar', d: 'El <b>producto compensador</b> sale del país. Es lo ideal: nunca pagaste los tributos suspendidos. Al exportar se presenta la <b>RIP</b>, que debe coincidir con el CIP.' },
    { k: 'reexportar', t: 'b) Reexportar', d: 'El insumo sale del país <b>sin transformarse</b>.' },
    { k: 'nacionalizar', t: 'c) Nacionalizar', d: 'El insumo se queda en el país <b>pagando tributos + interés compensatorio</b>. Contable: esos tributos e intereses pasan al <b>costo</b> del insumo.' },
    { k: 'destruir', t: 'd) Destruir', d: 'Destrucción <b>autorizada por SUNAT</b>.' },
    { k: 'vence', t: '⚠ Vence el plazo sin salida', d: 'SUNAT da las mercancías por <b>nacionalizadas</b> y <b>ejecuta la garantía</b>: el beneficio se vuelve deuda con intereses. Contable: van al <b>gasto</b> por incumplimiento.', peligro: true }
  ];

  W.tramiteAdmision = function (el) {
    var salidasHtml = '<h4>Paso 4: ¿cómo termina? Elige una salida</h4><div class="salidas" role="group" aria-label="Salidas del régimen">' + SALIDAS.map(function (s) {
      return '<button type="button" aria-pressed="false" data-salida="' + s.k + '"' + (s.peligro ? ' class="peligro"' : '') + '><strong>' + esc(s.t) + '</strong></button>';
    }).join('') + '</div><div aria-live="polite" data-desc-salida></div>';
    lineaPasos(el, [
      { t: 'Ingreso del insumo con garantía', d: 'Entra la materia prima, insumo, parte o pieza <b>sin pagar aranceles ni IGV</b> de importación. Se otorga una <b>garantía</b>: tributos suspendidos + interés compensatorio (TAMEX). Requisitos: RUC activo, clave SOL, no estar como “no habido”.' },
      { t: 'Se transmite el CIP', d: '<b>Cuadro de Insumo Producto</b>: coeficientes de consumo, mermas y desperdicios. En el kardex, estos insumos van separados de los nacionalizados.' },
      { t: 'Transformación, elaboración o reparación', d: 'Incluye montaje y ensamble. Plazo: hasta <b>24 meses desde el levante</b>; prórroga automática si renuevas la garantía antes de vencer.' },
      { t: 'Conclusión del régimen', d: 'Hay 4 salidas posibles: exportar, reexportar, nacionalizar o destruir. Pruébalas abajo.' }
    ], salidasHtml);
    var desc = APP.$('[data-desc-salida]', el);
    APP.$$('[data-salida]', el).forEach(function (b) {
      b.addEventListener('click', function () {
        APP.$$('[data-salida]', el).forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
        var s = SALIDAS.filter(function (x) { return x.k === b.getAttribute('data-salida'); })[0];
        desc.innerHTML = '<div class="veredicto ' + (s.peligro ? 'no' : 'info') + ' aparecer">' + ico(s.peligro ? 'alerta' : 'info') + '<div>' + s.d + '</div></div>';
      });
    });
  };

  /* =================================================================
     6. Comparador de instrumentos
     ================================================================= */
  W.comparador = function (el) {
    el.className = 'widget comparador';
    var cmp = C.comparador;
    var tipos = { todos: 'Todos', devolucion: 'Devolución', suspension: 'Suspensión', facilitacion: 'Facilitación' };
    var tipoSel = 'todos';
    var criteriosOn = {};
    cmp.criterios.forEach(function (c) { criteriosOn[c.id] = true; });

    el.innerHTML = '<div class="filtros" role="group" aria-label="Filtrar por tipo de beneficio"><span class="rotulo">Tipo:</span>' +
      Object.keys(tipos).map(function (k) { return '<button type="button" class="btn chico" data-tipo="' + k + '" aria-pressed="' + (k === 'todos') + '">' + tipos[k] + '</button>'; }).join('') + '</div>' +
      '<div class="filtros" role="group" aria-label="Criterios a mostrar"><span class="rotulo">Criterios:</span>' +
      cmp.criterios.map(function (c) { return '<button type="button" class="btn chico" data-crit="' + c.id + '" aria-pressed="true">' + esc(c.nombre) + '</button>'; }).join('') + '</div>' +
      '<div data-tabla aria-live="polite"></div>';
    var cont = APP.$('[data-tabla]', el);

    function pintar() {
      var inst = cmp.instrumentos.filter(function (i) { return tipoSel === 'todos' || i.tipo === tipoSel; });
      var crit = cmp.criterios.filter(function (c) { return criteriosOn[c.id]; });
      if (!crit.length) { cont.innerHTML = '<p class="muted">Activa al menos un criterio.</p>'; return; }
      var h = '<div class="tabla-envoltura"><table><thead><tr><th scope="col">Criterio</th>' + inst.map(function (i) {
        return '<th scope="col">' + esc(i.nombre) + '</th>';
      }).join('') + '</tr></thead><tbody>';
      crit.forEach(function (c) {
        h += '<tr><th scope="row" style="background:var(--superficie);color:var(--texto)">' + esc(c.nombre) + '</th>' + inst.map(function (i) {
          var v = i.valores[c.id];
          if (c.id === 'tipo') v = '<span class="etq ' + i.tipo + '">' + tipos[i.tipo] + '</span> ' + esc(v.split(':')[1] || v);
          else v = esc(v);
          return '<td>' + v + '</td>';
        }).join('') + '</tr>';
      });
      cont.innerHTML = h + '</tbody></table></div>';
    }
    APP.$$('[data-tipo]', el).forEach(function (b) {
      b.addEventListener('click', function () {
        tipoSel = b.getAttribute('data-tipo');
        APP.$$('[data-tipo]', el).forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
        pintar();
      });
    });
    APP.$$('[data-crit]', el).forEach(function (b) {
      b.addEventListener('click', function () {
        var k = b.getAttribute('data-crit');
        criteriosOn[k] = !criteriosOn[k];
        b.setAttribute('aria-pressed', criteriosOn[k]);
        pintar();
      });
    });
    pintar();
  };

  /* =================================================================
     7. Mapa de entidades y juego "función → entidad"
     ================================================================= */
  W.mapaEntidades = function (el) {
    el.className = 'entidades';
    el.innerHTML = C.entidades.map(function (e) {
      var lid = id('ent');
      return '<div><button type="button" class="entidad" aria-expanded="false" aria-controls="' + lid + '"><span class="nombre">' + esc(e.nombre) + '</span>' +
        '<span class="rol">' + esc(e.rol) + ' · ' + esc(e.subtitulo) + '</span></button>' +
        '<ul id="' + lid + '" hidden>' + e.funciones.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ul></div>';
    }).join('');
    APP.$$('.entidad', el).forEach(function (b) {
      b.addEventListener('click', function () {
        var abierto = b.getAttribute('aria-expanded') !== 'true';
        b.setAttribute('aria-expanded', abierto);
        document.getElementById(b.getAttribute('aria-controls')).hidden = !abierto;
      });
    });
  };

  W.juegoEntidades = function (el) {
    el.className = 'widget';
    var seleccion = null, aciertos = 0, intentos = 0, arrastrando = null;
    function iniciar() {
      seleccion = null; aciertos = 0; intentos = 0;
      var fichas = APP.mezclar(C.juegoEntidades);
      el.innerHTML = '<p class="muted">Toca una función y luego la entidad que la cumple (en computadora también puedes arrastrar).</p>' +
        '<div class="fichas" data-fichas>' + fichas.map(function (x, i) {
          return '<button type="button" class="ficha" draggable="true" aria-pressed="false" data-ent="' + x.entidad + '" data-i="' + i + '">' + esc(x.texto) + '</button>';
        }).join('') + '</div>' +
        '<div class="juego-zona">' + C.entidades.map(function (e) {
          return '<button type="button" class="zona" data-zona="' + e.id + '" aria-label="Colocar en ' + esc(e.nombre) + '"><strong>' + esc(e.nombre) + '</strong><span class="fichas" data-dentro></span></button>';
        }).join('') + '</div>' +
        '<p aria-live="polite" data-msg><b>0</b> de ' + fichas.length + ' colocadas.</p>' +
        '<div class="fila-botones"><button type="button" class="btn chico" data-reiniciar>' + ico('repetir') + 'Jugar de nuevo</button></div>';
      enlazar(fichas.length);
    }
    function colocar(ficha, zona, total) {
      intentos++;
      var msg = APP.$('[data-msg]', el);
      if (ficha.getAttribute('data-ent') === zona.getAttribute('data-zona')) {
        aciertos++;
        ficha.classList.remove('mal'); ficha.classList.add('ok');
        ficha.setAttribute('aria-pressed', 'false'); ficha.disabled = true; ficha.draggable = false;
        APP.$('[data-dentro]', zona).appendChild(ficha);
        msg.innerHTML = '¡Bien! <b>' + aciertos + '</b> de ' + total + ' colocadas · ' + intentos + ' intentos.';
        if (aciertos === total) msg.innerHTML = '🎉 ¡Completo! ' + total + ' funciones en ' + intentos + ' intentos (' + Math.round(total * 100 / intentos) + ' % de precisión).';
      } else {
        ficha.classList.add('mal');
        var correcta = C.entidades.filter(function (e) { return e.id === ficha.getAttribute('data-ent'); })[0];
        msg.innerHTML = 'No: “' + esc(ficha.textContent) + '” no es de ' + esc(zona.querySelector('strong').textContent) + '. Pista: es “' + esc(correcta.rol.toLowerCase()) + '”.';
        setTimeout(function () { ficha.classList.remove('mal'); }, 900);
      }
      seleccion = null;
      APP.$$('.ficha', el).forEach(function (f2) { if (!f2.disabled) f2.setAttribute('aria-pressed', 'false'); });
    }
    function enlazar(total) {
      APP.$$('[data-fichas] .ficha', el).forEach(function (fi) {
        fi.addEventListener('click', function () {
          if (fi.disabled) return;
          seleccion = seleccion === fi ? null : fi;
          APP.$$('.ficha', el).forEach(function (o) { if (!o.disabled) o.setAttribute('aria-pressed', o === seleccion); });
        });
        fi.addEventListener('dragstart', function (e) { arrastrando = fi; try { e.dataTransfer.setData('text/plain', fi.getAttribute('data-i')); } catch (x) {} });
        fi.addEventListener('dragend', function () { arrastrando = null; });
      });
      APP.$$('[data-zona]', el).forEach(function (z) {
        z.addEventListener('click', function (e) {
          if (e.target.closest('.ficha')) return;
          if (seleccion) colocar(seleccion, z, total);
          else APP.$('[data-msg]', el).textContent = 'Primero elige una función de la lista.';
        });
        z.addEventListener('dragover', function (e) { e.preventDefault(); z.classList.add('sobre'); });
        z.addEventListener('dragleave', function () { z.classList.remove('sobre'); });
        z.addEventListener('drop', function (e) { e.preventDefault(); z.classList.remove('sobre'); if (arrastrando) colocar(arrastrando, z, total); });
      });
      APP.$('[data-reiniciar]', el).addEventListener('click', iniciar);
    }
    iniciar();
  };

  /* =================================================================
     8. Gráficos (SVG propio, sin librerías)
     ================================================================= */
  function barrasH(el, cfg) {
    // cfg: {titulo, fuente, filas:[{etiqueta, valor, destacar, texto}], max, ancho}
    // El ancho del dibujo se ajusta al espacio real, para que el texto se lea a 15 px también en celular.
    var disponible = (el.clientWidth || (el.parentNode && el.parentNode.clientWidth) || 640) - 34;
    var filas = cfg.filas, ancho = Math.max(300, Math.min(640, disponible)), izq = cfg.izq || 110, der = 70, alto = 34, sep = 12, arriba = 8;
    var H = arriba + filas.length * (alto + sep);
    var max = cfg.max || Math.max.apply(null, filas.map(function (x) { return x.valor; }));
    var util = ancho - izq - der;
    var svg = '<svg viewBox="0 0 ' + ancho + ' ' + H + '" role="img" aria-label="' + esc(cfg.titulo + ': ' + filas.map(function (x) { return x.texto; }).join('; ')) + '" width="' + ancho + '" height="' + H + '" style="max-width:100%;height:auto">';
    svg += '<line class="eje" x1="' + izq + '" y1="0" x2="' + izq + '" y2="' + (H - sep / 2) + '" stroke-width="1"/>';
    filas.forEach(function (x, i) {
      var y = arriba + i * (alto + sep), w = Math.max(8, util * x.valor / max);
      svg += '<g data-tip="' + esc(x.texto) + '">';
      if (cfg.pista) svg += '<rect x="' + izq + '" y="' + y + '" width="' + util + '" height="' + alto + '" rx="4" fill="var(--superficie-2)"/>';
      // Barra con extremo redondeado de 4px anclada al eje
      svg += '<path class="barra' + (x.destacar ? ' destacada' : '') + '" d="M' + izq + ' ' + y + 'h' + (w - 4) + 'a4 4 0 0 1 4 4v' + (alto - 8) + 'a4 4 0 0 1 -4 4h-' + (w - 4) + 'z"/>';
      svg += '<text x="' + (izq - 10) + '" y="' + (y + alto / 2 + 5) + '" text-anchor="end" font-size="15"' + (x.destacar ? ' font-weight="700"' : ' class="sec"') + '>' + esc(x.etiqueta) + '</text>';
      svg += '<text x="' + (izq + w + 8) + '" y="' + (y + alto / 2 + 5) + '" font-size="15" font-weight="700">' + esc(x.valorTexto) + '</text>';
      svg += '<rect class="zona-hover" x="0" y="' + (y - sep / 2) + '" width="' + ancho + '" height="' + (alto + sep) + '"/>';
      svg += '</g>';
    });
    svg += '</svg>';
    var tabla = '<details class="acordeon no-imprimir"><summary>Ver como tabla</summary><div class="cuerpo"><table><thead><tr><th scope="col">' + esc(cfg.colEtiqueta) + '</th><th scope="col" class="num">' + esc(cfg.colValor) + '</th></tr></thead><tbody>' +
      filas.map(function (x) { return '<tr><td>' + esc(x.etiqueta) + '</td><td class="num">' + esc(x.valorTexto) + '</td></tr>'; }).join('') + '</tbody></table></div></details>';
    el.className = 'widget';
    el.innerHTML = '<figure class="grafico" style="margin:0"><h4 style="margin:0 0 8px">' + esc(cfg.titulo) + '</h4>' + svg + '<figcaption>Fuente: ' + esc(cfg.fuente) + '</figcaption></figure>' + tabla;
    APP.$$('g[data-tip]', el).forEach(function (g) {
      g.addEventListener('mousemove', function (e) { APP.tooltip.mostrar(g.getAttribute('data-tip'), e.clientX, e.clientY); });
      g.addEventListener('mouseleave', APP.tooltip.ocultar);
    });
  }

  W.graficoPaises = function (el) {
    var g = C.graficos.paises;
    barrasH(el, {
      titulo: g.titulo, fuente: g.fuente, colEtiqueta: 'País', colValor: 'Crecimiento 2025',
      filas: g.datos.map(function (d) {
        return { etiqueta: d.pais, valor: d.valor, destacar: d.destacar, valorTexto: f(d.valor, 1) + ' %', texto: d.pais + ': ' + f(d.valor, 1) + ' %' + (d.valor === 14.4 ? ' (comparten el 1.er lugar)' : '') };
      })
    });
  };

  W.graficoMypes = function (el) {
    var g = C.graficos.mypes;
    barrasH(el, {
      titulo: g.titulo, fuente: g.fuente, colEtiqueta: 'Indicador', colValor: 'Porcentaje', max: 100, pista: true, izq: 130,
      filas: g.datos.map(function (d, i) {
        return { etiqueta: i === 0 ? 'N.º empresas' : 'Valor exportado', valor: d.valor, destacar: true, valorTexto: f(d.valor, d.valor % 1 ? 1 : 0) + ' %', texto: f(d.valor, d.valor % 1 ? 1 : 0) + ' % ' + d.etiqueta };
      })
    });
    var nota = document.createElement('p');
    nota.innerHTML = '<b>Lectura:</b> las mypes son el 73 % de las empresas exportadoras (más de 6 700), pero generan solo el 5,6 % del valor exportado. La barra gris es el 100 %.';
    el.appendChild(nota);
  };
})(window.APP);
