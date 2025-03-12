function formatDecimalToHours(decimalHours) {
    const hours = Math.floor(decimalHours); // Parte entera (horas)
    const minutes = Math.round((decimalHours - hours) * 60); // Parte decimal convertida a minutos
    return `${hours}:${minutes.toString().padStart(2, "0")}`; // Formato HH:MM
}
