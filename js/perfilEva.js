// ------- PERFIL CONDUCTOR / PASAJERO -------
// Seleccionamos los elementos de los botones de radio y los cuadros de perfil de eva
const condRadioeva = document.getElementById('cond-eva');
const pasjRadioeva = document.getElementById('pasj-eva');
const perfilCondeva = document.querySelector('.perfil_cond_eva');
const perfilPasjeva = document.querySelector('.perfil_pasj_eva');

// Función que cambia la visibilidad dependiendo del radio seleccionado
function cambiarPerfileva() {
    if (condRadioeva.checked) {
        perfilCondeva.style.display = 'block';  // Muestra la lista del conductor de eva
        perfilPasjeva.style.display = 'none';   // Oculta la lista del pasajero de eva
    } else {
        perfilCondeva.style.display = 'none';   // Oculta la lista del conductor de eva
        perfilPasjeva.style.display = 'block';  // Muestra la lista del pasajero de eva
    }
}

// Event listeners para cuando cambian las opciones de radio de eva
condRadioeva.addEventListener('change', cambiarPerfileva);
pasjRadioeva.addEventListener('change', cambiarPerfileva);

// Ejecutamos la función una vez al cargar la página para asegurarnos del estado inicial
cambiarPerfileva();

// ------- AÑADIR VEHICULO -------
// Crear un array vacío para almacenar los vehículos de eva o cargar desde localStorage
let vehiculoseva = JSON.parse(localStorage.getItem('vehiculoseva')) || [];

// Función para actualizar la lista de vehículos de eva visualmente
function actualizarListaVehiculoseva() {
    const listaVehiculoseva = document.getElementById("lista-vehiculos-eva");
    listaVehiculoseva.innerHTML = ""; // Limpia la lista para evitar duplicados
    vehiculoseva.forEach(function (vehiculo, index) {
        // Crear un nuevo elemento de lista <li> para cada vehículo de eva
        const nuevoElemento = document.createElement("li");
        nuevoElemento.textContent = `${vehiculo.modelo} (${vehiculo.color})`;
        nuevoElemento.setAttribute('data-index', index); // Asignar un índice para identificar el vehículo
        listaVehiculoseva.appendChild(nuevoElemento);
    });
}

// Esperar a que el contenido esté cargado
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona el botón de "Añadir vehículo" de eva
    const botonAniadirVehiculoeva = document.getElementById("boton-aniadir-vehiculo-eva");

    // Actualizar la lista de vehículos de eva al cargar la página
    actualizarListaVehiculoseva();

    // Añade un evento click al botón de añadir vehículo de eva
    botonAniadirVehiculoeva.addEventListener("click", function (event) {
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

        // Si se ingresó un valor válido para modelo y color, añadirlo a la lista y al array de eva
        if (modeloVehiculo && modeloVehiculo.trim() !== "" && colorVehiculo && colorVehiculo.trim() !== "") {
            // Guardar el vehículo en el array como un objeto
            const vehiculo = {
                modelo: modeloVehiculo.toUpperCase(),
                color: capitalizeFirstLetter(colorVehiculo)
            };
            vehiculoseva.push(vehiculo); // Añadir el nuevo vehículo al array de eva

            // Actualizar el localStorage
            localStorage.setItem('vehiculoseva', JSON.stringify(vehiculoseva));

            // Actualizar la lista de vehículos de eva visualmente
            actualizarListaVehiculoseva();
        } else {
            alert("Por favor, introduce un modelo y un color de vehículo válidos.");
        }
    });

    // ------- ELIMINAR VEHICULO -------
    const botonEliminarVehiculoeva = document.getElementById("boton-eliminar-vehiculo-eva");

    botonEliminarVehiculoeva.addEventListener("click", function (event) {
        event.preventDefault(); // Previene la recarga de la página

        // Solicitar al usuario el índice del vehículo de eva que desea eliminar
        const indiceVehiculo = prompt("Introduce el número del vehículo a eliminar (empezando por 1):");

        // Convertir a número y ajustar el índice (las listas comienzan en 0)
        const indice = parseInt(indiceVehiculo) - 1;

        // Verificar si el índice es válido
        if (!isNaN(indice) && indice >= 0 && indice < vehiculoseva.length) {
            // Eliminar el vehículo del array de eva
            vehiculoseva.splice(indice, 1);

            // Actualizar el localStorage
            localStorage.setItem('vehiculoseva', JSON.stringify(vehiculoseva));

            // Actualizar la lista de vehículos de eva visualmente
            actualizarListaVehiculoseva();
        } else {
            alert("Por favor, introduce un número válido.");
        }
    });
});
