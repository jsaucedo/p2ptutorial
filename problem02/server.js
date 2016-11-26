var net = require('net')
var streamSet = require('stream-set')

var activeSockets = streamSet()

var chatServer = net.createServer((socket) => {
  socket.on('data', (input) => {
    activeSockets.forEach((stream) => {
      if (stream.remotePort != socket.remotePort) stream.write(input)
    })
  })

  socket.on('close', () => {
    console.log('connected sockets count: ', activeSockets.size)
  })
}).on('error', (err) => {
  // handle errors here
  throw err
}).on('connection', (socket) => {
  console.log('new connection!')
  activeSockets.add(socket)
  console.log('connected sockets count: ', activeSockets.size)
})

chatServer.maxConnections = 2

chatServer.listen(8888, () => {
  console.log('opened server on', chatServer.address())
})
