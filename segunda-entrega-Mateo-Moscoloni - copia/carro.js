let carrito = JSON.parse(localStorage.getItem('carrito'));
const cont_tabla = document.getElementById('tablac');


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