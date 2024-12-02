<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Configuración del correo
    $to = "danielballestero39@gmail.com"; // Reemplaza con tu correo
    $subject = "Nuevo mensaje de $name";
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    
    $body = "Has recibido un mensaje:\n\n";
    $body .= "Nombre: $name\n";
    $body .= "Correo: $email\n";
    $body .= "Mensaje:\n$message\n";

    // Enviar el correo
    if (mail($to, $subject, $body, $headers)) {
        echo "¡Mensaje enviado exitosamente!";
    } else {
        echo "Hubo un error al enviar el mensaje. Intenta de nuevo.";
    }
} else {
    echo "Método no permitido.";
}
?>
