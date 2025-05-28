document.getElementById('registroEvento').addEventListener('submit', function(event) {
  event.preventDefault(); // Evita el envío automático del formulario

  // Variables
  const nombre = document.getElementById('nombre').value.trim();
  const correo = document.getElementById('correo').value.trim();
  const telefono = document.getElementById('telefono').value.trim();
  const intereses = document.querySelectorAll('input[name="intereses"]:checked');
  const horario = document.querySelector('input[name="horario"]:checked');
  const fecha = document.getElementById('fecha').value;
  const hora = document.getElementById('hora').value;
  const archivo = document.getElementById('archivo').files[0];

  // Validaciones básicas
  if (!nombre || !correo || !telefono || intereses.length === 0 || !horario || !fecha || !hora) {
    alert('Por favor, completa todos los campos obligatorios.');
    return;
  }

  // Validación de formato de correo electrónico
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(correo)) {
    alert('Por favor, ingresa un correo electrónico válido.');
    return;
  }

  // Validación de formato de teléfono 
  const telefonoRegex = /^\d{10}$/;
  if (!telefonoRegex.test(telefono)) {
    alert('Por favor, ingresa un número de teléfono válido de 10 dígitos.');
    return;
  }

  // Validación de archivo (si se proporciona)
  if (archivo) {
    const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png'];
    const maxSize = 2 * 1024 * 1024; // 2MB

    if (!allowedTypes.includes(archivo.type)) {
      alert('El archivo debe ser un PDF, JPG o PNG.');
      return;
    }

    if (archivo.size > maxSize) {
      alert('El archivo no debe superar los 2MB.');
      return;
    }
  }

  // Si todo está bien
  alert('Registro exitoso. ¡Gracias por registrarte!');
});
