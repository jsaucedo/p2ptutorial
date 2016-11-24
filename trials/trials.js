var net = require('net')

var server = net.createServer((server) => {
  // 'connection' listener
  console.log('client connected')

  server.on('end', () => {
    console.log('client disconnected')
  })

  server.on('data', (data) => {
    console.log('data is: ', data)
    console.log('server.bytesRead is in connection: ', server.bytesRead)
    server.write('got it \n')
    /*  server.pause()
      setTimeout(() => {
        server.resume()
        console.log('volvio todo a la normalidad')
      }, 5000) */
    //  server.destroy()
    //  server.end('cierro')
  })

  server.on('timeout', () => {
    console.log('timeoutee')
  })
  server.setTimeout(5000)
  /*
  DID NOTHING AFTER PLAYING WITH WRITE ON 'DATA'
  server.on('drain', () => {
    console.log('buffer empty after sending response')
  }) */
  console.log('server.localAddress is: ', server.localAddress)
  console.log('server.localPort is: ', server.localPort)
  console.log('server.bytesRead is: ', server.bytesRead)
  console.log('server.remoteAddress is: ', server.remoteAddress)
  console.log('server.remotePort is: ', server.remotePort)
  /* FOR CLIENT
  server.on('lookup', (err, address, family, host) => {
    console.log('err is: ', err)
    console.log('address is: ', address)
    console.log('family is: ', family)
    console.log('host is: ', host)
  }) */

  server.write('hello\r\n')
  server.pipe(server)
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
