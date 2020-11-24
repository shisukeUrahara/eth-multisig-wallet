pragma solidity ^0.6.0;
pragma experimental ABIEncoderV2;

contract MultiSigWallet {
    // state variables
    address[] public approvers;
    uint256 public quorum;
    // a data structure to define the transactions
    struct Transaction {
        uint256 id;
        address payable to;
        uint256 amount;
        uint256 approvals;
        bool sent;
    }
    // a mapping to keep track of the already sent transactions
    // mapping(uint => Transaction) public transactions;
    // a variable to keep track the transaction count and serve as a new transaction id
    // uint public transactionId;

    // keeping track of the transactions and their states
    Transaction[] public transactions;
    // keeping track of which approver has approved which transaction
    mapping(address => mapping(uint256 => bool)) public approvals;

    // constructor
    constructor(address[] memory _approvers, uint256 _quorum) public {
        approvers = _approvers;
        quorum = _quorum;
    }

    // modifiers so that some functions can be called using approvers only
    modifier onlyApprover {
        bool isApprover = false;

        for (uint256 i = 0; i < approvers.length; i++) {
            if (approvers[i] == msg.sender) {
                isApprover = true;
            }
        }

        require(isApprover == true, "Sender is not an approver");
        _;
    }

    // function to get list of approvers
    function getApproversList() external view returns (address[] memory) {
        return approvers;
    }

    // a function to return list of transactions
    function getTransactions() external view returns (Transaction[] memory) {
        return transactions;
    }

    // a function that can propose a transaction , then approvers approve it and it is executed
    function createTransaction(address payable _to, uint256 _amount)
        external
        onlyApprover
    {
        // create a new pending transaction
        transactions.push(
            Transaction({
                id: transactions.length,
                amount: _amount,
                to: _to,
                approvals: 0,
                sent: false
            })
        );
    }

    // a function to approve transactions
    function approveTransaction(uint256 _id) external onlyApprover {
        // check if this transaction is already sent
        require(
            transactions[_id].sent == false,
            "This transaction has already been executed"
        );
        // check that an approver doesnot approve the transaction twice
        require(
            approvals[msg.sender][_id] == false,
            "Transaction cannot be approved twice"
        );

        // increment the approval flag for given approver for given approval address
        approvals[msg.sender][_id] = true;
        // increment the approval count for that Transaction
        transactions[_id].approvals++;

        // if approval count > quorum , execute the transaction
        if (transactions[_id].approvals >= quorum) {
            transactions[_id].sent = true;
            // execute the actual transactions

            address payable to = transactions[_id].to;
            uint256 amount = transactions[_id].amount;

            to.transfer(amount);
        }
    }

    // a fallback function to receive ether
    receive() external payable {}
}
