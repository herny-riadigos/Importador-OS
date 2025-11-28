/* ======================================================
   🟦  FLUJO: IMPORTAR COLEGIO (solo XLSX)
   ====================================================== */
function importarColegio() {
  seleccionarArchivos(async (archivos) => {
    let lineasGeneral = [];

    for (const archivo of archivos) {
      const nombreLower = archivo.nombre.toLowerCase();

      if (nombreLower.includes("sancor")) continue;
      if (nombreLower.includes("mis validaciones")) continue;

      let datos = leerXLSX(archivo.buffer);

      datos = datos.slice(5);

      // Filtro final
      const lineas = datos
        .filter(fila => {
          const str = fila.join("").trim();
          if (str === "") return false;
          if (!fila[1]) return false;
          if (isNaN(fila[1])) return false;
          return true;
        })
        .map(fila => generarLineaTXT(fila[1]));

      const nombreTxt = archivo.nombre.replace(".xlsx", "") + ".txt";
      descargarTXT(nombreTxt, lineas.join("\n"));

      lineasGeneral.push(...lineas);
    }

    if (lineasGeneral.length > 0) {
      descargarTXT("COLEGIO_GENERAL.txt", lineasGeneral.join("\n"));
    }

    alert("Colegio: Procesamiento completo.");
  }, "xlsx");
}
