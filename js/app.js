const resultado = document.querySelector('#resultado')
const formulario = document.querySelector('#formulario')

window.onload = () => {
    formulario.addEventListener('submit', validarFormulario)
}

function validarFormulario(e) {
    e.preventDefault()

    const terminoBusqueda = document.querySelector('#termino').value
    terminoBusqueda === ''
        ? mostrarAlerta('Agrega un termino de busqueda')
        : (// TODO:
            mostrarAlerta('INGRESADO PENDIENTE')
        )
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