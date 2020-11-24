const Wallet= artifacts.require('MultiSigWallet');
const {expectRevert} = require('@openzeppelin/test-helpers');
const { web3 } = require('@openzeppelin/test-helpers/src/setup');

// interacting with the deployed smart contract
contract('MultiSigWallet',(accounts)=>{
let wallet;

beforeEach(async ()=>{
// deploying a smart contract before each test case , it takes arguments of the contract constructor function
wallet= await Wallet.new([accounts[0],accounts[1],accounts[2]],2);
// sending some ether to the smart contract 
await web3.eth.sendTransaction({from:accounts[0],to:wallet.address,value:1000});
});




// 1st test case and how to handle it
it('should have correct order and amount of approvers and quorum',async ()=>{
    let approvers= await wallet.getApproversList();
    let quorum= await wallet.quorum();

    // test cases
    assert(approvers.length===3);
    assert(approvers[0]===accounts[0]);
    assert(approvers[1]===accounts[1]);
    assert(approvers[2]===accounts[2]);
    assert(quorum.toNumber()===2);
});

// 2.) test case
// testing createTransfer method , positive test case
it('Should create transfers properly',async ()=>{
    // create a transaction
    await wallet.createTransaction(accounts[5],100,{from:accounts[0]});

    // get the newly created transaction 
    const transactions=await wallet.getTransactions();
    assert(transactions.length === 1);
    assert(transactions[0].id === '0');
    assert(transactions[0].amount === '100');
    assert(transactions[0].approvals === '0');
    assert(transactions[0].sent === false)
})

// 3.) negative test case for createTransaction
// check if the transaction is created by an approver only

it('Should not create transaction if sender is not an approver',async ()=>{
    //  create a transaction when sender is not an approver
   await expectRevert(    
         wallet.createTransaction(accounts[5],100,{from:accounts[4]}),
        'Sender is not an approver'
    )
    // try{
    // }
    // catch(err){
    // console.log("**@ test case 3 failed due to error , ",err.reason);
    // }
})

// 3.) testing approveTransaction method
it('Should update transaction struct but not actaully sent the transaction with just 1 approval',async ()=>{
    await wallet.createTransaction(accounts[5],100,{from:accounts[0]});
    await wallet.approveTransaction(0,{from:accounts[0]});
    const transactions=await wallet.getTransactions();
    const balance=await web3.eth.getBalance(wallet.address)

    assert(transactions[0].approvals ==='1');
    assert(transactions[0].sent ===false);
    assert(balance==='1000')
});

// 4.) actual transaction must be sent after quorum number of approvals are met
it('Should send transaction after quorum number of approvals are met',async ()=>{
   let balanceBefore=web3.utils.toBN(await web3.eth.getBalance(accounts[6]));
   await wallet.createTransaction(accounts[6],100,{from:accounts[0]});
   await wallet.approveTransaction(0,{from:accounts[0]});
   await wallet.approveTransaction(0,{from:accounts[1]});

   // check balance of recepient account after the transaction

   let balanceAfter=web3.utils.toBN(await web3.eth.getBalance(accounts[6]));


   assert(balanceAfter.sub(balanceBefore).toNumber()===100);
});

// 5.) approval should be done only by an approver
it('Should not allow non approvers to call the approveTransaction',async ()=>{
    await wallet.createTransaction(accounts[5],100,{from:accounts[0]});

    await expectRevert(
        wallet.approveTransaction(0,{from:accounts[4]}),
        'Sender is not an approver' 
    )
});

// 6.) it should not allwo transaction approval if transaction is already sent
it('should NOT allow approve Transfer if transaction is already sent',async ()=>{
    await wallet.createTransaction(accounts[5],100,{from:accounts[0]});
    await wallet.approveTransaction(0,{from:accounts[0]});
    await wallet.approveTransaction(0,{from:accounts[1]});

    await expectRevert(
        wallet.approveTransaction(0,{from:accounts[2]}),
        'This transaction has already been executed'
    )
});

// transaction should not be approved twice by an approver
it('Should NOT allow an approver to approve a transaction twice',async ()=>{
    await wallet.createTransaction(accounts[5],100,{from:accounts[0]});
    await wallet.approveTransaction(0,{from:accounts[0]});
    await expectRevert(
        wallet.approveTransaction(0,{from:accounts[0]}),
        'Transaction cannot be approved twice'
    )
})

})