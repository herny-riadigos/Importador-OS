/* ======================================================
   🟦  FLUJO: IMPORTAR ADMIFARM (solo XLSX)
   ====================================================== */
function importarAdmifarm() {
  seleccionarArchivos(async (archivos) => {
    let lineasGeneral = [];

    for (const archivo of archivos) {

      // ❌ Eliminamos validación por nombre
      // if (!archivo.nombre.toLowerCase().includes("admifarm")) continue;

      let datos = leerXLSX(archivo.buffer);
      datos = datos.slice(1); // eliminar encabezado

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
      descargarTXT("ADMIFARM_GENERAL.txt", lineasGeneral.join("\n"));
    }

    alert("Admifarm: Procesamiento completo.");
  }, "xlsx");
}
