/* ======================================================
   🟦 IMPORTAR IMED (TXT → TXT GENERAL)
   ====================================================== */
function importarIMED() {

  seleccionarArchivos(async (archivos) => {

    let acumulado = [];

    for (const archivo of archivos) {

      // Solo procesar .txt
      if (!archivo.nombre.toLowerCase().endsWith(".txt"))
        continue;

      // Convertir el buffer a texto
      const contenido = new TextDecoder("utf-8").decode(archivo.buffer);

      // Separar por líneas y limpiar vacíos
      const lineas = contenido
        .split("\n")
        .map(l => l.trim())
        .filter(l => l !== "");

      // Acumular para el general
      acumulado.push(...lineas);

      // Descargar un TXT individual por archivo
      const nombreTxt = archivo.nombre.replace(".txt", "") + "_PROCESADO.txt";
      descargarTXT(nombreTxt, lineas.join("\n"));
    }

    if (acumulado.length === 0) {
      alert("No se encontraron archivos TXT válidos.");
      return;
    }

    // Crear archivo general IMED
    const fecha = new Date().toISOString().replace(/[-:T]/g, "").slice(0, 14);
    const nombreGeneral = "IMED_GENERAL_" + fecha + ".txt";

    descargarTXT(nombreGeneral, acumulado.join("\n"));

    alert("IMED: Procesamiento completo.");
  }, "txt"); // <-- Acepta SOLO TXT
}
