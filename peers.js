/*
  This file contains a list of IPFS peers for the local node to maintain
  a connection with.
*/

"use strict";

const dns = require("dns");

async function getPeerArray() {
  try {
    // const decaturIp = await getDecaturIP();
    // console.log(`IP address for decatur.hopto.org: ${decaturIp}`);
    // Note: I no longer use the above function in the peer list below, since I
    // can specify the dns setting in the IPFS addr. But the code is left here
    // in case I need to fall back to it in the future.

    const peerArray = [
      {
        name: "256GB PI",
        localAddr:
          "/ip4/192.168.0.18/tcp/4101/ipfs/QmQhH6D7yiCrdLWjLGXx2H1m3UWBk3To9eCTvbmMNFYHSN",
        remoteAddr: `/dns/decatur.hopto.org/tcp/4101/ipfs/QmQhH6D7yiCrdLWjLGXx2H1m3UWBk3To9eCTvbmMNFYHSN`
      },
      {
        name: "4TB PI",
        localAddr:
          "/ip4/192.168.0.47/tcp/7700/ipfs/Qma7UL7kBPPukRXfvES89Ce772USyfUaYxaP3msKTdNcyJ",
        remoteAddr: `/dns/decatur.hopto.org/tcp/7700/ipfs/Qma7UL7kBPPukRXfvES89Ce772USyfUaYxaP3msKTdNcyJ`
      },
      {
        name: "IPFS Bootstrap",
        localAddr:
          "/ip4/116.203.193.74/tcp/4001/ipfs/QmNZktxkfScScnHCFSGKELH3YRqdxHQ3Le9rAoRLhZ6vgL",
        remoteAddr: `/ip4/116.203.193.74/tcp/4001/ipfs/QmNZktxkfScScnHCFSGKELH3YRqdxHQ3Le9rAoRLhZ6vgL`
      },
      {
        name: "uncensorablepublishing.com",
        localAddr:
          "/ip4/78.47.240.56/tcp/4231/ipfs/QmSXxjZYto1NAC7zi8B7ZhySrCRyiXLwcAAMWEQeP5HB9g",
        remoteAddr: "/ip4/78.47.240.56/tcp/4231/ipfs/QmSXxjZYto1NAC7zi8B7ZhySrCRyiXLwcAAMWEQeP5HB9g"
      },
      {
        name: "wallet.fullstack.cash",
        localAddr: "/ip4/159.69.29.155/tcp/4231/p2p/QmVDNWWboLhJByei1ikMtZvkFGykL2AMCVgFCMzoWxHjqp",
        remoteAddr: "/ip4/159.69.29.155/tcp/4231/p2p/QmVDNWWboLhJByei1ikMtZvkFGykL2AMCVgFCMzoWxHjqp"
      }
    ];

    return peerArray;
  } catch (err) {
    console.error(`Error in getPeerArray(): `, err);
  }
}

// Resolves the IP address associated with Decatur.
async function getDecaturIP() {
  try {
    return new Promise((resolve, reject) => {
      let ip;

      dns.lookup("decatur.hopto.org", function(err, result) {
        if (err) return reject(err);

        return resolve(result);
      });
    });
  } catch (err) {
    console.error(`Error in getDecaturIP()`);
    throw err;
  }
}

module.exports = getPeerArray;
