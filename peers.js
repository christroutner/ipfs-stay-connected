/*
  This file contains a list of IPFS peers for the local node to maintain
  a connection with.
*/

"use strict";

const dns = require("dns");

// Flag to indicate if I'm running within a home network or not.
// const LOCAL = true;
// const LOCAL = false;

async function getPeerArray() {
  try {
    const decaturIp = await getDecaturIP();
    console.log(`IP address for decatur.hopto.org: ${decaturIp}`);

    const peerArray = [
      {
        name: "256GB PI",
        localAddr:
          "/ip4/192.168.0.18/tcp/4101/ipfs/QmQhH6D7yiCrdLWjLGXx2H1m3UWBk3To9eCTvbmMNFYHSN",
        remoteAddr: `/ip4/${decaturIp}/tcp/4101/ipfs/QmQhH6D7yiCrdLWjLGXx2H1m3UWBk3To9eCTvbmMNFYHSN`
      },
      {
        name: "4TB PI",
        localAddr:
          "/ip4/192.168.0.47/tcp/7700/ipfs/Qma7UL7kBPPukRXfvES89Ce772USyfUaYxaP3msKTdNcyJ",
        remoteAddr: `/ip4/${decaturIp}/tcp/7700/ipfs/Qma7UL7kBPPukRXfvES89Ce772USyfUaYxaP3msKTdNcyJ`
      },
      {
        name: "IPFS Bootstrap",
        localAddr:
          "/ip4/116.203.193.74/tcp/4001/ipfs/QmNZktxkfScScnHCFSGKELH3YRqdxHQ3Le9rAoRLhZ6vgL",
        remoteAddr: `/ip4/116.203.193.74/tcp/4001/ipfs/QmNZktxkfScScnHCFSGKELH3YRqdxHQ3Le9rAoRLhZ6vgL`
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
