// script.js
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registration-form");

  // Esquema de validación utilizando Zod
  const schema = Zod.object({
    name: Zod.string()
      .min(3, { message: "El nombre debe tener al menos 3 caracteres" })
      .nonempty({ message: "El campo nombre es obligatorio" }),
    email: Zod.string()
      .email({ message: "El correo electrónico no es válido" })
      .nonempty({ message: "El campo correo electrónico es obligatorio" }),
    password: Zod.string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" })
      .nonempty({ message: "El campo contraseña es obligatorio" }),
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Obtener los valores del formulario
    const formData = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      password: form.password.value.trim(),
    };

    // Limpiar mensajes de error previos
    document.getElementById("error-name").textContent = "";
    document.getElementById("error-email").textContent = "";
    document.getElementById("error-password").textContent = "";

    // Validar los datos con Zod
    const result = schema.safeParse(formData);

    if (result.success) {
      // Validación exitosa
      alert("Formulario enviado exitosamente!");
      form.reset(); // Limpia los campos del formulario
    } else {
      // Mostrar mensajes de error claros
      result.error.errors.forEach((error) => {
        const field = error.path[0]; // Obtener el nombre del campo con error
        const errorElement = document.getElementById(`error-${field}`);
        if (errorElement) {
          errorElement.textContent = error.message; // Mostrar el mensaje de error
        }
      });
    }
  });
});
