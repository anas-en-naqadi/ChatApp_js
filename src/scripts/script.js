const socket = io("http://localhost:3000");
const form = document.querySelector("form");
const messageTextArea = document.querySelector("#message");
const nameUser = prompt("what is your name ?");

if (nameUser) {
  alert("you joined !!");
  document
    .getElementById("users")
    .insertAdjacentHTML("beforeend", `<li class="list-group-item li" > you </li>`);
}

socket.emit("new-user", nameUser);
socket.on("chat-message", (data) => {
  appendMessage(`${data.name}: ${data.message}`, "secondary");
});
socket.on("user-connected", (name) => {
  alert(`${name} just connected`);
  document
    .getElementById("users")
    .insertAdjacentHTML(
      "beforeend",
      `<li class="list-group-item li" > ${name}</li>`
    );
});

socket.on("user-disconnect", (name) => {
  alert(`${name} just disconnected`);
  document.querySelector("#messages").innerHTML = "";
  document.querySelectorAll("li").forEach((li) => {
    if (li.textContent == name) {
      document.removeChild(li);
    }
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const message = messageTextArea.value;
  appendMessage(`you : ${message}`, "primary");
  socket.emit("send-chat-message", message);
  messageTextArea.value = "";
});

function appendMessage(message, type) {
  const messagesBox = document.querySelector("#messages");
  messagesBox.insertAdjacentHTML(
    "beforeend",
    `<div class="alert alert-${type}" role="alert">${message}</div>`
  );
}
