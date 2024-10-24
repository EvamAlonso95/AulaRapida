
document.addEventListener('DOMContentLoaded', function () {
    const dropdown = document.querySelector('.header__menu-dropdown');
    const menu = document.querySelector('.dropdown__menu');

    dropdown.addEventListener('click', function (e) {
        e.preventDefault();
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    });

    // Cierra el menú si haces clic fuera de él
    document.addEventListener('click', function (e) {
        if (!dropdown.contains(e.target)) {
            menu.style.display = 'none';
        }
    });
});

