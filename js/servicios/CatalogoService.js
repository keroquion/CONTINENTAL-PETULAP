// CAPA DE SERVICIO: Catálogo de servicios técnicos.
// Consume el archivo data/servicios.json con Fetch API (solicitud HTTP GET).
// Si el sitio se abre sin servidor (doble clic, file://), fetch no puede leer el archivo
// y se usa una copia de respaldo para que la página siga funcionando.
(function () {
    const RESPALDO = [
        { id: 1, nombre: 'Mantenimiento', precio: 60,
          descripcion: 'Limpieza interna profunda, cambio de pasta térmica y optimización del sistema de ventilación.' },
        { id: 2, nombre: 'Repotenciación SSD', precio: 150,
          descripcion: 'Aceleramos tu laptop instalando discos de estado sólido SSD y ampliaciones de memoria RAM.' },
        { id: 3, nombre: 'Cambio de Batería/Teclado', precio: 120,
          descripcion: 'Reemplazo de baterías agotadas, teclados con fallas mecánicas y componentes originales.' }
    ];

    window.Petulap = window.Petulap || {};

    window.Petulap.CatalogoService = {
        // GET data/servicios.json
        listar: function () {
            return fetch('data/servicios.json')
                .then(function (respuesta) {
                    if (!respuesta.ok) { throw new Error('Error HTTP ' + respuesta.status); }
                    return respuesta.json();
                })
                .catch(function () {
                    return RESPALDO.slice();
                });
        },
        // Busca un servicio por id dentro del catálogo
        obtenerPorId: function (id) {
            return this.listar().then(function (servicios) {
                return servicios.find(function (s) { return s.id === Number(id); }) || null;
            });
        }
    };
})();
