/*
  A simple app to maintain connection to a list of IPFS peers.
  Ensure your IPFS daemon is running before executing this app.
*/

"use strict";

const shell = require("shelljs");

const getPeers = require("./peers");

async function connectToPeers() {
  try {
    const peers = await getPeers();
    console.log(`peers: ${JSON.stringify(peers, null, 2)}`);

    if (peers.length === 0) throw new Error(`peers array is empty!`);

    for (let i = 0; i < peers.length; i++) {
      shell.exec(`ipfs swarm connect ${peers[i]}`);
    }
  } catch (err) {
    console.error(`Error in connectToPeers(): `, err);
  }
}

// Execute the connection instructions immediately
connectToPeers();

// Re-execute the connection instrucions periodically.
setInterval(function() {
  connectToPeers();
}, 20000);
