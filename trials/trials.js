var net = require('net')

var server = net.createServer((socket) => {
  // 'connection' listener
  console.log('client connected')

  socket.on('end', () => {
    console.log('client disconnected')
  })

  socket.on('data', (data) => {
    console.log('data is: ', data)
    console.log('socket.bytesRead is in connection: ', socket.bytesRead)
    socket.write('got it \n')
    /*  socket.pause()
      setTimeout(() => {
        socket.resume()
        console.log('volvio todo a la normalidad')
      }, 5000) */
    //  socket.destroy()
    //  socket.end('cierro')
  })

  socket.on('timeout', () => {
    console.log('timeoutee')
  })
  socket.setTimeout(5000)
  /*
  DID NOTHING AFTER PLAYING WITH WRITE ON 'DATA'
  socket.on('drain', () => {
    console.log('buffer empty after sending response')
  }) */
  console.log('socket.localAddress is: ', socket.localAddress)
  console.log('socket.localPort is: ', socket.localPort)
  console.log('socket.bytesRead is: ', socket.bytesRead)
  console.log('socket.remoteAddress is: ', socket.remoteAddress)
  console.log('socket.remotePort is: ', socket.remotePort)
  /* FOR CLIENT
  socket.on('lookup', (err, address, family, host) => {
    console.log('err is: ', err)
    console.log('address is: ', address)
    console.log('family is: ', family)
    console.log('host is: ', host)
  }) */

  socket.write('hello\r\n')
  socket.pipe(socket)
}).on('error', (err) => {
  // handle errors here
  throw err
}).on('listening', () => {
  console.log('listening')
  console.log('server is listening event? ', server.listening)
}).on('connection', (connection) => {
  // TOO LONG --> console.log('connection, is: ', connection)
  server.getConnections((err, count) => {
    if (err) console.log('err in event is: ', err)
    console.log('count in event is: ', count)
  })
})

console.log('server is listening? ', server.listening)
server.getConnections((err, count) => {
  if (err) console.log('err outside is: ', err)
  console.log('count outside is: ', count)
})

server.listen(54235, () => {
  console.log('opened server on', server.address())
  server.getConnections((err, count) => {
    if (err) console.log('err is: ', err)
    console.log('count is: ', count)
  })
})
