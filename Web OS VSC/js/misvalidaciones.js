/* ======================================================
   🟪  FLUJO: IMPORTAR MIS VALIDACIONES (solo XLSX)
   ====================================================== */
function importarMisValidaciones() {
  seleccionarArchivos(async (archivos) => {
    let lineasGeneral = [];

    for (const archivo of archivos) {

      const nombre = archivo.nombre.toLowerCase();

      // Detectar cualquiera de estas formas
      if (
        !nombre.includes("mis validaciones") &&
        !nombre.includes("mis_validaciones") &&
        !nombre.includes("misvalidaciones")
      ) {
        continue;
      }

      // 🔹 IMPORTANTE: esperar el XLSX
      let datos = await leerXLSX(archivo.buffer);

      const encabezadoRegex = /cod[_ ]?valid/i;
      const indice = datos.findIndex(fila =>
        fila.join(" ").toLowerCase().match(encabezadoRegex)
      );

      if (indice === -1) continue;

      datos = datos.slice(indice + 1);

      const lineas = datos
        .filter(fila => {
          const str = fila.join("").trim();
          if (str === "") return false;
          if (!fila[0]) return false;
          if (isNaN(fila[0])) return false;
          return true;
        })
        .map(fila => generarLineaTXT(fila[0]));

      const nombreTxt = archivo.nombre.replace(".xlsx", "") + ".txt";
      descargarTXT(nombreTxt, lineas.join("\n"));

      lineasGeneral.push(...lineas);
    }

    if (lineasGeneral.length > 0) {
      descargarTXT("MIS_VALIDACIONES_GENERAL.txt", lineasGeneral.join("\n"));
    }

    alert("Mis Validaciones: Procesamiento completo.");
  }, "xlsx");
}
