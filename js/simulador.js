const destinos = ["Cordoba", "Mendoza", "Buenos Aires"];
const costoBase = [15000, 13000, 11000];
const nombresAlojamiento = ["Economico", "Estandar", "Premium"];
const costoExcursion = 5000;

const calcularPresupuesto = (destino, dias, excursion, alojamiento) => {
  let total = costoBase[destino - 1] * dias;
  if (alojamiento === 2) total *= 1.2;
  else if (alojamiento === 3) total *= 1.5;
  if (excursion) total += costoExcursion;
  if (dias > 5) total *= 0.9;
  return Math.round(total);
};

const formatearSimulacion = sim =>
  `Destino: ${sim.destino} | Días: ${sim.dias} | Alojamiento: ${sim.alojamiento} | Excursión: ${sim.incluyeExcursion ? "Sí" : "No"} | Total: $${sim.total}`;

const obtenerHistorial = () => JSON.parse(localStorage.getItem("simulaciones")) || [];
const guardarSimulacion = sim => {
  const historial = obtenerHistorial();
  historial.push(sim);
  localStorage.setItem("simulaciones", JSON.stringify(historial));
};

document.getElementById("formSimulador").addEventListener("submit", e => {
  e.preventDefault();
  const destino = +document.getElementById("destino").value;
  const dias = +document.getElementById("dias").value;
  const excursion = document.getElementById("excursion").checked;
  const alojamiento = +document.getElementById("alojamiento").value;

  if ([destino, dias, alojamiento].some(isNaN) || dias <= 0) {
    document.getElementById("resultado").innerText = "Error: ingresa datos validos.";
    return;
  }

  const simulacion = {
    destino: destinos[destino - 1],
    dias,
    incluyeExcursion: excursion,
    alojamiento: nombresAlojamiento[alojamiento - 1],
    total: calcularPresupuesto(destino, dias, excursion, alojamiento)
  };

  guardarSimulacion(simulacion);
  document.getElementById("resultado").innerText = formatearSimulacion(simulacion);
});

document.getElementById("verHistorial").addEventListener("click", () => {
  const historial = obtenerHistorial();
  document.getElementById("historial").innerHTML = historial.length
    ? "<h3>Historial:</h3>" + historial.map(formatearSimulacion).map(s => `<p>${s}</p>`).join("")
    : "<h3>Historial:</h3><p>No hay simulaciones previas.</p>";
});
