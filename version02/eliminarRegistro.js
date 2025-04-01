function eliminarRegistro(index) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción eliminará este registro.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Obtener los registros del localStorage
            let registros = JSON.parse(localStorage.getItem('registroHoras')) || [];
            // Eliminar el registro correspondiente
            registros.splice(index, 1);
            // Guardar nuevamente los registros actualizados en localStorage
            localStorage.setItem('registroHoras', JSON.stringify(registros));
            // Actualizar la tabla
            actualizarTabla();
            Swal.fire('¡Eliminado!', 'El registro ha sido eliminado.', 'success');
        }
    });
}