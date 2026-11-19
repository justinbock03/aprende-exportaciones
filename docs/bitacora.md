# Bitácora del proyecto

Registro de sesiones de trabajo. La entrada más reciente va primero.

---

## 2026-11-19 09:13 — Creación de la web y publicación en GitHub Pages

**Qué se hizo**
- `index.html` (creado): página principal; carga los datos y los scripts con `<script>` normales para que abra con doble clic, sin servidor.
- `css/estilos.css` (creado): diseño adaptable al celular, modo claro/oscuro, colores de los 3 ángulos y reglas de impresión.
- `data/config.js` (creado): título, créditos genéricos (“Trabajo del Grupo 8 – Comercio Internacional”) y aviso del pie; editable.
- `data/contenido.js` (creado): los 17 módulos (0–16), entidades, comparador, gráficos, preguntas probables, “Ojo”, glosario y bibliografía, tomados de la guía y las diapositivas.
- `data/preguntas.js` (creado): banco de 106 preguntas (opción múltiple, V/F y cálculo), de 5 a 10 por módulo.
- `js/calculos.js` (creado): fórmulas puras del Drawback, saldo a favor (SFE/SFMB), límite del 18 % y costo de esperar.
- `js/util.js`, `js/render.js`, `js/widgets.js`, `js/practica.js`, `js/app.js` (creados): utilidades y progreso guardado, dibujo de módulos, calculadoras y herramientas, cuestionarios/examen/flashcards, navegación, buscador y modo exposición.
- `tests.html` + `js/tests.js` (creados): 47 pruebas de las fórmulas, de los casos borde y de los datos.
- `img/icono.svg` (creado): ícono de la pestaña del navegador.
- `README.md` (creado): cómo abrir, editar contenido, agregar preguntas y publicar.
- `PENDIENTES_DE_VERIFICAR.md` (creado): diferencias entre la guía y las diapositivas, problemas de la bibliografía y fuentes citadas que faltan.
- `.gitignore` (creado): excluye `fuentes/` (PDF originales con nombres) y archivos temporales.
- `docs/bitacora.md` (creado): esta bitácora.
- Repositorio público `aprende-exportaciones` creado en GitHub, con 6 commits subidos y GitHub Pages activado desde `main` / raíz. Web publicada: https://justinbock03.github.io/aprende-exportaciones/

**Decisiones**
- Scripts clásicos en vez de módulos ES — porque los módulos no funcionan al abrir el archivo con doble clic (`file://`).
- Contenido y preguntas en archivos de datos separados del código — para poder corregir una cifra sin tocar la lógica.
- El gráfico por países usa la tabla de la guía y no la de la diapositiva 15 — porque la guía es la fuente principal; la diferencia queda anotada en el módulo 13 y en los pendientes.
- No se inventaron ni completaron datos dudosos (URL cortadas, fuentes que faltan) — se anotaron en `PENDIENTES_DE_VERIFICAR.md`.
- `fuentes/` no se sube al repositorio — porque los PDF llevan nombres de integrantes y del docente.

**Problemas**
- Los íconos se veían enormes dentro de los botones → se fijó su tamaño en el CSS.
- Las flashcards nuevas saltaban a la caja 2 al marcar “Lo sé” → corregido para que suban de una caja en una.
- En el celular la pestaña “Contable” se cortaba → nombres cortos de pestañas en pantallas angostas.
- El texto de los gráficos se veía diminuto en el celular → el ancho del gráfico ahora depende del espacio disponible.
- El mensaje del 4.º commit dice “101 preguntas”, pero son 106 → **Pendiente:** solo es el texto del historial; no afecta la web.

**Próximos pasos** (en orden de prioridad)
1. Decidir con el grupo qué cifras de la tabla de países se dirán en la exposición (guía o diapositiva 15) y, si es la diapositiva, cambiar `graficos.paises` en `data/contenido.js`.
2. Abrir el enlace de MINCETUR/El Peruano que termina en “…-abri” y corregirlo en la bibliografía de `data/contenido.js`.
3. Cambiar las dos referencias “MINCETUR (2026)” a 2026a y 2026b en la bibliografía.
4. Agregar las referencias APA de las fuentes citadas que faltan (lista en `PENDIENTES_DE_VERIFICAR.md`, sección 3).
5. Recorrer la web publicada desde el celular y anotar cualquier texto que no coincida con el trabajo escrito.

**Conceptos aprendidos**
- **`git init -b main`**: convierte una carpeta en repositorio de Git y llama `main` a la rama principal.
- **`git add` y `git commit`**: `add` elige qué cambios entran en la próxima versión y `commit` la guarda con un mensaje. Cada commit es un “punto de guardado” al que se puede volver.
- **`.gitignore`**: lista de archivos o carpetas que Git no sube nunca (aquí, `fuentes/` con los PDF).
- **`gh repo create … --push`**: crea el repositorio en GitHub, lo conecta con la carpeta (remoto `origin`) y sube los commits, todo de una vez.
- **`git push`**: sube a GitHub los commits que tienes solo en tu PC. Con Pages activado, la web se actualiza sola 1–2 minutos después.
- **GitHub Pages**: servicio gratuito de GitHub que publica como página web los archivos de un repositorio (aquí, desde la rama `main`).
- **`localStorage`**: espacio pequeño del navegador donde la web guarda el progreso y el tema; queda solo en el navegador de cada persona, no en internet.

---
