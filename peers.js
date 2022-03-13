/*
  This file contains a list of IPFS peers for the local node to maintain
  a connection with.
*/

'use strict'

const dns = require('dns')

async function getPeerArray () {
  try {
    // const decaturIp = await getDecaturIP()
    // console.log(`IP address for decatur.hopto.org: ${decaturIp}`)
    // Note: I no longer use the above function in the peer list below, since I
    // can specify the dns setting in the IPFS addr. But the code is left here
    // in case I need to fall back to it in the future.

    const peerArray = [
      {
        name: 'public-file-server',
        localAddr: '/ip4/5.161.42.62/tcp/4001/ipfs/12D3KooWPRRyk3rh7dHTY4tQsRM3UEUK7uo5ZAqqxwTT3iSBTu6K',
        remoteAddr: `/ip4/5.161.42.62/tcp/4001/ipfs/12D3KooWPRRyk3rh7dHTY4tQsRM3UEUK7uo5ZAqqxwTT3iSBTu6K`
      },
      {
        name: 'bc-file-server',
        localAddr: '/ip4/5.161.42.62/tcp/4001/p2p/12D3KooWPRRyk3rh7dHTY4tQsRM3UEUK7uo5ZAqqxwTT3iSBTu6K/p2p-circuit/p2p/12D3KooWNYcNyB1ACYiDfGG6QZYrq72GQJA1WMpUeCSY5z14vcDV',
        remoteAddr: `/ip4/5.161.42.62/tcp/4001/p2p/12D3KooWPRRyk3rh7dHTY4tQsRM3UEUK7uo5ZAqqxwTT3iSBTu6K/p2p-circuit/p2p/12D3KooWNYcNyB1ACYiDfGG6QZYrq72GQJA1WMpUeCSY5z14vcDV`
      },
      {
        name: 'pdx-file-server',
        localAddr: '/ip4/5.161.42.62/tcp/4001/p2p/12D3KooWPRRyk3rh7dHTY4tQsRM3UEUK7uo5ZAqqxwTT3iSBTu6K/p2p-circuit/p2p/12D3KooWAcUCtTPJ87obGinW4jxWqmR1EbxADji6wfmRzYTyfqwm',
        remoteAddr: `/ip4/5.161.42.62/tcp/4001/p2p/12D3KooWPRRyk3rh7dHTY4tQsRM3UEUK7uo5ZAqqxwTT3iSBTu6K/p2p-circuit/p2p/12D3KooWAcUCtTPJ87obGinW4jxWqmR1EbxADji6wfmRzYTyfqwm`
      }
    ]

    return peerArray
  } catch (err) {
    console.error(`Error in getPeerArray(): `, err)
  }
}

// Resolves the IP address associated with Decatur.
async function getDecaturIP () {
  try {
    return new Promise((resolve, reject) => {
      let ip

      dns.lookup('decatur.hopto.org', function (err, result) {
        if (err) return reject(err)

        return resolve(result)
      })
    })
  } catch (err) {
    console.error(`Error in getDecaturIP()`)
    throw err
  }
}

module.exports = getPeerArray
