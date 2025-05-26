let orderIdCounter = 1; // Identificador único para cada pedido
const ordersContainer = document.getElementById('ordersContainer');
const addOrderBtn = document.getElementById('addOrderBtn');

// Función para crear un nuevo pedido
function createOrder() {
  const orderId = orderIdCounter++;
  const orderElement = document.createElement('div');
  orderElement.className = 'order';
  orderElement.id = `order-${orderId}`;
  orderElement.innerHTML = `
    Pedido #${orderId} - Estado: <span class="status">En Proceso</span>
  `;
  ordersContainer.appendChild(orderElement);

  // Simular la preparación del pedido
  processOrder(orderId)
    .then(() => updateOrderStatus(orderId, 'Completado'))
    .catch(() => updateOrderStatus(orderId, 'Error'));
}

// Función para procesar el pedido (simula el tiempo de preparación)
function processOrder(orderId) {
  return new Promise((resolve) => {
    const preparationTime = Math.random() * 2000 + 1000; // Tiempo aleatorio entre 1 y 3 segundos
    setTimeout(() => {
      resolve();
    }, preparationTime);
  });
}

// Función para actualizar el estado de un pedido
function updateOrderStatus(orderId, status) {
  const orderElement = document.getElementById(`order-${orderId}`);
  if (orderElement) {
    const statusElement = orderElement.querySelector('.status');
    statusElement.textContent = status;
    if (status === 'Completado') {
      orderElement.classList.add('completed');
    } else if (status === 'Error') {
      orderElement.classList.add('error');
    }
  }
}


// Agregar listener al botón para crear pedidos
addOrderBtn.addEventListener('click', createOrder);
