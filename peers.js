/*
  This file contains a list of IPFS peers for the local node to maintain
  a connection with.
*/

"use strict";

const dns = require("dns");

// Flag to indicate if I'm running within a home network or not.
const LOCAL = true;

async function getPeerArray() {
  try {
    let peerArray;

    if (LOCAL) {
      peerArray = [
        // bchjs.cash
        "/ip4/192.241.192.113/tcp/5001/ipfs/QmU5EXPzXUJu6tn4Mhznp8Tk4XK7Ag61mgd83zoiH449Yi",

        // personal IPFS data store
        "/ip4/192.168.0.18/tcp/4101/ipfs/QmQhH6D7yiCrdLWjLGXx2H1m3UWBk3To9eCTvbmMNFYHSN",

        // troutsblog.com
        "/ip4/192.241.192.113/tcp/4001/ipfs/QmSCPC7TsbL48ku13MGWh5T7nJznWFygCpSjCukJfHrMbu",

        // blog mirror
        "/ip4/192.168.0.24/tcp/6101/ipfs/QmQhH6D7yiCrdLWjLGXx2H1m3UWBk3To9eCTvbmMNFYHSN"
      ];

      return peerArray;
    } else {
      return new Promise((resolve, reject) => {
        let ip;

        dns.lookup("decatur.hopto.org", function(err, result) {
          if (err) return reject(err);

          ip = result;

          peerArray = [
            // bchjs.cash
            "/ip4/192.241.192.113/tcp/5001/ipfs/QmU5EXPzXUJu6tn4Mhznp8Tk4XK7Ag61mgd83zoiH449Yi",

            // personal IPFS data store
            `/ip4/${ip}/tcp/4101/ipfs/QmQhH6D7yiCrdLWjLGXx2H1m3UWBk3To9eCTvbmMNFYHSN`,

            // troutsblog.com
            "/ip4/192.241.192.113/tcp/4001/ipfs/QmSCPC7TsbL48ku13MGWh5T7nJznWFygCpSjCukJfHrMbu",

            // blog mirror
            `/ip4/${ip}/tcp/6101/ipfs/QmQhH6D7yiCrdLWjLGXx2H1m3UWBk3To9eCTvbmMNFYHSN`
          ];

          return resolve(peerArray);
        });
      });
    }
  } catch (err) {
    console.error(`Error in getPeerArray(): `, err);
  }
}

module.exports = getPeerArray;
