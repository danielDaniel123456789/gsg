function actualizarTabla() {
    let registros = JSON.parse(localStorage.getItem('registroHoras')) || [];
    if (!Array.isArray(registros)) registros = [];
    const tbody = document.getElementById('tabla-registros');
    tbody.innerHTML = '';

    registros.forEach((registro, index) => {
        const turnoValor = parseFloat(registro.turnoValor);
        const horasTrabajadas = parseFloat(registro.totalHoras);
        const minutosTrabajados = parseInt(registro.totalMinutos);
        const valorPorMinuto = turnoValor / 60;
        const subtotal = (horasTrabajadas * turnoValor) + (minutosTrabajados * valorPorMinuto);

        const fila = `<tr>
            <td>${registro.turno}</td>
            <td>${registro.horaInicio}</td>
            <td>${registro.horaFin}</td>
            <td>${registro.fecha}</td>
            <td>${registro.motivo}</td>
            <td>${registro.totalHoras} horas</td>
            <td>${registro.totalMinutos} minutos</td>
            <td>${turnoValor.toFixed(2)}</td>
            <td>${subtotal.toFixed(2)}</td>
            <td>
                <button class="btn btn-danger" onclick="eliminarRegistro(${index})">
                    <i class="bi bi-trash"></i> Eliminar
                </button>
            </td>
        </tr>`;
        tbody.innerHTML += fila;
    });
}