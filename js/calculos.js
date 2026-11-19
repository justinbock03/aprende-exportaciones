/*
 * CÁLCULOS (funciones puras)
 * ------------------------------------------------------------------
 * Aquí están todas las fórmulas del trabajo. No tocan la página: solo
 * reciben números y devuelven resultados. Así se pueden probar solas
 * (ver tests.html).
 *
 * Fuentes: guía ampliada, puntos 9, 10 y caso práctico.
 *   Drawback = menor(3 % × FOB ; 50 % × costo de producción)
 *   Requisito: CIF de insumos importados ≤ 50 % del FOB
 *   SFMB = SFE − IGV de ventas locales ; límite = 18 % × FOB
 *   Costo de esperar = monto × tasa anual × días / 360
 */
(function (global) {
  'use strict';

  // Parámetros vigentes según las fuentes (se cambian aquí si cambia la norma).
  var PARAMETROS = {
    tasaDrawback: 0.03,       // 3 % del FOB
    topeCosto: 0.50,          // 50 % del costo de producción
    limiteInsumos: 0.50,      // CIF insumos importados ≤ 50 % del FOB
    minimoSolicitudUSD: 500,  // mínimo por solicitud (los montos menores se acumulan)
    tasaIGV: 0.18,            // IGV 16 % + IPM 2 %
    limiteSaldo: 0.18         // límite mensual del saldo a favor: 18 % del FOB
  };

  /** Redondea a 2 decimales evitando errores de coma flotante. */
  function redondear(n, dec) {
    var d = dec === undefined ? 2 : dec;
    var f = Math.pow(10, d);
    return Math.round((n + Number.EPSILON) * f) / f;
  }

  function num(v) {
    var n = Number(v);
    return isFinite(n) ? n : 0;
  }

  /**
   * Drawback (restitución simplificada).
   * @param {object} d  { fob, costo, cif, arancel, tc }  (fob, costo, cif, arancel en US$)
   * @returns {object}  detalle del cálculo
   */
  function calcularDrawback(d) {
    var p = PARAMETROS;
    var fob = num(d.fob), costo = num(d.costo), cif = num(d.cif), arancel = num(d.arancel);
    var tc = d.tc === undefined || d.tc === '' ? 0 : num(d.tc);

    var restitucion = fob * p.tasaDrawback;          // 3 % del FOB
    var tope = costo * p.topeCosto;                  // 50 % del costo
    var monto = Math.min(restitucion, tope);         // se toma el menor
    var topeActivo = tope < restitucion;             // ¿el tope limitó?
    var limiteInsumosMonto = fob * p.limiteInsumos;  // 50 % del FOB
    var proporcionCif = fob > 0 ? cif / fob : 0;
    var cumpleInsumos = cif <= limiteInsumosMonto;
    var procede = fob > 0 && cumpleInsumos;

    return {
      restitucion: restitucion,
      tope: tope,
      monto: monto,
      topeActivo: topeActivo,
      limiteInsumosMonto: limiteInsumosMonto,
      proporcionCif: proporcionCif,
      cumpleInsumos: cumpleInsumos,
      procede: procede,
      montoAplicable: procede ? monto : 0,
      superaMinimo: monto >= p.minimoSolicitudUSD,
      cobertura: arancel > 0 ? monto / arancel : null,   // qué parte del arancel cubre
      montoSoles: tc > 0 ? monto * tc : null,
      tc: tc
    };
  }

  /**
   * Saldo a favor del exportador.
   * @param {object} d {
   *   baseComprasLocales  (S/)  base imponible de compras locales para exportar
   *   cifImport           (US$) valor CIF de las importaciones
   *   arancelImport       (US$) arancel pagado en esas importaciones
   *   tc                  tipo de cambio
   *   baseVentasLocales   (S/)  base imponible de ventas locales gravadas
   *   fob                 (US$) FOB exportado del mes
   *   saldoAnterior       (S/)  saldo arrastrado de meses anteriores (opcional)
   * }
   */
  function calcularSaldoFavor(d) {
    var p = PARAMETROS;
    var tc = num(d.tc);
    var igvCompras = num(d.baseComprasLocales) * p.tasaIGV;
    var baseImportacion = (num(d.cifImport) + num(d.arancelImport)) * tc;
    var igvImportacion = baseImportacion * p.tasaIGV;
    var saldoAnterior = num(d.saldoAnterior);
    var sfe = igvCompras + igvImportacion + saldoAnterior;
    var igvVentasLocales = num(d.baseVentasLocales) * p.tasaIGV;
    var sfmb = Math.max(0, sfe - igvVentasLocales);
    var fobSoles = num(d.fob) * tc;
    var limite = fobSoles * p.limiteSaldo;
    var aplicable = Math.min(sfmb, limite);
    var arrastre = sfmb - aplicable;
    return {
      igvCompras: igvCompras,
      baseImportacion: baseImportacion,
      igvImportacion: igvImportacion,
      saldoAnterior: saldoAnterior,
      sfe: sfe,
      igvVentasLocales: igvVentasLocales,
      sfmb: sfmb,
      fobSoles: fobSoles,
      limite: limite,
      aplicable: aplicable,
      arrastre: arrastre,
      usoLimite: limite > 0 ? sfmb / limite : null,
      porcentajeFob: fobSoles > 0 ? aplicable / fobSoles : null
    };
  }

  /** Versión mínima: SFMB a partir de SFE, IGV de ventas locales y FOB (misma moneda). */
  function calcularSFMB(sfe, igvVentasLocales, fob) {
    var sfmb = Math.max(0, num(sfe) - num(igvVentasLocales));
    var limite = num(fob) * PARAMETROS.limiteSaldo;
    var aplicable = Math.min(sfmb, limite);
    return { sfmb: sfmb, limite: limite, aplicable: aplicable, arrastre: sfmb - aplicable };
  }

  /** Costo financiero de esperar la devolución: monto × tasa anual × días / 360. */
  function costoEspera(monto, tasaAnual, dias) {
    return num(monto) * num(tasaAnual) * num(dias) / 360;
  }

  /**
   * Convierte texto escrito por una persona en número.
   * Acepta "125 949,60", "125949.60", "125,949.60", "S/ 27 000", "3,6".
   * Devuelve NaN si no hay número.
   */
  function leerNumero(texto) {
    if (typeof texto === 'number') return texto;
    if (texto === null || texto === undefined) return NaN;
    var s = String(texto).replace(/S\/|US\$|\$|%|\s| | /gi, '');
    if (s === '' || s === '-') return NaN;
    var coma = s.lastIndexOf(','), punto = s.lastIndexOf('.');
    if (coma > -1 && punto > -1) {
      // El último separador es el decimal.
      if (coma > punto) s = s.replace(/\./g, '').replace(',', '.');
      else s = s.replace(/,/g, '');
    } else if (coma > -1) {
      // Solo comas: "27,000" (miles) o "3,60" (decimal).
      s = /^-?\d{1,3}(,\d{3})+$/.test(s) ? s.replace(/,/g, '') : s.replace(',', '.');
    } else if (punto > -1) {
      if (/^-?\d{1,3}(\.\d{3}){2,}$/.test(s)) s = s.replace(/\./g, '');
    }
    var n = Number(s);
    return isFinite(n) ? n : NaN;
  }

  /** Formato peruano de la guía: miles con espacio, decimales con coma. */
  function formatear(n, dec) {
    if (n === null || n === undefined || !isFinite(n)) return '—';
    var d = dec === undefined ? 2 : dec;
    var neg = n < 0;
    var partes = Math.abs(redondear(n, d)).toFixed(d).split('.');
    var entero = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return (neg ? '−' : '') + entero + (d > 0 ? ',' + partes[1] : '');
  }

  function formatearPct(fraccion, dec) {
    if (fraccion === null || fraccion === undefined || !isFinite(fraccion)) return '—';
    return formatear(fraccion * 100, dec === undefined ? 1 : dec) + ' %';
  }

  var api = {
    PARAMETROS: PARAMETROS,
    redondear: redondear,
    calcularDrawback: calcularDrawback,
    calcularSaldoFavor: calcularSaldoFavor,
    calcularSFMB: calcularSFMB,
    costoEspera: costoEspera,
    leerNumero: leerNumero,
    formatear: formatear,
    formatearPct: formatearPct
  };

  if (typeof module !== 'undefined' && module.exports) module.exports = api; // Node
  global.Calculos = api;                                                       // navegador
})(typeof window !== 'undefined' ? window : globalThis);
