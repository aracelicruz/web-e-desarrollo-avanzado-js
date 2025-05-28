// Archivo: script.js

// Número de mesas disponibles
let mesasDisponibles = 5;

/**
 * Verifica si hay mesas disponibles para la reserva.
 * @param {number} mesasSolicitadas - Número de mesas solicitadas.
 * @returns {Promise<string>} Promesa que resuelve o rechaza con un mensaje.
 */
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (mesasSolicitadas <= mesasDisponibles) {
        resolve(`✅ ¡Disponibilidad confirmada para ${mesasSolicitadas} mesa(s)!`);
      } else {
        reject(`❌ Lo sentimos, solo hay ${mesasDisponibles} mesa(s) disponibles.`);
      }
    }, 2000); // Simula un retraso de 2 segundos
  });
}

/**
 * Simula el envío de un correo de confirmación de reserva.
 * @param {string} nombreCliente - Nombre del cliente.
 * @returns {Promise<string>} Promesa que resuelve o rechaza con un mensaje.
 */
function enviarConfirmacionReserva(nombreCliente) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const exito = Math.random() > 0.3; // 70% de probabilidad de éxito
      if (exito) {
        resolve(`📨 Correo de confirmación enviado a ${nombreCliente}.`);
      } else {
        reject(`⚠️ Error al enviar el correo a ${nombreCliente}.`);
      }
    }, 1500); // Simula un retraso de 1.5 segundos
  });
}

/**
 * Manejador del formulario de reservas.
 */
document.getElementById("reservationForm").addEventListener("submit", async function (e) {
  e.preventDefault(); // Previene la recarga de la página
  
  const nombreCliente = document.getElementById("nombreCliente").value.trim();
  const mesasSolicitadas = parseInt(document.getElementById("mesasSolicitadas").value, 10);
  const resultDiv = document.getElementById("result");

  if (!nombreCliente || mesasSolicitadas <= 0 || isNaN(mesasSolicitadas)) {
    resultDiv.textContent = "⚠️ Por favor, completa todos los campos correctamente.";
    resultDiv.className = "result error";
    return;
  }

  // Limpia el mensaje de resultado y muestra progreso
  resultDiv.textContent = "⏳ Verificando disponibilidad...";
  resultDiv.className = "result";

  try {
    // Verifica disponibilidad
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas);
    resultDiv.textContent = disponibilidad;
    resultDiv.className = "result success";

    // Actualiza las mesas disponibles
    mesasDisponibles -= mesasSolicitadas;

    // Envía confirmación
    resultDiv.textContent = "⏳ Enviando confirmación...";
    const confirmacion = await enviarConfirmacionReserva(nombreCliente);
    resultDiv.textContent = confirmacion;
    resultDiv.className = "result success";
  } catch (error) {
    // Muestra errores
    resultDiv.textContent = error;
    resultDiv.className = "result error";
  }
});
