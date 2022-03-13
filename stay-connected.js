/*
  A simple app to maintain connection to a list of IPFS peers.
  Ensure your IPFS daemon is running before executing this app.
*/

'use strict'

const shell = require('shelljs')

const getPeers = require('./peers')

const RECONNECT_INTERVAL = 20000

async function connectToPeers () {
  try {
    const peers = await getPeers()
    // console.log(`peers: ${JSON.stringify(peers, null, 2)}`)

    if (peers.length === 0) throw new Error(`peers array is empty!`)

    console.log(` `)

    for (let i = 0; i < peers.length; i++) {
      const thisPeer = peers[i]

      // first try to connect to the remote address of the peer.
      const remoteTry = await promExec(
        `ipfs swarm connect ${thisPeer.remoteAddr}`
      )
      // console.log(`remoteTry: ${JSON.stringify(remoteTry, null, 2)}`)

      const now = new Date()

      // If connected successfully, report and exit.
      if (!remoteTry.code) {
        console.log(`${now.toLocaleString()}: Successfully connected to '${thisPeer.name}' at ${thisPeer.remoteAddr}`)
        continue
      }

      // second try to connect to the local address of the peer.
      // const localTry = await promExec(
      //   `ipfs swarm connect ${thisPeer.localAddr}`
      // )
      // console.log(`localTry: ${JSON.stringify(localTry, null, 2)}`)

      // If connected successfully, report and exit.
      // if (!localTry.code) {
      //   console.log(`Successfully connected to '${thisPeer.name}' at ${thisPeer.localAddr}`)
      //   continue
      // }

      // third, report that the error about peer not being able to be connected.
      console.log(`${now.toLocaleString()}: Error trying to connect to peer '${thisPeer.name}': ${remoteTry.stderr}`)
    }
  } catch (err) {
    console.error(`Error in connectToPeers(): `, err)
  }
}

// Execute the connection instructions immediately
connectToPeers()

// Re-execute the connection instrucions periodically.
setInterval(function () {
  connectToPeers()
}, RECONNECT_INTERVAL)

// Promise-based wrapper around async shelljs exec command.
// Returns an object with the exit code, stdout, and stderr messages, as per
// the shelljs docs:
// https://www.npmjs.com/package/shelljs#execcommand--options--callback
// Silents the normal command line output.
function promExec (cmd) {
  return new Promise((resolve, reject) => {
    try {
      shell.exec(cmd, { silent: true }, function (code, stdout, stderr) {
        // console.log('Exit code:', code)
        // console.log('Program output:', stdout)
        // console.log('Program stderr:', stderr)
        // console.log(' ')

        return resolve({
          code,
          stdout,
        stderr})
      })
    } catch (err) {
      return reject(err)
    }
  })
}
