const MultiSigWallet = artifacts.require("MultiSigWallet");

module.exports = async  function (deployer,_network,accounts) {
    // deploying our smart contract and initialising it with its constructor parameters 
 await  deployer.deploy(MultiSigWallet,[accounts[0],accounts[1],accounts[2]],2);
 // getting an instance of the deployed contract
 let wallet= await MultiSigWallet.deployed();
//  console.log("**@ wallet addresss is , ",wallet);
  // sending some ether to the contract address
  await web3.eth.sendTransaction({from:accounts[0],to:wallet.address,value:1000000});
};
