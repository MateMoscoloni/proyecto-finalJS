let carrito = JSON.parse(localStorage.getItem('carrito'));

const contenedorCarrito = document.getElementById('contenedor_carrito');

const cont_tabla = document.getElementById('tablac');
const btnCompra = document.getElementById('btnComprar')
const precioTotal = document.getElementById('precioTotal')

for (let i = 0; i < carrito.length; i++) {
    const element = carrito[i];
    const {name, final_price, small_capsule_image, id} = element
    let carro = `
    <tbody class="contenido">
      <tr class="itemCarrito">
        <th scope="row">
        <button id="${id}" class="elimarProd">x</i></button>
      </th class="itemCarrito">
        <td class="table_productos"><img src="${small_capsule_image}" class="card-img-top" width="100% mr-3">        </td>
        <td>${name}</td>       
        <td class="table_price">$${final_price.toLocaleString()}</td>
      </tr>
      
    </tbody>`;
   cont_tabla.innerHTML += carro
}

function eliminarDelCarrito(e) {
  const boton = e.target 
  const id = boton.getAttribute('id')
  const item = carrito.find((prod) => prod.id === id)
  const indice = carrito.indexOf(item)
  carrito.splice(indice, 1)
  localStorage.setItem('carrito', JSON.stringify(carrito))
  location.reload(); 
}

const botonesEliminar = document.getElementsByClassName('elimarProd')
for (let i = 0; i < botonesEliminar.length; i++) {
  const element = botonesEliminar[i];
  element.addEventListener('click', eliminarDelCarrito)
}
btnCompra.addEventListener('click', () => {
  Swal.fire ({
    title:'Has adquirido tus productos',
    icon:'success',
    showConfirmButton: true,
    confirmButtonText: 'Confirmar'
  })
})

const total = carrito.reduce((acc, prod) => acc + prod.final_price, 0)
function showTotal() {
  let mostrarTotal = `<h3>
  Valor total: $${total.toLocaleString()}</h3>`;
  precioTotal.innerHTML = mostrarTotal
}
showTotal()




