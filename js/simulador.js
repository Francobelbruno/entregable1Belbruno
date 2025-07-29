const destinos = ["Córdoba", "Mendoza", "Buenos Aires"];
const costoBase = [15000, 13000, 11000];
const costoExcursion = 5000;

document.getElementById("formSimulador").addEventListener("submit", function (e) {
  e.preventDefault();

  const destino = parseInt(document.getElementById("destino").value);
  const dias = parseInt(document.getElementById("dias").value);
  const incluyeExcursion = document.getElementById("excursion").checked;
  const alojamiento = parseInt(document.getElementById("alojamiento").value);

  if (isNaN(destino) || isNaN(dias) || dias <= 0 || isNaN(alojamiento)) {
    mostrarResultado("Error: ingresá datos válidos.");
    return;
  }

  const total = calcularPresupuesto(destino, dias, incluyeExcursion, alojamiento);

  const simulacion = {
    destino: destinos[destino - 1],
    dias,
    incluyeExcursion,
    alojamiento: ["Económico", "Estándar", "Premium"][alojamiento - 1],
    total
  };

  guardarSimulacion(simulacion);
  mostrarResultado(formatearSimulacion(simulacion));
});

document.getElementById("verHistorial").addEventListener("click", function () {
  const historial = obtenerHistorial();
  let html = "<h3>Historial:</h3>";
  if (historial.length === 0) {
    html += "<p>No hay simulaciones previas.</p>";
  } else {
    historial.forEach(sim => {
      html += `<p>${formatearSimulacion(sim)}</p>`;
    });
  }
  document.getElementById("historial").innerHTML = html;
});

function calcularPresupuesto(destino, dias, incluyeExcursion, alojamiento) {
  let costoTotal = costoBase[destino - 1] * dias;

  if (alojamiento === 2) costoTotal *= 1.2;
  else if (alojamiento === 3) costoTotal *= 1.5;

  if (incluyeExcursion) costoTotal += costoExcursion;

  if (dias > 5) costoTotal *= 0.9; // Descuento

  return Math.round(costoTotal);
}

function mostrarResultado(mensaje) {
  document.getElementById("resultado").innerText = mensaje;
}

function guardarSimulacion(sim) {
  const historial = obtenerHistorial();
  historial.push(sim);
  localStorage.setItem("simulaciones", JSON.stringify(historial));
}

function obtenerHistorial() {
  return JSON.parse(localStorage.getItem("simulaciones")) || [];
}

function formatearSimulacion(sim) {
  return `Destino: ${sim.destino} | Días: ${sim.dias} | Alojamiento: ${sim.alojamiento} | Excursión: ${sim.incluyeExcursion ? "Sí" : "No"} | Total: $${sim.total}`;
}
