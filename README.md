# eth-multisig-wallet

# ETH-MULTISIG WALLET 

(I) DESCRIPTION 

This application is a multisig wallet having 3 approvers and a quorum (approvals required for a tx) of 2. 
User can connect to the application and create transactions. One the tx gets approved by 2 approvers , the application wil perform the transaction.
User can see the table and status of the tx created in the tx list table.

(II) TECH STACKS USED

(i) Javascript
(ii) Reactjs  
(iii) Ethereum 
(iv) Solidity 
(v) Truffle  
(vi) Web3 js

(III) SETTING UP THE PROJECT 

(i) clone the repo
> git clone repoUrl

(ii) Go to the project directory and start the local truffle network by running 
> truffle develop


(iii) The truffle develop command will open the truffle console , deploy the contracts in that console 
> migrate --reset

(iv) Install metamask plugin in your browser and create a custom network in it or  
import the local truffle newtork accounts there using the seedphrase you get when you run truffle develop

(iv) Start the application. Open a new terminal , go to client directory using 
> cd client

(v) Run the application 
NOTE:- Make sure the metamask plugin is installed in your browser.

> npm run start 

This will start the application in your browser at http://localhost:3000


(vi) Connect to the truffle network in you metamask and have fun.

