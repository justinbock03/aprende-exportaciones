/*
 * CONTENIDO DEL SITIO
 * ------------------------------------------------------------------
 * Todo el texto, cifras, normas y plazos salen de las dos fuentes del
 * trabajo (guía ampliada y diapositivas). Si corriges un dato, hazlo
 * aquí: la web se genera a partir de este archivo.
 *
 * Cada módulo tiene:
 *   id, num, titulo, tituloCorto, enSimple, diloAsi (texto o lista),
 *   bloques: lista de bloques. Tipos de bloque:
 *     {t:'h', texto}                     subtítulo
 *     {t:'p', html}                      párrafo
 *     {t:'lista', items:[html]}          viñetas
 *     {t:'pasos', items:[html]}          lista numerada
 *     {t:'cifras', items:[{valor, etiqueta}]}   tarjetas de cifras clave
 *     {t:'tabla', cabecera:[...], filas:[[...]], nota}
 *     {t:'formula', html}                recuadro de fórmula
 *     {t:'caja', tipo:'ojo'|'ejemplo'|'caso'|'pregunta'|'consejo', titulo, html}
 *     {t:'tarjetas', items:[{titulo, html, tono}]}   tono: devolucion|suspension|facilitacion|bueno|dificil|neutro
 *     {t:'angulos', normativo:[bloques], economico:[bloques], contable:[bloques]}
 *     {t:'widget', w:'nombre'}           componente interactivo (ver js/widgets.js)
 *     {t:'tresAngulos'} {t:'mapaModulos'} {t:'preguntasProbables'} {t:'ojo'}
 *     {t:'glosario'} {t:'bibliografia'} {t:'creditos'}
 *   pag: páginas de la guía (G) o diapositivas (D) de donde sale el contenido.
 *
 * Usa comillas tipográficas “ ” dentro de los textos (no comillas rectas).
 */
