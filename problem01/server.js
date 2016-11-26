var net = require('net')

var server = net.createServer((server) => {
  server.on('data', (input) => {
    console.log('server.remotePort is: ', server.remotePort)
    server.write(input)
  })

  console.log('server.localPort is: ', server.localPort)
  console.log('server.remotePort is: ', server.remotePort)
})

server.on('connection', () => {
  console.log('new connection!');
})

server.listen(8888, () => {
  console.log('opened server on', server.address())
})
