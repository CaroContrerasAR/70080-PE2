console.log('hello');

//instancia del lado del Cliente
const socket = io()

socket.emit('message','hello by Realtimeproduts Client')

