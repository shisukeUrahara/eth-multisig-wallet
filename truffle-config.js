const path = require('path');
const provider=require('@truffle/hdwallet-provider');
const fs=require('fs');

// read the secrets and the infura api url
const secretData=JSON.parse(
    fs.readFileSync('.secrets.json').toString().trim()
)


module.exports = {
 

  contracts_build_directory: path.join(__dirname, "client/src/contracts"),

  // networks: {
  //   kovan:{
  //       provider:()=>{
  //       return  new provider(
  //              secretData.privateKeys,
  //              secretData.infuraApiUrl
  //               ,
  //               0,
  //               3
  //           )
  //       },
  //       network_id: 42
  //   }
  // },

  // Set default mocha options here, use special reporters etc.
  mocha: {
    // timeout: 100000
  },

  // Configure your compilers
  compilers: {
    solc: {
      version: "0.6.0",    // Fetch exact version from solc-bin (default: truffle's version)
      // docker: true,        // Use "0.5.1" you've installed locally with docker (default: false)
      // settings: {          // See the solidity docs for advice about optimization and evmVersion
      //  optimizer: {
      //    enabled: false,
      //    runs: 200
      //  },
      //  evmVersion: "byzantium"
      // }
    }
  }
}