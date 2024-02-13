const socket = io()
const nombreUsuario = document.getElementById("nombreusuario")
const formulario = document.getElementById("formulario")
const inputmensaje = document.getElementById("mensaje")
const chat = document.getElementById("chat")

let usuario = null

if (!usuario) {
    Swal.fire({
        title: "Welcome to Customer Service",
        text: "Ingresa tu usuario",
        input: "text",
        inputValidator: (value) => {
            if (!value) {
                return "Necesitas ingresar tu Nombre"
            }
        }
    })
        .then(username => {
            usuario = username.value
            nombreUsuario.innerHTML = usuario
            socketClient.emit("nuevousuario", usuario)
        })
}

function scrollToBottom() {
    const chatContainer = document.getElementById("chat-messages");
    chatContainer.scrollTop = chatContainer.scrollHeight;

}

formulario.onsubmit = (e) => {
    e.preventDefault()
    const info = {
        user: usuario,
        message: inputmensaje.value,
    }

    socketClient.emit("mensaje", info)
    inputmensaje.value = " "
    scrollToBottom()
}

socketClient.on("chat", mensajes => {

    const chatRender = mensajes.map(mensaje => {
        const fechaCreacion = new Date(mensaje.createdAt);
        const opcionesHora = { hour: '2-digit', minute: '2-digit' };
        const horaFormateada = fechaCreacion.toLocaleTimeString(undefined, opcionesHora);
        return `<p class="message-container"><strong>${horaFormateada}</strong> - <strong>${mensaje.user}</strong>: ${mensaje.message}</p>`;
    }).join("");
    chat.innerHTML = chatRender;
});

