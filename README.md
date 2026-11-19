# Aprende: Régimen de Promoción de Exportaciones en el Perú

Web educativa e interactiva, en español, para **aprender, practicar y repasar** el tema del curso de Comercio Internacional: Drawback, saldo a favor del exportador, admisión temporal y Exporta Fácil, analizados desde tres ángulos (normativo, económico-operativo y contable).

> Material de estudio basado en el trabajo del curso; verifica la normativa vigente en SUNAT y MINCETUR antes de aplicarla a un caso real.

## Cómo abrirla

- **Doble clic en `index.html`**. No necesita internet, instalación ni servidor.
- Para comprobar las fórmulas: doble clic en `tests.html` (debe decir “47 de 47 pruebas correctas”).

## Qué tiene

- **17 módulos** (0 a 16): cada uno con “En simple”, desarrollo, “Dilo así”, mini-práctica y botón “Marcar como completado”. Los instrumentos tienen pestañas para los 3 ángulos.
- **Calculadora de Drawback** y **calculadora de saldo a favor (SFE / SFMB)**, con el paso a paso y el ejemplo del caso.
- **Caso práctico guiado** (Textiles Andinos del Sur): calculas cada paso antes de ver la respuesta; al final, los asientos contables.
- **Selector “¿Qué instrumento me conviene?”**, **comparador** con filtros, **trámite del Drawback** y **recorrido de la admisión temporal** (con sus 4 salidas).
- **Mapa de entidades** y juego “función → entidad”.
- **Flashcards** con repetición espaciada (cajas 1 → 3), **cuestionarios** por módulo y **examen final** de 30 preguntas al azar.
- **Modo exposición**, **buscador** (no distingue tildes) y **progreso** guardado en el navegador.
- Botón **Imprimir / PDF** en cada módulo; modo **claro/oscuro**; diseño para celular.

## Estructura

```
index.html            página principal
tests.html            pruebas de las fórmulas y de los datos
css/estilos.css       diseño (colores en variables al inicio)
js/calculos.js        FÓRMULAS (funciones puras: calcularDrawback, calcularSaldoFavor, calcularSFMB, costoEspera)
js/util.js            utilidades, íconos, guardado de progreso
js/render.js          convierte los datos en HTML
js/widgets.js         calculadoras, caso guiado, selector, comparador, gráficos, juego
js/practica.js        cuestionarios, examen y flashcards
js/app.js             navegación, inicio, buscador, modo exposición
data/config.js        títulos, créditos y aviso (edítalo tú)
data/contenido.js     TODO el contenido de los módulos
data/preguntas.js     banco de preguntas
PENDIENTES_DE_VERIFICAR.md   datos a revisar
```

## Cómo editar el contenido

Todo está en `data/contenido.js`. Cada módulo es una lista de **bloques**; los tipos están explicados al inicio del archivo. Ejemplos:

```js
{ t: 'p', html: 'Texto con <b>negrita</b>.' }
{ t: 'cifras', items: [{ valor: '3 %', etiqueta: 'del valor FOB' }] }
{ t: 'caja', tipo: 'ojo', titulo: 'Atención', html: 'Texto de la advertencia.' }
```

- Para **corregir un dato** (una cifra, una norma), búscalo en `data/contenido.js` y cámbialo ahí: la web se actualiza sola.
- Si cambia una **tasa o límite** (3 %, 50 %, 18 %), cámbialo también en `PARAMETROS` dentro de `js/calculos.js` y vuelve a abrir `tests.html`.
- Usa comillas tipográficas “ ” dentro de los textos (no comillas rectas).
- Los **créditos** se cambian en `data/config.js`.

## Cómo agregar preguntas

En `data/preguntas.js`, copia una línea y cambia el `id` (debe ser único) y los textos:

```js
// Opción múltiple: c = número de la opción correcta, empezando en 0
{ id: 'd11', m: 'drawback', tipo: 'mc', q: '¿Pregunta?', ops: ['Correcta', 'Otra', 'Otra'], c: 0, exp: 'Explicación.' },
// Verdadero / falso
{ id: 'd12', m: 'drawback', tipo: 'vf', q: 'Afirmación.', c: true, exp: 'Justificación.' },
// Cálculo: r = respuesta, tol = margen aceptado, u = unidad
{ id: 'd13', m: 'drawback', tipo: 'calc', q: '¿Cuánto…?', r: 3000, tol: 0.5, u: 'US$', exp: 'Cómo se calcula.' },
```

`m` es el id del módulo (por ejemplo `drawback`, `saldo-a-favor`, `exporta-facil`). Las opciones se mezclan solas al mostrarse. El examen final toma 30 preguntas al azar de todo el banco.

## Publicar gratis en GitHub Pages

1. Crea el repositorio y súbelo (con la herramienta `gh` ya iniciada):
   ```
   gh repo create aprende-exportaciones --public --source . --push
   ```
2. Activa Pages: en GitHub, **Settings → Pages → Build and deployment → Source: Deploy from a branch → Branch: `main` / `(root)` → Save**.
3. En 1–2 minutos la web estará en `https://<tu-usuario>.github.io/aprende-exportaciones/`.

La carpeta `fuentes/` (PDFs originales con nombres de integrantes y docente) está en `.gitignore` y **no se sube**.

## Privacidad

Sin cookies, sin cuentas y sin rastreo. El progreso, el tema y las flashcards se guardan solo en el navegador de quien usa la web (`localStorage`); si el navegador lo bloquea, la web funciona igual sin guardar.
