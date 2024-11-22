// ------- PERFIL CONDUCTOR / PASAJERO -------
// Seleccionamos los elementos de los botones de radio y los cuadros de perfil de julen
const condRadiojulen = document.getElementById('cond-julen');
const pasjRadiojulen = document.getElementById('pasj-julen');
const perfilCondjulen = document.querySelector('.perfil_cond_julen');
const perfilPasjjulen = document.querySelector('.perfil_pasj_julen');

// Función que cambia la visibilidad dependiendo del radio seleccionado
function cambiarPerfiljulen() {
    if (condRadiojulen.checked) {
        perfilCondjulen.style.display = 'block';  // Muestra la lista del conductor de julen
        perfilPasjjulen.style.display = 'none';   // Oculta la lista del pasajero de julen
    } else {
        perfilCondjulen.style.display = 'none';   // Oculta la lista del conductor de julen
        perfilPasjjulen.style.display = 'block';  // Muestra la lista del pasajero de julen
    }
}

// Event listeners para cuando cambian las opciones de radio de julen
condRadiojulen.addEventListener('change', cambiarPerfiljulen);
pasjRadiojulen.addEventListener('change', cambiarPerfiljulen);

// Ejecutamos la función una vez al cargar la página para asegurarnos del estado inicial
cambiarPerfiljulen();

// ------- AÑADIR VEHICULO -------
// Crear un array vacío para almacenar los vehículos de julen o cargar desde localStorage
let vehiculosjulen = JSON.parse(localStorage.getItem('vehiculosjulen')) || [];

// Función para actualizar la lista de vehículos de julen visualmente
function actualizarListaVehiculosjulen() {
    const listaVehiculosjulen = document.getElementById("lista-vehiculos-julen");
    listaVehiculosjulen.innerHTML = ""; // Limpia la lista para evitar duplicados
    vehiculosjulen.forEach(function (vehiculo, index) {
        // Crear un nuevo elemento de lista <li> para cada vehículo de julen
        const nuevoElemento = document.createElement("li");
        nuevoElemento.textContent = `${vehiculo.modelo} (${vehiculo.color})`;
        nuevoElemento.setAttribute('data-index', index); // Asignar un índice para identificar el vehículo
        listaVehiculosjulen.appendChild(nuevoElemento);
    });
}

// Esperar a que el contenido esté cargado
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona el botón de "Añadir vehículo" de julen
    const botonAniadirVehiculojulen = document.getElementById("boton-aniadir-vehiculo-julen");

    // Actualizar la lista de vehículos de julen al cargar la página
    actualizarListaVehiculosjulen();

    // Añade un evento click al botón de añadir vehículo de julen
    botonAniadirVehiculojulen.addEventListener("click", function (event) {
        event.preventDefault(); // Previene la recarga de la página

        // Solicita al usuario que ingrese el modelo del vehículo
        const modeloVehiculo = prompt("Introduce el modelo del vehículo (Marca Modelo):");
        // Solicita al usuario que ingrese el color del vehículo
        const colorVehiculo = prompt("Introduce el color del vehículo:");

        // Función para capitalizar la primera letra
        function capitalizeFirstLetter(string) {
            if (!string) return ""; // Manejar cadenas vacías
            return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
        }

        // Si se ingresó un valor válido para modelo y color, añadirlo a la lista y al array de julen
        if (modeloVehiculo && modeloVehiculo.trim() !== "" && colorVehiculo && colorVehiculo.trim() !== "") {
            // Guardar el vehículo en el array como un objeto
            const vehiculo = {
                modelo: modeloVehiculo.toUpperCase(),
                color: capitalizeFirstLetter(colorVehiculo)
            };
            vehiculosjulen.push(vehiculo); // Añadir el nuevo vehículo al array de julen

            // Actualizar el localStorage
            localStorage.setItem('vehiculosjulen', JSON.stringify(vehiculosjulen));

            // Actualizar la lista de vehículos de julen visualmente
            actualizarListaVehiculosjulen();
        } else {
            alert("Por favor, introduce un modelo y un color de vehículo válidos.");
        }
    });

    // ------- ELIMINAR VEHICULO -------
    const botonEliminarVehiculojulen = document.getElementById("boton-eliminar-vehiculo-julen");

    botonEliminarVehiculojulen.addEventListener("click", function (event) {
        event.preventDefault(); // Previene la recarga de la página

        // Solicitar al usuario el índice del vehículo de julen que desea eliminar
        const indiceVehiculo = prompt("Introduce el número del vehículo a eliminar (empezando por 1):");

        // Convertir a número y ajustar el índice (las listas comienzan en 0)
        const indice = parseInt(indiceVehiculo) - 1;

        // Verificar si el índice es válido
        if (!isNaN(indice) && indice >= 0 && indice < vehiculosjulen.length) {
            // Eliminar el vehículo del array de julen
            vehiculosjulen.splice(indice, 1);

            // Actualizar el localStorage
            localStorage.setItem('vehiculosjulen', JSON.stringify(vehiculosjulen));

            // Actualizar la lista de vehículos de julen visualmente
            actualizarListaVehiculosjulen();
        } else {
            alert("Por favor, introduce un número válido.");
        }
    });
});
