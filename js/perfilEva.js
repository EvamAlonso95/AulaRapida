// ------- PERFIL CONDUCTOR / PASAJERO -------
// Seleccionamos los elementos de los botones de radio y los cuadros de perfil
const condRadioEva = document.getElementById('cond');
const pasjRadioEva = document.getElementById('pasj');
const perfilCondEva = document.querySelector('.perfil_cond_eva');
const perfilPasjEva = document.querySelector('.perfil_pasj_eva');

// Función que cambia la visibilidad dependiendo del radio seleccionado
function cambiarPerfil() {
    if (condRadioEva.checked) {
        perfilCondEva.style.display = 'block';  // Muestra la lista del conductor
        perfilPasjEva.style.display = 'none';   // Oculta la lista del pasajero
    } else {
        perfilCondEva.style.display = 'none';   // Oculta la lista del conductor
        perfilPasjEva.style.display = 'block';  // Muestra la lista del pasajero
    }
}

// Event listeners para cuando cambian las opciones de radio
condRadioEva.addEventListener('change', cambiarPerfil);
pasjRadioEva.addEventListener('change', cambiarPerfil);

// Ejecutamos la función una vez al cargar la página para asegurarnos del estado inicial
cambiarPerfil();

// ------- AÑADIR VEHICULO -------
// Crear un array vacío para almacenar los vehículos o cargar desde localStorage
let vehiculos = JSON.parse(localStorage.getItem('vehiculos')) || [];

// Función para actualizar la lista visualmente
function actualizarListaVehiculos() {
    const listaVehiculos = document.getElementById("lista-vehiculos");
    listaVehiculos.innerHTML = ""; // Limpia la lista para evitar duplicados
    vehiculos.forEach(function (vehiculo, index) {
        // Crear un nuevo elemento de lista <li> para cada vehículo
        const nuevoElemento = document.createElement("li");
        nuevoElemento.textContent = `${vehiculo.modelo} (${vehiculo.color})`;
        nuevoElemento.setAttribute('data-index', index); // Asignar un índice para identificar el vehículo
        listaVehiculos.appendChild(nuevoElemento);
    });
}

// Esperar a que el contenido esté cargado
document.addEventListener("DOMContentLoaded", function () {
    // Selecciona el botón de "Añadir vehículo"
    const botonAniadirVehiculo = document.getElementById("boton-aniadir-vehiculo");

    // Actualizar la lista al cargar la página
    actualizarListaVehiculos();

    // Añade un evento click al botón de añadir vehículo
    botonAniadirVehiculo.addEventListener("click", function (event) {
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

        // Si se ingresó un valor válido para modelo y color, añadirlo a la lista y al array
        if (modeloVehiculo && modeloVehiculo.trim() !== "" && colorVehiculo && colorVehiculo.trim() !== "") {
            // Guardar el vehículo en el array como un objeto
            const vehiculo = {
                modelo: modeloVehiculo.toUpperCase(),
                color: capitalizeFirstLetter(colorVehiculo)
            };
            vehiculos.push(vehiculo); // Añadir el nuevo vehículo al array

            // Actualizar el localStorage
            localStorage.setItem('vehiculos', JSON.stringify(vehiculos));

            // Actualizar la lista visualmente
            actualizarListaVehiculos();
        } else {
            alert("Por favor, introduce un modelo y un color de vehículo válidos.");
        }
    });

    // ------- ELIMINAR VEHICULO -------

    const botonEliminarVehiculo = document.getElementById("boton-eliminar-vehiculo");

    botonEliminarVehiculo.addEventListener("click", function (event) {
        event.preventDefault(); // Previene la recarga de la página

        // Solicitar al usuario el índice del vehículo que desea eliminar
        const indiceVehiculo = prompt("Introduce el número del vehículo a eliminar (empezando por 1):");

        // Convertir a número y ajustar el índice (las listas comienzan en 0)
        const indice = parseInt(indiceVehiculo) - 1;

        // Verificar si el índice es válido
        if (!isNaN(indice) && indice >= 0 && indice < vehiculos.length) {
            // Eliminar el vehículo del array
            vehiculos.splice(indice, 1);

            // Actualizar el localStorage
            localStorage.setItem('vehiculos', JSON.stringify(vehiculos));

            // Actualizar la lista visualmente
            actualizarListaVehiculos();
        } else {
            alert("Por favor, introduce un número válido.");
        }
    });
});
