// ------- PERFIL CONDUCTOR / PASAJERO -------
// Seleccionamos los elementos de los botones de radio y los cuadros de perfil de Bea
const condRadioBea = document.getElementById('cond-bea');
const pasjRadioBea = document.getElementById('pasj-bea');
const perfilCondBea = document.querySelector('.perfil_cond_bea');
const perfilPasjBea = document.querySelector('.perfil_pasj_bea');

// Función que cambia la visibilidad dependiendo del radio seleccionado
function cambiarPerfilBea() {
    if (condRadioBea.checked) {
        perfilCondBea.style.display = 'block';  // Muestra la lista del conductor de Bea
        perfilPasjBea.style.display = 'none';   // Oculta la lista del pasajero de Bea
    } else {
        perfilCondBea.style.display = 'none';   // Oculta la lista del conductor de Bea
        perfilPasjBea.style.display = 'block';  // Muestra la lista del pasajero de Bea
    }
}

// Event listeners para cuando cambian las opciones de radio de Bea
condRadioBea.addEventListener('change', cambiarPerfilBea);
pasjRadioBea.addEventListener('change', cambiarPerfilBea);

// Ejecutamos la función una vez al cargar la página para asegurarnos del estado inicial
cambiarPerfilBea();

// ------- AÑADIR VEHICULO -------
// Crear un array vacío para almacenar los vehículos de Bea o cargar desde localStorage
let vehiculosBea = JSON.parse(localStorage.getItem('vehiculosBea')) || [];

// Función para actualizar la lista de vehículos de Bea visualmente
function actualizarListaVehiculosBea() {
    const listaVehiculosBea = document.getElementById("lista-vehiculos-bea");
    listaVehiculosBea.innerHTML = ""; // Limpia la lista para evitar duplicados
    vehiculosBea.forEach(function (vehiculo, index) {
        // Crear un nuevo elemento de lista <li> para cada vehículo de Bea
        const nuevoElemento = document.createElement("li");
        nuevoElemento.textContent = `${vehiculo.modelo} (${vehiculo.color})`;
        nuevoElemento.setAttribute('data-index', index); // Asignar un índice para identificar el vehículo
        listaVehiculosBea.appendChild(nuevoElemento);
    });
}

// Esperar a que el contenido esté cargado
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona el botón de "Añadir vehículo" de Bea
    const botonAniadirVehiculoBea = document.getElementById("boton-aniadir-vehiculo-bea");

    // Actualizar la lista de vehículos de Bea al cargar la página
    actualizarListaVehiculosBea();

    // Añade un evento click al botón de añadir vehículo de Bea
    botonAniadirVehiculoBea.addEventListener("click", function (event) {
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

        // Si se ingresó un valor válido para modelo y color, añadirlo a la lista y al array de Bea
        if (modeloVehiculo && modeloVehiculo.trim() !== "" && colorVehiculo && colorVehiculo.trim() !== "") {
            // Guardar el vehículo en el array como un objeto
            const vehiculo = {
                modelo: modeloVehiculo.toUpperCase(),
                color: capitalizeFirstLetter(colorVehiculo)
            };
            vehiculosBea.push(vehiculo); // Añadir el nuevo vehículo al array de Bea

            // Actualizar el localStorage
            localStorage.setItem('vehiculosBea', JSON.stringify(vehiculosBea));

            // Actualizar la lista de vehículos de Bea visualmente
            actualizarListaVehiculosBea();
        } else {
            alert("Por favor, introduce un modelo y un color de vehículo válidos.");
        }
    });

    // ------- ELIMINAR VEHICULO -------
    const botonEliminarVehiculoBea = document.getElementById("boton-eliminar-vehiculo-bea");

    botonEliminarVehiculoBea.addEventListener("click", function (event) {
        event.preventDefault(); // Previene la recarga de la página

        // Solicitar al usuario el índice del vehículo de Bea que desea eliminar
        const indiceVehiculo = prompt("Introduce el número del vehículo a eliminar (empezando por 1):");

        // Convertir a número y ajustar el índice (las listas comienzan en 0)
        const indice = parseInt(indiceVehiculo) - 1;

        // Verificar si el índice es válido
        if (!isNaN(indice) && indice >= 0 && indice < vehiculosBea.length) {
            // Eliminar el vehículo del array de Bea
            vehiculosBea.splice(indice, 1);

            // Actualizar el localStorage
            localStorage.setItem('vehiculosBea', JSON.stringify(vehiculosBea));

            // Actualizar la lista de vehículos de Bea visualmente
            actualizarListaVehiculosBea();
        } else {
            alert("Por favor, introduce un número válido.");
        }
    });
});
