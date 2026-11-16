// CAPA DE PRESENTACIÓN - Vista 2 (diagnosticos.html): Registro de diagnósticos.
// Recoge datos del formulario, los envía a DiagnosticoService y pinta la respuesta.
(function () {
    const Servicio = window.Petulap.DiagnosticoService;
    const Catalogo = window.Petulap.CatalogoService;

    const formulario = document.getElementById('formDiagnostico');
    const selectServicio = document.getElementById('selectServicio');
    const lista = document.getElementById('listaDiagnosticos');
    const alerta = document.getElementById('alertaForm');
    const vacio = document.getElementById('mensajeVacio');

    const COLOR_ESTADO = { 'Pendiente': 'bg-secondary', 'En revisión': 'bg-warning text-dark', 'Listo': 'bg-success' };

    function mostrarAlerta(texto, tipo) {
        alerta.className = 'alert alert-' + tipo;
        alerta.textContent = texto;
    }

    function limpiarAlerta() {
        alerta.className = 'd-none';
        alerta.textContent = '';
    }

    function crearBoton(texto, clase, accion) {
        const boton = document.createElement('button');
        boton.type = 'button';
        boton.className = 'btn btn-sm ' + clase;
        boton.textContent = texto;
        boton.addEventListener('click', accion);
        return boton;
    }

    function crearFila(d) {
        const fila = document.createElement('li');
        fila.className = 'list-group-item d-flex flex-wrap justify-content-between align-items-center gap-2';

        const info = document.createElement('div');
        const titulo = document.createElement('strong');
        titulo.textContent = d.equipo + ' — ' + d.cliente;
        const detalle = document.createElement('div');
        detalle.className = 'small text-muted';
        detalle.textContent = d.falla + ' · ' + d.servicioNombre + ' · ' + d.fecha;
        info.append(titulo, detalle);

        const acciones = document.createElement('div');
        acciones.className = 'd-flex align-items-center gap-2';

        const estado = document.createElement('span');
        estado.className = 'badge ' + (COLOR_ESTADO[d.estado] || 'bg-secondary');
        estado.textContent = d.estado;

        const botonEstado = crearBoton('Cambiar estado', 'btn-outline-primary', function () {
            Servicio.avanzarEstado(d.id).then(pintarLista);
        });
        const botonBorrar = crearBoton('Eliminar', 'btn-outline-danger', function () {
            Servicio.eliminar(d.id).then(pintarLista);
        });

        acciones.append(estado, botonEstado, botonBorrar);
        fila.append(info, acciones);
        return fila;
    }

    function pintarLista() {
        return Servicio.listar().then(function (diagnosticos) {
            lista.replaceChildren();
            vacio.classList.toggle('d-none', diagnosticos.length > 0);
            diagnosticos.forEach(function (d) { lista.appendChild(crearFila(d)); });
        });
    }

    function cargarServicios() {
        return Catalogo.listar().then(function (servicios) {
            servicios.forEach(function (s) {
                const opcion = document.createElement('option');
                opcion.value = s.id;
                opcion.textContent = s.nombre;
                selectServicio.appendChild(opcion);
            });
        });
    }

    formulario.addEventListener('submit', function (evento) {
        evento.preventDefault();
        limpiarAlerta();

        const nombreServicio = selectServicio.options[selectServicio.selectedIndex].textContent;
        const datos = {
            cliente: document.getElementById('inputCliente').value,
            equipo: document.getElementById('inputEquipo').value,
            falla: document.getElementById('inputFalla').value,
            servicioId: selectServicio.value,
            servicioNombre: nombreServicio
        };

        Servicio.crear(datos)
            .then(function () {
                formulario.reset();
                mostrarAlerta('Diagnóstico registrado correctamente.', 'success');
                return pintarLista();
            })
            .catch(function (error) {
                mostrarAlerta(error.message, 'danger');
            });
    });

    cargarServicios().then(pintarLista);
})();
