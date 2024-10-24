
document.addEventListener('DOMContentLoaded', function () {
    const toggleButton = document.querySelector('.toggle-button');
    const vehicleForm = document.getElementById('vehicleForm');

    toggleButton.addEventListener('click', function () {
        // Cambiar la visibilidad del formulario
        if (vehicleForm.style.display === 'none' || vehicleForm.style.display === '') {
            vehicleForm.style.display = 'block';
            toggleButton.setAttribute('aria-expanded', 'true');
        } else {
            vehicleForm.style.display = 'none';
            toggleButton.setAttribute('aria-expanded', 'false');
        }
    });
});

