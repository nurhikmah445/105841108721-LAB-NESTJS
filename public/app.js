const socket = io('http://localhost:3000', { path: '/socket' });
let username = '';
let room = '';

function joinRoom() {
  username = document.getElementById('username').value;
  room = document.getElementById('room').value;
  if (!username || !room) {
    alert('Masukkan username dan nama room!');
    return;
  }
  socket.emit('join-room', { username, room });
  document.getElementById('user-input').style.display = 'none';
  document.getElementById('chat-container').style.display = 'flex';
  document.getElementById('room-name').innerText = room;
  document.getElementById('chat-box').innerHTML = '';
}

function leaveRoom() {
  if (username && room) {
    socket.emit('leave-room');
    document.getElementById('user-input').style.display = 'block';
    document.getElementById('chat-container').style.display = 'none';
    document.getElementById('chat-box').innerHTML = '';
    username = '';
    room = '';
  }
}

function sendMessage() {
  const message = document.getElementById('message').value;
  if (!room) {
    alert('Anda belum bergabung ke room!');
    return;
  }
  if (message.trim()) {
    socket.emit('chat-room', { username, room, message });
    appendMessage(username, message, true);
    document.getElementById('message').value = '';
  }
}

function appendMessage(sender, message, isSender) {
  const chatBox = document.getElementById('chat-box');
  const messageDiv = document.createElement('div');
  messageDiv.classList.add(
    'message',
    isSender ? 'my-message' : 'other-message',
  );
  messageDiv.innerHTML = `<strong>${sender}:</strong> ${message}`;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

socket.on('room-message', (data) => {
  if (data.username !== username) {
    appendMessage(data.username, data.message, false);
  }
});
socket.on('user-joined', (data) => {
  appendMessage('', `${data.username} bergabung ke room`, false);
});
socket.on('user-left', (data) => {
  appendMessage('', `${data.username} keluar dari room`, false);
});
