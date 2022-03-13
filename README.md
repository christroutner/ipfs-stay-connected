# ipfs-stay-connected
A simple app that issues IPFS shell commands to keep the local node connected
to a list of other IPFS nodes.

IPFS has a poor habit of dropping connections to peers as part of its normal
operation. This is extremely frustrating when trying to send and receive files
with specific peers that you manually connected to. This app will renew the
connection every 2 minutes by issuing a `ipfs swarm connect <peer>` command
for each peer listed in the `peers.js` file.

This app is intended for personal use, but other people are free to fork and
use it if they find it useful.

## Installation
- `git clone https://github.com/christroutner/ipfs-stay-connected`
- `cd ipfs-stay-connected`
- `npm install`
- `ipfs daemon &`
- `npm start`

## Customization
Edit the `peers.js` file and add your own IPFS peers.

## License
MIT
