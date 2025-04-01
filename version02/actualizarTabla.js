function actualizarTabla() {
    let registros = JSON.parse(localStorage.getItem('registroHoras')) || [];
    if (!Array.isArray(registros)) registros = [];
    const tbody = document.getElementById('tabla-registros');
    tbody.innerHTML = '';

    registros.forEach(registro => {
        // Extraer solo el valor numérico del turno (por ejemplo, "₡2241.31" -> "2241.31")
        const turnoValor = parseFloat(registro.turnoValor); // Usamos el valor ya extraído

        // Convertir totalHoras y totalMinutos a números para el cálculo
        const horasTrabajadas = parseFloat(registro.totalHoras);
        const minutosTrabajados = parseInt(registro.totalMinutos);

        // Calcular el subtotal: horas * valor por hora + minutos * valor por minuto
        const valorPorMinuto = turnoValor / 60; // El valor por minuto sería el valor por hora dividido entre 60
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
            <td>${subtotal.toFixed(2)}</td> <!-- Nueva columna con el subtotal calculado -->
        </tr>`;
        tbody.innerHTML += fila;
    });
}
