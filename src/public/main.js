const socket = io.connect('http://localhost:3000/', {
    'forceNew': true
})

//  on --> recive
// emit --> emitir
socket.on('message', (data) => console.log(data))