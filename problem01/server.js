var net = require('net')

var server = net.createServer((socket) => {
  socket.on('data', (input) => {
    console.log('socket.remotePort is: ', socket.remotePort)
    socket.write(input)
  })

  console.log('socket.localPort is: ', socket.localPort)
  console.log('socket.remotePort is: ', socket.remotePort)
})

server.on('connection', () => {
  console.log('new connection!')
})

server.listen(8888, () => {
  console.log('opened server on', server.address())
})
