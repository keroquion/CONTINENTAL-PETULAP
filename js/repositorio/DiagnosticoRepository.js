// CAPA DE DATOS: Repositorio de diagnósticos.
// Responsabilidad ÚNICA: guardar y leer datos. No valida ni conoce la interfaz.
// Persistencia: localStorage del navegador (no se usa archivo ni motor de base de datos).
// Si localStorage no está disponible, se usa un arreglo en memoria como respaldo.
(function () {
    const CLAVE = 'petulap_diagnosticos';
    let memoria = [];

    function leer() {
        try {
            const texto = localStorage.getItem(CLAVE);
            return texto ? JSON.parse(texto) : [];
        } catch (e) {
            return memoria;
        }
    }

    function escribir(lista) {
        memoria = lista;
        try {
            localStorage.setItem(CLAVE, JSON.stringify(lista));
        } catch (e) {
            // Sin localStorage: se mantiene solo en memoria.
        }
    }

    window.Petulap = window.Petulap || {};

    window.Petulap.DiagnosticoRepository = {
        obtenerTodos: function () {
            return leer();
        },
        guardar: function (diagnostico) {
            const lista = leer();
            lista.push(diagnostico);
            escribir(lista);
            return diagnostico;
        },
        actualizar: function (id, cambios) {
            const lista = leer();
            const item = lista.find(function (d) { return d.id === id; });
            if (!item) { return null; }
            Object.assign(item, cambios);
            escribir(lista);
            return item;
        },
        eliminar: function (id) {
            const lista = leer().filter(function (d) { return d.id !== id; });
            escribir(lista);
        }
    };
})();
