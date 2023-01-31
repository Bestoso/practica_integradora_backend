const socket = io();

let message = document.getElementById('message');
let username = document.getElementById('username');
const messageForm = document.getElementById('chat__container');
let output = document.querySelector('.output');
const actions = document.querySelector('.actions');

messageForm.addEventListener('submit', e => {
    e.preventDefault();
    socket.emit('chat:message', {
        username: username.value,
        message: message.value
    })
});

message.addEventListener('keypress', () => {
    socket.emit('chat:typing', username.value);
});

socket.on('chat:message', data => {
    actions.innerHTML = '';
    output.innerHTML += `
        <p> 
            <strong class='userlabel'>
            ${data.username}
            </strong>: ${data.message}
        </p>
    `;
    message.value = ''
});

socket.on('chat:typing', data => {
    actions.innerHTML = `
        <p><em>${data} is typing...</em></p>
    `;
});