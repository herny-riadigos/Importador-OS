/* ======================================================
   📘  UTILIDAD: Seleccionar archivos por tipo
   ====================================================== */
function seleccionarArchivos(callbackProcesar, tipo = "xlsx") {
  const input = document.createElement("input");
  input.type = "file";
  input.multiple = true;

  // Asignar tipo de archivo permitido
  if (tipo === "xlsx") input.accept = ".xlsx";
  if (tipo === "pdf") input.accept = ".pdf";
  if (tipo === "txt") input.accept = ".txt";
  if (tipo === "todos") input.accept = ".xlsx, .pdf, .txt";

  input.onchange = async (e) => {
    const archivos = Array.from(e.target.files);
    if (archivos.length === 0) {
      alert("No seleccionaste archivos.");
      return;
    }

    const datos = await Promise.all(
      archivos.map(async (file) => ({
        nombre: file.name,
        buffer: await file.arrayBuffer()
      }))
    );

    callbackProcesar(datos);
  };

  input.click();
}

/* ======================================================
   📘  UTILIDAD: Leer XLSX → retorna matriz tipo getValues()
   ====================================================== */
function leerXLSX(buffer) {
  const workbook = XLSX.read(buffer, { type: "array" });
  const hoja = workbook.Sheets[workbook.SheetNames[0]];
  return XLSX.utils.sheet_to_json(hoja, { header: 1 });
}

/* ======================================================
   📘 UTILIDAD: Generar línea TXT
   ====================================================== */
function generarLineaTXT(valor, pad = false) {
  if (!valor) valor = "0";

  if (pad) valor = valor.toString().padStart(12, "0");

  return [
    "0", "0", "0",
    valor,
    "0", "0", "0", "0",
    "MP",
    "0", "0", "0", "0"
  ].join(";");
}

/* ======================================================
   📘 UTILIDAD: Descargar TXT
   ====================================================== */
function descargarTXT(nombre, contenido) {
  const blob = new Blob([contenido], { type: "text/plain" });
  const enlace = document.createElement("a");
  enlace.href = URL.createObjectURL(blob);
  enlace.download = nombre;
  enlace.click();
}
