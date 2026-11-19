# Aprende: Régimen de Promoción de Exportaciones (web del curso de Comercio Internacional)

Web educativa estática (HTML + CSS + JS, sin librerías ni servidor) sobre Drawback, saldo a favor del
exportador, admisión temporal y Exporta Fácil, desde tres ángulos: normativo, económico-operativo y contable.
Publicada en GitHub Pages desde `main` / raíz (repositorio público `aprende-exportaciones`).

## Usuario y forma de trabajar
- Responder en español, con pasos simples y comandos listos para copiar (el usuario viene del área contable).
- Antes de cambiar código, explicar en una o dos frases qué se va a cambiar y por qué.
- Basarse solo en las fuentes del trabajo (guía ampliada y diapositivas). NO inventar ni completar datos dudosos:
  anotarlos en `PENDIENTES_DE_VERIFICAR.md`.

## Reglas técnicas
- Debe abrir con DOBLE CLIC en `index.html` (`file://`): usar scripts clásicos con `<script>`, NO módulos ES ni
  `fetch` de archivos locales.
- El contenido va en `data/` (`contenido.js` = módulos, `preguntas.js` = banco de preguntas, `config.js` =
  títulos y créditos). La lógica va en `js/`. Para corregir un dato, se cambia en `data/`, no en el código.
- Fórmulas en `js/calculos.js` (funciones puras). Si cambia una tasa o un límite (3 %, 50 %, 18 %), actualizar
  `PARAMETROS` y abrir `tests.html`: debe decir que pasan todas las pruebas (hoy 47 de 47).
- En los textos se usan comillas tipográficas “ ” (no rectas). Los `id` de las preguntas deben ser únicos.
- Revisar cómo se ve en el celular y en modo oscuro después de cambiar el diseño.

## Fuentes y decisiones tomadas
- La guía es la fuente principal: el gráfico por países usa la tabla de la guía, no la de la diapositiva 15
  (la diferencia está anotada en el módulo 13 y en los pendientes).
- `PENDIENTES_DE_VERIFICAR.md` es la lista vigente de datos por revisar.

## Privacidad
- `fuentes/` (PDF originales con nombres de integrantes y del docente) está en `.gitignore`: NUNCA subirla
  ni copiar esos nombres a la web, al README o a este archivo. Los créditos son genéricos ("Grupo 8").
- La web no usa cookies ni rastreo; el progreso se guarda solo en `localStorage`.

## Publicar
- `git add` + `git commit` + `git push`; GitHub Pages actualiza la web en 1–2 minutos.

## Continuidad entre sesiones
La bitácora está en `docs/bitacora.md` (entrada más reciente primero).
