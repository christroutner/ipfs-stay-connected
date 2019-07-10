/*
  A simple app to maintain connection to a list of IPFS peers.
  Ensure your IPFS daemon is running before executing this app.
*/

'use strict'

const shell = require('shelljs')

const peers = require('./peers')

function connectToPeers() {
  for(let i=0; i < peers.length; i++) {
    shell.exec(`ipfs swarm connect ${peers[i]}`)
  }
}

// Execute the connection instructions immediately
connectToPeers()

// Re-execute the connection instrucions periodically.
setInterval(function() {
  connectToPeers()
}, 20000)
