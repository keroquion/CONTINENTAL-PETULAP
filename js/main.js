// Petulap - Registro interactivo de diagnósticos
document.getElementById('formDiagnostico').addEventListener('submit', function (event) {
    event.preventDefault();

    const inputFalla = document.getElementById('inputFalla');
    const fallaTexto = inputFalla.value.trim();

    if (fallaTexto !== '') {
        const lista = document.getElementById('listaDiagnosticos');
        const nuevoElemento = document.createElement('li');
        nuevoElemento.className = 'list-group-item';
        nuevoElemento.textContent = fallaTexto;

        lista.appendChild(nuevoElemento);
        inputFalla.value = '';
    }
});
