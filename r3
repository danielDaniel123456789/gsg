  function showHoursModal(userId, userName) {
    Swal.fire({
        title: 'Ingrese su Contraseña',
        input: 'password',
        inputPlaceholder: 'Escribe tu contraseña',
        showCancelButton: true, // Mostrar el botón Cancelar
        confirmButtonText: 'Ingresar',
        cancelButtonText: 'Cancelar',
        preConfirm: (password) => {
            return new Promise((resolve, reject) => {
                const userRef = doc(db, "usuarios", userId);
                getDoc(userRef)
                    .then((userDoc) => {
                        if (userDoc.exists()) {
                            const userData = userDoc.data();
                            const storedPassword = userData.contraseya;

                            if (password.trim() === storedPassword.trim()) {
                                resolve();
                            } else {
                                reject("Contraseña incorrecta");
                            }
                        } else {
                            reject("Usuario no encontrado");
                        }
                    })
                    .catch(() => {
                        reject("Error al verificar la contraseña");
                    });
            });
        },
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: `Agregar Horas Extra para ${userName}`,
                showCloseButton: true,
                showCancelButton: true, // Mostrar el botón Cancelar
                confirmButtonText: 'Guardar',
                cancelButtonText: 'Cancelar',
                html: `
                    <div class="mb-3">
                      
                        <div class="mb-3">
                            <label for="swal-hours" class="form-label">Selecciona las horas trabajadas</label>
                            <select id="swal-hours" class="form-select" aria-label="Selecciona las horas trabajadas">
                                <option value="" selected>Selecciona las horas trabajadas</option>
                                ${Array.from({ length: 24 }, (_, i) => `<option value="${i}">${i}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="mb-3">
                        <label for="swal-minutes" class="form-label">Selecciona los minutos trabajados</label>
                        <select id="swal-minutes" class="form-select" aria-label="Selecciona los minutos trabajados">
                            <option value="" selected>Selecciona los minutos trabajados</option>
                            ${Array.from({ length: 60 }, (_, i) => `<option value="${i}">${i}</option>`).join('')}
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="swal-period" class="form-label">Selecciona el monto que esperas recibir</label>
                        <select id="swal-period" class="form-select" aria-label="Selecciona el monto que esperas recibir">
                            <option value="" selected>Selecciona el periodo</option>
                            <option value="Hora ₡1494.31">Hora ₡1494.31</option>
                            <option value="Diurna ₡2241.31">Diurna ₡2241.31</option>
                            <option value="Mixta ₡2561.50">Mixta ₡2561.50</option>
                            <option value="Nocturna ₡2988.41">Nocturna ₡2988.41</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="swal-start-time" class="form-label">¿Cual fue la hora en que iniciaste  a trabajar?</label>
                        <input type="time" id="swal-start-time" class="form-control" aria-label="Hora de inicio">
                    </div>
                    <div class="mb-3">
                        <label for="swal-date" class="form-label">Fecha</label>
                        <input type="date" id="swal-date" class="form-control" aria-label="Fecha">
                    </div>
                    <div class="mb-3">
                        <label for="swal-airline" class="form-label">Area o Aerolínea</label>
                        <select id="swal-airline" class="form-select" aria-label="Selecciona la aerolínea">
                            <option value="" selected>Selecciona area o aerolínea</option>
                            <option value="Terminal">Terminal</option>
                            <option value="Recibir Equipaje">Recibir Equipaje</option>
                            <option value="Arajet">Arajet</option>
                            <option value="Edelweiss Air">Edelweiss Air</option>
                            <option value="Air Transat">Air Transat</option>
                            <option value="Frontier">Frontier</option>
                            <option value="Evelop">Evelop</option>
                            <option value="Iberojet">Iberojet</option>
                            <option value="Lufthansa">Lufthansa</option>
                        </select>
                    </div>
                    <div class="mb-3">
                        <label for="swal-reason" class="form-label">Motivo de la Extra</label>
                        <select id="swal-reason" class="form-select" aria-label="Selecciona el motivo">
                            <option value="No es una extra" selected>No es una extra</option>
                            <option value="Vuelo demorado">Vuelo demorado</option>
                            <option value="Se ocupó más tiempo para cubrir la tarea">Se ocupó más tiempo para cubrir la tarea</option>
                            <option value="Capacitación">Capacitación</option>
                            <option value="Cubrir personal">Cubrir personal ausente</option>
                            <option value="Poco personal">Poco personal</option>
                        </select>
                    </div>
                `,
                preConfirm: () => {
                    const hours = document.getElementById("swal-hours").value.trim();
                    const minutes = document.getElementById("swal-minutes").value.trim();
                    const period = document.getElementById("swal-period").value;
                    const startTime = document.getElementById("swal-start-time").value;
                    const date = document.getElementById("swal-date").value;
                    const airline = document.getElementById("swal-airline").value;
                    const reason = document.getElementById("swal-reason").value;

                    if (!hours || isNaN(hours) || hours < 0) {
                        Swal.showValidationMessage("Por favor, ingresa un número válido de horas");
                        return false;
                    }

                    if (!minutes || isNaN(minutes) || minutes < 0 || minutes >= 60) {
                        Swal.showValidationMessage("Por favor, ingresa un número válido de minutos");
                        return false;
                    }

                    if (!period) {
                        Swal.showValidationMessage("Por favor, selecciona un periodo");
                        return false;
                    }

                    if (!startTime) {
                        Swal.showValidationMessage("Por favor, ingresa una hora de inicio");
                        return false;
                    }

                    if (!date) {
                        Swal.showValidationMessage("Por favor, selecciona una fecha");
                        return false;
                    }

                    if (!airline) {
                        Swal.showValidationMessage("Por favor, selecciona una aerolínea");
                        return false;
                    }

                    if (!reason) {
                        Swal.showValidationMessage("Por favor, selecciona un motivo");
                        return false;
                    }

                    return {
                        hours,
                        minutes,
                        period,
                        startTime,
                        date,
                        airline,
                        reason,
                    };
                },
            }).then((result) => {
                if (result.isConfirmed) {
                    const { hours, minutes, period, startTime, date, airline, reason } = result.value;
                    console.log(`ID: ${userId}, Horas: ${hours}, Minutos: ${minutes}, Periodo: ${period}, Hora de inicio: ${startTime}, Fecha: ${date}, Aerolínea: ${airline}, Motivo: ${reason}`);
                    addHoursToUser(userId, hours, minutes, period, startTime, date, airline, reason);
                }
            });
        }
    }).catch((error) => {
        Swal.fire("Error", error, "error");
    });
}
