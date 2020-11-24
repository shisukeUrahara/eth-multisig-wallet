import Web3 from 'web3';
import MultiSigWallet from './contracts/MultiSigWallet.json';

// a function to instantiate the web3 object
const getWeb3 = () => {
    return new Promise((resolve, reject) => {
      // Wait for loading completion to avoid race conditions with web3 injection timing.
      window.addEventListener("load", async () => {
        // Modern dapp browsers...
        if (window.ethereum) {
          const web3 = new Web3(window.ethereum);
          try {
            // Request account access if needed
            await window.ethereum.enable();
            // Acccounts now exposed
            resolve(web3);
          } catch (error) {
            reject(error);
          }
        }
        // Legacy dapp browsers...
        else if (window.web3) {
          // Use Mist/MetaMask's provider.
          const web3 = window.web3;
          console.log("Injected web3 detected.");
          resolve(web3);
        }
        // Fallback to localhost; use dev console port by default...
        else {
          const provider = new Web3.providers.HttpProvider(
            "http://localhost:9545"
          );
          const web3 = new Web3(provider);
          console.log("No web3 instance injected, using Local web3.");
          resolve(web3);
        }
      });
    });
  };

// a function to create an instance of deployed contract so that the frontend can interact with it

const getWallet= async (web3)=>{
    const networkId=await web3.eth.net.getId();
    // create an instrance of network using the network id
    const deployedContract=await MultiSigWallet.networks[networkId];
    // retrurning an instance of deployed contract using its abi and contract address
    let contractInstance= new  web3.eth.Contract(
        MultiSigWallet.abi,
        deployedContract && deployedContract.address
    );

    console.log("**@ contract instance is , ",contractInstance);

    return contractInstance;
    // return new  web3.eth.Contract(
    //     MultiSigWallet.abi,
    //     deployedContract && deployedContract.address
    // );
}

export {getWallet,getWeb3}