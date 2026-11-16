// CAPA DE SERVICIO: Reglas de negocio de los diagnósticos.
// Responsabilidades: validar datos, asignar id/fecha/estado y usar el repositorio.
// La interfaz NUNCA habla con el repositorio directamente, siempre pasa por aquí.
(function () {
    const ESTADOS = ['Pendiente', 'En revisión', 'Listo'];
    const repo = function () { return window.Petulap.DiagnosticoRepository; };

    function esperar(valor) {
        return new Promise(function (resolver) {
            setTimeout(function () { resolver(valor); }, 200);
        });
    }

    function rechazar(mensaje) {
        return new Promise(function (resolver, rechazar) {
            setTimeout(function () { rechazar(new Error(mensaje)); }, 200);
        });
    }

    window.Petulap = window.Petulap || {};

    window.Petulap.DiagnosticoService = {
        estados: ESTADOS,

        // GET /diagnosticos
        listar: function () {
            return esperar(repo().obtenerTodos());
        },

        // POST /diagnosticos
        crear: function (datos) {
            const cliente = (datos.cliente || '').trim();
            const equipo = (datos.equipo || '').trim();
            const falla = (datos.falla || '').trim();

            if (cliente.length < 3) { return rechazar('El nombre del cliente debe tener al menos 3 letras.'); }
            if (equipo.length < 2) { return rechazar('Indica el equipo (ej. HP Pavilion).'); }
            if (falla.length < 5) { return rechazar('Describe la falla con al menos 5 caracteres.'); }
            if (!datos.servicioId) { return rechazar('Elige un servicio del catálogo.'); }

            const nuevo = {
                id: Date.now(),
                cliente: cliente,
                equipo: equipo,
                falla: falla,
                servicioId: Number(datos.servicioId),
                servicioNombre: datos.servicioNombre || '',
                estado: ESTADOS[0],
                fecha: new Date().toLocaleDateString('es-PE')
            };
            return esperar(repo().guardar(nuevo));
        },

        // PUT /diagnosticos/:id/estado  (Pendiente -> En revisión -> Listo -> Pendiente)
        avanzarEstado: function (id) {
            const actual = repo().obtenerTodos().find(function (d) { return d.id === id; });
            if (!actual) { return rechazar('El diagnóstico ya no existe.'); }
            const siguiente = ESTADOS[(ESTADOS.indexOf(actual.estado) + 1) % ESTADOS.length];
            return esperar(repo().actualizar(id, { estado: siguiente }));
        },

        // DELETE /diagnosticos/:id
        eliminar: function (id) {
            repo().eliminar(id);
            return esperar(true);
        }
    };
})();