window.CONTENIDO = {

  modulos: [

    /* ============================================================ 0 */
    {
      id: 'resumen', num: 0, titulo: 'Resumen en 30 segundos', tituloCorto: 'Resumen',
      pag: 'G p.1',
      enSimple: 'El Estado quiere que el Perú exporte más y creó <b>4 herramientas</b> que le quitan peso (impuestos y trámites) al exportador. Pero esas herramientas exigen mucho orden y las <b>mypes</b>, que son la mayoría, las aprovechan poco.',
      diloAsi: 'Analizamos cuatro herramientas desde tres ángulos —qué dice la ley, cómo funciona y cómo se registra— para responder una sola pregunta: ¿están al alcance de las mypes?',
      bloques: [
        { t: 'h', texto: 'Las 4 herramientas' },
        { t: 'tarjetas', items: [
          { titulo: 'Drawback', tono: 'devolucion', html: 'Devuelve un porcentaje de lo exportado para compensar los aranceles de insumos importados.' },
          { titulo: 'Saldo a favor del exportador', tono: 'devolucion', html: 'Devuelve (o deja compensar) el IGV pagado en las compras para exportar.' },
          { titulo: 'Admisión temporal', tono: 'suspension', html: 'El insumo importado entra sin pagar tributos si se transforma y se exporta en el plazo.' },
          { titulo: 'Exporta Fácil', tono: 'facilitacion', html: 'Exportar por correo postal (SERPOST) sin agente de aduanas.' }
        ] },
        { t: 'h', texto: 'El problema en una línea' },
        { t: 'p', html: 'Esas herramientas exigen <b>documentos, plazos y trazabilidad</b>. Las grandes empresas lo cumplen; las mypes, muchas veces no. Resultado: las mypes son la mayoría de exportadores, pero aprovechan poco los beneficios.' },
        { t: 'h', texto: 'Los 3 ángulos que se repiten en todo el trabajo' },
        { t: 'tresAngulos' },
        { t: 'caja', tipo: 'consejo', titulo: 'Para la exposición', html: 'Si en cada punto mencionan los tres ángulos (normativo, económico-operativo y contable), se nota orden y dominio del tema.' },
        { t: 'h', texto: 'Ruta de estudio' },
        { t: 'mapaModulos' }
      ]
    },

    /* ============================================================ 1 */
    {
      id: 'por-que-importa', num: 1, titulo: '¿Por qué importa exportar?', tituloCorto: 'Por qué importa',
      pag: 'G p.1–2',
      enSimple: 'Exportar trae <b>divisas, empleo e inversión</b>. Y quienes más exportan, contando el número de empresas, son las pequeñas.',
      diloAsi: 'El crecimiento exportador del Perú depende en gran parte de las empresas pequeñas. Si ellas no pueden usar los beneficios, el país pierde competitividad. Ese es el corazón de nuestro trabajo.',
      bloques: [
        { t: 'p', html: 'Las exportaciones son uno de los <b>motores del crecimiento</b> por cuatro razones: aportan al PBI, traen dólares (divisas), generan empleo y atraen inversión. Por eso el Estado diseña políticas para que más empresas vendan al exterior, vendan más y vendan productos más variados.' },
        { t: 'cifras', items: [
          { valor: 'US$ 90 082 M', etiqueta: 'exportaciones de bienes 2025 (+21 %), 5.º récord seguido' },
          { valor: '3.º', etiqueta: 'mayor exportador de Sudamérica' },
          { valor: '8 869', etiqueta: 'empresas exportadoras (ene–set 2025, +3,7 %), a 167 mercados' },
          { valor: '68 %', etiqueta: 'de esas empresas son MIPYMES' }
        ] },
        { t: 'h', texto: '¿Por qué el Estado se enfoca en las MIPYMES?' },
        { t: 'p', html: 'Porque son <b>la mayoría</b> del universo exportador, pero también <b>las más frágiles</b>:' },
        { t: 'lista', items: [
          'menos capacidad técnica,',
          'menos acceso a financiamiento,',
          'menos información de mercados,',
          'menos conexión con cadenas de valor internacionales.'
        ] },
        { t: 'p', html: 'Frente a una gran empresa compiten en desventaja. Por eso la promoción no es “regalar” beneficios, sino <b>crear condiciones</b> para que puedan iniciar, sostener y crecer en el comercio exterior.' },
        { t: 'h', texto: 'Un ejemplo: “Perú Exporta Industria” (MINCETUR)' },
        { t: 'lista', items: [
          'Da capacitación, asistencia técnica y vinculación comercial a mipymes manufactureras.',
          'En 2026 benefició a <b>61 empresas de 4 regiones</b>: 41 % ya exportaba y 59 % tenía potencial sin desarrollar → doble objetivo: <b>consolidar</b> a las que exportan y <b>activar</b> a las que pueden hacerlo.',
          'Exportaciones manufactureras ene–abr 2026: <b>US$ 6 987 M (+15,4 %)</b>. En 2025 hubo 6 523 exportadoras de manufacturas y el <b>69 % eran mipymes</b>.'
        ] },
        { t: 'caja', tipo: 'ojo', titulo: 'Ojo con las cifras', html: 'La cifra de US$ 90 082 M es de MINCETUR (exportaciones de <b>bienes</b>). En el módulo 13 verás US$ 92 833 M, que es del BCRP (<b>totales</b>). Son fuentes y mediciones distintas.' }
      ]
    },

    /* ============================================================ 2 */
    {
      id: 'problema-objetivos', num: 2, titulo: 'Problema y objetivos', tituloCorto: 'Problema y objetivos',
      pag: 'G p.2–3 · D 4–5',
      enSimple: 'Los beneficios existen y funcionan, pero para usarlos hay que cumplir muchas formalidades, y eso perjudica más a las mypes. Los objetivos son los pasos para comprobarlo.',
      diloAsi: [
        'No cuestionamos si los beneficios existen; cuestionamos si están al alcance de todos por igual.',
        'Primero vemos las reglas y los actores, luego cómo funciona cada herramienta y, finalmente, qué impide que las mypes la aprovechen.'
      ],
      bloques: [
        { t: 'h', texto: 'La lógica del problema en 4 pasos' },
        { t: 'pasos', items: [
          '<b>Las exportaciones crecen.</b> Las no tradicionales subieron 17 % a junio 2025 (US$ 10 371 M en el semestre). Parte de ese impulso viene de instrumentos como el Drawback, el saldo a favor, la admisión temporal y Exporta Fácil.',
          '<b>Pero los requisitos se endurecen.</b> Desde febrero 2026 el Drawback (3 % del FOB, tope 50 % del costo) es 100 % digital: exige trazabilidad insumo-producto, cruce automático con los sistemas de SUNAT y un plazo de <b>180 días hábiles</b> desde el embarque. Si te pasas un día, pierdes el beneficio.',
          '<b>La devolución del IGV pide la misma exactitud.</b> Si los documentos tienen errores o el control interno es débil, la verificación se alarga y el dinero tarda en volver.',
          '<b>¿Quién sufre más?</b> Las mypes, porque no tienen el personal, el dinero ni los sistemas de una gran empresa. Mientras tanto, el Perú cayó del puesto <b>52 al 63</b> en el Ranking Mundial de Competitividad (2020–2024), detrás de Chile, México, Colombia y Brasil.'
        ] },
        { t: 'caja', tipo: 'pregunta', titulo: 'Pregunta central', html: '¿En qué medida las exigencias normativas y administrativas de los principales instrumentos de promoción condicionan su aprovechamiento por parte de las MIPYMES exportadoras peruanas y su competitividad?' },
        { t: 'p', html: 'En las diapositivas se resume así: <i>“¿Los instrumentos de promoción son realmente accesibles para las MIPYMES?”</i>' },
        { t: 'p', html: '<b>¿Por qué vale la pena responderla?</b> Porque si no se analiza, las mejoras al régimen podrían seguir beneficiando solo a las empresas grandes (las que pueden cumplir), y la brecha con las pequeñas crecería.' },
        { t: 'h', texto: 'Objetivo general' },
        { t: 'p', html: 'Analizar el régimen de promoción de exportaciones y sus principales instrumentos para determinar en qué medida sus exigencias normativas y administrativas condicionan su aprovechamiento por las MIPYMES y su competitividad.' },
        { t: 'h', texto: 'Objetivos específicos (y dónde se responden)' },
        { t: 'tabla', cabecera: ['Objetivo', '¿Qué busca?', 'Se responde en'], filas: [
          ['1 · ¿Quién y qué norma?', 'Describir el marco normativo e institucional: qué leyes regulan el régimen y qué entidades lo administran.', 'Módulos 4, 5 y 6 (puntos 5, 6 y 7 del trabajo)'],
          ['2 · ¿Cómo funciona?', 'Analizar el Drawback, el saldo a favor, la admisión temporal y Exporta Fácil.', 'Módulos 7 al 12 (puntos 8 al 12 y caso práctico)'],
          ['3 · ¿Qué frena?', 'Identificar las exigencias (trazabilidad, control documentario, plazos) que limitan a las MIPYMES.', 'Módulos 13, 14 y 15 (puntos 13, 14 y 15)']
        ] }
      ]
    },

    /* ============================================================ 3 */
    {
      id: 'marco-conceptual', num: 3, titulo: 'Marco conceptual: el diccionario del tema', tituloCorto: 'Marco conceptual',
      pag: 'G p.3 · D 6',
      enSimple: 'Antes de ver los instrumentos hay que manejar <b>siete conceptos</b>. Si se entienden estos, todo lo demás se entiende solo.',
      diloAsi: 'Todo el régimen descansa en una idea: un producto peruano debe llegar al mundo sin cargar impuestos peruanos; si no, pierde contra la competencia.',
      bloques: [
        { t: 'tabla', clase: 'conceptos', cabecera: ['Concepto', 'Qué es', 'Ejemplo / clave para recordarlo'], filas: [
          ['<b>Exportación definitiva</b>', 'Régimen aduanero por el que mercancías nacionales o nacionalizadas salen del país para usarse o consumirse <b>definitivamente</b> en el exterior. <b>No paga tributos</b> (D. Leg. 1053, art. 60).', 'Un lote de arándanos que se vende a Holanda: sale y no regresa.'],
          ['<b>Régimen de promoción de exportaciones</b>', 'Conjunto de normas, procedimientos y beneficios que el Estado diseña para incentivar que las empresas vendan afuera. Compensa las desventajas del exportador: más costos logísticos, más trámites, más necesidad de financiamiento.', 'Es la “caja de herramientas” del Estado para el exportador.'],
          ['<b>Beneficio tributario o aduanero</b>', 'Ventaja económica (exoneración, devolución o suspensión de un tributo) para fomentar una actividad de interés general. Se basa en el criterio de <b>imposición en el país de destino</b>: el producto debe salir libre de impuestos peruanos.', 'Regla de oro: <b>“no se exportan impuestos”</b>. Si el precio incluyera IGV peruano, el producto sería más caro que el de la competencia.'],
          ['<b>Drawback</b>', 'Permite recuperar (en el Perú, de forma simplificada) los derechos arancelarios pagados al importar insumos que se usan en el bien exportado (D.S. 104-95-EF).', 'Importo tela pagando arancel → confecciono polos → los exporto → el Estado me devuelve un %.'],
          ['<b>Saldo a favor del exportador</b>', 'Permite recuperar el IGV pagado en compras de bienes, servicios y construcción destinadas a exportar. Como la exportación no tiene IGV, el exportador acumula crédito fiscal que no puede usar; la ley le permite <b>compensarlo o pedir su devolución</b> (TUO IGV, arts. 34-35).', 'Pagué S/ 18 de IGV en mis compras, pero no cobré IGV al vender afuera → me devuelven los S/ 18.'],
          ['<b>Admisión temporal</b>', 'Ingreso de mercancía extranjera <b>sin pagar</b> aranceles ni impuestos, porque saldrá del país en un plazo. El trabajo analiza la modalidad de <b>perfeccionamiento activo</b> (el insumo se transforma y sale como producto).', 'Entra hilo importado sin pagar tributos → se teje la prenda → la prenda se exporta.'],
          ['<b>Exporta Fácil</b>', 'Procedimiento simplificado para que mypes exporten mercancías de bajo valor y peso por el servicio postal, <b>sin agente de aduanas</b> (D.S. 067-2006-EF).', 'Un artesano de Ayacucho envía retablos a EE. UU. por SERPOST.']
        ] },
        { t: 'caja', tipo: 'ojo', titulo: 'Ojo: dos admisiones temporales', html: 'Según la guía, el trabajo escrito define en su punto 4 la admisión temporal de <b>“reexportación en el mismo estado”</b> (sin transformar), pero analiza la de <b>“perfeccionamiento activo”</b> (con transformación). Son regímenes diferentes. En esta web usamos la de perfeccionamiento activo.' },
        { t: 'p', html: 'En las diapositivas el marco conceptual se resume en dos columnas: <b>conceptos base</b> (exportación definitiva, régimen de promoción, beneficio tributario o aduanero) y <b>mecanismos de promoción</b> (Drawback, saldo a favor, admisión temporal, Exporta Fácil): “instrumentos clave para impulsar la competitividad exportadora del Perú”.' }
      ]
    },

    /* ============================================================ 4 */
    {
      id: 'politica-comercial', num: 4, titulo: 'Política comercial y fomento exportador', tituloCorto: 'Política comercial',
      pag: 'G p.3–4 · D 7',
      enSimple: 'El Perú hace dos cosas a la vez: <b>abre mercados afuera</b> (con tratados) y <b>ayuda a sus empresas adentro</b> (con beneficios). Una sin la otra no sirve.',
      diloAsi: 'Los TLC nos dan el pasaporte a los mercados; los beneficios tributarios nos dan el precio para competir en ellos.',
      bloques: [
        { t: 'angulos',
          normativo: [
            { t: 'h', texto: 'La estrategia país: PENX 2025-2035' },
            { t: 'p', html: 'El eje de la política es el <b>Plan Estratégico Nacional Exportador – PENX 2025-2035</b>, aprobado por la <b>R.M. N.° 089-2024-MINCETUR</b>. Es la “hoja de ruta” del país para la próxima década. Tiene 4 ejes:' },
            { t: 'tarjetas', items: [
              { titulo: '1. Internacionalización', html: 'Que la empresa peruana salga a vender al mundo.' },
              { titulo: '2. Facilitación', html: 'Menos trámites y costos para el comercio exterior.' },
              { titulo: '3. Oferta competitiva', html: 'Productos con calidad y valor agregado.' },
              { titulo: '4. Capacidades institucionales', html: 'Un Estado que apoye mejor al exportador.' }
            ] },
            { t: 'p', html: 'El PENX reconoce que el Perú <b>no puede depender solo de los commodities</b> (minerales, por ejemplo): necesita diversificar hacia productos con más valor agregado, sumar más empresas exportadoras (sobre todo mipymes) y reducir brechas logísticas y de información.' }
          ],
          economico: [
            { t: 'h', texto: 'Los TLC como plataforma' },
            { t: 'p', html: 'Al cierre de 2025 el Perú tiene <b>22 acuerdos comerciales</b> con más de 50 países, que cubren cerca del <b>95 %</b> de los destinos de nuestras exportaciones.' },
            { t: 'tabla', cabecera: ['TLC', 'Desde', '¿Por qué es importante?'], filas: [
              ['Perú – EE. UU.', '2009', 'Principal mercado de exportaciones no tradicionales; acceso preferente para textiles, agroindustria y manufacturas.'],
              ['Perú – China', '2010', 'Principal socio comercial; facilita insumos industriales más baratos → baja el costo de producción del exportador.'],
              ['Perú – Unión Europea', '2013', 'Arancel cero para el 99,3 % de productos agroindustriales; la agroexportación creció más de 80 % desde su vigencia.']
            ] },
            { t: 'caja', tipo: 'consejo', titulo: 'Idea clave', html: 'Los TLC abren la puerta, pero para cruzarla la empresa tiene que ser competitiva en precio. Ahí entran los instrumentos internos (Drawback, IGV, etc.), que bajan la carga tributaria y aduanera.' }
          ],
          contable: [
            { t: 'h', texto: 'Implicancia para la empresa' },
            { t: 'p', html: 'Para la empresa, la política de fomento se traduce en <b>menores costos</b> y <b>mejor flujo de caja</b>. Los tributos que no paga o que recupera son <b>liquidez</b> que puede usar para invertir o ampliar su capacidad exportadora.' },
            { t: 'caja', tipo: 'consejo', titulo: 'Ángulo contable (diapositiva 7)', html: 'Los beneficios reducen el costo efectivo de exportar y mejoran la liquidez y el flujo de caja.' }
          ]
        }
      ]
    },

    /* ============================================================ 5 */
    {
      id: 'marco-normativo', num: 5, titulo: 'Marco normativo e institucional', tituloCorto: 'Marco normativo',
      pag: 'G p.5 · D 8',
      enSimple: 'Son las leyes que dicen <b>qué beneficios hay, quién puede usarlos, con qué condiciones y quién los administra</b>.',
      diloAsi: 'La digitalización es un arma de doble filo: protege al Estado del fraude, pero le exige a la mype un nivel de orden que muchas aún no tienen.',
      bloques: [
        { t: 'angulos',
          normativo: [
            { t: 'h', texto: 'El “paraguas legal”' },
            { t: 'tabla', cabecera: ['N.°', 'Norma', '¿Qué regula?', 'Cómo recordarla'], filas: [
              ['1', '<b>D. Leg. 1053</b> – Ley General de Aduanas (2008)', 'Base de todo lo aduanero: exportación definitiva, admisión temporal, control.', '“La ley madre”.'],
              ['2', '<b>D.S. 010-2009-EF</b> – Reglamento de la LGA', 'Baja la ley al detalle: procedimientos, plazos, obligaciones y sanciones.', 'El “manual de uso” de la ley madre.'],
              ['3', '<b>D.S. 104-95-EF</b> (últ. mod. D.S. 005-2023-EF)', 'Drawback: quién califica, cálculo, tasa y plazos. Desde feb. 2026 el trámite es 100 % digital.', '104 = Drawback.'],
              ['4', '<b>D.S. 055-99-EF</b> – TUO Ley del IGV e ISC', 'Arts. 33-36: la exportación no paga IGV y regula el saldo a favor del exportador.', 'La ley del IGV.'],
              ['5', '<b>D.S. 067-2006-EF</b>', 'Crea Exporta Fácil para mypes (exportaciones de bajo valor).', 'Exporta Fácil.'],
              ['6', '<b>R.M. 089-2024-MINCETUR</b>', 'Aprueba el PENX 2025-2035: política de la próxima década.', 'La hoja de ruta.']
            ] },
            { t: 'caja', tipo: 'ojo', titulo: 'Dato que siempre preguntan', html: 'Desde febrero de 2026 el Drawback es digital: <b>180 días hábiles desde el embarque</b> o se pierde el beneficio; exige control documentario.' }
          ],
          economico: [
            { t: 'h', texto: 'La norma en la práctica' },
            { t: 'p', html: 'Que exista una norma no significa que se aproveche. La tendencia es clara: <b>más digitalización y más trazabilidad</b>. Desde febrero 2026 el Drawback se gestiona íntegramente en línea, con cruce automático insumo-producto en los sistemas de SUNAT, y vencer los 180 días hábiles significa perder el beneficio.' },
            { t: 'tarjetas', items: [
              { titulo: 'Lo bueno', tono: 'bueno', html: 'Reduce el fraude: es más difícil inventar exportaciones o insumos.' },
              { titulo: 'Lo difícil', tono: 'dificil', html: 'Sube la exigencia técnica: la mipyme necesita sistemas de registro y control interno que muchas no tienen.' }
            ] }
          ],
          contable: [
            { t: 'h', texto: 'Por qué el contador debe conocer la norma' },
            { t: 'p', html: 'Para gestionar bien el beneficio, la empresa debe:' },
            { t: 'pasos', items: [
              'registrar correctamente las <b>partidas arancelarias</b> de sus insumos importados,',
              'identificar <b>qué parte</b> de esos insumos va al producto exportado, y',
              'mantener un <b>control documentario</b> que sustente la solicitud.'
            ] },
            { t: 'p', html: 'Un error, aunque sea involuntario, genera <b>contingencias tributarias</b> que golpean el estado de resultados.' }
          ]
        }
      ]
    },

    /* ============================================================ 6 */
    {
      id: 'entidades', num: 6, titulo: 'Entidades públicas: ¿quién hace qué?', tituloCorto: 'Entidades',
      pag: 'G p.5–6 · D 9',
      enSimple: 'No hay una sola ventanilla. Varias entidades cumplen papeles distintos y complementarios; el exportador debe saber a cuál acudir según lo que necesita.',
      diloAsi: 'MINCETUR abre la puerta, PROMPERÚ consigue el cliente, el MEF fija cuánto se devuelve y SUNAT revisa y paga.',
      bloques: [
        { t: 'p', html: 'Toca cada tarjeta para ver sus funciones. Luego pon a prueba tu memoria con el juego.' },
        { t: 'widget', w: 'mapaEntidades' },
        { t: 'h', texto: 'Juego: ¿qué entidad lo hace?' },
        { t: 'widget', w: 'juegoEntidades' }
      ]
    },

    /* ============================================================ 7 */
    {
      id: 'instrumentos', num: 7, titulo: 'Los 4 instrumentos: visión general', tituloCorto: 'Los 4 instrumentos',
      pag: 'G p.6–7 · D 10',
      enSimple: 'Los cuatro instrumentos se diferencian por el <b>tipo de ayuda</b> que dan: <b>devolver</b>, <b>no cobrar</b> o <b>simplificar</b>.',
      diloAsi: 'Si solo recuerdan una cosa: el Drawback y el IGV te devuelven; la admisión temporal te deja de cobrar; Exporta Fácil te simplifica.',
      bloques: [
        { t: 'tabla', cabecera: ['Instrumento', 'Tipo de beneficio', '¿A quién beneficia más?'], filas: [
          ['<b>Drawback</b>', '<span class="etq devolucion">Devolución</span> Recuperar el arancel pagado al importar insumos del bien exportado.', 'Empresas que importan insumos para fabricar lo que exportan.'],
          ['<b>Saldo a favor del exportador</b>', '<span class="etq devolucion">Devolución</span> Recuperar el IGV pagado en compras para exportar.', 'Todo exportador registrado en SUNAT que pagó IGV.'],
          ['<b>Admisión temporal p/ perfeccionamiento activo</b>', '<span class="etq suspension">Suspensión</span> No pagar tributos de importación desde el inicio.', 'Sectores con muchos insumos importados: textil, confecciones, metalmecánica.'],
          ['<b>Exporta Fácil</b>', '<span class="etq facilitacion">Facilitación</span> Exportar por correo sin agente de aduanas.', 'Micro y pequeñas empresas, artesanos, personas naturales con productos de bajo valor.']
        ] },
        { t: 'h', texto: 'La pregunta clave: ¿cuándo se paga el tributo?' },
        { t: 'tarjetas', items: [
          { titulo: 'Devolución · Pagas primero, recuperas después', tono: 'devolucion', html: 'La empresa asume el tributo mientras produce y lo recupera cuando demuestra que exportó. <b>Desventaja:</b> dinero inmovilizado mientras tanto.' },
          { titulo: 'Suspensión · No pagas desde el inicio', tono: 'suspension', html: 'El insumo entra sin tributos, con la condición de transformarlo y exportarlo en el plazo. <b>Riesgo:</b> si no exportas a tiempo, pagas con intereses y multas.' },
          { titulo: 'Facilitación · No es beneficio tributario', tono: 'facilitacion', html: 'No devuelve ni suspende tributos: simplifica el trámite para exportaciones pequeñas que no podrían pagar un agente de aduanas.' }
        ] },
        { t: 'h', texto: 'Comparador interactivo' },
        { t: 'widget', w: 'comparador' },
        { t: 'h', texto: '¿Qué instrumento me conviene?' },
        { t: 'widget', w: 'selector' }
      ]
    },

    /* ============================================================ 8 */
    {
      id: 'drawback', num: 8, titulo: 'Drawback: restitución simplificada de derechos arancelarios', tituloCorto: 'Drawback',
      pag: 'G p.7–9 · D 11',
      enSimple: 'El Estado te “reembolsa” un <b>porcentaje fijo de lo que exportas</b> para compensar los aranceles de los insumos importados. Ojo: en el Perú se calcula sobre el <b>valor FOB</b>, no sobre el arancel realmente pagado.',
      diloAsi: 'El Drawback peruano no te devuelve lo que pagaste: te da un 3 % de lo que exportas. Por eso es un ingreso y no la recuperación de un gasto.',
      bloques: [
        { t: 'cifras', items: [
          { valor: '3 %', etiqueta: 'del valor FOB exportado' },
          { valor: '50 %', etiqueta: 'tope del costo de producción' },
          { valor: '180', etiqueta: 'días hábiles desde el embarque para solicitar' },
          { valor: 'US$ 500', etiqueta: 'mínimo por solicitud' }
        ] },
        { t: 'angulos',
          normativo: [
            { t: 'p', html: '<b>Normas:</b> Ley General de Aduanas (D. Leg. 1053, art. 82), su Reglamento (D.S. 010-2009-EF), el procedimiento simplificado del <b>D.S. 104-95-EF</b> y el procedimiento <b>DESPA-PG.07 versión 5</b> de SUNAT, vigente desde el 2 de febrero de 2026.' },
            { t: 'p', html: '<b>¿Por qué “simplificado”?</b> En el Drawback “clásico” se devuelve exactamente lo pagado. En el Perú no: se devuelve un <b>porcentaje fijo del FOB</b>, sin importar cuánto arancel pagaste. Por eso la Corte Suprema lo describió como una <b>transferencia de recursos del Estado</b> para neutralizar el efecto de los tributos de importación en el costo de producción.' },
            { t: 'p', html: '<b>¿Quién puede pedirlo?</b> Las empresas <b>productoras-exportadoras</b> cuyo costo subió por los aranceles de los insumos usados, sin importar si los importó la propia empresa, un tercero o un proveedor local que los transformó.' },
            { t: 'formula', html: 'Drawback = el MENOR entre <b>3 % × Valor FOB exportado</b> y <b>50 % × Costo de producción</b><br><small>La tasa es la vigente a la fecha de numeración de la solicitud.</small>' },
            { t: 'h', texto: 'Requisitos (se cumplen todos a la vez)' },
            { t: 'tabla', cabecera: ['Requisito', 'Contenido', '¿Por qué existe?'], filas: [
              ['Tasa y tope', '3 % del FOB, máximo 50 % del costo de producción.', 'Evita devolver más de lo razonable.'],
              ['Límite de insumos', 'CIF de insumos importados ≤ 50 % del FOB exportado.', 'Que el producto tenga valor agregado nacional, no sea “importar y reexportar”.'],
              ['Antigüedad', 'Insumos importados en los 36 meses anteriores.', 'Vincular insumo y exportación en el tiempo.'],
              ['Voluntad', 'Indicarla en la declaración de exportación (código 13).', 'Que SUNAT sepa desde el embarque.'],
              ['Plazo y monto', 'Solicitud en 180 días hábiles del embarque; mínimo US$ 500 (los montos menores se acumulan).', 'Orden y eficiencia administrativa.'],
              ['Límite anual', 'Hasta US$ 20 M por partida arancelaria y empresa no vinculada.', 'Enfocar el beneficio, no favorecer a gigantes.'],
              ['Exclusiones', 'Insumos exonerados, con arancel 0, con preferencia arancelaria o en régimen suspensivo; subpartidas excluidas por el MEF (sobre todo tradicionales).', 'No devolver algo que nunca se pagó.']
            ] },
            { t: 'h', texto: '¿Cómo es el trámite hoy? (6 pasos)' },
            { t: 'widget', w: 'tramiteDrawback' },
            { t: 'caja', tipo: 'ojo', titulo: 'Historia de incertidumbre', html: 'El D.S. 189-2024-EF dispuso bajarlo a 1 % (oct. 2024), 0,5 % (jul. 2025) y eliminarlo en 2026. En febrero de 2025 el Gobierno lo revirtió y sigue en 3 %. Pero el debate fiscal es un <b>riesgo de previsibilidad</b> para el exportador.' },
            { t: 'caja', tipo: 'caso', titulo: 'Caso real – Agualima S.A.C. (Casación N.° 37700-2022, 13-jul-2023)', html: 'Exportó espárragos y pidió Drawback el 9-feb-2015; el sistema lo aprobó. Después SUNAT le exigió devolver <b>S/ 6 365,99</b> más intereses y le puso multa de <b>S/ 3 183</b>, alegando que la declaración no estaba regularizada. La Corte Suprema anuló el reintegro y la multa: el plazo aplicable era el de 180 días hábiles, interpretado a favor del contribuyente.<br><b>Lección:</b> más de 8 años de litigio por un monto pequeño, un costo que una mype difícilmente puede pagar.' }
          ],
          economico: [
            { t: 'p', html: 'Funciona como un <b>subsidio a la exportación no tradicional</b>: reduce el costo del exportador en una proporción fija de sus ventas, no del arancel pagado.' },
            { t: 'lista', items: [
              'Si los insumos pagaron aranceles <b>bajos</b>, el 3 % puede <b>superar</b> lo pagado.',
              'Si pagaron aranceles <b>altos</b>, puede <b>quedarse corto</b>.'
            ] },
            { t: 'p', html: 'La gran exigencia es la <b>trazabilidad</b>: demostrar que el insumo se usó en el producto exportado, que se importó en los 36 meses previos y que pagó todos los derechos. Eso obliga a conectar:' },
            { t: 'formula', html: 'compras / importaciones → órdenes de producción → exportaciones' },
            { t: 'p', html: 'El cruce automático de SUNAT reduce el fraude, pero exige más a las mypes.' }
          ],
          contable: [
            { t: 'p', html: 'El Drawback <b>no es la devolución de un gasto</b>: es un <b>ingreso</b> que se reconoce cuando se cumplen las condiciones para cobrarlo. Como es una transferencia del Estado, suele analizarse con el criterio de <b>subvenciones del gobierno</b> de las NIIF.' },
            { t: 'tabla', clase: 'asiento', cabecera: ['Momento', 'Debe', 'Haber'], filas: [
              ['Se reconoce el derecho', '16 Cuentas por cobrar diversas – terceros', '75 Otros ingresos de gestión'],
              ['Se cobra', '10 Efectivo y equivalentes', '16 Cuentas por cobrar diversas – terceros']
            ] },
            { t: 'p', html: 'El contador debe:' },
            { t: 'lista', items: [
              'mantener un <b>expediente</b> por cada solicitud (la fiscalización puede llegar años después),',
              'evaluar una <b>provisión</b> si hay observaciones,',
              'revisar el efecto en el <b>Impuesto a la Renta</b>, tema que ha llegado a juicio.'
            ] }
          ]
        },
        { t: 'h', texto: 'Calculadora de Drawback' },
        { t: 'widget', w: 'calcDrawback' }
      ]
    },

    /* ============================================================ 9 */
    {
      id: 'saldo-a-favor', num: 9, titulo: 'Saldo a favor del exportador y devolución del IGV', tituloCorto: 'Saldo a favor (IGV)',
      pag: 'G p.9–10 · D 12',
      enSimple: 'El exportador <b>paga IGV cuando compra</b>, pero <b>no cobra IGV cuando vende afuera</b>. Ese IGV no puede quedarse como costo, así que el Estado se lo <b>devuelve</b> o le deja usarlo para <b>pagar otros impuestos</b>.',
      diloAsi: 'El IGV devuelto no es una ganancia: es dinero de la empresa que el Estado tiene retenido. Mientras más tarda, más le cuesta a la empresa.',
      bloques: [
        { t: 'cifras', items: [
          { valor: '18 %', etiqueta: 'del FOB: límite mensual recuperable' },
          { valor: '30 días', etiqueta: 'hábiles para resolver (regla general)' },
          { valor: '2 a 5', etiqueta: 'días hábiles en la modalidad exprés' },
          { valor: '4 años', etiqueta: 'plazo para pedir la devolución' }
        ] },
        { t: 'caja', tipo: 'ejemplo', titulo: 'Ejemplo rápido', html: 'Una empresa compra cajas, etiquetas y servicios por S/ 100 000 + S/ 18 000 de IGV. Vende todo al exterior: su factura de exportación no lleva IGV. Si nadie le devolviera los S/ 18 000, ese impuesto encarecería su producto. El saldo a favor evita eso.' },
        { t: 'angulos',
          normativo: [
            { t: 'p', html: 'Regulado en el <b>TUO de la Ley del IGV e ISC (D.S. 055-99-EF, arts. 33 al 36)</b>. Hay que dominar dos siglas:' },
            { t: 'tarjetas', items: [
              { titulo: 'SFE – Saldo a favor por exportación', html: 'Todo el IGV de los comprobantes de compra y de las importaciones vinculadas a las exportaciones del mes.' },
              { titulo: 'SFMB – Saldo a favor materia del beneficio', html: 'Lo que <b>queda</b> del SFE después de descontarlo del IGV de las ventas locales (si las hay). <b>Solo el SFMB se compensa o devuelve.</b>' }
            ] },
            { t: 'formula', html: 'SFMB = SFE − IGV de ventas locales &nbsp;|&nbsp; Límite mensual = 18 % × FOB exportado' },
            { t: 'lista', items: [
              'Si el SFMB supera el 18 % del FOB, el exceso <b>no se pierde</b>: se arrastra como SFE a los meses siguientes.',
              'Plazo para pedir la devolución: <b>4 años</b>.',
              '<b>Paso previo obligatorio:</b> presentar el <b>PDB Exportadores</b> (formulario 0201, R.S. 157-2005/SUNAT). Omitirlo ha generado reparos confirmados por el Tribunal Fiscal (aunque presentarlo tarde no impide compensar contra pagos a cuenta o regularización de Renta).',
              '<b>Opciones:</b> compensar contra pagos a cuenta y regularización del Impuesto a la Renta u otras deudas, o pedir devolución (formulario virtual <b>1649</b> o, en su defecto, <b>4949</b>) mediante abono en cuenta o <b>Notas de Crédito Negociables</b>.',
              '<b>Plazos de SUNAT:</b> 30 días hábiles como regla; 15 si se cumplen requisitos adicionales; menos aún con garantía. Se suspenden ante observaciones. Modalidad <b>exprés de 2 a 5 días</b> para buen perfil de cumplimiento (desde 2024).'
            ] }
          ],
          economico: [
            { t: 'p', html: 'El IGV de las compras se paga <b>hoy</b>, pero vuelve <b>después</b> (PDB → solicitud → resolución). Esa brecha la <b>financia el propio exportador</b>.' },
            { t: 'lista', items: [
              'En empresas con muchos costos locales, el SFMB puede inmovilizar una parte importante del capital de trabajo (en el caso práctico, cerca del <b>14 % del FOB</b>).',
              'Si la devolución demora, la empresa puede tener que <b>endeudarse</b>.',
              'Debe cuidar que sus <b>proveedores sean reales</b>: si uno resulta ser “empresa fantasma” (sin capacidad operativa), la solicitud puede ser observada aunque el exportador haya actuado de buena fe.'
            ] }
          ],
          contable: [
            { t: 'p', html: 'El IGV de las compras se registra como crédito fiscal en la <b>cuenta 40</b> (subcuenta IGV). Como no hay ventas gravadas que lo absorban, queda un <b>saldo deudor</b> = derecho a recuperar. En el balance se presenta como <b>activo por impuestos por recuperar</b>.' },
            { t: 'tabla', clase: 'asiento', cabecera: ['Momento', 'Debe', 'Haber'], filas: [
              ['Se obtiene la devolución', '10 Efectivo y equivalentes', '40 Tributos por pagar (IGV)'],
              ['Se compensa', 'Se reduce el pasivo tributario correspondiente (ej. pago a cuenta de Renta).', '']
            ] },
            { t: 'p', html: 'El contador controla: que cada comprobante esté vinculado a la exportación, que el PDB se presente a tiempo, el límite del 18 % y el saldo arrastrado, y el costo financiero de la demora.' },
            { t: 'caja', tipo: 'ojo', titulo: 'No es ganancia', html: 'Al recibir la devolución (10 → 40) no hay ingreso: es <b>dinero adelantado que vuelve</b>.' }
          ]
        },
        { t: 'h', texto: 'Calculadora de saldo a favor (SFE / SFMB)' },
        { t: 'widget', w: 'calcSaldo' }
      ]
    },

    /* ============================================================ 10 */
    {
      id: 'admision-temporal', num: 10, titulo: 'Admisión temporal para perfeccionamiento activo', tituloCorto: 'Admisión temporal',
      pag: 'G p.10–11 · D 13',
      enSimple: 'El insumo extranjero entra “prestado” <b>sin pagar tributos</b>; lo transformas aquí y lo exportas. Para asegurarse de que cumplirás, SUNAT te pide una <b>garantía</b>.',
      diloAsi: 'La admisión temporal es como un préstamo de impuestos con garantía: si cumples, no pagas nada; si fallas, pagas todo y con intereses.',
      bloques: [
        { t: 'cifras', items: [
          { valor: '24 meses', etiqueta: 'plazo máximo desde el levante' },
          { valor: 'Garantía', etiqueta: 'tributos suspendidos + interés compensatorio' },
          { valor: 'CIP / RIP', etiqueta: 'control de insumos' }
        ] },
        { t: 'caja', tipo: 'ejemplo', titulo: 'Ejemplo', html: 'Una confeccionista importa hilado de algodón de la India. En vez de pagar arancel + IGV al ingresar, lo acoge a admisión temporal con una carta fianza. Teje las prendas y las exporta a EE. UU. antes de 24 meses → nunca pagó esos tributos.' },
        { t: 'angulos',
          normativo: [
            { t: 'lista', items: [
              '<b>Normas:</b> D. Leg. 1053, D.S. 010-2009-EF y procedimiento <b>DESPA-PG.06 versión 6</b>.',
              '<b>¿Qué permite?</b> Ingresar mercancía extranjera con <b>suspensión</b> de aranceles y demás tributos, para exportarla luego de una <b>transformación, elaboración (incluye montaje y ensamble) o reparación</b>. Lo que sale se llama <b>“producto compensador”</b>.',
              '<b>Requisitos del beneficiario:</b> RUC activo, clave SOL y no estar como “no habido”.',
              '<b>¿Qué entra?</b> Materias primas, insumos, partes y piezas incorporados al producto. <b>No entran</b> mercancías auxiliares (combustibles, lubricantes, repuestos) ni de importación prohibida.',
              '<b>Plazo:</b> hasta <b>24 meses</b> desde el levante; prórroga automática si renuevas la garantía antes de vencer.',
              '<b>Garantía:</b> tributos suspendidos + <b>interés compensatorio</b> (calculado con la TAMEX) hasta el vencimiento.',
              '<b>Control:</b> se transmite un <b>CIP</b> (Cuadro de Insumo Producto) con coeficientes de consumo, mermas y desperdicios; al exportar se presenta la <b>RIP</b> (Relación de Insumo Producto), que debe coincidir con el CIP.'
            ] },
            { t: 'h', texto: 'Recorrido del régimen y sus 4 salidas' },
            { t: 'widget', w: 'tramiteAdmision' },
            { t: 'caja', tipo: 'ojo', titulo: 'No hay doble beneficio', html: 'Un insumo en admisión temporal <b>no puede pedir Drawback</b>, salvo que se haya nacionalizado pagando todo.' }
          ],
          economico: [
            { t: 'p', html: 'Muy útil en actividades que dependen de insumos importados, como <b>textil y confecciones</b>. Ese sector está bajo presión: el <b>1 de octubre de 2026</b> se declaró su <b>emergencia por 120 días</b> (D.S. 014-2026-PRODUCE); el <b>99,4 %</b> de sus más de 47 mil empresas formales son mypes.' },
            { t: 'tarjetas', items: [
              { titulo: 'Ventajas', tono: 'bueno', html: 'No inmovilizas capital en aranceles ni IGV de importación; mejor liquidez desde el día uno.' },
              { titulo: 'Desventajas', tono: 'dificil', html: 'La garantía (carta fianza o póliza) cuesta y exige capacidad crediticia; control riguroso de insumos por lote; si incumples plazos, el beneficio se vuelve <b>deuda con intereses</b>. Para una microempresa, puede desanimar más de lo que ahorra.' }
            ] }
          ],
          contable: [
            { t: 'lista', items: [
              'Los insumos se registran como existencias (<b>cuenta 24</b> Materias primas o <b>25</b> Materiales auxiliares) al valor de factura + gastos de importación, <b>sin</b> los tributos suspendidos.',
              'En el <b>kardex</b> deben separarse de las existencias nacionalizadas.',
              'La comisión de la carta fianza o póliza es <b>gasto financiero</b>.',
              '<b>Contingencia:</b> si no se exporta a tiempo, los tributos, recargos e intereses pasan al <b>costo</b> del insumo (si se nacionaliza) o al <b>gasto</b> (si hay incumplimiento).',
              'Se recomienda controlar vencimientos y <b>revelar en notas</b> los compromisos con la aduana.'
            ] }
          ]
        },
        { t: 'h', texto: 'Admisión temporal vs. Drawback' },
        { t: 'tabla', cabecera: ['Aspecto', 'Admisión temporal', 'Drawback'], filas: [
          ['<b>Momento del beneficio</b>', 'Desde el inicio: no se pagan tributos', 'Después: se paga y se restituye'],
          ['<b>Respaldo</b>', 'Garantía + interés compensatorio', 'No requiere garantía'],
          ['<b>Cálculo y control</b>', 'Sobre insumos admitidos, control CIP/RIP', '3 % del FOB, tope 50 % del costo'],
          ['<b>Plazo</b>', 'Máximo 24 meses desde el levante', '180 días hábiles desde el embarque'],
          ['<b>Riesgo</b>', 'Ejecución de garantía + tributos con intereses', 'Reintegro con intereses y multa']
        ] }
      ]
    },

    /* ============================================================ 11 */
    {
      id: 'exporta-facil', num: 11, titulo: 'Exporta Fácil y facilitación para pequeñas empresas', tituloCorto: 'Exporta Fácil',
      pag: 'G p.11–12 · D 14',
      enSimple: 'Exportar como quien manda una encomienda por <b>SERPOST</b>, sin agente de aduanas. Ideal para artesanía, joyería y textiles. <b>No es un beneficio tributario</b>, es una facilitación del trámite.',
      diloAsi: 'Exporta Fácil no mueve grandes montos, pero es la puerta de entrada al mundo exportador para el artesano y la microempresa.',
      bloques: [
        { t: 'cifras', items: [
          { valor: 'US$ 7 500', etiqueta: 'FOB máximo por envío (por DEF)' },
          { valor: '30 kg', etiqueta: 'peso máximo en SERPOST' },
          { valor: '111 707', etiqueta: 'DEF registradas (2007 – feb. 2025)' }
        ] },
        { t: 'angulos',
          normativo: [
            { t: 'lista', items: [
              'Creado por el <b>D.S. 067-2006-EF</b>; funciona desde 2007 (en el marco de la Iniciativa para la Integración de la Infraestructura Regional Suramericana) mediante la <b>DEF</b> (Declaración Exporta Fácil).',
              '<b>¿Quién puede usarlo?</b> Personas naturales o jurídicas con <b>RUC y clave SOL</b>, que emitan <b>factura o boleta</b> y exporten mercancía no prohibida ni restringida.',
              '<b>Valor máximo:</b> US$ 7 500 FOB <b>por envío</b> (por DEF, no por periodo). Una venta mayor puede dividirse en varias DEF.',
              '<b>Medidas del paquete (SERPOST):</b> hasta 30 kg; suma de las tres dimensiones ≤ 3 m; ningún lado mayor a 1,5 m.',
              '<b>Costos:</b> solo el servicio postal + seguro opcional de 1 % + IGV sobre el FOB (3 % en joyería).',
              '<b>Tiempo:</b> 10 a 30 días (económico) o 7 a 10 días (expreso).'
            ] },
            { t: 'h', texto: 'Los 4 pasos' },
            { t: 'pasos', items: [
              '<b>Registrar la DEF</b> en SUNAT Operaciones en Línea.',
              '<b>Embalar</b> la mercancía e <b>imprimir</b> la DEF.',
              '<b>Llevar a SERPOST</b> con la DEF firmada, el comprobante de pago y los permisos que el producto necesite.',
              '<b>SERPOST</b> asigna la guía postal y envía la mercancía al exterior.'
            ] }
          ],
          economico: [
            { t: 'cifras', items: [
              { valor: '111 707', etiqueta: 'DEF registradas (2007 – feb. 2025)' },
              { valor: 'US$ 43,08 M', etiqueta: 'valor FOB acumulado' },
              { valor: '≈ US$ 386', etiqueta: 'promedio por envío (artesanía, joyería, textiles)' },
              { valor: '82 % / 46 %', etiqueta: 'sale de Lima / va a EE. UU. (2024)' }
            ] },
            { t: 'p', html: 'El total de 18 años es <b>menos del 0,05 %</b> de lo que el Perú exporta en un solo año (US$ 90 082 M en 2025). Su aporte en volumen es <b>marginal</b>. Su verdadero valor es otro: <b>sumar nuevos exportadores y formalizar</b> a los pequeños.' },
            { t: 'caja', tipo: 'ejemplo', titulo: 'Ejemplo', html: 'La empresa con más DEF desde 2007 es una <b>joyería artesanal</b> con <b>4 240 declaraciones</b> hasta 2024 → un negocio pequeño puede tener una operación exportadora constante sin agente de aduanas.' }
          ],
          contable: [
            { t: 'lista', items: [
              'Se sustenta con factura o boleta: es una <b>exportación no gravada con IGV</b>; el valor de la DEF debe coincidir con el comprobante.',
              'El ingreso se reconoce según lo pactado con el comprador; si es en moneda extranjera, se usa el <b>tipo de cambio</b> de la fecha y se registran las <b>diferencias de cambio</b> al cobrar.',
              'Flete postal y seguro → <b>gastos de venta</b> (<b>cuenta 63</b>, servicios prestados por terceros).',
              '<b>Recomendación:</b> conciliar cada DEF con su comprobante y guía postal, guardar evidencia de entrega y cobro, y vigilar que los envíos fraccionados respeten el límite.'
            ] }
          ]
        }
      ]
    },

    /* ============================================================ 12 */
    {
      id: 'caso-practico', num: 12, titulo: 'Caso práctico: Textiles Andinos del Sur S.A.C.', tituloCorto: 'Caso práctico',
      pag: 'G p.13–14',
      enSimple: 'Ver con números cuánto recupera una empresa con el <b>Drawback</b> y el <b>saldo a favor</b>, y entender que <b>no todo lo recuperado es ganancia</b>. (Empresa ficticia.)',
      diloAsi: 'De cada 100 soles que exporta, la empresa recupera 17: 3 por Drawback y 14 por IGV. Pero esos 14 no son regalo: son su propio dinero que el Estado le tenía retenido.',
      bloques: [
        { t: 'h', texto: 'Datos del caso' },
        { t: 'tabla', cabecera: ['Concepto', 'Importe'], filas: [
          ['Exportación de prendas de punto a EE. UU. (FOB)', 'US$ 250 000 (S/ 900 000; TC S/ 3,60)'],
          ['Costo de producción del bien exportado', 'US$ 190 000 (S/ 684 000)'],
          ['Insumos importados (hilados, accesorios), valor CIF', 'US$ 70 000 → 28 % del FOB (cumple el límite de 50 %)'],
          ['Arancel pagado (supuesto 11 %)', 'US$ 7 700'],
          ['Compras locales para exportar (base imponible)', 'S/ 420 000'],
          ['Ventas locales gravadas', 'S/ 0']
        ] },
        { t: 'h', texto: 'Resuélvelo tú: caso guiado' },
        { t: 'p', html: 'Intenta cada cálculo antes de ver la respuesta. Puedes escribir los números como “125 949,60” o “125949.60”.' },
        { t: 'widget', w: 'casoGuiado' },
        { t: 'h', texto: 'Interpretación' },
        { t: 'lista', items: [
          'El <b>Drawback</b> (S/ 27 000) <b>sí es un ingreso</b>: cubre ~97 % del arancel pagado. El tope del 50 % no limita porque el 3 % es mucho menor.',
          'El <b>IGV devuelto</b> (S/ 125 949,60) es lo más grande en liquidez, pero <b>no es ganancia</b>: es IGV que la empresa pagó por adelantado y que vuelve como <b>capital de trabajo</b>.',
          'Como no hay ventas locales, todo el SFE es SFMB. Usa el 77,7 % del límite: no hay saldo que arrastrar.',
          '<b>Costo de esperar:</b> si SUNAT tarda 30 días hábiles (~42 días calendario) y la empresa se financia al 12 % anual: 125 949,60 × 12 % × 42/360 = <b>S/ 1 763,29</b>. Parece poco, pero muestra por qué las demoras golpean más a quien no tiene crédito barato.'
        ] },
        { t: 'cifras', items: [
          { valor: 'S/ 27 000', etiqueta: 'Drawback · 3 % del FOB' },
          { valor: 'S/ 125 949,60', etiqueta: 'IGV devuelto · 14 % del FOB' },
          { valor: 'S/ 152 949,60', etiqueta: 'Total recuperado · ≈17 % del FOB' }
        ] }
      ]
    },

    /* ============================================================ 13 */
    {
      id: 'impacto', num: 13, titulo: 'Impacto en la competitividad exportadora', tituloCorto: 'Impacto',
      pag: 'G p.14 · D 15',
      enSimple: 'Las exportaciones no tradicionales (las que más usan estos beneficios) crecieron fuerte en 2025, pero <b>no solo por el régimen</b>: también ayudó el puerto de Chancay.',
      diloAsi: 'Sería un error atribuirle todo el crecimiento a los beneficios tributarios. Régimen e infraestructura trabajan juntos: uno abarata el impuesto y el otro abarata el viaje.',
      bloques: [
        { t: 'h', texto: 'Las cifras 2025 (BCRP)' },
        { t: 'cifras', items: [
          { valor: 'US$ 92 833 M', etiqueta: 'exportaciones totales 2025 (BCRP)' },
          { valor: '+24,6 %', etiqueta: 'tradicionales' },
          { valor: '+14,4 %', etiqueta: 'no tradicionales' }
        ] },
        { t: 'p', html: 'Las <b>no tradicionales</b> son las más ligadas al Drawback y al saldo a favor, porque ahí están las empresas manufactureras, agroindustriales y textiles que usan insumos importados o gravados con IGV.' },
        { t: 'h', texto: 'Crecimiento de las exportaciones no tradicionales 2025' },
        { t: 'widget', w: 'graficoPaises' },
        { t: 'p', html: 'El BCRP lo calificó como una <b>“ganancia relativa de competitividad exportadora”</b>, impulsada por la palta, el arándano y los sectores textil, químico y siderometalúrgico. Perú y Colombia empatan con 14,4 %: lo correcto es decir que <b>comparten el primer lugar</b>.' },
        { t: 'caja', tipo: 'ojo', titulo: 'Las diapositivas muestran otra tabla', html: 'La diapositiva 15 usa el acumulado a noviembre de 2025: Perú 14,5 % (1.º), Colombia 13,0 %, México 8,2 %, Chile 4,4 % y Brasil 3,0 %. Es otro periodo y otro corte. En la exposición usen <b>una sola</b> serie y digan de qué periodo es.' },
        { t: 'h', texto: 'Lectura crítica: no todo es mérito del régimen' },
        { t: 'p', html: 'En junio de 2025 empezó a operar el <b>Megapuerto de Chancay</b>: redujo el viaje marítimo a China de <b>35–40 días a 23 días</b> y canalizó más de <b>US$ 3 500 M</b> en exportaciones en su primer año. La agroexportación a China creció <b>más de 80 %</b> en 2025, en parte por esta ruta directa.' },
        { t: 'tarjetas', items: [
          { titulo: 'Régimen de promoción', tono: 'devolucion', html: 'Baja el <b>costo tributario</b> de exportar.' },
          { titulo: 'Infraestructura (Chancay)', tono: 'suspension', html: 'Baja el <b>costo y el tiempo logístico</b>.' }
        ] },
        { t: 'h', texto: 'Ángulo contable y normativo (diapositiva 15)' },
        { t: 'lista', items: [
          'Mejora del capital de trabajo y rotación de inventarios con devolución ágil.',
          'Menor costo financiero al no requerir líneas de crédito cortas por IGV.',
          'El retraso de devoluciones inmoviliza liquidez y genera cuentas por cobrar a SUNAT.',
          'Alineado con el PENX y más de 20 tratados de libre comercio vigentes.'
        ] }
      ]
    },

    /* ============================================================ 14 */
    {
      id: 'problemas', num: 14, titulo: 'Limitaciones, riesgos y problemas', tituloCorto: 'Problemas y riesgos',
      pag: 'G p.14–15 · D 16',
      enSimple: 'El régimen funciona, pero tiene tres fallas importantes: <b>fraude, demora y desconocimiento</b>.',
      diloAsi: 'El problema no es que los beneficios no existan; es que la mype no sabe que existen o no tiene cómo cumplir los requisitos.',
      bloques: [
        { t: 'h', texto: '1. Uso indebido y fraude (empresas fantasma)' },
        { t: 'lista', items: [
          'Al cierre de 2025, SUNAT identificó <b>78 empresas “Sujetos sin Capacidad Operativa” (SSCO)</b>: emitían facturas sin tener personal, activos ni infraestructura real.',
          'Afectaron a más de <b>57 800 contribuyentes</b> y comprometieron más de <b>S/ 3 195 M</b> en crédito fiscal e Impuesto a la Renta.',
          'Para 2026, SUNAT proyecta identificar cerca de <b>3 000 empresas fantasma</b> vinculadas a más de <b>S/ 5 000 M</b> de crédito fiscal irregular.',
          'Estas cifras son del crédito fiscal en general (no solo de exportadores), pero el riesgo es el mismo: un exportador honesto puede comprarle a un proveedor fantasma sin saberlo y ver su devolución <b>observada o denegada</b>.',
          'El <b>D. Leg. 1716</b> amplió las conductas sancionables, con penas de hasta <b>8 años de prisión</b>.'
        ] },
        { t: 'h', texto: '2. Demora y condicionalidad en la devolución del IGV' },
        { t: 'lista', items: [
          'SUNAT tiene <b>30 días hábiles</b> para resolver (y <b>45</b> en regímenes de recuperación anticipada).',
          'El plazo <b>se suspende</b> automáticamente ante cualquier observación documentaria.',
          'La devolución <b>exprés</b> (2 a 5 días) solo es para empresas con historial sólido en el Perfil de Cumplimiento → las <b>nuevas, pequeñas</b> o con alguna observación quedan en los plazos largos.',
          '<b>Efecto:</b> mientras espera, el exportador no puede usar ese dinero para comprar insumos o pagar planilla, y puede tener que endeudarse.'
        ] },
        { t: 'h', texto: '3. Bajo conocimiento de los beneficios por parte de las mypes' },
        { t: 'widget', w: 'graficoMypes' },
        { t: 'lista', items: [
          'El gremio de la Pequeña Empresa de la CCL identificó <b>7 barreras</b>; destacan: falta de información sobre regulaciones técnicas y arancelarias, poco acceso a financiamiento especializado y dificultad para cumplir estándares de calidad.',
          'Un estudio sobre pymes agroexportadoras (Anton & Chávez, 2023) halló que la barrera más importante es <b>“la falta de conocimiento sobre el potencial del mercado de exportación”</b>, incluso por encima de la logística.'
        ] },
        { t: 'caja', tipo: 'ojo', titulo: '68 % o 73 %', html: '68 % de mipymes es de MINCETUR (ene–set 2025); 73 % es de la CCL (2025). Son fuentes distintas.' }
      ]
    },

    /* ============================================================ 15 */
    {
      id: 'propuestas', num: 15, titulo: 'Propuestas, conclusiones y recomendaciones', tituloCorto: 'Propuestas y conclusiones',
      pag: 'G p.15–16 · D 17–18',
      enSimple: 'A cada problema del módulo 14 le corresponde una <b>solución concreta</b>. Las conclusiones responden la pregunta central.',
      diloAsi: 'No proponemos crear más beneficios, sino hacer que los que ya existen lleguen mejor, más rápido y a quien más los necesita.',
      bloques: [
        { t: 'h', texto: 'Problema → efecto → propuesta' },
        { t: 'tabla', cabecera: ['Problema', 'Efecto concreto', 'Propuesta'], filas: [
          ['<b>1. Fraude y empresas fantasma</b>', '78 SSCO en 2025 (+S/ 3 195 M); ~3 000 casos proyectados en 2026 (+S/ 5 000 M).', '<b>Cruce automático</b> entre Aduanas y Tributos Internos de SUNAT para detectar proveedores SSCO <b>antes</b> de aprobar el Drawback o el saldo a favor, no después de pagar.'],
          ['<b>2. Demora en devolver el IGV</b>', '30–45 días hábiles, suspendibles; exprés solo para empresas con buen perfil.', '<b>Extender gradualmente</b> la devolución exprés a más exportadores y <b>publicar indicadores</b> del tiempo real de atención por tipo de empresa.'],
          ['<b>3. Mypes no conocen los beneficios</b>', '73 % de las exportadoras, pero 5,6 % del valor; falta información, capacidad técnica y financiamiento.', '<b>Programas de acompañamiento SUNAT-MINCETUR-PROMPERÚ</b>: asesoría gratuita y material simple sobre Exporta Fácil y saldo a favor en los <b>Centros de Desarrollo Empresarial</b>.']
        ] },
        { t: 'h', texto: '¿Son viables? Respaldo internacional' },
        { t: 'p', html: 'Sí. Van en línea con el <b>Acuerdo sobre Facilitación del Comercio (AFC) de la OMC</b>, vigente para el Perú desde 2017, que prioriza <b>transparencia, menos trámites y cooperación</b> entre autoridades. La OMC documenta que reformas de digitalización y ventanillas únicas redujeron hasta en <b>87 %</b> los tiempos de espera en algunas fronteras africanas. Eso respalda que es posible una devolución del IGV más rápida y menos dependiente del tamaño de la empresa.' },
        { t: 'h', texto: 'Conclusiones' },
        { t: 'pasos', items: [
          '<b>Cuatro instrumentos, cuatro lógicas.</b> El Drawback (3 % del FOB), el saldo a favor (recupera el IGV), la admisión temporal (no se pagan tributos al inicio) y Exporta Fácil (exportar por correo sin agente). Cada uno tiene sus propios requisitos y riesgos.',
          '<b>El caso práctico lo demuestra.</b> Textiles Andinos del Sur recupera <b>S/ 152 949,60 (≈17 % de lo exportado)</b>: S/ 27 000 por Drawback y S/ 125 949,60 por IGV. El IGV devuelto no es ganancia, sino dinero adelantado que vuelve como capital de trabajo.',
          '<b>Más digital, más exigente.</b> Desde febrero 2026 el Drawback es totalmente digital, exige trazabilidad y vence a los 180 días hábiles. Las mypes son el <b>73 %</b> de las exportadoras pero generan solo el <b>5,6 %</b> del valor → <b>no aprovechan los beneficios en la misma medida</b>. Esto responde la pregunta central.',
          '<b>Régimen + infraestructura.</b> Las no tradicionales crecieron 14,4 % en 2025, pero también influyó Chancay (de 35–40 a 23 días a China). El régimen baja el costo tributario y la infraestructura el logístico: se complementan.'
        ] },
        { t: 'h', texto: 'Recomendaciones' },
        { t: 'pasos', items: [
          '<b>SUNAT – prevenir el fraude:</b> detectar proveedores sin capacidad operativa <b>antes</b> de aprobar el Drawback o el saldo a favor, no después del pago. Así se frena el fraude y se protege al exportador de buena fe.',
          '<b>SUNAT – devolución más rápida:</b> hoy solo las empresas con buen perfil acceden a 2–5 días; el resto espera 30–45 días hábiles. Extender la modalidad exprés gradualmente y publicar los tiempos reales por tipo de empresa.',
          '<b>SUNAT, MINCETUR y PROMPERÚ – capacitar:</b> asesoría gratuita y guías sencillas sobre Drawback, saldo a favor y Exporta Fácil en los Centros de Desarrollo Empresarial, para cerrar la brecha de información.',
          '<b>Empresas – orden interno:</b> un expediente de sustento por cada solicitud, control de plazos (180 días hábiles del Drawback y 24 meses de la admisión temporal) y verificación de proveedores. Así evitan reintegros, multas y contingencias.'
        ] },
        { t: 'caja', tipo: 'consejo', titulo: 'Idea clave (diapositiva 18)', html: 'El régimen baja el costo tributario y la infraestructura el logístico: ambos se complementan.' }
      ]
    },

    /* ============================================================ 16 */
    {
      id: 'repaso', num: 16, titulo: 'Repaso final', tituloCorto: 'Repaso final',
      pag: 'G p.16–17 · D 19–22',
      enSimple: 'Las <b>preguntas probables</b> con respuesta corta, los <b>datos que parecen contradictorios</b> (y por qué no lo son), el <b>glosario</b> completo y la <b>bibliografía</b>.',
      diloAsi: 'El régimen baja el costo tributario y la infraestructura el logístico: ambos se complementan.',
      bloques: [
        { t: 'h', texto: 'Preguntas probables del profesor' },
        { t: 'preguntasProbables' },
        { t: 'h', texto: 'Ojo: datos del trabajo que conviene tener claros' },
        { t: 'ojo' },
        { t: 'h', texto: 'Glosario' },
        { t: 'glosario' },
        { t: 'h', texto: 'Referencias bibliográficas (APA 7, como en las diapositivas)' },
        { t: 'bibliografia' },
        { t: 'h', texto: 'Créditos' },
        { t: 'creditos' }
      ]
    }
  ],

  /* ---------------------------------------------------------------
   * Los 3 ángulos (colores e íconos en css/estilos.css)
   * --------------------------------------------------------------- */
  angulos: {
    normativo: { nombre: 'Normativo', pregunta: '¿Qué dice la norma?', descripcion: 'Qué dice la ley: normas, requisitos, plazos.' },
    economico: { nombre: 'Económico-operativo', pregunta: '¿Cómo funciona?', descripcion: 'Cómo funciona en la práctica y cuánto cuesta.' },
    contable: { nombre: 'Contable', pregunta: '¿Cómo se registra?', descripcion: 'Cómo se registra: cuentas, asientos, controles.' }
  },

  /* ---------------------------------------------------------------
   * Entidades (módulo 6) — G p.6 · D 9
   * --------------------------------------------------------------- */
  entidades: [
    { id: 'sunat', nombre: 'SUNAT', rol: 'El que ejecuta y controla', subtitulo: 'Administración y fiscalización', funciones: [
      'Controla el despacho aduanero de las exportaciones.',
      'Recibe y resuelve solicitudes de Drawback.',
      'Devuelve el IGV (saldo a favor del exportador).',
      'Fiscaliza la admisión temporal.',
      'Administra Exporta Fácil junto con SERPOST.',
      'Desde 2024: devolución “exprés” (2 a 5 días hábiles) para exportadores con buen Perfil de Cumplimiento.',
      'Identifica a los Sujetos sin Capacidad Operativa (SSCO) para prevenir fraude.'
    ] },
    { id: 'mincetur', nombre: 'MINCETUR', rol: 'El que diseña la estrategia', subtitulo: 'Política comercial', funciones: [
      'Ente rector de la política de comercio exterior y turismo.',
      'Diseña y actualiza el PENX.',
      'Negocia y administra los TLC.',
      'Regula las reglas de origen para acceder a preferencias arancelarias.',
      'Promueve la oferta peruana en ferias y misiones.',
      'Ejecuta programas para mipymes como “Perú Exporta Industria”.'
    ] },
    { id: 'promperu', nombre: 'PROMPERÚ', rol: 'El que vende al Perú afuera', subtitulo: 'Promoción internacional', funciones: [
      'Organismo técnico adscrito al MINCETUR.',
      'Promueve exportaciones no tradicionales y turismo receptivo.',
      'Lleva empresas a ferias internacionales (Fruit Logistica en Berlín, Anuga en Colonia).',
      'Organiza misiones comerciales inversas (trae compradores al Perú).',
      'Elabora inteligencia de mercados y gestiona la Marca Perú.',
      'Plataforma “Exportemos” para orientar al exportador.'
    ] },
    { id: 'mef', nombre: 'MEF', rol: 'El que pone las reglas del dinero', subtitulo: 'Política fiscal', funciones: [
      'Rector de la política fiscal.',
      'Fija o modifica por decreto supremo la tasa del Drawback.',
      'Aprueba los reglamentos de la Ley del IGV y de la Ley General de Aduanas.',
      'Evalúa el impacto fiscal (cuánto le cuesta al Estado) de cada instrumento.',
      'Pone los límites dentro de los cuales operan SUNAT y MINCETUR.'
    ] }
  ],

  /* Funciones para el juego "función → entidad" */
  juegoEntidades: [
    { texto: 'Resuelve las solicitudes de Drawback', entidad: 'sunat' },
    { texto: 'Devuelve el IGV al exportador', entidad: 'sunat' },
    { texto: 'Identifica a los SSCO (empresas fantasma)', entidad: 'sunat' },
    { texto: 'Administra Exporta Fácil con SERPOST', entidad: 'sunat' },
    { texto: 'Diseña y actualiza el PENX', entidad: 'mincetur' },
    { texto: 'Negocia y administra los TLC', entidad: 'mincetur' },
    { texto: 'Ejecuta “Perú Exporta Industria”', entidad: 'mincetur' },
    { texto: 'Lleva empresas a Fruit Logistica y Anuga', entidad: 'promperu' },
    { texto: 'Gestiona la Marca Perú', entidad: 'promperu' },
    { texto: 'Organiza misiones comerciales inversas', entidad: 'promperu' },
    { texto: 'Fija por decreto supremo la tasa del Drawback', entidad: 'mef' },
    { texto: 'Evalúa el impacto fiscal de cada instrumento', entidad: 'mef' },
    { texto: 'Aprueba los reglamentos de la Ley del IGV y de Aduanas', entidad: 'mef' }
  ],

  /* ---------------------------------------------------------------
   * Comparador de instrumentos (módulo 7)
   * Cada valor sale de los módulos 7 a 11.
   * --------------------------------------------------------------- */
  comparador: {
    criterios: [
      { id: 'tipo', nombre: 'Tipo de beneficio' },
      { id: 'que', nombre: '¿Qué recupera o evita?' },
      { id: 'plazo', nombre: 'Plazo clave' },
      { id: 'garantia', nombre: '¿Requiere garantía?' },
      { id: 'riesgo', nombre: 'Riesgo si fallas' },
      { id: 'quien', nombre: '¿A quién beneficia más?' },
      { id: 'norma', nombre: 'Norma principal' },
      { id: 'contable', nombre: 'Registro contable' }
    ],
    instrumentos: [
      { id: 'drawback', nombre: 'Drawback', tipo: 'devolucion', valores: {
        tipo: 'Devolución: pagas y luego recuperas',
        que: 'Aranceles de insumos importados (3 % del FOB, tope 50 % del costo)',
        plazo: '180 días hábiles desde el embarque; mínimo US$ 500 por solicitud',
        garantia: 'No',
        riesgo: 'Reintegro con intereses y multa',
        quien: 'Empresas que importan insumos para fabricar lo que exportan',
        norma: 'D.S. 104-95-EF · DESPA-PG.07 v5',
        contable: 'Ingreso: 16 → 75; cobro 10 → 16'
      } },
      { id: 'saldo', nombre: 'Saldo a favor', tipo: 'devolucion', valores: {
        tipo: 'Devolución: pagas y luego recuperas (o compensas)',
        que: 'IGV de compras para exportar (límite 18 % del FOB)',
        plazo: '4 años para pedirla; SUNAT 30 días hábiles (exprés 2 a 5)',
        garantia: 'No (con garantía el plazo es menor)',
        riesgo: 'Solicitud observada (p. ej., proveedor sin capacidad operativa) y dinero inmovilizado',
        quien: 'Todo exportador registrado en SUNAT que pagó IGV',
        norma: 'TUO Ley del IGV (D.S. 055-99-EF), arts. 33-36',
        contable: 'Crédito fiscal en cuenta 40; devolución 10 → 40 (no es ganancia)'
      } },
      { id: 'admision', nombre: 'Admisión temporal', tipo: 'suspension', valores: {
        tipo: 'Suspensión: no pagas desde el inicio',
        que: 'Aranceles e IGV de importación de los insumos',
        plazo: 'Hasta 24 meses desde el levante',
        garantia: 'Sí: tributos suspendidos + interés compensatorio',
        riesgo: 'Ejecución de garantía + tributos con intereses',
        quien: 'Sectores con muchos insumos importados: textil, confecciones, metalmecánica',
        norma: 'D. Leg. 1053 · DESPA-PG.06 v6',
        contable: 'Existencias 24/25 sin tributos, kardex separado; fianza = gasto financiero'
      } },
      { id: 'exporta', nombre: 'Exporta Fácil', tipo: 'facilitacion', valores: {
        tipo: 'Facilitación: no es beneficio tributario',
        que: 'El costo y trámite del agente de aduanas',
        plazo: 'Envío: 10 a 30 días (económico) o 7 a 10 (expreso)',
        garantia: 'No',
        riesgo: 'Superar límites (US$ 7 500 FOB por DEF, 30 kg)',
        quien: 'Micro y pequeñas empresas, artesanos y personas naturales',
        norma: 'D.S. 067-2006-EF',
        contable: 'Exportación no gravada; flete postal a cuenta 63'
      } }
    ]
  },

  /* ---------------------------------------------------------------
   * Gráficos (módulos 13 y 14)
   * --------------------------------------------------------------- */
  graficos: {
    paises: {
      titulo: 'Crecimiento de las exportaciones no tradicionales 2025 (%)',
      fuente: 'Guía ampliada, punto 13 (cifras BCRP 2025).',
      datos: [
        { pais: 'Perú', valor: 14.4, destacar: true },
        { pais: 'Colombia', valor: 14.4 },
        { pais: 'México', valor: 9.3 },
        { pais: 'Brasil', valor: 3.8 },
        { pais: 'Chile', valor: 1.7 }
      ]
    },
    mypes: {
      titulo: 'Mypes: cuántas son vs. cuánto exportan',
      fuente: 'CCL, 2025 (guía ampliada, punto 14.3).',
      datos: [
        { etiqueta: 'de las empresas exportadoras son mypes (+6 700)', valor: 73 },
        { etiqueta: 'del valor exportado lo generan las mypes', valor: 5.6 }
      ]
    }
  },

  /* ---------------------------------------------------------------
   * Preguntas probables (G p.16–17)
   * --------------------------------------------------------------- */
  preguntasProbables: [
    { p: '¿Por qué el Drawback peruano es “simplificado”?', r: 'Porque no devuelve el arancel exacto pagado: devuelve un 3 % fijo del FOB. La Corte Suprema lo llamó “transferencia de recursos del Estado”.', modulo: 'drawback' },
    { p: '¿El Drawback es ingreso o menor costo?', r: 'Se trata como ingreso (cuenta 75), al ser una transferencia del Estado; por eso se analiza su efecto en el Impuesto a la Renta.', modulo: 'drawback' },
    { p: '¿Diferencia entre SFE y SFMB?', r: 'SFE es todo el IGV de compras para exportar; SFMB es lo que queda tras descontar el IGV de ventas locales. Solo el SFMB se devuelve, con tope de 18 % del FOB.', modulo: 'saldo-a-favor' },
    { p: '¿Puedo usar Drawback y admisión temporal en el mismo insumo?', r: 'No, sería doble beneficio; salvo que el insumo se nacionalice pagando todo.', modulo: 'admision-temporal' },
    { p: '¿Por qué el límite de insumos importados es 50 % del FOB?', r: 'Para que el producto tenga valor agregado nacional y no sea solo importar y reexportar.', modulo: 'drawback' },
    { p: '¿Qué pasa si no exporto a tiempo en admisión temporal?', r: 'SUNAT da la mercancía por nacionalizada y ejecuta la garantía: pagas tributos más intereses.', modulo: 'admision-temporal' },
    { p: '¿Por qué Exporta Fácil importa si mueve tan poco dinero?', r: 'Porque su meta no es volumen, sino incorporar nuevos exportadores y formalizar a los pequeños.', modulo: 'exporta-facil' },
    { p: '¿El crecimiento exportador prueba que el régimen funciona?', r: 'No del todo: también influyó Chancay. Por eso hablamos de efectos complementarios.', modulo: 'impacto' },
    { p: '¿Por qué la digitalización perjudica a las mypes si es para todos?', r: 'Porque exige sistemas, personal y control interno que la gran empresa tiene y la pequeña no: la regla es igual, pero la capacidad de cumplirla no.', modulo: 'marco-normativo' },
    { p: '¿Por qué no se exportan impuestos?', r: 'Por el criterio de imposición en el país de destino: el impuesto lo cobra el país donde se consume el bien.', modulo: 'marco-conceptual' }
  ],

  /* ---------------------------------------------------------------
   * Lista "Ojo" (G p.17), tal cual
   * --------------------------------------------------------------- */
  ojo: [
    { titulo: 'Exportaciones 2025', html: 'La introducción dice <b>US$ 90 082 M</b> (MINCETUR, bienes) y el punto 13 dice <b>US$ 92 833 M</b> (BCRP, totales). Si preguntan: son <b>fuentes y mediciones distintas</b>.' },
    { titulo: 'Peso de las mipymes', html: '<b>68 %</b> (MINCETUR, ene–set 2025) vs. <b>73 %</b> (CCL, 2025). También son <b>fuentes distintas</b>.' },
    { titulo: 'Ranking regional', html: 'Perú y Colombia empatan con <b>14,4 %</b>; lo correcto es decir que <b>comparten el primer lugar</b>.' },
    { titulo: 'Admisión temporal', html: 'El punto 4 del trabajo define la de “reexportación en el mismo estado” (sin transformar), pero el trabajo analiza la de <b>“perfeccionamiento activo”</b> (con transformación). Son regímenes diferentes.' }
  ],

  /* ---------------------------------------------------------------
   * Glosario. Las definiciones marcadas con general:true no están
   * en las fuentes; se agregaron solo para entender (ver
   * PENDIENTES_DE_VERIFICAR.md).
   * --------------------------------------------------------------- */
  glosario: [
    { termino: 'Admisión temporal para perfeccionamiento activo', def: 'Régimen que permite ingresar insumos extranjeros con suspensión de tributos para transformarlos y exportar el producto compensador en hasta 24 meses, con garantía.', modulo: 'admision-temporal' },
    { termino: 'Beneficio tributario o aduanero', def: 'Ventaja económica (exoneración, devolución o suspensión de un tributo) para fomentar una actividad de interés general.', modulo: 'marco-conceptual' },
    { termino: 'Carta fianza / póliza de caución', def: 'Garantía que se entrega a SUNAT en la admisión temporal. Su comisión se registra como gasto financiero.', modulo: 'admision-temporal' },
    { termino: 'CCL', def: 'Cámara de Comercio de Lima. Su gremio de la Pequeña Empresa identificó 7 barreras para las mypes exportadoras.', modulo: 'problemas' },
    { termino: 'CIF', def: 'Valor de la mercancía importada que incluye costo, seguro y flete hasta el destino. En el Drawback, el CIF de los insumos importados debe ser ≤ 50 % del FOB exportado.', modulo: 'drawback', general: true },
    { termino: 'CIP (Cuadro de Insumo Producto)', def: 'Documento que se transmite en la admisión temporal con los coeficientes de consumo, mermas y desperdicios.', modulo: 'admision-temporal' },
    { termino: 'Clave SOL', def: 'Clave de acceso a SUNAT Operaciones en Línea. Se exige para el Drawback, la admisión temporal y Exporta Fácil.', modulo: 'exporta-facil' },
    { termino: 'Código 13', def: 'Código con el que se indica, en la declaración de exportación, la voluntad de acogerse al Drawback.', modulo: 'drawback' },
    { termino: 'Crédito fiscal', def: 'IGV pagado en las compras que se registra en la cuenta 40. En el exportador se acumula porque sus ventas al exterior no llevan IGV.', modulo: 'saldo-a-favor' },
    { termino: 'DEF (Declaración Exporta Fácil)', def: 'Declaración que se registra en SUNAT para exportar por Exporta Fácil. Máximo US$ 7 500 FOB por DEF.', modulo: 'exporta-facil' },
    { termino: 'DESPA-PG.06 (versión 6)', def: 'Procedimiento de SUNAT de la admisión temporal para perfeccionamiento activo.', modulo: 'admision-temporal' },
    { termino: 'DESPA-PG.07 (versión 5)', def: 'Procedimiento de SUNAT del Drawback (restitución simplificada), vigente desde el 2 de febrero de 2026, 100 % digital.', modulo: 'drawback' },
    { termino: 'Devolución (tipo de beneficio)', def: 'Pagas el tributo primero y lo recuperas después. Ejemplos: Drawback y saldo a favor.', modulo: 'instrumentos' },
    { termino: 'Devolución exprés', def: 'Devolución del IGV en 2 a 5 días hábiles, desde 2024, solo para exportadores con buen Perfil de Cumplimiento.', modulo: 'saldo-a-favor' },
    { termino: 'Drawback (restitución simplificada)', def: 'Restitución de derechos arancelarios: en el Perú, el menor entre 3 % del FOB exportado y 50 % del costo de producción.', modulo: 'drawback' },
    { termino: 'Exporta Fácil', def: 'Procedimiento simplificado para exportar por SERPOST sin agente de aduanas (D.S. 067-2006-EF).', modulo: 'exporta-facil' },
    { termino: 'Exportación definitiva', def: 'Régimen por el que mercancías nacionales o nacionalizadas salen del país para usarse o consumirse definitivamente en el exterior. No paga tributos.', modulo: 'marco-conceptual' },
    { termino: 'Exportaciones no tradicionales', def: 'Las más ligadas al Drawback y al saldo a favor: manufactureras, agroindustriales, textiles. Crecieron 14,4 % en 2025.', modulo: 'impacto' },
    { termino: 'Facilitación (tipo de beneficio)', def: 'No devuelve ni suspende tributos: simplifica el trámite. Ejemplo: Exporta Fácil.', modulo: 'instrumentos' },
    { termino: 'FOB', def: 'Valor de la mercancía puesta a bordo en el punto de embarque, sin flete ni seguro internacional. Es la base de cálculo del Drawback (3 %) y del límite del saldo a favor (18 %).', modulo: 'drawback', general: true },
    { termino: 'Garantía (admisión temporal)', def: 'Respaldo por los tributos suspendidos más el interés compensatorio. Si el plazo vence sin una salida del régimen, SUNAT la ejecuta.', modulo: 'admision-temporal' },
    { termino: 'IGV + IPM', def: 'En el caso práctico, la importación paga 16 % de IGV + 2 % de Impuesto de Promoción Municipal = 18 %.', modulo: 'caso-practico' },
    { termino: 'Imposición en el país de destino', def: 'Criterio por el que el impuesto lo cobra el país donde se consume el bien. Por eso “no se exportan impuestos”.', modulo: 'marco-conceptual' },
    { termino: 'Interés compensatorio', def: 'Interés que se suma a los tributos suspendidos en la garantía de la admisión temporal; se calcula con la TAMEX.', modulo: 'admision-temporal' },
    { termino: 'Kardex separado', def: 'Control de existencias que separa los insumos en admisión temporal de las existencias nacionalizadas.', modulo: 'admision-temporal' },
    { termino: 'Levante', def: 'Momento desde el que se cuentan los 24 meses de la admisión temporal.', modulo: 'admision-temporal' },
    { termino: 'Mercancías auxiliares', def: 'Combustibles, lubricantes y repuestos: no pueden ingresar por admisión temporal.', modulo: 'admision-temporal' },
    { termino: 'MIPYME / mype', def: 'Micro, pequeña y mediana empresa / micro y pequeña empresa. Son la mayoría de exportadoras (68 % MINCETUR; 73 % CCL) pero generan el 5,6 % del valor.', modulo: 'por-que-importa' },
    { termino: 'Notas de Crédito Negociables', def: 'Una de las formas en que SUNAT puede devolver el saldo a favor (la otra es el abono en cuenta).', modulo: 'saldo-a-favor' },
    { termino: 'PDB Exportadores (formulario 0201)', def: 'Declaración previa obligatoria antes de pedir la devolución del saldo a favor (R.S. 157-2005/SUNAT).', modulo: 'saldo-a-favor' },
    { termino: 'PENX 2025-2035', def: 'Plan Estratégico Nacional Exportador, aprobado por R.M. 089-2024-MINCETUR. 4 ejes: internacionalización, facilitación, oferta competitiva y capacidades institucionales.', modulo: 'politica-comercial' },
    { termino: 'Perfil de Cumplimiento', def: 'Calificación del contribuyente en SUNAT; un buen perfil permite la devolución exprés.', modulo: 'saldo-a-favor' },
    { termino: 'Producto compensador', def: 'El bien que resulta de transformar los insumos en admisión temporal y que se exporta.', modulo: 'admision-temporal' },
    { termino: 'Régimen de promoción de exportaciones', def: 'Conjunto de normas, procedimientos y beneficios que el Estado diseña para incentivar que las empresas vendan afuera.', modulo: 'marco-conceptual' },
    { termino: 'RIP (Relación de Insumo Producto)', def: 'Documento que se presenta al exportar en la admisión temporal; debe coincidir con el CIP.', modulo: 'admision-temporal' },
    { termino: 'Saldo a favor del exportador', def: 'IGV de las compras para exportar que el exportador puede compensar o pedir que le devuelvan.', modulo: 'saldo-a-favor' },
    { termino: 'SERPOST', def: 'Servicio postal por el que se envían las exportaciones de Exporta Fácil (hasta 30 kg por paquete).', modulo: 'exporta-facil' },
    { termino: 'SFE (Saldo a favor por exportación)', def: 'Todo el IGV de compras e importaciones vinculadas a las exportaciones del mes.', modulo: 'saldo-a-favor' },
    { termino: 'SFMB (Saldo a favor materia del beneficio)', def: 'SFE menos el IGV de ventas locales. Solo el SFMB se compensa o devuelve; límite mensual 18 % del FOB.', modulo: 'saldo-a-favor' },
    { termino: 'SSCO (Sujetos sin Capacidad Operativa)', def: 'Empresas “fantasma” que emiten facturas sin personal, activos ni infraestructura real. 78 identificadas en 2025.', modulo: 'problemas' },
    { termino: 'Subvenciones del gobierno (NIIF)', def: 'Criterio con el que suele analizarse el Drawback, por ser una transferencia del Estado.', modulo: 'drawback' },
    { termino: 'Suspensión (tipo de beneficio)', def: 'No pagas el tributo desde el inicio, pero garantizas. Ejemplo: admisión temporal.', modulo: 'instrumentos' },
    { termino: 'TAMEX', def: 'Tasa con la que se calcula el interés compensatorio de la garantía en la admisión temporal.', modulo: 'admision-temporal' },
    { termino: 'TLC', def: 'Tratado de libre comercio. El Perú tiene 22 acuerdos con más de 50 países (≈95 % de los destinos).', modulo: 'politica-comercial' },
    { termino: 'Trazabilidad insumo-producto', def: 'Poder demostrar que el insumo se usó en el producto exportado: compras/importaciones → producción → exportación.', modulo: 'drawback' }
  ],

  /* ---------------------------------------------------------------
   * Bibliografía (diapositivas 19–22), sin duplicados.
   * Ver PENDIENTES_DE_VERIFICAR.md sobre URLs cortadas en el PDF.
   * --------------------------------------------------------------- */
  bibliografia: [
    { texto: 'Asociación de Exportadores del Perú. (2025). <i>Presentación ADEX: Régimen de restitución de derechos arancelarios – Drawback</i>. Comisión de Comercio Exterior y Turismo, Congreso de la República del Perú.', url: 'https://www.congreso.gob.pe/Docs/comisiones2024/Comercio/files/sed_007_exposicion_05_adex_27_01_2025.pdf' },
    { texto: 'Banco Central de Reserva del Perú. (2025). <i>Las exportaciones no tradicionales crecieron 17 % y las tradicionales aumentaron 9,2 % en junio</i> [Nota informativa].', url: 'https://www.bcrp.gob.pe/docs/Transparencia/Notas-Informativas/2025/nota-informativa-2025-08-17.pdf' },
    { texto: 'Decreto Legislativo N.° 1053. (2008, 27 de junio). <i>Ley General de Aduanas</i>. Congreso de la República del Perú.', url: '' },
    { texto: 'LexLatin. (2026, 13 de enero). <i>SUNAT actualiza el régimen de drawback, ¿qué implica para los exportadores en Perú?</i>', url: 'https://lexlatin.com/noticias/regimen-drawback-sunat-actualiza-exportadores-peru' },
    { texto: 'MINCETUR. (2025). <i>Exportaciones peruanas bordean los US$ 63 mil millones entre enero y septiembre del 2025</i>. Plataforma digital única del Estado Peruano.', url: 'https://www.gob.pe/institucion/mincetur/noticias/1280753-mincetur-exportaciones-peruanas-bordean-los-us-63-mil-millones-entre-enero-y-setiembre-del-2025' },
    { texto: 'MINCETUR. (2026). <i>Exportaciones del Perú alcanzaron los US$ 90 082 millones y consolidan al país como potencia comercial de Sudamérica</i>. Plataforma digital única del Estado Peruano.', url: 'https://www.gob.pe/institucion/mincetur/noticias/1346927-mincetur-exportaciones-del-peru-alcanzaron-los-us-90-082-millones-y-consolidan-al-pais-como-potencia-comercial-de-sudamerica' },
    { texto: 'MINCETUR. (2026). <i>Exportaciones manufactureras superan los US$ 6 987 millones entre enero y abril</i>. El Peruano.', url: 'https://elperuano.pe/noticia/297782-mincetur-exportaciones-manufactureras-superan-los-us-6987-mllns-entre-enero-y-abri' },
    { texto: 'Quispe, R., & Ramirez, J. (2022). Beneficios tributarios y su impacto en la gestión financiera de las empresas exportadoras peruanas. <i>Revista de Investigación Contable de San Marcos, 4</i>(1), 45–62.', url: '' },
    { texto: 'SOSCIA. (2025, 22 de septiembre). <i>Devolución del IGV 2025: plazos, requisitos y novedades que debes conocer</i>.', url: '' }
  ]
};
