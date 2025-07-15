const destinos = ["Cordoba", "Mendoza", "Buenos Aires"];
const costoBase = [15000, 13000, 11000]; 
const costoExcursion = 5000;
const alojamientoOpciones = ["Económico", "Estándar", "Premium", "Premium Plus"];

function solicitarDatos() {
  let destino = parseInt(prompt("Elige un destino:" +
    "\n1 - Cordoba ($15000 por dia)" +
    "\n2 - Mendoza ($13000 por dia)" +
    "\n3 - Buenos Aires ($11000 por dia)"));
  let dias = parseInt(prompt("¿Cuántos días vas a estar? (Si supera los 5 días, tenés un 10% de descuento)"));
  let incluyeExcursion = confirm("¿Querés incluir excursiones? (Costo adicional de $5000)");
  let alojamiento = parseInt(prompt("Elige el tipo de alojamiento:\n" +
    "1 - Económico (sin recargo)\n" +
    "2 - Estándar (+20%)\n" +
    "3 - Premium (+50%)\n" +
    "4 - Premium Plus (+80%)"));
  return { destino: destino, dias, incluyeExcursion, alojamiento };
}

function calcularPresupuesto(destino, dias, excursiones, alojamiento) {
  let costoTotal = costoBase[destino - 1] * dias;
  switch (alojamiento) {
    case 2:
      costoTotal *= 1.20;
      break;
    case 3:
      costoTotal *= 1.50;
      break;
    case 4:
      costoTotal *= 1.80;
      break;
  }

  // Si incluye excursiones, se suma el costo adicional
  if (excursiones == true) {
    costoTotal += costoExcursion;
  }

  // Descuento por más de 5 días
  if (dias > 5) {
    costoTotal *= 0.90; // 10% de descuento
  }
  return costoTotal;
}

function mostrarResultado(destino, dias, incluyeExcursion,alojamiento, total) {
  const nombreDestino = destinos[destino - 1];
  const nombreAlojamiento = alojamientoOpciones[alojamiento - 1];
  let excursiones = "NO";
  if (incluyeExcursion == true){
    excursiones = "SI";
  }
  let mensaje = `Resumen del viaje:\n` +
    `Destino: ${nombreDestino}\n` +
    `Duración: ${dias} días\n` +
    `Incluye excursiones: ${excursiones}\n` +
    `Tipo de alojamiento: ${nombreAlojamiento}\n` +
    `Costo total estimado: $${total}`;
  alert(mensaje);
  console.log(mensaje); 
}


function iniciarSimulador() {
  let seguir = true;
  while (seguir) {
    const datos = solicitarDatos();
    if (!datos.destino || datos.destino < 1 || datos.destino > 3 || isNaN(datos.dias) ||datos.dias <= 0 || 
    !datos.alojamiento || datos.alojamiento < 1 || datos.alojamiento > 4) {
      alert("Datos inválidos. Por favor, intentá de nuevo.");
      continue;
    }

    const total = calcularPresupuesto(datos.destino, datos.dias, datos.incluyeExcursion, datos.alojamiento);
    mostrarResultado(datos.destino, datos.dias, datos.incluyeExcursion,datos.alojamiento, total);
    seguir = confirm("¿Querés hacer otra simulación?");
  }
  alert("¡Gracias por usar el simulador!");
}

iniciarSimulador();
