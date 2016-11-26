var net = require('net')

var client = net.connect({host: 'localhost', port: 8888}, () => {
  console.log('connected to server!')
})

client.on('end', () => {
  console.log('disconnected from server')
})

process.stdin.on('data', (data) => {
  client.write(data)
})

client.on('data', (data) => {
  process.stdout.write(data)
})
