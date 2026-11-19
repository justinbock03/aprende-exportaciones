/*
 * UTILIDADES comunes: íconos SVG, escape de HTML, guardado de progreso.
 * Todo cuelga de window.APP para no ensuciar el espacio global.
 */
window.APP = window.APP || {};

(function (APP) {
  'use strict';

  /* ---------- Íconos (SVG en línea, sin recursos externos) ---------- */
  var P = {
    menu: '<path d="M3 6h18M3 12h18M3 18h18"/>',
    buscar: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    sol: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    luna: '<path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/>',
    inicio: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
    libro: '<path d="M4 4h10a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M4 16a4 4 0 0 1 4-4h10"/>',
    check: '<path d="M20 6L9 17l-5-5"/>',
    x: '<path d="M18 6L6 18M6 6l12 12"/>',
    alerta: '<path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18h.01"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7h.01"/>',
    balanza: '<path d="M12 3v18M5 21h14M6 7h12"/><path d="M6 7l-3 7a3 3 0 0 0 6 0z"/><path d="M18 7l-3 7a3 3 0 0 0 6 0z"/>',
    tendencia: '<path d="M3 17l6-6 4 4 8-8"/><path d="M15 7h6v6"/>',
    documento: '<path d="M6 2h9l5 5v15H6z"/><path d="M14 2v6h6M9 13h8M9 17h8"/>',
    foco: '<path d="M9 18h6M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>',
    cita: '<path d="M7 7h4v4c0 3-2 5-4 6M15 7h4v4c0 3-2 5-4 6"/>',
    imprimir: '<path d="M6 9V3h12v6"/><rect x="3" y="9" width="18" height="8" rx="2"/><path d="M6 14h12v7H6z"/>',
    izq: '<path d="M15 18l-6-6 6-6"/>',
    der: '<path d="M9 18l6-6-6-6"/>',
    calculadora: '<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M8 6h8M8 11h.01M12 11h.01M16 11h.01M8 15h.01M12 15h.01M16 15h.01M8 19h.01M12 19h.01M16 19h.01"/>',
    tarjetas: '<rect x="3" y="6" width="14" height="14" rx="2"/><path d="M7 2h12a2 2 0 0 1 2 2v12"/>',
    pizarra: '<rect x="2" y="3" width="20" height="13" rx="2"/><path d="M8 21l4-5 4 5"/>',
    examen: '<path d="M9 2h6v4H9z"/><path d="M8 4H5v18h14V4h-3"/><path d="M8 12l2 2 4-4M8 18h8"/>',
    brujula: '<circle cx="12" cy="12" r="9"/><path d="M15.5 8.5l-2 5-5 2 2-5z"/>',
    tabla: '<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 10h18M9 4v16"/>',
    lupa: '<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/>',
    edificio: '<path d="M3 21h18M5 21V8l7-5 7 5v13"/><path d="M9 21v-6h6v6M9 11h.01M15 11h.01"/>',
    caja: '<path d="M21 8l-9-5-9 5 9 5z"/><path d="M3 8v8l9 5 9-5V8M12 13v8"/>',
    reloj: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>',
    repetir: '<path d="M4 4v6h6"/><path d="M20 20v-6h-6"/><path d="M20 10a8 8 0 0 0-14-4L4 10M4 14a8 8 0 0 0 14 4l2-4"/>',
    estrella: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z"/>',
    menuPuntos: '<circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/>'
  };

  APP.icono = function (nombre, extra) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"' + (extra ? ' ' + extra : '') + '>' + (P[nombre] || '') + '</svg>';
  };

  /** Escapa texto para insertarlo como HTML. */
  APP.esc = function (s) {
    return String(s === undefined || s === null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
  };

  /** Quita etiquetas HTML (para búsqueda y textos planos). */
  APP.textoPlano = function (html) {
    return String(html || '').replace(/<br\s*\/?>/gi, ' ').replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  };

  /** Normaliza para buscar sin tildes ni mayúsculas. */
  APP.normalizar = function (s) {
    return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  };

  /** Mezcla una copia de la lista (Fisher-Yates). */
  APP.mezclar = function (lista) {
    var a = lista.slice();
    for (var i = a.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var t = a[i]; a[i] = a[j]; a[j] = t;
    }
    return a;
  };

  APP.$ = function (sel, raiz) { return (raiz || document).querySelector(sel); };
  APP.$$ = function (sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); };

  APP.modulo = function (id) {
    var ms = window.CONTENIDO.modulos;
    for (var i = 0; i < ms.length; i++) if (ms[i].id === id) return ms[i];
    return null;
  };

  /* ---------- Almacenamiento seguro (localStorage puede fallar) ---------- */
  var CLAVE = (window.CONFIG && window.CONFIG.claveAlmacen) || 'rpe-progreso-v1';
  var memoria = null; // copia en memoria por si el navegador bloquea el almacenamiento

  function leer() {
    if (memoria) return memoria;
    var base = { completados: {}, quiz: {}, flash: {}, examen: null };
    try {
      var s = localStorage.getItem(CLAVE);
      if (s) {
        var o = JSON.parse(s);
        base.completados = o.completados || {};
        base.quiz = o.quiz || {};
        base.flash = o.flash || {};
        base.examen = o.examen || null;
      }
    } catch (e) { /* sin almacenamiento: se usa solo la memoria */ }
    memoria = base;
    return memoria;
  }
  function guardar() {
    try { localStorage.setItem(CLAVE, JSON.stringify(memoria)); } catch (e) { /* ignorar */ }
  }

  APP.progreso = {
    datos: leer,
    completado: function (id) { return !!leer().completados[id]; },
    marcar: function (id, valor) {
      var d = leer();
      if (valor) d.completados[id] = true; else delete d.completados[id];
      guardar();
      document.dispatchEvent(new CustomEvent('progreso'));
    },
    guardarQuiz: function (id, aciertos, total) {
      var d = leer();
      var previo = d.quiz[id];
      d.quiz[id] = { ultimo: aciertos, total: total, mejor: Math.max(aciertos, previo ? previo.mejor : 0) };
      guardar();
      document.dispatchEvent(new CustomEvent('progreso'));
    },
    quiz: function (id) { return leer().quiz[id] || null; },
    guardarExamen: function (res) { leer().examen = res; guardar(); },
    flash: function () { return leer().flash; },
    guardarFlash: function (id, caja) { leer().flash[id] = caja; guardar(); },
    reiniciar: function () {
      memoria = { completados: {}, quiz: {}, flash: {}, examen: null };
      guardar();
      document.dispatchEvent(new CustomEvent('progreso'));
    },
    porcentaje: function () {
      var ms = window.CONTENIDO.modulos, n = 0;
      ms.forEach(function (m) { if (leer().completados[m.id]) n++; });
      return { hechos: n, total: ms.length, pct: Math.round(n * 100 / ms.length) };
    }
  };

  APP.guardarPref = function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} };
  APP.leerPref = function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } };

  /* ---------- Tooltip compartido (gráficos) ---------- */
  APP.tooltip = {
    mostrar: function (texto, x, y) {
      var t = document.getElementById('tooltip');
      if (!t) return;
      t.textContent = texto;
      t.hidden = false;
      var w = t.offsetWidth, h = t.offsetHeight;
      var left = Math.min(window.innerWidth - w - 8, Math.max(8, x - w / 2));
      var top = y - h - 12; if (top < 8) top = y + 16;
      t.style.left = left + 'px'; t.style.top = top + 'px';
    },
    ocultar: function () { var t = document.getElementById('tooltip'); if (t) t.hidden = true; }
  };
})(window.APP);
