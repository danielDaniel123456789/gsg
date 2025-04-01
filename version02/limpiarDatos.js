function limpiarDatos() {
    // Preguntar al usuario si está seguro de eliminar los datos
    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción eliminará todos los registros de horas guardados.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Limpiar el localStorage
            localStorage.removeItem('registroHoras');
            // Actualizar la tabla para reflejar que los datos se han borrado
            actualizarTabla();
            Swal.fire('¡Eliminado!', 'Los datos han sido eliminados.', 'success');
        }
    });
}
