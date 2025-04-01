function cargarHora() {
    Swal.fire({
        title: 'Registrar Horas',
        html: `
            <label class='form-label'>Turno</label>
            <select id="swal-period" class="form-select">
                <option value="" selected>Seleccione un turno</option>
                <option value="Diurna ₡2241.31">Diurnas ₡2241.31 (5:00am - 19:00pm)</option>
                <option value="Mixta ₡2561.50">Mixtas ₡2561.50 (19:00 - 22:00)</option>
                <option value="Nocturna ₡2988.41">Nocturnas ₡2988.41 (22:00 - 5:00am)</option>
            </select>
            <label class='form-label mt-2'>Hora de Inicio</label>
            <input id='horaInicio' class='form-control' type='time'>
            <label class='form-label mt-2'>Hora de Fin</label>
            <input id='horaFin' class='form-control' type='time'>
            <label class='form-label mt-2'>Fecha</label>
            <input id='fecha' class='form-control' type='date'>
            <label class='form-label mt-2'>Motivo</label>
            <input id='motivo' class='form-control' type='text' placeholder='Motivo del registro'>
            <label class='form-label mt-2'>Total de Horas</label>
            <input id='totalHoras' class='form-control' type='number' step='0.01' placeholder='Ingrese las horas trabajadas'>
            <label class='form-label mt-2'>Total de Minutos</label>
            <input id='totalMinutos' class='form-control' type='number' step='1' placeholder='Ingrese los minutos trabajados'>
        `,
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        preConfirm: () => {
            const turno = document.getElementById('swal-period').value;
            const horaInicio = document.getElementById('horaInicio').value;
            const horaFin = document.getElementById('horaFin').value;
            const fecha = document.getElementById('fecha').value;
            const motivo = document.getElementById('motivo').value;
            const totalHoras = document.getElementById('totalHoras').value;
            const totalMinutos = document.getElementById('totalMinutos').value;

            if (!turno || !horaInicio || !horaFin || !fecha || !motivo || !totalHoras || !totalMinutos) {
                Swal.showValidationMessage('Todos los campos son obligatorios');
                return false;
            }

            // Extraer solo el valor numérico del turno (ej: "2241.31" de "Diurnas ₡2241.31")
            const turnoValor = turno.match(/[\d.]+/)[0];

            const registro = { turno, turnoValor, horaInicio, horaFin, fecha, motivo, totalHoras, totalMinutos };
            let registros = JSON.parse(localStorage.getItem('registroHoras') || '[]');
            registros.push(registro);
            localStorage.setItem('registroHoras', JSON.stringify(registros));
            actualizarTabla();
            Swal.fire('Guardado', 'El registro ha sido guardado con éxito', 'success');
        }
    });
}
