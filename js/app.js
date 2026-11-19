/*
 * APLICACIÓN: navegación por "#/ruta", menú, inicio, buscador,
 * progreso, modo exposición, tema claro/oscuro e impresión.
 *
 * Rutas:
 *   #/                 inicio
 *   #/m/<id>?q=texto   módulo (q resalta un texto buscado)
 *   #/herramientas     calculadoras, selector y comparador juntos
 *   #/flashcards       tarjetas de repaso
 *   #/examen           examen final
 *   #/exposicion       modo exposición
 *   #/buscar?q=texto   resultados de búsqueda
 */
(function (APP) {
  'use strict';
  var C = window.CONTENIDO, CFG = window.CONFIG || {};
  var esc = APP.esc, ico = APP.icono;
  var main = document.getElementById('contenido');

  /* ---------- Marco fijo: íconos, menú, pie ---------- */
  function iniciarMarco() {
    APP.$('#btn-menu').innerHTML = ico('menu');
    APP.$('#icono-buscar').innerHTML = ico('buscar');
    APP.$('#btn-buscar-movil').innerHTML = ico('buscar');
    APP.$('#titulo-sitio').textContent = CFG.tituloCorto || 'Promoción de Exportaciones';
    pintarBotonTema();

    APP.$('#barra-inferior').innerHTML =
      '<a href="#/" data-ruta="inicio">' + ico('inicio') + '<span>Inicio</span></a>' +
      '<button type="button" data-abrir-menu aria-controls="lateral">' + ico('libro') + '<span>Módulos</span></button>' +
      '<a href="#/herramientas" data-ruta="herramientas">' + ico('calculadora') + '<span>Calcular</span></a>' +
      '<a href="#/examen" data-ruta="examen">' + ico('examen') + '<span>Practicar</span></a>' +
      '<a href="#/exposicion" data-ruta="exposicion">' + ico('pizarra') + '<span>Exponer</span></a>';

    APP.$('#pie').innerHTML = '<p><b>' + esc(CFG.aviso || '') + '</b></p><p>' + esc(CFG.creditos || '') + ' · Sin cookies ni seguimiento: tu progreso se guarda solo en este navegador.</p>';

    APP.$('#btn-menu').addEventListener('click', function () { menu(!APP.$('#lateral').classList.contains('abierto')); });
    APP.$('[data-abrir-menu]').addEventListener('click', function () { menu(true); });
    APP.$('#velo').addEventListener('click', function () { menu(false); });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && APP.$('#lateral').classList.contains('abierto')) { menu(false); APP.$('#btn-menu').focus(); }
      if (APP.teclasVista) APP.teclasVista(e);
    });
    APP.$('#btn-tema').addEventListener('click', cambiarTema);
    APP.$('#form-buscar').addEventListener('submit', function (e) {
      e.preventDefault();
      var q = APP.$('#campo-buscar').value.trim();
      if (q) location.hash = '#/buscar?q=' + encodeURIComponent(q);
    });
    APP.$('#btn-buscar-movil').addEventListener('click', function () { location.hash = '#/buscar'; });

    // Acciones dentro del contenido (delegadas)
    main.addEventListener('click', function (e) {
      var t = e.target.closest('[data-completar],[data-imprimir],[data-ir-practica],[data-reiniciar-progreso]');
      if (!t) return;
      if (t.hasAttribute('data-completar')) {
        var id = t.getAttribute('data-completar');
        var nuevo = !APP.progreso.completado(id);
        APP.progreso.marcar(id, nuevo);
        t.setAttribute('aria-pressed', nuevo);
        t.classList.toggle('primario', !nuevo);
        t.querySelector('span').textContent = nuevo ? 'Completado (desmarcar)' : 'Marcar como completado';
      } else if (t.hasAttribute('data-imprimir')) {
        window.print();
      } else if (t.hasAttribute('data-ir-practica')) {
        e.preventDefault();
        var dest = document.getElementById(t.getAttribute('href').slice(1));
        if (dest) dest.parentNode.scrollIntoView({ behavior: movimientoReducido() ? 'auto' : 'smooth' });
      } else if (t.hasAttribute('data-reiniciar-progreso')) {
        if (window.confirm('¿Borrar tu progreso, resultados y flashcards guardados en este navegador?')) { APP.progreso.reiniciar(); router(); }
      }
    });
    document.addEventListener('progreso', function () { pintarLateral(); pintarProgresoMini(); });
  }

  function movimientoReducido() {
    return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  function menu(abrir) {
    APP.$('#lateral').classList.toggle('abierto', abrir);
    APP.$('#velo').classList.toggle('visible', abrir);
    APP.$('#btn-menu').setAttribute('aria-expanded', abrir);
    APP.$('#btn-menu').setAttribute('aria-label', abrir ? 'Cerrar menú de módulos' : 'Abrir menú de módulos');
    if (abrir) { var a = APP.$('#lateral a[aria-current="page"]') || APP.$('#lateral a'); if (a) a.focus(); }
  }

  /* ---------- Tema claro/oscuro ---------- */
  function temaActual() {
    var t = document.documentElement.getAttribute('data-theme');
    if (t) return t;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }
  function pintarBotonTema() {
    var oscuro = temaActual() === 'dark';
    var b = APP.$('#btn-tema');
    b.innerHTML = ico(oscuro ? 'sol' : 'luna');
    b.setAttribute('aria-label', oscuro ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro');
  }
  function cambiarTema() {
    var nuevo = temaActual() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nuevo);
    APP.guardarPref('rpe-tema', nuevo);
    pintarBotonTema();
  }

  /* ---------- Menú lateral ---------- */
  function pintarLateral(rutaActual) {
    if (rutaActual !== undefined) pintarLateral.ruta = rutaActual;
    var r = pintarLateral.ruta || '';
    var p = APP.progreso.porcentaje();
    var h = '<a href="#/"' + (r === 'inicio' ? ' aria-current="page"' : '') + '>' + ico('inicio', 'width="18" height="18"') + 'Inicio</a>';
    h += '<h2>Módulos</h2><div class="barra-prog" aria-hidden="true"><span style="width:' + p.pct + '%"></span></div>' +
      '<p class="muted" style="margin:2px 10px 6px;font-size:.8rem">' + p.hechos + ' de ' + p.total + ' completados</p>';
    C.modulos.forEach(function (m) {
      var hecho = APP.progreso.completado(m.id);
      h += '<a href="#/m/' + m.id + '"' + (r === 'm/' + m.id ? ' aria-current="page"' : '') + (hecho ? ' class="hecho"' : '') + '>' +
        '<span class="num" aria-hidden="true">' + (hecho ? '✓' : m.num) + '</span><span>' + esc(m.tituloCorto) + (hecho ? '<span class="sr-only"> (completado)</span>' : '') + '</span></a>';
    });
    h += '<h2>Practicar y repasar</h2>' +
      enlace('herramientas', 'calculadora', 'Calculadoras y selector', r) +
      '<a href="#/m/caso-practico">' + ico('documento', 'width="18" height="18"') + 'Caso práctico guiado</a>' +
      enlace('flashcards', 'tarjetas', 'Flashcards', r) +
      enlace('examen', 'examen', 'Examen final (30)', r) +
      enlace('exposicion', 'pizarra', 'Modo exposición', r) +
      enlace('buscar', 'buscar', 'Buscar', r);
    APP.$('#lateral').innerHTML = h;
    APP.$$('#lateral a').forEach(function (a) { a.addEventListener('click', function () { if (window.innerWidth < 1024) menu(false); }); });
  }
  function enlace(ruta, icono, texto, r) {
    return '<a href="#/' + ruta + '"' + (r === ruta ? ' aria-current="page"' : '') + '>' + ico(icono, 'width="18" height="18"') + esc(texto) + '</a>';
  }
  function pintarProgresoMini() {
    var p = APP.progreso.porcentaje();
    APP.$('#progreso-mini').textContent = 'Progreso: ' + p.pct + ' %';
  }

  /* ---------- Vistas ---------- */
  function vistaInicio() {
    var p = APP.progreso.porcentaje();
    var siguiente = C.modulos.filter(function (m) { return !APP.progreso.completado(m.id); })[0] || C.modulos[0];
    var ex = APP.progreso.datos().examen;
    var h = '<section class="hero"><h1 tabindex="-1">Régimen de Promoción de Exportaciones en el Perú</h1>' +
      '<p>Aprende, practica y repasa el tema desde cero: Drawback, saldo a favor del exportador, admisión temporal y Exporta Fácil, con sus tres ángulos (normativo, económico-operativo y contable).</p>' +
      '<div class="barra-prog" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + p.pct + '" aria-label="Progreso general"><span style="width:' + p.pct + '%"></span></div>' +
      '<p style="margin-top:6px"><small style="color:#fff;opacity:.9">' + p.hechos + ' de ' + p.total + ' módulos completados</small></p>' +
      '<div class="fila-botones"><a class="btn" href="#/m/' + siguiente.id + '">' + (p.hechos ? 'Continuar: ' : 'Empezar: ') + esc(siguiente.tituloCorto) + ' ' + ico('der', 'width="18" height="18"') + '</a>' +
      '<a class="btn secundario" href="#/exposicion">' + ico('pizarra', 'width="18" height="18"') + 'Repaso rápido para exponer</a></div></section>';

    h += '<h2>Módulos</h2><ul class="grilla-modulos">' + C.modulos.map(function (m) {
      var q = APP.progreso.quiz(m.id);
      return '<li><a href="#/m/' + m.id + '"' + (APP.progreso.completado(m.id) ? ' class="hecho"' : '') + '><span class="num" aria-hidden="true">' + (APP.progreso.completado(m.id) ? '✓' : m.num) + '</span>' +
        '<span><strong>' + esc(m.titulo) + '</strong><small>' + (APP.progreso.completado(m.id) ? 'Completado' : 'Módulo ' + m.num) + (q ? ' · práctica ' + q.mejor + '/' + q.total : '') + '</small></span></a></li>';
    }).join('') + '</ul>';

    h += '<h2>Practicar</h2><div class="herramientas">' +
      tarjetaHerr('#/herramientas', 'calculadora', 'Calculadoras', 'Drawback y saldo a favor paso a paso.') +
      tarjetaHerr('#/m/caso-practico', 'documento', 'Caso guiado', 'Textiles Andinos: calcula tú cada paso.') +
      tarjetaHerr('#/herramientas#selector', 'brujula', '¿Qué me conviene?', 'Asistente para elegir el instrumento.') +
      tarjetaHerr('#/flashcards', 'tarjetas', 'Flashcards', 'Conceptos, normas, entidades y glosario.') +
      tarjetaHerr('#/examen', 'examen', 'Examen final', '30 preguntas al azar' + (ex ? ' · último: ' + ex.ok + '/' + ex.total : '') + '.') +
      tarjetaHerr('#/exposicion', 'pizarra', 'Modo exposición', 'Frases “Dilo así”, cifras y preguntas probables.') +
      '</div>';
    h += '<div class="caja ojo"><div class="titulo-caja">' + ico('alerta') + '<span>Aviso</span></div><p>' + esc(CFG.aviso || '') + '</p></div>';
    h += '<p class="muted"><small>Tu progreso se guarda solo en este navegador. <button type="button" class="btn chico" data-reiniciar-progreso>Borrar mi progreso</button></small></p>';
    main.innerHTML = h;
  }
  function tarjetaHerr(href, icono, titulo, texto) {
    return '<a href="' + href + '">' + ico(icono) + '<strong>' + esc(titulo) + '</strong><small class="muted">' + esc(texto) + '</small></a>';
  }

  function vistaHerramientas(ancla) {
    main.innerHTML = '<p class="miga"><a href="#/">Inicio</a> › Práctica</p><h1 tabindex="-1">Calculadoras y herramientas</h1>' +
      '<p>Todas las herramientas en un solo lugar. Cada una también aparece dentro de su módulo, junto a la explicación.</p>' +
      '<h2 id="calc-drawback">Calculadora de Drawback</h2><div data-widget="calcDrawback"></div>' +
      '<h2 id="calc-saldo">Calculadora de saldo a favor (SFE / SFMB)</h2><div data-widget="calcSaldo"></div>' +
      '<h2 id="selector">¿Qué instrumento me conviene?</h2><div data-widget="selector"></div>' +
      '<h2 id="comparador">Comparador de instrumentos</h2><div data-widget="comparador"></div>' +
      '<h2 id="entidades">Juego: ¿qué entidad lo hace?</h2><div data-widget="juegoEntidades"></div>';
    APP.montar(main);
    if (ancla) { var a = document.getElementById(ancla); if (a) setTimeout(function () { a.scrollIntoView(); }, 0); return true; }
  }

  function vistaExposicion() {
    var una = APP.leerPref('rpe-expo-una') === '1';
    var h = '<div class="exposicion' + (una ? ' expo-una' : '') + '"><p class="miga"><a href="#/">Inicio</a> › Repaso</p><h1 tabindex="-1">Modo exposición</h1>' +
      '<p>Solo lo esencial para repasar minutos antes de exponer: la frase “Dilo así”, las cifras clave de cada módulo y las preguntas probables.</p>' +
      '<div class="fila-botones no-imprimir"><button type="button" class="btn" data-modo-expo aria-pressed="' + una + '">' + ico('pizarra') + (una ? 'Ver todo en lista' : 'Ver de a una (pantalla completa)') + '</button>' +
      '<button type="button" class="btn" data-imprimir>' + ico('imprimir') + 'Imprimir / PDF</button></div>';
    var tarjetas = C.modulos.map(function (m) {
      var dilo = Array.isArray(m.diloAsi) ? m.diloAsi : [m.diloAsi];
      var cifras = [];
      (function recoger(bl) {
        (bl || []).forEach(function (b) {
          if (b.t === 'cifras') b.items.forEach(function (c) { if (!cifras.some(function (x) { return x.valor === c.valor; })) cifras.push(c); });
          if (b.t === 'angulos') { recoger(b.normativo); recoger(b.economico); recoger(b.contable); }
        });
      })(m.bloques);
      return '<section class="bloque-expo"><h2><span class="etq" style="background:var(--primario-suave);color:var(--primario)">' + m.num + '</span>' + esc(m.titulo) + '</h2>' +
        dilo.map(function (d) { return '<blockquote>“' + esc(d) + '”</blockquote>'; }).join('') +
        (cifras.length ? '<div class="chips-cifras">' + cifras.map(function (c) { return '<span><b>' + esc(c.valor) + '</b> ' + esc(c.etiqueta) + '</span>'; }).join('') + '</div>' : '') +
        '<p style="margin-bottom:0"><small><a href="#/m/' + m.id + '">Abrir módulo</a></small></p></section>';
    });
    if (una) {
      var i = Math.min(+(APP.leerPref('rpe-expo-i') || 0), tarjetas.length);
      h += '<div data-una aria-live="polite"></div><div class="fila-botones" style="justify-content:space-between"><button type="button" class="btn" data-ant>' + ico('izq') + 'Anterior</button><span class="muted" data-pos></span><button type="button" class="btn primario" data-sig>Siguiente' + ico('der') + '</button></div>';
      h += '</div>';
      main.innerHTML = h;
      var todas = tarjetas.concat(['<section class="bloque-expo"><h2>Preguntas probables</h2>' + C.preguntasProbables.map(function (q) { return '<details class="acordeon"><summary>' + esc(q.p) + '</summary><div class="cuerpo">' + esc(q.r) + '</div></details>'; }).join('') + '</section>']);
      var mostrar = function () {
        APP.$('[data-una]', main).innerHTML = todas[i];
        APP.$('[data-pos]', main).textContent = (i + 1) + ' / ' + todas.length;
        APP.$('[data-ant]', main).disabled = i === 0;
        APP.$('[data-sig]', main).disabled = i === todas.length - 1;
        APP.guardarPref('rpe-expo-i', String(i));
      };
      APP.$('[data-ant]', main).addEventListener('click', function () { if (i > 0) { i--; mostrar(); } });
      APP.$('[data-sig]', main).addEventListener('click', function () { if (i < todas.length - 1) { i++; mostrar(); } });
      APP.teclasVista = function (e) {
        if (e.target && /INPUT|TEXTAREA/.test(e.target.tagName)) return;
        if (e.key === 'ArrowRight' && i < todas.length - 1) { i++; mostrar(); }
        if (e.key === 'ArrowLeft' && i > 0) { i--; mostrar(); }
      };
      mostrar();
    } else {
      h += tarjetas.join('');
      h += '<section class="bloque-expo"><h2>' + ico('info', 'width="20" height="20"') + 'Preguntas probables del profesor</h2>' + C.preguntasProbables.map(function (q) {
        return '<details class="acordeon"><summary>' + esc(q.p) + '</summary><div class="cuerpo">' + esc(q.r) + '</div></details>';
      }).join('') + '</section>';
      h += '<section class="bloque-expo"><h2>' + ico('alerta', 'width="20" height="20"') + 'Ojo: datos que parecen contradictorios</h2><ul>' + C.ojo.map(function (o) { return '<li><b>' + esc(o.titulo) + ':</b> ' + o.html + '</li>'; }).join('') + '</ul></section></div>';
      main.innerHTML = h;
    }
    APP.$('[data-modo-expo]', main).addEventListener('click', function () {
      APP.guardarPref('rpe-expo-una', una ? '0' : '1');
      vistaExposicion();
      enfocarTitulo();
    });
  }

  /* ---------- Búsqueda ---------- */
  var indice = null;
  function construirIndice() {
    indice = [];
    function agregar(m, html) { var t = APP.textoPlano(html); if (t) indice.push({ m: m, t: t, n: APP.normalizar(t) }); }
    function recorrer(m, bl) {
      (bl || []).forEach(function (b) {
        switch (b.t) {
          case 'h': agregar(m, b.texto); break;
          case 'p': case 'formula': agregar(m, b.html); break;
          case 'lista': case 'pasos': b.items.forEach(function (x) { agregar(m, x); }); break;
          case 'cifras': b.items.forEach(function (c) { agregar(m, c.valor + ' ' + c.etiqueta); }); break;
          case 'tabla': b.filas.forEach(function (f) { agregar(m, f.join(' · ')); }); break;
          case 'caja': agregar(m, b.titulo + ': ' + b.html); break;
          case 'tarjetas': b.items.forEach(function (x) { agregar(m, x.titulo + ': ' + x.html); }); break;
          case 'angulos': recorrer(m, b.normativo); recorrer(m, b.economico); recorrer(m, b.contable); break;
          case 'preguntasProbables': C.preguntasProbables.forEach(function (q) { agregar(m, q.p + ' ' + q.r); }); break;
          case 'ojo': C.ojo.forEach(function (o) { agregar(m, o.titulo + ': ' + o.html); }); break;
          case 'glosario': C.glosario.forEach(function (g) { agregar(m, g.termino + ': ' + g.def); }); break;
          case 'bibliografia': C.bibliografia.forEach(function (x) { agregar(m, x.texto); }); break;
          case 'widget':
            if (b.w === 'mapaEntidades') C.entidades.forEach(function (e) { agregar(m, e.nombre + ' (' + e.rol + '): ' + e.funciones.join(' ')); });
            if (b.w === 'comparador') C.comparador.instrumentos.forEach(function (i) { agregar(m, i.nombre + ': ' + Object.keys(i.valores).map(function (k) { return i.valores[k]; }).join(' · ')); });
            break;
        }
      });
    }
    C.modulos.forEach(function (m) {
      agregar(m, m.titulo);
      agregar(m, m.enSimple);
      (Array.isArray(m.diloAsi) ? m.diloAsi : [m.diloAsi]).forEach(function (d) { agregar(m, 'Dilo así: ' + d); });
      recorrer(m, m.bloques);
    });
  }

  /** Expresión regular que ignora tildes: "credito" encuentra "crédito". */
  function regexBusqueda(q) {
    var mapa = { a: '[aáàäâ]', e: '[eéèëê]', i: '[iíìïî]', o: '[oóòöô]', u: '[uúùüû]', n: '[nñ]', c: '[cç]' };
    var patron = APP.normalizar(q).split('').map(function (ch) {
      if (mapa[ch]) return mapa[ch];
      if (/\s/.test(ch)) return '\\s+';
      return ch.replace(/[.*+?^${}()|[\]\\\/]/g, '\\$&');
    }).join('');
    return new RegExp(patron, 'gi');
  }

  function buscar(q) {
    if (!indice) construirIndice();
    var nq = APP.normalizar(q).trim();
    if (nq.length < 2) return [];
    var palabras = nq.split(/\s+/);
    var res = indice.filter(function (s) { return s.n.indexOf(nq) > -1; });
    if (!res.length && palabras.length > 1) res = indice.filter(function (s) { return palabras.every(function (p) { return s.n.indexOf(p) > -1; }); });
    return res;
  }

  function extracto(texto, q) {
    var n = APP.normalizar(texto), pos = n.indexOf(APP.normalizar(q).split(/\s+/)[0]);
    var ini = Math.max(0, pos - 60), fin = Math.min(texto.length, pos + 140);
    var trozo = (ini > 0 ? '… ' : '') + texto.slice(ini, fin) + (fin < texto.length ? ' …' : '');
    var re = regexBusqueda(APP.normalizar(q).split(/\s+/)[0]);
    return esc(trozo).replace(re, function (x) { return '<mark>' + x + '</mark>'; });
  }

  function vistaBuscar(q) {
    var res = q ? buscar(q) : [];
    var h = '<p class="miga"><a href="#/">Inicio</a> › Buscar</p><h1 tabindex="-1">Buscar en el contenido</h1>' +
      '<form role="search" data-buscar-pagina class="fila-botones"><label for="buscar-pagina" class="sr-only">Texto a buscar</label>' +
      '<input id="buscar-pagina" class="filtro-glosario" style="flex:1 1 220px;margin:0" type="search" value="' + esc(q || '') + '" placeholder="Ej.: SFMB, carta fianza, 180 días, PENX…">' +
      '<button class="btn primario" type="submit">' + ico('buscar', 'width="18" height="18"') + 'Buscar</button></form>';
    if (q) {
      var porModulo = [];
      res.forEach(function (r) {
        var g = porModulo.filter(function (x) { return x.m === r.m; })[0];
        if (!g) { g = { m: r.m, items: [] }; porModulo.push(g); }
        if (g.items.length < 3) g.items.push(r);
      });
      h += '<p aria-live="polite">' + (res.length ? res.length + ' coincidencia(s) en ' + porModulo.length + ' módulo(s) para “' + esc(q) + '”.' : 'No hay resultados para “' + esc(q) + '”. Prueba con otra palabra o una sigla (ej. “DEF”, “CIP”).') + '</p>';
      h += '<ul class="resultados-busqueda">' + porModulo.map(function (g) {
        return g.items.map(function (r) {
          return '<li><a href="#/m/' + g.m.id + '?q=' + encodeURIComponent(q) + '"><span class="modulo-res">Módulo ' + g.m.num + ' · ' + esc(g.m.tituloCorto) + '</span><span class="extracto">' + extracto(r.t, q) + '</span></a></li>';
        }).join('');
      }).join('') + '</ul>';
    }
    main.innerHTML = h;
    APP.$('[data-buscar-pagina]', main).addEventListener('submit', function (e) {
      e.preventDefault();
      var v = APP.$('#buscar-pagina', main).value.trim();
      location.hash = '#/buscar?q=' + encodeURIComponent(v);
    });
    if (!q) setTimeout(function () { APP.$('#buscar-pagina', main).focus(); }, 0);
  }

  /** Resalta en la página todas las apariciones de q y lleva a la primera. */
  function resaltar(raiz, q) {
    var re = regexBusqueda(q);
    var nodos = [];
    var walker = document.createTreeWalker(raiz, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
        if (n.parentNode.closest('script,style,button.opcion,input,textarea,.herramientas-modulo')) return NodeFilter.FILTER_REJECT;
        re.lastIndex = 0;
        return re.test(n.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
      }
    });
    while (walker.nextNode()) nodos.push(walker.currentNode);
    nodos.forEach(function (n) {
      var frag = document.createDocumentFragment(), txt = n.nodeValue, ult = 0;
      re.lastIndex = 0;
      txt.replace(re, function (m, pos) {
        frag.appendChild(document.createTextNode(txt.slice(ult, pos)));
        var mk = document.createElement('mark'); mk.textContent = m; frag.appendChild(mk);
        ult = pos + m.length;
        return m;
      });
      frag.appendChild(document.createTextNode(txt.slice(ult)));
      n.parentNode.replaceChild(frag, n);
    });
    var primero = APP.$('mark', raiz);
    if (primero) {
      APP.revelar(primero);
      var lista = primero.closest('ul[id]'); if (lista && lista.hidden) { lista.hidden = false; }
      setTimeout(function () { primero.scrollIntoView({ block: 'center' }); }, 30);
    }
    return nodos.length;
  }

  /* ---------- Router ---------- */
  function enfocarTitulo() {
    var h1 = APP.$('h1', main);
    if (h1) { h1.setAttribute('tabindex', '-1'); h1.focus({ preventScroll: true }); }
  }

  function router() {
    APP.teclasVista = null;
    APP.tooltip.ocultar();
    var hash = location.hash.replace(/^#\/?/, '');
    var q = '';
    var iq = hash.indexOf('?');
    if (iq > -1) {
      var params = hash.slice(iq + 1).split('&');
      params.forEach(function (p) { var kv = p.split('='); if (kv[0] === 'q') q = decodeURIComponent((kv[1] || '').replace(/\+/g, ' ')); });
      hash = hash.slice(0, iq);
    }
    var ancla = '';
    var ia = hash.indexOf('#');
    if (ia > -1) { ancla = hash.slice(ia + 1); hash = hash.slice(0, ia); }
    var partes = hash.split('/').filter(Boolean);
    var ruta = partes[0] || 'inicio';
    var titulo = CFG.titulo || document.title;
    var mantenerScroll = false;

    if (ruta === 'm' && partes[1] && APP.modulo(partes[1])) {
      var m = APP.modulo(partes[1]);
      main.innerHTML = APP.renderModulo(m);
      APP.montar(main);
      titulo = m.num + '. ' + m.tituloCorto + ' · ' + (CFG.tituloCorto || '');
      pintarLateral('m/' + m.id);
      if (q) { resaltar(APP.$('article', main), q); mantenerScroll = true; }
    } else if (ruta === 'herramientas') {
      mantenerScroll = !!vistaHerramientas(ancla);
      titulo = 'Calculadoras · ' + CFG.tituloCorto; pintarLateral('herramientas');
    } else if (ruta === 'flashcards') {
      APP.vistaFlashcards(main); titulo = 'Flashcards · ' + CFG.tituloCorto; pintarLateral('flashcards');
    } else if (ruta === 'examen') {
      APP.vistaExamen(main); titulo = 'Examen final · ' + CFG.tituloCorto; pintarLateral('examen');
    } else if (ruta === 'exposicion') {
      vistaExposicion(); titulo = 'Modo exposición · ' + CFG.tituloCorto; pintarLateral('exposicion');
    } else if (ruta === 'buscar') {
      vistaBuscar(q); titulo = 'Buscar · ' + CFG.tituloCorto; pintarLateral('buscar');
      if (q) APP.$('#campo-buscar').value = q;
    } else {
      vistaInicio(); pintarLateral('inicio');
    }
    document.title = titulo;
    APP.$$('#barra-inferior [data-ruta]').forEach(function (a) {
      if (a.getAttribute('data-ruta') === ruta) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    if (!mantenerScroll) window.scrollTo(0, 0);
    enfocarTitulo();
    pintarProgresoMini();
  }

  iniciarMarco();
  window.addEventListener('hashchange', router);
  router();
})(window.APP);
