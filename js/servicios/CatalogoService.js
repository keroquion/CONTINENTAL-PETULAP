// CAPA DE SERVICIO: Catálogo de servicios técnicos (servicio simulado).
// Simula una API REST: devuelve Promesas con una pequeña espera, igual que una llamada real.
// Si más adelante existe una API real, solo se cambia el interior de listar().
(function () {
    const SERVICIOS = [
        { id: 1, nombre: 'Mantenimiento', precio: 60,
          descripcion: 'Limpieza interna profunda, cambio de pasta térmica y optimización del sistema de ventilación.' },
        { id: 2, nombre: 'Repotenciación SSD', precio: 150,
          descripcion: 'Aceleramos tu laptop instalando discos de estado sólido SSD y ampliaciones de memoria RAM.' },
        { id: 3, nombre: 'Cambio de Batería/Teclado', precio: 120,
          descripcion: 'Reemplazo de baterías agotadas, teclados con fallas mecánicas y componentes originales.' }
    ];

    function esperar(valor) {
        return new Promise(function (resolver) {
            setTimeout(function () { resolver(valor); }, 300);
        });
    }

    window.Petulap = window.Petulap || {};

    window.Petulap.CatalogoService = {
        // GET /servicios
        listar: function () {
            return esperar(SERVICIOS.slice());
        },
        // GET /servicios/:id
        obtenerPorId: function (id) {
            const encontrado = SERVICIOS.find(function (s) { return s.id === Number(id); });
            return esperar(encontrado || null);
        }
    };
})();
