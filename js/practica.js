/*
 * PRÁCTICA: cuestionarios por módulo, examen final y flashcards.
 * Las preguntas están en data/preguntas.js.
 */
(function (APP) {
  'use strict';
  var C = window.CONTENIDO, K = window.Calculos;
  var esc = APP.esc, ico = APP.icono;
  var LETRAS = 'ABCDEFGH';

  /* =================================================================
     Motor de cuestionario
     modo 'inmediato': corrige cada pregunta al responder (mini-práctica)
     modo 'examen'   : se responde todo y se califica al final
     ================================================================= */
  APP.crearQuiz = function (el, preguntas, opts) {
    opts = opts || {};
    var modo = opts.modo || 'inmediato';
    var estado = preguntas.map(function (q) {
      var ops = null;
      if (q.tipo === 'mc') ops = APP.mezclar(q.ops.map(function (t, i) { return { t: t, ok: i === q.c }; }));
      return { q: q, ops: ops, resp: null, correcta: null };
    });
    var calificado = false;

    function textoCorrecto(s) {
      var q = s.q;
      if (q.tipo === 'mc') return q.ops[q.c];
      if (q.tipo === 'vf') return q.c ? 'Verdadero' : 'Falso';
      return q.u + ' ' + K.formatear(q.r, q.r % 1 ? 2 : 0);
    }

    function retro(s) {
      var m = APP.modulo(s.q.m);
      var enlace = m ? ' <a href="#/m/' + m.id + '">Repasa el módulo ' + m.num + ' · ' + esc(m.tituloCorto) + '</a>' : '';
      if (s.correcta) return '<div class="retro bien"><strong>' + ico('check', 'width="16" height="16"') + ' Correcto</strong>' + esc(s.q.exp) + '</div>';
      return '<div class="retro mal"><strong>' + ico('x', 'width="16" height="16"') + ' Incorrecto. Respuesta: ' + esc(textoCorrecto(s)) + '</strong>' + esc(s.q.exp) + (opts.conEnlace !== false ? enlace : '') + '</div>';
    }

    function htmlPregunta(s, i) {
      var q = s.q, h = '<div class="pregunta tarjeta" data-i="' + i + '" role="group" aria-labelledby="' + el.id + '-q' + i + '">';
      h += '<p class="numero-preg">Pregunta ' + (i + 1) + ' de ' + estado.length + (q.tipo === 'vf' ? ' · Verdadero o falso' : q.tipo === 'calc' ? ' · Cálculo' : '') + '</p>';
      h += '<p class="enunciado" id="' + el.id + '-q' + i + '">' + esc(q.q) + '</p>';
      if (q.tipo === 'mc') {
        h += '<div class="opciones">' + s.ops.map(function (o, j) {
          return '<button type="button" class="opcion" data-op="' + j + '" aria-pressed="false"><span class="letra" aria-hidden="true">' + LETRAS[j] + '</span><span>' + esc(o.t) + '</span></button>';
        }).join('') + '</div>';
      } else if (q.tipo === 'vf') {
        h += '<div class="opciones" style="grid-template-columns:1fr 1fr"><button type="button" class="opcion" data-vf="true" aria-pressed="false"><span class="letra" aria-hidden="true">V</span><span>Verdadero</span></button>' +
          '<button type="button" class="opcion" data-vf="false" aria-pressed="false"><span class="letra" aria-hidden="true">F</span><span>Falso</span></button></div>';
      } else {
        h += '<div class="respuesta-calc"><label class="sr-only" for="' + el.id + '-in' + i + '">Respuesta en ' + esc(q.u) + '</label><input id="' + el.id + '-in' + i + '" type="text" inputmode="decimal" autocomplete="off" placeholder="Respuesta en ' + esc(q.u) + '">' +
          (modo === 'inmediato' ? '<button type="button" class="btn primario chico" data-comprobar>Comprobar</button>' : '') + '</div>';
      }
      return h + '<div data-retro aria-live="polite"></div></div>';
    }

    function evaluar(s) {
      var q = s.q;
      if (s.resp === null || s.resp === '') return false;
      if (q.tipo === 'mc') return s.ops[s.resp].ok;
      if (q.tipo === 'vf') return s.resp === q.c;
      var n = K.leerNumero(s.resp);
      return !isNaN(n) && Math.abs(n - q.r) <= (q.tol || 0.01);
    }

    function marcarCaja(caja, s) {
      var q = s.q;
      if (q.tipo === 'mc') {
        APP.$$('[data-op]', caja).forEach(function (b, j) {
          b.disabled = true;
          if (s.ops[j].ok) b.classList.add('correcta');
          else if (j === s.resp) b.classList.add('incorrecta');
        });
      } else if (q.tipo === 'vf') {
        APP.$$('[data-vf]', caja).forEach(function (b) {
          var v = b.getAttribute('data-vf') === 'true';
          b.disabled = true;
          if (v === q.c) b.classList.add('correcta');
          else if (v === s.resp) b.classList.add('incorrecta');
        });
      } else {
        var inp = APP.$('input', caja); inp.disabled = true;
        var bt = APP.$('[data-comprobar]', caja); if (bt) bt.disabled = true;
      }
      APP.$('[data-retro]', caja).innerHTML = retro(s);
    }

    function resumen() {
      var ok = estado.filter(function (s) { return s.correcta; }).length;
      var porModulo = {};
      estado.forEach(function (s) {
        if (!s.correcta) porModulo[s.q.m] = (porModulo[s.q.m] || 0) + 1;
      });
      var debiles = Object.keys(porModulo).sort(function (a, b) { return porModulo[b] - porModulo[a]; });
      var h = '<div class="tarjeta aparecer" style="margin-top:12px"><p class="puntaje">' + ok + ' / ' + estado.length + '</p>' +
        '<div class="barra-prog" aria-hidden="true"><span style="width:' + Math.round(ok * 100 / estado.length) + '%"></span></div>' +
        '<p>' + (ok === estado.length ? '¡Perfecto! Dominas este tema.' : ok >= estado.length * 0.7 ? 'Muy bien. Repasa lo que fallaste.' : 'Sigue practicando: revisa los temas débiles.') + '</p>';
      if (debiles.length && opts.mostrarDebiles !== false) {
        h += '<h4>Temas débiles</h4><ul class="temas-debiles">' + debiles.map(function (id) {
          var m = APP.modulo(id);
          return '<li><a href="#/m/' + id + '">Módulo ' + m.num + ' · ' + esc(m.tituloCorto) + '</a> — ' + porModulo[id] + ' error(es)</li>';
        }).join('') + '</ul>';
      }
      h += '<div class="fila-botones"><button type="button" class="btn" data-reintentar>' + ico('repetir') + 'Intentar de nuevo</button></div></div>';
      return { html: h, ok: ok, debiles: debiles };
    }

    function terminar() {
      var r = resumen();
      var fin = APP.$('[data-fin]', el);
      fin.innerHTML = r.html;
      APP.$('[data-reintentar]', fin).addEventListener('click', function () {
        APP.crearQuiz(el, opts.regenerar ? opts.regenerar() : preguntas, opts);
        el.scrollIntoView({ block: 'start' });
      });
      if (opts.alTerminar) opts.alTerminar(r.ok, estado.length, r.debiles);
    }

    function comprobarFin() {
      if (modo === 'inmediato' && estado.every(function (s) { return s.correcta !== null; })) terminar();
    }

    if (!el.id) el.id = 'quiz' + Math.floor(Math.random() * 1e6);
    el.classList.add('quiz');
    el.innerHTML = estado.map(htmlPregunta).join('') +
      (modo === 'examen' ? '<div class="fila-botones"><button type="button" class="btn primario" data-calificar>' + ico('check') + 'Calificar examen</button><span class="muted" data-faltan></span></div>' : '') +
      '<div data-fin aria-live="polite"></div>';

    APP.$$('.pregunta', el).forEach(function (caja) {
      var i = +caja.getAttribute('data-i'), s = estado[i];
      function responder(valor, boton) {
        if (calificado || (modo === 'inmediato' && s.correcta !== null)) return;
        s.resp = valor;
        if (modo === 'inmediato') {
          s.correcta = evaluar(s);
          marcarCaja(caja, s);
          comprobarFin();
        } else {
          APP.$$('.opcion', caja).forEach(function (b) { b.setAttribute('aria-pressed', b === boton); });
          actualizarFaltan();
        }
      }
      APP.$$('[data-op]', caja).forEach(function (b) { b.addEventListener('click', function () { responder(+b.getAttribute('data-op'), b); }); });
      APP.$$('[data-vf]', caja).forEach(function (b) { b.addEventListener('click', function () { responder(b.getAttribute('data-vf') === 'true', b); }); });
      var inp = APP.$('input', caja);
      if (inp) {
        var comprobar = function () {
          if (isNaN(K.leerNumero(inp.value))) { APP.$('[data-retro]', caja).innerHTML = '<div class="retro mal"><strong>Escribe un número.</strong></div>'; return; }
          responder(inp.value);
        };
        if (modo === 'inmediato') {
          APP.$('[data-comprobar]', caja).addEventListener('click', comprobar);
          inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') comprobar(); });
        } else {
          inp.addEventListener('input', function () { s.resp = inp.value.trim(); actualizarFaltan(); });
        }
      }
    });

    function actualizarFaltan() {
      var f = APP.$('[data-faltan]', el);
      if (!f) return;
      var n = estado.filter(function (s) { return s.resp === null || s.resp === ''; }).length;
      f.textContent = n ? 'Faltan ' + n + ' por responder (puedes calificar igual).' : 'Todas respondidas.';
    }
    var bc = APP.$('[data-calificar]', el);
    if (bc) {
      actualizarFaltan();
      bc.addEventListener('click', function () {
        calificado = true;
        estado.forEach(function (s, i) {
          s.correcta = evaluar(s);
          marcarCaja(APP.$('.pregunta[data-i="' + i + '"]', el), s);
        });
        bc.disabled = true;
        terminar();
        APP.$('[data-fin]', el).scrollIntoView({ block: 'center' });
      });
    }
  };

  /* Mini-práctica al final de cada módulo */
  APP.widgets = APP.widgets || {};
  APP.widgets.quizModulo = function (el) {
    var id = el.getAttribute('data-modulo');
    var lista = window.PREGUNTAS.filter(function (q) { return q.m === id; });
    var previo = APP.progreso.quiz(id);
    var cab = document.createElement('p');
    cab.className = 'muted';
    cab.textContent = lista.length + ' preguntas. Se corrigen al responder.' + (previo ? ' Tu mejor resultado: ' + previo.mejor + '/' + previo.total + '.' : '');
    var cont = document.createElement('div');
    cont.id = 'quiz-' + id;
    el.appendChild(cab); el.appendChild(cont);
    APP.crearQuiz(cont, lista, {
      modo: 'inmediato', mostrarDebiles: false, conEnlace: false,
      alTerminar: function (ok, total) {
        APP.progreso.guardarQuiz(id, ok, total);
        if (ok >= Math.ceil(total * 0.6) && !APP.progreso.completado(id)) {
          var fin = APP.$('[data-fin]', cont);
          var p = document.createElement('p');
          p.innerHTML = '¿Listo? Puedes <b>marcar el módulo como completado</b> con el botón de abajo.';
          fin.appendChild(p);
        }
      }
    });
  };

  /* =================================================================
     Examen final (30 preguntas al azar, mezcla de tipos)
     ================================================================= */
  function generarExamen() {
    var n = (window.CONFIG && window.CONFIG.preguntasExamen) || 30;
    var banco = window.PREGUNTAS;
    // Asegura variedad: al menos 1 pregunta de cada módulo con preguntas, y el resto al azar.
    var porModulo = {};
    banco.forEach(function (q) { (porModulo[q.m] = porModulo[q.m] || []).push(q); });
    var elegidas = [];
    Object.keys(porModulo).forEach(function (m) { elegidas.push(APP.mezclar(porModulo[m])[0]); });
    var resto = APP.mezclar(banco.filter(function (q) { return elegidas.indexOf(q) === -1; }));
    // Garantiza al menos 3 de cálculo
    var calcs = resto.filter(function (q) { return q.tipo === 'calc'; });
    while (elegidas.filter(function (q) { return q.tipo === 'calc'; }).length < 3 && calcs.length) {
      var c = calcs.shift(); elegidas.push(c); resto.splice(resto.indexOf(c), 1);
    }
    elegidas = elegidas.concat(resto).slice(0, n);
    return APP.mezclar(elegidas);
  }

  APP.vistaExamen = function (main) {
    var previo = APP.progreso.datos().examen;
    main.innerHTML = '<p class="miga"><a href="#/">Inicio</a> › Práctica</p><h1 tabindex="-1">Examen final</h1>' +
      '<p>' + ((window.CONFIG && window.CONFIG.preguntasExamen) || 30) + ' preguntas al azar de todo el banco (' + window.PREGUNTAS.length + ' preguntas): opción múltiple, verdadero/falso y cálculo. Responde todo y luego pulsa <b>Calificar</b>. Cada error te dice qué módulo repasar.</p>' +
      (previo ? '<div class="caja consejo"><div class="titulo-caja">' + ico('estrella') + '<span>Tu último examen</span></div><p>' + previo.ok + ' / ' + previo.total + ' (' + new Date(previo.fecha).toLocaleDateString('es-PE') + ')</p></div>' : '') +
      '<p class="muted"><small>Para los cálculos puedes escribir “125 949,60” o “125949.60”.</small></p><div id="examen"></div>';
    APP.crearQuiz(APP.$('#examen', main), generarExamen(), {
      modo: 'examen', regenerar: generarExamen,
      alTerminar: function (ok, total) { APP.progreso.guardarExamen({ ok: ok, total: total, fecha: Date.now() }); }
    });
  };

  /* =================================================================
     Flashcards con repetición espaciada simple (cajas de Leitner 1–3)
     ================================================================= */
  function mazos() {
    var cartas = [];
    // Conceptos del marco conceptual
    var mc = APP.modulo('marco-conceptual').bloques.filter(function (b) { return b.t === 'tabla'; })[0];
    mc.filas.forEach(function (f, i) {
      cartas.push({ id: 'con' + i, mazo: 'conceptos', frente: APP.textoPlano(f[0]), reverso: APP.textoPlano(f[1]), extra: APP.textoPlano(f[2]) });
    });
    // Normas
    var mn = APP.modulo('marco-normativo').bloques.filter(function (b) { return b.t === 'angulos'; })[0].normativo.filter(function (b) { return b.t === 'tabla'; })[0];
    mn.filas.forEach(function (f, i) {
      cartas.push({ id: 'nor' + i, mazo: 'normas', frente: '¿Qué regula el ' + APP.textoPlano(f[1]).split('–')[0].trim() + '?', reverso: APP.textoPlano(f[2]), extra: 'Recuerda: ' + APP.textoPlano(f[3]) });
    });
    // Entidades
    C.entidades.forEach(function (e) {
      cartas.push({ id: 'ent-' + e.id, mazo: 'entidades', frente: '¿Qué hace ' + e.nombre + '?', reverso: e.rol + ' (' + e.subtitulo + '): ' + e.funciones.slice(0, 3).join(' '), extra: '' });
    });
    // Glosario
    C.glosario.forEach(function (g, i) {
      cartas.push({ id: 'glo' + i, mazo: 'glosario', frente: g.termino, reverso: g.def, extra: '' });
    });
    return cartas;
  }

  APP.vistaFlashcards = function (main) {
    var todas = mazos();
    var nombres = { todas: 'Todas', conceptos: 'Conceptos (7)', normas: 'Normas (6)', entidades: 'Entidades (4)', glosario: 'Glosario' };
    var mazo = APP.leerPref('rpe-mazo') || 'conceptos';
    if (!nombres[mazo]) mazo = 'conceptos';
    var cola = [], actual = null, volteada = false;

    main.innerHTML = '<p class="miga"><a href="#/">Inicio</a> › Práctica</p><h1 tabindex="-1">Flashcards</h1>' +
      '<p>Toca la tarjeta para voltearla. Marca <b>“Lo sé”</b> o <b>“Repasar”</b>: las que repasas vuelven pronto; las que sabes suben de caja (1 → 2 → 3). Se guarda en este navegador.</p>' +
      '<div class="filtros" role="group" aria-label="Mazo"><span class="rotulo">Mazo:</span>' + Object.keys(nombres).map(function (k) {
        return '<button type="button" class="btn chico" data-mazo="' + k + '" aria-pressed="' + (k === mazo) + '">' + nombres[k] + '</button>';
      }).join('') + '</div>' +
      '<div class="cajas-leitner" data-cajas aria-live="polite"></div>' +
      '<div class="flash" data-flash></div>' +
      '<div class="fila-botones" style="justify-content:center" data-acciones>' +
      '<button type="button" class="btn" data-repasar>' + ico('repetir') + 'Repasar</button>' +
      '<button type="button" class="btn primario" data-se>' + ico('check') + 'Lo sé</button></div>' +
      '<p class="muted" style="text-align:center"><small>Teclado: Espacio voltea · ← repasar · → lo sé</small></p>';

    var zona = APP.$('[data-flash]', main), cajas = APP.$('[data-cajas]', main);

    function delMazo() { return todas.filter(function (c) { return mazo === 'todas' || c.mazo === mazo; }); }
    function caja(c) { return APP.progreso.flash()[c.id] || 0; }

    function pintarCajas() {
      var l = delMazo(), n = [0, 0, 0, 0];
      l.forEach(function (c) { n[caja(c)]++; });
      cajas.innerHTML = '<span>Nuevas: ' + n[0] + '</span><span>Caja 1: ' + n[1] + '</span><span>Caja 2: ' + n[2] + '</span><span>Dominadas (caja 3): ' + n[3] + '</span><span>En esta ronda: ' + cola.length + '</span>';
    }

    function nuevaRonda(incluirDominadas) {
      var l = delMazo().filter(function (c) { return incluirDominadas || caja(c) < 3; });
      // Primero las de caja más baja (las que más cuestan)
      cola = APP.mezclar(l).sort(function (a, b) { return caja(a) - caja(b); });
      siguiente();
    }

    function siguiente() {
      volteada = false;
      actual = cola.shift() || null;
      APP.$('[data-acciones]', main).hidden = !actual;
      if (!actual) {
        zona.innerHTML = '<div class="tarjeta" style="text-align:center"><p style="font-size:1.2rem;font-weight:700">¡Ronda terminada!</p><p>Todas las tarjetas de este mazo están en la caja 3 o ya las viste.</p>' +
          '<div class="fila-botones" style="justify-content:center"><button type="button" class="btn primario" data-otra>Repasar todo el mazo otra vez</button></div></div>';
        APP.$('[data-otra]', zona).addEventListener('click', function () { nuevaRonda(true); });
        pintarCajas();
        return;
      }
      zona.innerHTML = '<button type="button" class="flash-carta" aria-label="Tarjeta: ' + esc(actual.frente) + '. Pulsa para voltear.">' +
        '<span class="flash-cara"><span class="tipo-carta">' + esc(nombres[actual.mazo] ? nombres[actual.mazo].replace(/\s*\(\d+\)/, '') : '') + ' · ' + (caja(actual) ? 'caja ' + caja(actual) : 'nueva') + '</span><span class="texto-carta">' + esc(actual.frente) + '</span><small style="margin-top:12px">Toca para ver la respuesta</small></span>' +
        '<span class="flash-cara reverso" aria-hidden="true"><span class="texto-carta">' + esc(actual.reverso) + '</span>' + (actual.extra ? '<small style="margin-top:10px">' + esc(actual.extra) + '</small>' : '') + '</span></button>';
      var carta = APP.$('.flash-carta', zona);
      carta.addEventListener('click', voltear);
      pintarCajas();
    }

    function voltear() {
      var carta = APP.$('.flash-carta', zona);
      if (!carta) return;
      volteada = !volteada;
      carta.classList.toggle('volteada', volteada);
      var caras = APP.$$('.flash-cara', carta);
      caras[0].setAttribute('aria-hidden', volteada);
      caras[1].setAttribute('aria-hidden', !volteada);
      carta.setAttribute('aria-label', volteada ? 'Respuesta: ' + actual.reverso : 'Tarjeta: ' + actual.frente + '. Pulsa para voltear.');
    }

    function responder(sabe) {
      if (!actual) return;
      var c = caja(actual);
      if (sabe) APP.progreso.guardarFlash(actual.id, Math.min(3, c + 1)); // sube una caja
      else {
        APP.progreso.guardarFlash(actual.id, 1);
        cola.splice(Math.min(3, cola.length), 0, actual); // vuelve pronto
      }
      siguiente();
      var nueva = APP.$('.flash-carta', zona); if (nueva) nueva.focus();
    }

    APP.$('[data-se]', main).addEventListener('click', function () { responder(true); });
    APP.$('[data-repasar]', main).addEventListener('click', function () { responder(false); });
    APP.$$('[data-mazo]', main).forEach(function (b) {
      b.addEventListener('click', function () {
        mazo = b.getAttribute('data-mazo'); APP.guardarPref('rpe-mazo', mazo);
        APP.$$('[data-mazo]', main).forEach(function (o) { o.setAttribute('aria-pressed', o === b); });
        nuevaRonda(false);
      });
    });
    APP.teclasVista = function (e) {
      if (e.target && /INPUT|TEXTAREA|SELECT/.test(e.target.tagName)) return;
      if (e.key === ' ' && !(e.target && e.target.classList && e.target.classList.contains('flash-carta'))) { e.preventDefault(); voltear(); }
      else if (e.key === 'ArrowRight') responder(true);
      else if (e.key === 'ArrowLeft') responder(false);
    };
    nuevaRonda(false);
  };
})(window.APP);
