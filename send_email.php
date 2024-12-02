<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $note = htmlspecialchars($_POST['note']);

    // Configuración del correo
    $to = "danielballestero39@gmail.com";
    $subject = "Nueva Nota Recibida";
    $headers = "From: noreply@tu-dominio.com\r\n";
    $headers .= "Reply-To: noreply@tu-dominio.com\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    $body = "Has recibido una nueva nota:\n\n";
    $body .= "Nota:\n$note\n";

    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "¡Nota enviada exitosamente!";
    } else {
        echo "Hubo un error al enviar la nota. Intenta de nuevo.";
    }
} else {
    echo "Método no permitido.";
}
?>
