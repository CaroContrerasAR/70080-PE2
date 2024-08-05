// const socket = io();

// socket.on("productos", (data)=>{
//     //console.log(data);
//     renderProductos(data)
// })

// const renderProductos = (productos)=>{
//     const contenedorProductos =document.getElementById("contenedorProductos")
//     contenedorProductos.innerHTML= ""

//     productos.forEach(item => {
//         const card = document.createElement("div")
//         card.innerHTML =`   <p>${item.id}</p>
//                             <p>${item.title}</p>
//                             <p>${item.price}</p>
//                             <button>Eliminar</button>
//                             `
//         contenedorProductos.appendChild(card)

//         //vamos a darle vida al boton de eliminar
//         card.querySelector("button").addEventListener("click", ()=>{
//             eliminarProducto(item.id)
//         })
//     });
// }

//function para enviar el id al backend
// const eliminarProducto = (id)=>{
//     socket.emit("eliminarProducto", id)
// }
//---------------------------------

const socket = io()
const tabla = document.getElementById('tabla');
//const btnCreateProduct = document.getElementById('btnCreateP');
const btnDelete = document.getElementById('btnDelete')

socket.on('connect', ()=>{
    console.log('Connected Customer')
})

socket.on('products', (data)=>{
    // console.log(data)
    let conjunto = ''
     data.map((e)=> {
        conjunto += 
         `
            <tr>
              <th scope="row">${e.id}</th>
              <td>${e.title}</td>
              <td>${e.description}</td>
              <td>$${e.price}</td>
              <td colspan="2">${e.stock}</td>
              <td>
                <img style="height: 18px;" src="${e.thumbnail}" >
              </td>
              <td>
                <button type="button" id="btnDelete" class="btn btn-danger btn-sm" onclick="deleteProduct(${e.id})" >Delete</button>
              </td>
            </tr>
         `
        tabla.innerHTML = conjunto
    })
})

//function para enviar el id al backend
const deleteProduct = (id)=>{
    socket.emit("deleteProduct", id)
    
}

const addProduct = (products)=>{
    socket.emit("addProduct", products)
    
}
// const deleteProduct = async (id) =>{
//     fetch(`http://localhost:8080/api/products/${id}`, {
//         method: 'DELETE',
//     })
//     .then(res => res.json())
//     .then(res => console.log(res))
// }