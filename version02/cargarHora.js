function cargarHora() {
    const hoy = new Date();
    const mesActual = hoy.getMonth() + 1; // Mes actual (1-12)
    const añoActual = hoy.getFullYear();

    function obtenerDiasDelMes(año, mes) {
        return new Date(año, mes, 0).getDate(); // Obtiene el último día del mes
    }

    // Generar los últimos dos meses completos con sus días en orden descendente
    const fechas = [];
    for (let i = 0; i < 2; i++) {
        let mes = mesActual - i;
        let año = añoActual;
        if (mes <= 0) { // Si el mes es enero o anterior, retrocede un año
            mes += 12;
            año -= 1;
        }

        const diasDelMes = obtenerDiasDelMes(año, mes);
        for (let dia = diasDelMes; dia >= 1; dia--) { // Iterar de mayor a menor
            fechas.push(`${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`);
        }
    }

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
            <select id='fecha' class='form-select'>
                ${fechas.map(fecha => `<option value="${fecha}">${fecha}</option>`).join('')}
            </select>
            <label class='form-label mt-2'>Motivo</label>
            <select id='motivo' class='form-select'>
                <option value="" selected>Selecciona el motivo</option>
                <option value="Terminal">Terminal</option>
                <option value="Recibir Equipaje">Recibir Equipaje</option>
                <option value="Arajet">Arajet</option>
                <option value="Edelweiss Air">Edelweiss Air</option>
                <option value="Air Transat">Air Transat</option>
                <option value="Frontier">Frontier</option>
                <option value="Evelop">Evelop</option>
                <option value="Iberojet">Iberojet</option>
                <option value="Lufthansa">Lufthansa</option>
                <option value="Poco personal">Me llamaron para cubrir counter</option>
                <option value="Poco personal">Me llamaron para recibir un vuelo</option>
                <option value="Vuelo demorado">Vuelo demorado</option>
                <option value="Se ocupó más tiempo para cubrir la tarea">Se ocupó más tiempo para cubrir la tarea</option>
                <option value="Capacitación">Capacitación</option>
                <option value="Cubrir personal">Cubrir personal ausente</option>
                <option value="Poco personal">Poco personal</option>
                <option value="No es una extra">No es una extra</option>
            </select>
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
