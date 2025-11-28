function procesarTextoCompania() {

  let texto = document.getElementById("entradaPDF").value.trim();
  
  if (texto === "") {
    alert("Pegá primero el contenido del PDF.");
    return;
  }

  // Normalizar
  texto = texto
    .replace(/\r/g, "")
    .replace(/\t/g, " ")
    .replace(/ +/g, " ")
    .replace(/,/g, "")   // quitar separadores decimales
    .trim();

  // Dividir por líneas reales
  const lineas = texto.split("\n").map(l => l.trim()).filter(l => l !== "");

  const filas = [];

  // Regex EXACTO del formato correcto
  const regex = /^(\d{6,11}) (\d{2}\/\d{2}\/\d{4}) (\d{6,11}) (\d{1,3}) ([A-Za-z0-9]+) \$?(\d+(\.\d+)?) \$?(\d+(\.\d+)?)$/;

  for (const linea of lineas) {
    const match = linea.match(regex);
    if (match) {
      filas.push(match);
    }
  }

  if (filas.length === 0) {
    alert("No se encontraron filas de Compañía válidas. Revisá si pegaste el texto correcto.");
    return;
  }

  const lineasTXT = filas.map(f => {
    const aut = f[3];
    return generarLineaTXT(aut);
  });

  descargarTXT("COMPANIA.txt", lineasTXT.join("\n"));

  alert("Archivo TXT de Compañía generado correctamente.");
}
