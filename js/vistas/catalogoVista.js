// CAPA DE PRESENTACIÓN - Vista 1 (index.html): Catálogo de servicios.
// Solo pinta datos que le entrega CatalogoService. No contiene datos propios.
(function () {
    const contenedor = document.getElementById('listaServicios');
    const mensaje = document.getElementById('mensajeServicios');

    function crearTarjeta(servicio) {
        const columna = document.createElement('div');
        columna.className = 'col-md-4';

        const tarjeta = document.createElement('article');
        tarjeta.className = 'card h-100 shadow-sm text-center p-3';

        const cuerpo = document.createElement('div');
        cuerpo.className = 'card-body';

        const titulo = document.createElement('h3');
        titulo.className = 'card-title h5 fw-bold';
        titulo.textContent = servicio.nombre;

        const texto = document.createElement('p');
        texto.className = 'card-text text-muted';
        texto.textContent = servicio.descripcion;

        const precio = document.createElement('p');
        precio.className = 'fw-bold text-primary mb-0';
        precio.textContent = 'Desde S/ ' + servicio.precio;

        cuerpo.append(titulo, texto, precio);
        tarjeta.appendChild(cuerpo);
        columna.appendChild(tarjeta);
        return columna;
    }

    mensaje.textContent = 'Cargando servicios...';

    window.Petulap.CatalogoService.listar()
        .then(function (servicios) {
            mensaje.textContent = '';
            servicios.forEach(function (s) { contenedor.appendChild(crearTarjeta(s)); });
        })
        .catch(function () {
            mensaje.textContent = 'No se pudo cargar el catálogo. Intenta de nuevo.';
        });
})();
