const socket = io();
const tabla = document.getElementById('tabla');
const form = document.querySelector('form');

// Manejo de conexión con el servidor
socket.on('connect', () => {
    console.log('Connected to server');
});

// Actualizar la tabla con datos de productos
socket.on('products', (data) => {
    console.log(data);
    // Construir el HTML de la tabla
    const rows = data.map((e) => `
        <tr>
          <th scope="row">${e.id}</th>
          <td>${e.title}</td>
          <td>${e.description}</td>
          <td>$${e.price}</td>
          <td>${e.stock}</td>
          <td>
            <img style="height: 18px;" src="${e.thumbnail}" alt="${e.title}">
          </td>
          <td>
            <button type="button" class="btn btn-danger btn-sm btnDelete" data-id="${e.id}">Delete</button>
          </td>
        </tr>
    `).join('');
    
    tabla.innerHTML = rows;

    // Adjuntar eventos a los botones de eliminación
    document.querySelectorAll('.btnDelete').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('data-id');
            deleteProduct(id);
        });
    });
});

// Función para emitir la eliminación de productos
const deleteProduct = (id) => {
    socket.emit('deleteProduct', id);
};

// Función para emitir la adición de productos
const addProduct = (product) => {
    socket.emit('addProduct', product);
    console.log("Info a agrgar", product);
};

// Manejo del formulario de productos
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const product = Object.fromEntries(formData);
    product.price = parseFloat(product.price);
    product.stock = parseInt(product.stock, 10);
    console.log('Form data:', product);
    addProduct(product);
    //form.reset(); // Opcional: resetear el formulario después de enviar
});

// const addProduct = async (products) =>{
//     fetch(`http://localhost:8080/api/products`, {
//         method: 'POST',
//     })
//     .then(res => res.json())
//     .then(res => console.log(res))
// }