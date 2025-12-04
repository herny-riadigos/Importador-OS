/* ======================================================
   🟩  FLUJO: IMPORTAR SANCOR (solo XLSX)
   ====================================================== */
function importarSancor() {
  seleccionarArchivos(async (archivos) => {
    let lineasGeneral = [];

    for (const archivo of archivos) {

      // ❌ Eliminamos validación por nombre
      // if (!archivo.nombre.toLowerCase().includes("sancor")) continue;

      let datos = leerXLSX(archivo.buffer);

      const encabezadoRegex = /cod.*valid/i;
      const indice = datos.findIndex(fila =>
        fila.join(" ").toLowerCase().match(encabezadoRegex)
      );
      if (indice === -1) continue;

      datos = datos.slice(indice + 1);

      const lineas = datos
        .filter(fila => {
          const str = fila.join("").trim();
          if (str === "") return false;
          if (!fila[2]) return false;
          if (isNaN(fila[2])) return false;
          return true;
        })
        .map(fila => generarLineaTXT(fila[2], true)); // TRUE = padding

      const nombreTxt = archivo.nombre.replace(".xlsx", "") + ".txt";
      descargarTXT(nombreTxt, lineas.join("\n"));

      lineasGeneral.push(...lineas);
    }

    if (lineasGeneral.length > 0) {
      descargarTXT("SANCOR_GENERAL.txt", lineasGeneral.join("\n"));
    }

    alert("SANCOR: Procesamiento completo.");
  }, "xlsx");
}
