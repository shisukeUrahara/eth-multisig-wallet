import React , {useEffect,useState} from 'react';
import {getWeb3,getWallet} from './utils.js';
import Header from './Header.js';
import NewTransaction from './NewTransaction';
import TransactionList from './TransactionList';
import Footer from './Footer';

function App() { 
  const [wallet,setWallet]=useState(undefined);
  const [web3,setWeb3]=useState(undefined);
  const [accounts,setAccounts]=useState(undefined);
  const [approvers,setApprovers]=useState([]);
  const [quorum,setQuorum]=useState(undefined);
  const [transactions,setTransactions]=useState([]);

  // a function to create new Transaction which in turn calls the contract method createTransaction to do so
  // const createTransaction=async (transaction)=>{
  //   console.log("**@ the transaction before creating transaction is , ",transaction);
  //   await wallet.methods.createTransaction(transaction.to,transaction.amount).send({from:accounts[0]});
  // } 

  const createTransaction = async transaction => {
    console.log("**@ the transaction before creating transaction is , ",transaction);
    console.log("**@ the accounts arrauy is ,",accounts);
    console.log("**@ the transaction is , ",transaction);
    await wallet.methods
      .createTransaction(transaction.to, transaction.amount)
      .send({from: accounts[0]});

      // transactions=
      let tempTransactions=await wallet.methods.getTransactions().call();
      console.log("**@ the list of transactions are , ",tempTransactions);
       setTransactions(tempTransactions)

  }

  const approveTransaction=async (transactionId)=>{
   
  await  wallet.methods.approveTransaction(transactionId).send({from:accounts[0]});
  
  let tempTransactions=await wallet.methods.getTransactions().call();
  console.log("**@ the list of transactions are , ",tempTransactions);
   
  setTransactions(await wallet.methods.getTransactions().call())

  }

  // use this function when component loads
  useEffect(()=>{
  const  init=async ()=>{
      // get wallet , accounts and web3 connections and initialise them

    const web3=await getWeb3();
    const wallet= await  getWallet(web3);
    const accounts = await web3.eth.getAccounts();
    const approvers=await wallet.methods.getApproversList().call();
    const quorum=await wallet.methods.quorum().call();
    const transactions=await wallet.methods.getTransactions().call();
    console.log("**@ the transactions are , ",transactions);
    
    

    // set these variable states
    setWeb3(web3);
    setAccounts(accounts);
    setWallet(wallet);
    setQuorum(quorum);
    setApprovers(approvers);
    setTransactions(transactions);
    


  }

  init();

  },[]);

  if(typeof web3==='undefined' || typeof wallet==='undefined' || typeof accounts==='undefined' || typeof quorum=='undefined' ||  approvers.length ===0){
   return (
    <div>Loading....</div>

   )
  }
  else {
    return (
      <div className="App container-fluid">
       <h1 className='text-center'>Multisig Wallet</h1>
       <Header approvers={approvers} quorum={quorum}></Header>
       <NewTransaction createTransaction={createTransaction} transactions={transactions}></NewTransaction>
       <TransactionList transactions={transactions} approveTransaction={approveTransaction}></TransactionList>
       <Footer></Footer>
      </div>
    );
  }
  
}

export default App;


// import React, { useEffect, useState } from 'react';
// import { getWeb3, getWallet } from './utils.js';
// import Header from './Header.js';
// import NewTransaction from './NewTransaction.js';
// import TransactionList from './TransactionList.js';

// function App() {
//   const [web3, setWeb3] = useState(undefined);
//   const [accounts, setAccounts] = useState(undefined);
//   const [wallet, setWallet] = useState(undefined);
//   const [approvers, setApprovers] = useState([]);
//   const [quorum, setQuorum] = useState(undefined);
//   const [transfers, setTransfers] = useState([]);

//   useEffect(() => {
//     const init = async () => {
//       const web3 = await getWeb3();
//       const accounts = await web3.eth.getAccounts();
//       const wallet = await getWallet(web3);
//         // console.log("**@the transactions are , ",transactions);
//         console.log("**@ web3 is , ",web3);
//         console.log("**@ accounts is , ",accounts[0]);
//         console.log("**@ wallet is , ",await wallet.methods.getApproversList());
//       // const approvers = await wallet.methods.getApprovers().call();
//       const approvers = await wallet.methods.getApproversList().call();
//       const quorum = await wallet.methods.quorum().call();
//       const transfers = await wallet.methods.getTransactions().call();
//       // const transactions = await wallet.methods.getTransactions().call();
    
//       console.log("**@ approvers are , ",approvers);
//       console.log("**@ quorum is , ",quorum);
//       console.log("**@ transfers are , ",transfers);
//       setWeb3(web3);
//       setAccounts(accounts);
//       setWallet(wallet);
//       setApprovers(approvers);
//       setQuorum(quorum);
//       setTransfers(transfers);
//     };
//     init();
//   }, []);

//   const createTransfer = transfer => {
//     wallet.methods
//       .createTransfer(transfer.amount, transfer.to)
//       .send({from: accounts[0]});
//   }

//   const approveTransfer = transferId => {
//     wallet.methods
//       .approveTransfer(transferId)
//       .send({from: accounts[0]});
//   }

//   if(
//     typeof web3 === 'undefined'
//     || typeof accounts === 'undefined'
//     || typeof wallet === 'undefined'
//     || approvers.length === 0
//     || typeof quorum === 'undefined'
//   ) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div>
//       Multisig Dapp
//       <Header approvers={approvers} quorum={quorum} />
//       <NewTransaction createTransaction={createTransfer} />
//       <TransactionList transactions={transfers} approveTransaction={approveTransfer} />
//     </div>
//   );
// }

// export default App;