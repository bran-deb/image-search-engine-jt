const resultado = document.querySelector('#resultado'),
    formulario = document.querySelector('#formulario'),
    paginacionDiv = document.querySelector('#paginacion'),
    registroPorPagina = 40

let totalPaginas,
    iterador,
    paginaActual = 1

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario)
}

function validarFormulario(e) {
    e.preventDefault()
    const terminoBusqueda = document.querySelector('#termino').value

    terminoBusqueda === ''
        ? mostrarAlerta('Agrega un termino de busqueda')
        : buscarImagenes()
}


function buscarImagenes() {
    const termino = document.querySelector('#termino').value


    const key = '23425534-46ce719085b4185715c2c9c3a'
    const url = `https://pixabay.com/api/?key=${key}&q=${termino}&per_page=${registroPorPagina}&page=${paginaActual}`

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(datos => {
            totalPaginas = calcularPaginas(datos.totalHits)//totalhits total images
            mostrarImagenes(datos.hits)
        })
}


function mostrarImagenes(imagenes) {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
    //iterar sobre el array de imagenes y construir el html
    imagenes.forEach(imagen => {
        const { previewURL, likes, views, largeImageURL } = imagen
        resultado.innerHTML += `
        <div class="w-1/2 md:w-1/3 lg:w-1/4 p-3 mb-4">
            <div class="bg-white">
                <img class="w-full" src="${previewURL}">

                <div class="p-4">
                    <p class="font-bold">${likes} <span class="font-light">Me gusta</span></p>
                    <p class="font-bold">${views} <span class="font-light">Veces vista</span></p>

                    <a
                        class="block w-full bg-blue-800 hover:bg-blue-500 text-white uppercase font-bold text-center rounded mt-5 p-1"
                        href="${largeImageURL}" target="_blank" rel="noopener noreferrer">Ver Imagen</a>
                </div>
            </div>
        </div>
        `
    });
    //limpiarPaginador anterior
    while (paginacionDiv.firstChild) {
        paginacionDiv.removeChild(paginacionDiv.firstChild)
    }

    imprimirPaginador()
}


function calcularPaginas(total) {
    return parseInt(Math.ceil(total / registroPorPagina))
}


function mostrarAlerta(mensaje) {
    const existeAlerta = document.querySelector('.alerta')
    if (!existeAlerta) {
        const alerta = document.createElement('p')
        alerta.classList.add('bg-red-100', 'border-red-400', 'text-red-700', 'px-4', 'py-3', 'rounded', 'max-w-lg', 'mx-auto', 'mt-6', 'text-center', 'alerta')
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block sm:inline">${mensaje}</span>
        `
        formulario.appendChild(alerta)

        setTimeout(() => {
            alerta.remove()
        }, 2000)
    }
}


//Generador que va a registrar la cantidad de elementos de acuerdo a las paginas
function* crearPaginador(total) {
    console.log(total);
    for (let i = 1; i <= total; i++) {
        //con value accedemos al valor registrado con yield
        yield i
    }
}

function imprimirPaginador() {
    const iterador = crearPaginador(totalPaginas)
    while (true) {
        const { value, done } = iterador.next()                                 //usamos el generador
        if (done) return

        const boton = document.createElement('a')
        boton.href = '#'
        boton.dataset.pagina = value
        boton.textContent = value
        boton.classList.add('siguiente', 'bg-yellow-400', 'px-4', 'py-1', 'mr-2', 'font-bold', 'mb-4', 'uppercase', 'rounded')

        boton.onclick = () => {
            paginaActual = value                                                //la pagina actual cambia
            console.log(paginaActual);
            buscarImagenes()
        }

        paginacionDiv.appendChild(boton)
    }
}