// Funcion para crear un nodo HTML desde un string
function createElementFromHTML(htmlString) {
  let div = document.createElement('div')
  div.innerHTML = htmlString.trim()

  // Change this to div.childNodes to support multiple top-level nodes.
  return div.firstChild
}

//clases
class Juego {
  constructor(nombre, formato, precio, info) {
    this.nombre = nombre
    this.formato = formato
    this.precio = precio
    this.info = info
  }
}

/* let carrito = JSON.parse(localStorage.getItem('carrito')) || []
 */

let carrito = []

document.addEventListener('DOMContentLoaded', () => {
  if(localStorage.getItem('carrito')){
    carrito = JSON.parse(localStorage.getItem('carrito'))
  }
})

const contenedor = document.getElementById('accordion') //agarro el div contenedor
const items = document.getElementById('items')
const windows = document.getElementById('win')
const linux = document.getElementById('linux')
const macOS = document.getElementById('mac')

const options = {
  method: 'GET',
  headers: {
    'X-RapidAPI-Host': 'steam-store-data.p.rapidapi.com',
    'X-RapidAPI-Key': 'af22de8d3emshf113f49ae919ba2p1f2483jsna68ce52fcc91',
  },
}

const sAPI = async () => {
  try {
    const resp = await fetch('https://steam-store-data.p.rapidapi.com/api/featured/', options)
    const resjson = await resp.json()
    const linx = await resjson.featured_linux
    const mac = await resjson.featured_mac
    const win = await resjson.featured_win
    await win.forEach((item) =>
      crearCarta(
        item.name,
        'digital',
        item.final_price,
        item.large_capsule_image,
        windows,
        item.id,
        'Windows',
        win
      )
    )
    await linx.forEach((item) =>
      crearCarta(
        item.name,
        'digital',
        item.final_price,
        item.large_capsule_image,
        linux,
        item.id,
        'Linux',
        linx
      )
    )
    await mac.forEach((item) =>
      crearCarta(
        item.name,
        'digital',
        item.final_price,
        item.large_capsule_image,
        macOS,
        item.id,
        'MacOS',
        mac
      )
    )
  } catch (error) {
    console.log(error)
  }
}
sAPI()


function crearCarta(name, type, price, image, contenedorCard, id, os, arr) {
  id = id + os
  let carta = `
    <div class="container-fluid d-flex justify-content-center">
  <div class="row mt-5">
    <div class="col-sm-4">
      <div class="card">
    <img src="${image}" class="card-img-top" width="100%">
    <div class="card-body pt-0 px-0">
      <div class="d-flex flex-row justify-content-between mb-0 px-3">
        <h3 class="text-muted mt-1">Precio</h3>
        <h4>$${price}</h4>
      </div>
      <hr class="mt-2 mx-3">
      <div class="d-flex flex-row justify-content-between px-3 pb-4">
        <div class="d-flex flex-column"><span class="text-muted"><h4>${name}</h4></div>
      </div>
      <div class="d-flex flex-row justify-content-between p-3 mid">
        <div class="d-flex flex-column"><small class="text-muted mb-1"><h5>${os}</h5></div>
        <div class="d-flex flex-column"><small class="text-muted mb-2">${id}</div>
      </div>
      <div class="mx-3 mt-3 mb-2"><button type="button" class="btn btn-danger btn-block" id="${id}"><small>Añadir al carrito</small></button></div>
    </div>
  </div>
    </div>
  </div>
</div>`
  contenedorCard.append(createElementFromHTML(carta))

  const boton = document.getElementById(id)

  boton.addEventListener('click', function () {
    addToChart(id, arr, os)
  })
  
  boton.addEventListener('click', () => {
    Swal.fire ({
        title:'Añadido al carrito con exito',
        icon:'success',
        showConfirmButton: true,
        confirmButtonText: 'Confirmar'
    })
  })
}


function addToChart(id, arr, os) {
  let obj = arr.find((producto) => producto.id + os === id)
  carrito.push(obj)
  const jJSON = JSON.stringify(carrito)
  localStorage.setItem('carrito', jJSON)
}

