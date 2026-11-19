/*
 * RENDER: convierte los bloques de data/contenido.js en HTML.
 * Los widgets interactivos se dejan como marcadores <div data-widget>
 * y luego se "montan" con APP.montar(raiz).
 */
(function (APP) {
  'use strict';
  var C = window.CONTENIDO;
  var esc = APP.esc, ico = APP.icono;

  var ICONO_ANGULO = { normativo: 'balanza', economico: 'tendencia', contable: 'documento' };
  APP.ICONO_ANGULO = ICONO_ANGULO;
  var ICONO_CAJA = { ojo: 'alerta', ejemplo: 'foco', caso: 'balanza', pregunta: 'info', consejo: 'estrella' };

  var contadorId = 0;
  function nuevoId(pref) { contadorId++; return (pref || 'id') + '-' + contadorId; }

  function bloques(lista) {
    return (lista || []).map(bloque).join('');
  }

  function tabla(b) {
    var cols = b.cabecera || [];
    var apilable = cols.length >= 3 ? ' apilable' : '';
    var h = '<div class="tabla-envoltura"><table class="' + (b.clase || '') + apilable + '">';
    if (cols.length) {
      h += '<thead><tr>' + cols.map(function (c) { return '<th scope="col">' + c + '</th>'; }).join('') + '</tr></thead>';
    }
    h += '<tbody>' + b.filas.map(function (f) {
      return '<tr>' + f.map(function (celda, i) {
        return '<td data-col="' + esc(APP.textoPlano(cols[i] || '')) + '">' + celda + '</td>';
      }).join('') + '</tr>';
    }).join('') + '</tbody></table></div>';
    if (b.nota) h += '<p class="muted"><small>' + b.nota + '</small></p>';
    return h;
  }

  function caja(tipo, titulo, html) {
    return '<div class="caja ' + tipo + '"><div class="titulo-caja">' + ico(ICONO_CAJA[tipo] || 'info') + '<span>' + esc(titulo || '') + '</span></div><div>' + html + '</div></div>';
  }

  function angulos(b) {
    var id = nuevoId('ang');
    var claves = ['normativo', 'economico', 'contable'].filter(function (k) { return b[k] && b[k].length; });
    var h = '<div class="angulos" data-pestanas>';
    h += '<div class="pestanas" role="tablist" aria-label="Los tres ángulos de análisis">';
    claves.forEach(function (k, i) {
      var a = C.angulos[k];
      h += '<button role="tab" type="button" id="' + id + '-t-' + k + '" aria-controls="' + id + '-p-' + k + '" aria-selected="' + (i === 0) + '" tabindex="' + (i === 0 ? '0' : '-1') + '" data-angulo="' + k + '">' + ico(ICONO_ANGULO[k]) + '<span class="nombre-largo">' + esc(a.nombre) + '</span><span class="nombre-corto" aria-hidden="true">' + esc(a.nombre.split('-')[0]) + '</span></button>';
    });
    h += '</div>';
    claves.forEach(function (k, i) {
      var a = C.angulos[k];
      h += '<div class="panel-angulo" role="tabpanel" id="' + id + '-p-' + k + '" aria-labelledby="' + id + '-t-' + k + '" data-angulo="' + k + '" tabindex="0"' + (i === 0 ? '' : ' hidden') + '>';
      h += '<h3 class="titulo-impresion">Ángulo ' + esc(a.nombre.toLowerCase()) + '</h3>';
      h += '<p class="pregunta-angulo">' + esc(a.pregunta) + '</p>' + bloques(b[k]) + '</div>';
    });
    return h + '</div>';
  }

  function bloque(b) {
    switch (b.t) {
      case 'h': return '<h2>' + esc(b.texto) + '</h2>';
      case 'p': return '<p>' + b.html + '</p>';
      case 'lista': return '<ul>' + b.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ul>';
      case 'pasos': return '<ol>' + b.items.map(function (i) { return '<li>' + i + '</li>'; }).join('') + '</ol>';
      case 'cifras':
        return '<div class="cifras">' + b.items.map(function (c) {
          return '<div class="cifra"><span class="valor">' + esc(c.valor) + '</span><span class="etiqueta">' + esc(c.etiqueta) + '</span></div>';
        }).join('') + '</div>';
      case 'tabla': return tabla(b);
      case 'formula': return '<div class="formula" role="note" aria-label="Fórmula">' + b.html + '</div>';
      case 'caja': return caja(b.tipo, b.titulo, b.html);
      case 'tarjetas':
        return '<div class="tarjetas">' + b.items.map(function (t) {
          return '<div class="t ' + (t.tono || '') + '"><h4>' + esc(t.titulo) + '</h4><p>' + t.html + '</p></div>';
        }).join('') + '</div>';
      case 'angulos': return angulos(b);
      case 'widget': return '<div data-widget="' + esc(b.w) + '"></div>';
      case 'tresAngulos': return tresAngulos();
      case 'mapaModulos': return mapaModulos();
      case 'preguntasProbables': return preguntasProbables();
      case 'ojo': return C.ojo.map(function (o) { return caja('ojo', o.titulo, o.html); }).join('');
      case 'glosario': return glosario();
      case 'bibliografia': return bibliografia();
      case 'creditos': return creditos();
      default: return '';
    }
  }

  function tresAngulos() {
    return '<div class="tres-angulos">' + ['normativo', 'economico', 'contable'].map(function (k) {
      var a = C.angulos[k];
      return '<div class="a ' + k + '"><h4>' + ico(ICONO_ANGULO[k]) + esc(a.nombre) + '</h4><p><b>' + esc(a.pregunta) + '</b> ' + esc(a.descripcion) + '</p></div>';
    }).join('') + '</div>';
  }

  function mapaModulos() {
    return '<ul class="grilla-modulos">' + C.modulos.filter(function (m) { return m.num > 0; }).map(function (m) {
      return '<li><a href="#/m/' + m.id + '"' + (APP.progreso.completado(m.id) ? ' class="hecho"' : '') + '><span class="num">' + m.num + '</span><span><strong>' + esc(m.tituloCorto) + '</strong></span></a></li>';
    }).join('') + '</ul>';
  }

  function preguntasProbables() {
    return C.preguntasProbables.map(function (q) {
      var m = APP.modulo(q.modulo);
      return '<details class="acordeon"><summary>' + esc(q.p) + '</summary><div class="cuerpo"><p>' + esc(q.r) + '</p>' +
        (m ? '<p><small>Repasa: <a href="#/m/' + m.id + '">Módulo ' + m.num + ' · ' + esc(m.tituloCorto) + '</a></small></p>' : '') + '</div></details>';
    }).join('');
  }

  function glosario() {
    var items = C.glosario.slice().sort(function (a, b) { return a.termino.localeCompare(b.termino, 'es'); });
    var h = '<label for="filtro-glosario" class="sr-only">Filtrar glosario</label>' +
      '<input id="filtro-glosario" class="filtro-glosario no-imprimir" type="search" placeholder="Filtrar términos…" data-filtro-glosario>';
    h += '<dl class="glosario" data-glosario>';
    items.forEach(function (g) {
      var m = APP.modulo(g.modulo);
      h += '<div data-termino="' + esc(APP.normalizar(g.termino + ' ' + g.def)) + '"><dt>' + esc(g.termino) + '</dt><dd>' + esc(g.def) +
        (g.general ? ' <small>(definición general, no está en las fuentes)</small>' : '') +
        (m ? ' <small><a href="#/m/' + m.id + '">→ Módulo ' + m.num + '</a></small>' : '') + '</dd></div>';
    });
    return h + '</dl>';
  }

  function bibliografia() {
    return '<ul class="biblio">' + C.bibliografia.map(function (b) {
      return '<li>' + b.texto + (b.url ? ' <a href="' + esc(b.url) + '" target="_blank" rel="noopener noreferrer">' + esc(b.url) + '</a>' : '') + '</li>';
    }).join('') + '</ul>' +
      '<p class="muted"><small>Las URL se copiaron de las diapositivas; algunas salen cortadas en el PDF (ver PENDIENTES_DE_VERIFICAR.md).</small></p>';
  }

  function creditos() {
    var cfg = window.CONFIG || {};
    return '<p>' + esc(cfg.creditos || '') + '</p>' + (cfg.creditosDetalle ? '<p class="muted">' + esc(cfg.creditosDetalle) + '</p>' : '');
  }

  /* ---------- Página de módulo ---------- */
  APP.renderModulo = function (m) {
    var ms = C.modulos, i = ms.indexOf(m);
    var ant = ms[i - 1], sig = ms[i + 1];
    var dilo = Array.isArray(m.diloAsi) ? m.diloAsi : [m.diloAsi];
    var hecho = APP.progreso.completado(m.id);
    var preguntas = window.PREGUNTAS.filter(function (q) { return q.m === m.id; });

    var h = '<article class="modulo" data-modulo="' + m.id + '">';
    h += '<p class="miga"><a href="#/">Inicio</a> › Módulo ' + m.num + '</p>';
    h += '<div class="cabeza-modulo"><span class="insignia" aria-hidden="true">' + m.num + '</span><div><h1 tabindex="-1">' + esc(m.titulo) + '</h1>' +
      '<p class="fuente-pag">Fuente: ' + esc(m.pag.replace(/\bG p\./, 'guía ampliada p. ').replace(/\bD (\d)/, 'diapositivas $1')) + '</p></div></div>';
    h += '<div class="herramientas-modulo no-imprimir">' +
      '<button class="btn chico" type="button" data-imprimir>' + ico('imprimir') + 'Imprimir / PDF</button>' +
      (preguntas.length ? '<a class="btn chico" href="#practica-' + m.id + '" data-ir-practica>' + ico('examen') + 'Ir a la práctica</a>' : '') +
      '</div>';
    h += '<div class="caja simple"><div class="titulo-caja">' + ico('info') + '<span>En simple</span></div><p>' + m.enSimple + '</p></div>';
    h += bloques(m.bloques);
    h += '<div class="caja dilo"><div class="titulo-caja">' + ico('cita') + '<span>Dilo así</span></div>' + dilo.map(function (d) { return '<blockquote>“' + esc(d) + '”</blockquote>'; }).join('') + '</div>';

    h += '<section class="final-modulo" aria-labelledby="practica-' + m.id + '-t">';
    if (preguntas.length) {
      h += '<h2 id="practica-' + m.id + '-t"><span id="practica-' + m.id + '"></span>Mini-práctica</h2>';
      h += '<div data-widget="quizModulo" data-modulo="' + m.id + '"></div>';
    }
    h += '<div class="fila-botones"><button class="btn ' + (hecho ? '' : 'primario') + '" type="button" data-completar="' + m.id + '" aria-pressed="' + hecho + '">' +
      ico('check') + '<span>' + (hecho ? 'Completado (desmarcar)' : 'Marcar como completado') + '</span></button></div>';
    h += '<nav class="nav-modulos" aria-label="Módulo anterior y siguiente">' +
      (ant ? '<a class="btn" href="#/m/' + ant.id + '">' + ico('izq') + '<span>' + ant.num + '. ' + esc(ant.tituloCorto) + '</span></a>' : '<span></span>') +
      (sig ? '<a class="btn primario" href="#/m/' + sig.id + '"><span>Siguiente: ' + sig.num + '. ' + esc(sig.tituloCorto) + '</span>' + ico('der') + '</a>' : '<a class="btn primario" href="#/examen"><span>Ir al examen final</span>' + ico('der') + '</a>') +
      '</nav>';
    h += '</section></article>';
    return h;
  };

  /* ---------- Montaje de partes interactivas ---------- */
  APP.montar = function (raiz) {
    // Pestañas de ángulos (con teclado: flechas, Inicio, Fin)
    APP.$$('[data-pestanas]', raiz).forEach(function (cont) {
      var tabs = APP.$$('[role="tab"]', cont);
      function activar(tab, enfocar) {
        tabs.forEach(function (t) {
          var sel = t === tab;
          t.setAttribute('aria-selected', sel);
          t.tabIndex = sel ? 0 : -1;
          document.getElementById(t.getAttribute('aria-controls')).hidden = !sel;
        });
        if (enfocar) tab.focus();
      }
      tabs.forEach(function (t, i) {
        t.addEventListener('click', function () { activar(t); });
        t.addEventListener('keydown', function (e) {
          var n = null;
          if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
          else if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
          else if (e.key === 'Home') n = tabs[0];
          else if (e.key === 'End') n = tabs[tabs.length - 1];
          if (n) { e.preventDefault(); activar(n, true); }
        });
      });
    });

    // Filtro del glosario
    APP.$$('[data-filtro-glosario]', raiz).forEach(function (inp) {
      inp.addEventListener('input', function () {
        var q = APP.normalizar(inp.value.trim());
        APP.$$('[data-termino]', raiz).forEach(function (d) {
          d.hidden = q && d.getAttribute('data-termino').indexOf(q) === -1;
        });
      });
    });

    // Widgets
    APP.$$('[data-widget]', raiz).forEach(function (el) {
      var nombre = el.getAttribute('data-widget');
      if (APP.widgets && APP.widgets[nombre]) {
        try { APP.widgets[nombre](el); }
        catch (e) { el.innerHTML = '<p class="muted">No se pudo cargar este componente.</p>'; if (window.console) console.error(nombre, e); }
      }
    });
  };

  /** Abre la pestaña de ángulo que contiene un elemento (para la búsqueda). */
  APP.revelar = function (el) {
    var panel = el.closest && el.closest('.panel-angulo');
    if (panel && panel.hidden) {
      var tab = document.getElementById(panel.getAttribute('aria-labelledby'));
      if (tab) tab.click();
    }
    var det = el.closest && el.closest('details');
    if (det) det.open = true;
  };
})(window.APP);
